"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelInfo {
  id: string;
  name: string;
  category: string;
  file: string;
  size: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  baseYaw: number;
  pitch: number;
  roll: number;
  scaleFactor: number;
}

const MODELS: ModelInfo[] = [
  {
    id: "black-jet",
    name: "VIP Black Private Jet",
    category: "Ultra-Luxury Executive Flagship",
    file: "/models/uploads_files_2139909_private_jet_black.glb",
    size: "8.78 MB",
    desc: "Top-tier executive jet in stealth metallic-black finish with twin rear turbines, swept wings, and detailed landing gear bays. Perfectly fits M1's cybernetic luxury brand.",
    badge: "USER REQUESTED / BEST CHOICE",
    badgeColor: "bg-cyan-400 text-black",
    baseYaw: -24,
    pitch: 8,
    roll: -3,
    scaleFactor: 11.5,
  },
  {
    id: "pilatus-pc24",
    name: "Pilatus PC-24 Light Jet",
    category: "Twin-Engine Utility Jet",
    file: "/models/pilatus_pc24.glb",
    size: "5.79 MB",
    desc: "Current model on site. White & cobalt blue livery, T-tail configuration. More casual/cartoonish aviation aesthetic.",
    badge: "CURRENT MODEL (CARTOONISH)",
    badgeColor: "bg-red-500/80 text-white",
    baseYaw: -24,
    pitch: 8,
    roll: -3,
    scaleFactor: 11.5,
  },
  {
    id: "lear-98",
    name: "Lear-98 Concept Cruiser",
    category: "High-Altitude Jet",
    file: "/models/lear-98.glb",
    size: "6.86 MB",
    desc: "Swept-wing supersonic cruiser with aggressive aerodynamic winglets and wide rear-mounted engine nacelles.",
    badge: "ALTERNATIVE OPTION",
    badgeColor: "bg-zinc-800 text-zinc-300",
    baseYaw: -24,
    pitch: 8,
    roll: -3,
    scaleFactor: 10.5,
  },
  {
    id: "bombardier",
    name: "Bombardier Windjet 365",
    category: "Concept Jet",
    file: "/models/bombardier_windjet_365/scene.gltf",
    size: "74.1 MB (Very Heavy)",
    desc: "Large commercial/concept frame. Complex multi-part geometry with 32 texture sets. Very large file size.",
    badge: "TOO HEAVY (74 MB)",
    badgeColor: "bg-amber-500/80 text-black",
    baseYaw: 70,
    pitch: 6,
    roll: -2,
    scaleFactor: 10.0,
  },
];

