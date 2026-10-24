"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { getJetModel, JetColorConfig, applyJetColors } from "./jetModelManager";

interface Jet3DViewerProps {
  yaw?: number; // Heading angle in degrees
  pitch?: number; // Pitch angle in degrees (nose up/down)
  roll?: number; // Roll angle in degrees (wing bank)
  modelScale?: number; // Scale multiplier
  lightIntensity?: number; // Lighting brightness
  interactive?: boolean; // Mouse tilt interaction
  autoRotate?: boolean; // Continuous 360-degree showcase turntable rotation
  autoRotateSpeed?: number; // Turntable rotation speed in degrees per second (e.g. 15)
  mouseOffset?: { x: number; y: number };
  engineThrust?: number; // Propulsion thrust (0 to 1). < 0.45 = completely off, > 0.45 = supersonic exhaust cones
  immediate?: boolean; // When true, bypasses interpolation lag so rotation syncs 1:1 with scroll
  customColors?: JetColorConfig; // Programmatic paint colors
  className?: string;
  style?: React.CSSProperties;
  onLoaded?: () => void;
}

export default function Jet3DViewer({
  yaw = 0,
  pitch = 0,
  roll = 0,
  modelScale = 1.0,
  lightIntensity = 1.0,
  interactive = false,
  autoRotate = false,
  autoRotateSpeed = 15,
  mouseOffset,
  engineThrust = 0,
  immediate = false,
  customColors,
  className = "",
  style,
  onLoaded,
}: Jet3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelPivotRef = useRef<THREE.Group | null>(null);
  const engineGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isLoadedRef = useRef(false);
  const autoYawRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Dynamic values ref for smooth animation loop
  const targetTransformRef = useRef({
    yaw,
    pitch,
    roll,
    scale: modelScale,
    mouseX: 0,
    mouseY: 0,
    thrust: engineThrust,
    immediate,
    autoRotate,
    autoRotateSpeed,
  });

  // Keep target transform updated
  useEffect(() => {
    targetTransformRef.current.yaw = yaw;
    targetTransformRef.current.pitch = pitch;
    targetTransformRef.current.roll = roll;
    targetTransformRef.current.scale = modelScale;
    targetTransformRef.current.thrust = engineThrust;
    targetTransformRef.current.immediate = immediate;
    targetTransformRef.current.autoRotate = autoRotate;
    targetTransformRef.current.autoRotateSpeed = autoRotateSpeed;
  }, [yaw, pitch, roll, modelScale, engineThrust, immediate, autoRotate, autoRotateSpeed]);

  useEffect(() => {
    if (mouseOffset) {
      targetTransformRef.current.mouseX = mouseOffset.x;
      targetTransformRef.current.mouseY = mouseOffset.y;
    }
  }, [mouseOffset]);

  // Handle dynamic color changes if provided
  useEffect(() => {
    if (modelPivotRef.current && customColors) {
      applyJetColors(modelPivotRef.current, customColors);
    }
  }, [customColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let destroyed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup with generous frustum clearance to prevent any nose clipping
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0.3, 1.5, 27);
    camera.lookAt(0.3, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25 * lightIntensity;
    rendererRef.current = renderer;

    // 4. Lighting setup for sleek Dark Jet with vivid Blue & Gold metallic sheen
    const ambientLight = new THREE.AmbientLight(0x2a384c, 2.0);
    scene.add(ambientLight);

    // Primary key sunlight from upper-right (crisp white specular highlights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(12, 18, 14);
    scene.add(keyLight);

    // Vibrant Electric / Sapphire Blue rim light (creates vivid blue metallic sheen along wings & spine)
    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 4.5);
    blueRimLight.position.set(-16, 10, 8);
    scene.add(blueRimLight);

    // Luxury Warm 24K Gold specular rim light (creates warm gold glints along curves as it turns)
    const goldRimLight = new THREE.DirectionalLight(0xfbbf24, 3.6);
    goldRimLight.position.set(14, -2, 12);
    scene.add(goldRimLight);

    // Subtle blue fill light from below
    const fillLight = new THREE.DirectionalLight(0x60a5fa, 1.8);
    fillLight.position.set(0, -10, 6);
    scene.add(fillLight);

    // 5. Load preprocessed 3D Jet model
    getJetModel(customColors)
      .then((jetModel) => {
        if (destroyed) return;

        modelPivotRef.current = jetModel;
        scene.add(jetModel);

        // Find engine propulsion flame group
        const engineGlow = jetModel.getObjectByName("EngineGlowGroup");
        if (engineGlow) {
          engineGroupRef.current = engineGlow as THREE.Group;
          // Ensure propulsion flames start hidden if thrust is 0
          engineGroupRef.current.visible = engineThrust > 0.45;
        }

        isLoadedRef.current = true;
        onLoaded?.();
      })
      .catch((err) => {
        console.error("Error adding 3D jet to scene:", err);
      });

    // 6. Responsive resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. High-performance 60-120fps render loop
    const curRot = { yaw: yaw, pitch: pitch, roll: roll };
    lastTimeRef.current = performance.now();

    const animate = () => {
      if (destroyed) return;

      const now = performance.now();
      const deltaSec = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const model = modelPivotRef.current;
      if (model) {
        const target = targetTransformRef.current;

        // Auto-rotation (showcase turntable rotation)
        if (target.autoRotate) {
          autoYawRef.current = (autoYawRef.current + target.autoRotateSpeed * deltaSec) % 360;
        } else {
          autoYawRef.current = 0;
        }

        // Direct or smoothed rotation dynamics
        if (target.immediate) {
          curRot.yaw = target.yaw;
          curRot.pitch = target.pitch;
          curRot.roll = target.roll;
        } else {
          curRot.yaw += (target.yaw - curRot.yaw) * 0.12;
          curRot.pitch += (target.pitch - curRot.pitch) * 0.12;
          curRot.roll += (target.roll - curRot.roll) * 0.12;
        }

        // Add interactive mouse tilt if enabled
        const mouseTiltYaw = interactive ? target.mouseX * 8 : 0;
        const mouseTiltPitch = interactive ? -target.mouseY * 6 : 0;
        const mouseTiltRoll = interactive ? target.mouseX * 4 : 0;

        // Degree to radians
        const toRad = Math.PI / 180;
        const totalYawDeg = curRot.yaw + autoYawRef.current + mouseTiltYaw;
        const totalYawRad = totalYawDeg * toRad;
        const totalPitchRad = (curRot.pitch + mouseTiltPitch) * toRad;
        const totalRollRad = (curRot.roll + mouseTiltRoll) * toRad;

        // Broadcast current live orientation for seamless scroll takeoff handoff
        if (target.autoRotate && typeof window !== "undefined") {
          (window as any).__M1_PLATFORM_JET_YAW = totalYawDeg;
        }

        // In our model:
        // - Nose is along -X, Tail is along +X
        // - Wingspan is along Z
        // - Up is along Y
        model.rotation.set(totalRollRad, totalYawRad, totalPitchRad, "YXZ");

        // Dynamic scale
        const targetScale = target.scale;
        model.scale.set(targetScale, targetScale, targetScale);

        // Supersonic propulsion flames:
        // Only visible when thrust > 0.45 during flight maneuvers.
        // On showcase pedestal or low idle, visibility is strictly FALSE (ZERO flame, ZERO weird dots).
        if (engineGroupRef.current) {
          const thrust = target.thrust;
          if (thrust > 0.45) {
            engineGroupRef.current.visible = true;
            // Scale propulsion flame along length (+X) and slightly expand diameter with thrust
            const flameIntensity = (thrust - 0.45) / 0.55;
            const flicker = 0.94 + Math.sin(now * 0.04) * 0.06;
            engineGroupRef.current.scale.set(
              (0.8 + flameIntensity * 0.7) * flicker,
              0.85 + flameIntensity * 0.3,
              0.85 + flameIntensity * 0.3
            );
          } else {
            engineGroupRef.current.visible = false;
          }
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      destroyed = true;
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [interactive, lightIntensity, onLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-visible ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none select-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
      />
    </div>
  );
}