function ModelCard({ model }: { model: ModelInfo }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let destroyed = false;
    let animId: number;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 260;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = model.id === "black-jet" ? 1.8 : 1.35;

    // Comprehensive Studio Lighting (Crucial for black metallic surfaces)
    const ambient = new THREE.AmbientLight(0xffffff, model.id === "black-jet" ? 2.8 : 1.4);
    scene.add(ambient);

    // Key bright sunlight from upper right
    const sun = new THREE.DirectionalLight(0xffffff, 5.0);
    sun.position.set(12, 16, 14);
    scene.add(sun);

    // Front fill light to illuminate black details
    const frontFill = new THREE.DirectionalLight(0xffffff, 3.8);
    frontFill.position.set(0, 5, 20);
    scene.add(frontFill);

    // Bright Cyan Rim light matching M1 branding
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 5.5);
    cyanRim.position.set(-14, 8, 8);
    scene.add(cyanRim);

    // Opposing soft silver rim light
    const silverRim = new THREE.DirectionalLight(0xdbeafe, 3.5);
    silverRim.position.set(14, -2, -8);
    scene.add(silverRim);

    // Circular pedestal platform beneath the plane
    const groundGeo = new THREE.CylinderGeometry(7.2, 7.2, 0.2, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x07111b,
      roughness: 0.3,
      metalness: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -2.1;
    scene.add(ground);

    // Glowing cyan ring edge
    const ringGeo = new THREE.RingGeometry(7.1, 7.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.99;
    scene.add(ring);

    // Load Model
    const loader = new GLTFLoader();
    let pivot: THREE.Group | null = null;

    loader.load(
      model.file,
      (gltf) => {
        if (destroyed) return;
        const root = gltf.scene;

        // Enhance Black Jet materials for incredible showroom shine
        if (model.id === "black-jet") {
          root.traverse((child: any) => {
            if (child.isMesh && child.material) {
              // Lift the color slightly to satin metallic graphite so lines and curves catch light
              child.material.color = new THREE.Color(0x525c68);
              child.material.roughness = 0.24;
              child.material.metalness = 0.65;
              child.material.envMapIntensity = 2.4;
              child.material.needsUpdate = true;
            }
          });

          // Dual glowing engine exhaust emitters
          const glowGroup = new THREE.Group();
          const glowGeo = new THREE.SphereGeometry(0.28, 16, 16);
          const glowMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.95,
          });

          const lGlow = new THREE.Mesh(glowGeo, glowMat);
          lGlow.position.set(9.2, 2.85, 2.04);
          glowGroup.add(lGlow);

          const rGlow = new THREE.Mesh(glowGeo, glowMat.clone());
          rGlow.position.set(9.2, 2.85, -2.04);
          glowGroup.add(rGlow);

          root.add(glowGroup);
        }

        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.set(-center.x, -center.y, -center.z);

        pivot = new THREE.Group();
        pivot.add(root);

        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const scale = model.scaleFactor / maxDim;
          pivot.scale.set(scale, scale, scale);
        }

        // Set beauty showcase angle
        pivot.rotation.y = (model.baseYaw * Math.PI) / 180;
        pivot.rotation.x = (model.pitch * Math.PI) / 180;
        pivot.rotation.z = (model.roll * Math.PI) / 180;

        scene.add(pivot);
        setLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Failed to load model:", model.file, err);
        setError("Error loading 3D model");
      }
    );

    // Gentle showcase floating animation
    let time = Math.random() * 10;
    const animate = () => {
      if (destroyed) return;
      time += 0.015;

      if (pivot) {
        pivot.position.y = Math.sin(time) * 0.10;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [model]);

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 p-4 backdrop-blur-xl ${
        model.id === "black-jet"
          ? "border-cyan-400 bg-cyan-950/25 shadow-[0_0_35px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400"
          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
      }`}
    >
      {model.badge && (
        <div
          className={`absolute -top-3 left-5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md ${model.badgeColor}`}
        >
          {model.badge}
        </div>
      )}

      {/* 3D Canvas Preview */}
      <div
        ref={containerRef}
        className="relative w-full h-[220px] rounded-xl overflow-hidden bg-gradient-to-b from-zinc-950/95 to-zinc-900/80 border border-zinc-800/80 flex items-center justify-center mt-1"
      >
        {!loaded && !error && (
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] font-mono">Loading 3D model...</span>
          </div>
        )}
        {error && (
          <div className="text-[11px] font-mono text-red-400 text-center px-4">
            {error} ({model.file})
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
        />
      </div>

      {/* Details */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-white tracking-tight">{model.name}</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 border border-zinc-700/60">
            {model.size}
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          {model.category}
        </span>
        <p className="text-[11px] text-zinc-300 leading-relaxed mt-0.5">{model.desc}</p>
      </div>
    </div>
  );
}

export default function PreviewModelsPage() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#020509] text-white p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 font-mono text-[11px] uppercase tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            M1 Aviation Fleet Showcase
          </div>
          <h1 className="text-2xl sm:text-4xl font-extralight tracking-tight text-white uppercase">
            All 3D Aircraft Models in Repository
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Direct real-time 3D WebGL render comparison of all models in <code className="text-cyan-300">/public/models/</code>
          </p>
        </div>

        {/* 2x2 Grid of Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {MODELS.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
