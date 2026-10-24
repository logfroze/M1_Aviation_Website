import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Cached parsed GLTF result to prevent re-fetching the 74MB Bombardier model
let cachedScene: THREE.Group | null = null;
let loadPromise: Promise<THREE.Group> | null = null;

export interface JetColorConfig {
  fuselageColor?: string; // Main aircraft body paint (e.g. "#0f172a", "#ffffff", "#000000")
  accentColor?: string;   // Wingpod, stripes, winglet paint (e.g. "#38bdf8", "#f59e0b", "#ef4444")
  trimMetalColor?: string;// Titanium & leading edge deicing trim (e.g. "#94a3b8")
  glassColor?: string;    // Cockpit canopy tint (e.g. "#081525")
}

/**
 * Dynamically applies custom paint and material colors to any Bombardier Windjet 365 3D instance.
 */
export function applyJetColors(root: THREE.Object3D, config: JetColorConfig) {
  root.traverse((child: any) => {
    if (child.isMesh && child.material) {
      const mat = child.material;
      const matName = (mat.name || "").toLowerCase();

      // Clone material if it hasn't been cloned for this instance
      if (!mat.userData?.isInstanceCloned) {
        child.material = mat.clone();
        child.material.userData = { ...(child.material.userData || {}), isInstanceCloned: true };
      }
      const instanceMat = child.material;

      // 1. Primary fuselage paint
      if (
        config.fuselageColor &&
        (matName.includes("fuselage") ||
          matName.includes("fuselage2") ||
          matName.includes("fuselage_blue"))
      ) {
        instanceMat.color = new THREE.Color(config.fuselageColor);
        instanceMat.needsUpdate = true;
      }

      // 2. Wingpod & Livery Accents
      if (
        config.accentColor &&
        (matName.includes("wingpod") ||
          matName.includes("sky_blue") ||
          matName.includes("paint") ||
          matName.includes("crimson_red"))
      ) {
        instanceMat.color = new THREE.Color(config.accentColor);
        instanceMat.needsUpdate = true;
      }

      // 3. Cockpit canopy glass
      if (
        config.glassColor &&
        (matName.includes("glass") || matName.includes("cockpit") || matName.includes("clear_glass"))
      ) {
        instanceMat.color = new THREE.Color(config.glassColor);
        instanceMat.needsUpdate = true;
      }

      // 4. Titanium trim
      if (
        config.trimMetalColor &&
        (matName.includes("titanium") || matName.includes("deicing") || matName.includes("dark_metal"))
      ) {
        instanceMat.color = new THREE.Color(config.trimMetalColor);
        instanceMat.needsUpdate = true;
      }
    }
  });
}

/**
 * Loads and preprocesses the Bombardier Windjet 365 3D aircraft model.
 * - Centers the geometry pivot at the center of gravity.
 * - Upgrades materials with luxury aeronautical metallic finish and tinted glass canopy.
 * - Replaces any dots with authentic supersonic propulsion flame cones that only engage at high thrust.
 */
export function getJetModel(colors?: JetColorConfig): Promise<THREE.Group> {
  if (cachedScene) {
    const clone = cachedScene.clone(true);
    if (colors) applyJetColors(clone, colors);
    return Promise.resolve(clone);
  }

  if (loadPromise) {
    return loadPromise.then((scene) => {
      const clone = scene.clone(true);
      if (colors) applyJetColors(clone, colors);
      return clone;
    });
  }

  loadPromise = new Promise<THREE.Group>((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      "/models/bombardier_windjet_365/scene.gltf",
      (gltf) => {
        const root = gltf.scene;

        // 1. Calculate bounding box and center pivot exactly at center of gravity
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center pivot at model center of gravity to ensure entire nose and tail are visible
        root.position.set(-center.x + 0.4, -center.y, -center.z);

        // Wrap inside a normalized pivot group
        const pivot = new THREE.Group();
        pivot.name = "JetPivot";
        pivot.add(root);

        // Normalize scale: make largest dimension ~14 units for consistent framing
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const targetDim = 14.0;
          const scaleFactor = targetDim / maxDim;
          pivot.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }

        // 2. Enhance materials for ultra-premium M1 aerospace aesthetic
        root.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const mat = child.material;
            if (mat) {
              const matName = (mat.name || "").toLowerCase();
              const childName = (child.name || "").toLowerCase();

              // Completely remove the visible dotted wire / HF antenna line along the top of the aircraft
              if (
                matName.includes("wire") ||
                childName.includes("wire") ||
                child.name === "Object_981" ||
                child.name === "Object_418" ||
                child.name === "Object_476"
              ) {
                child.visible = false;
                return;
              }

              // Remove noisy patchwork camo textures to ensure a smooth, uniform, aesthetic luxury surface
              if (mat.map) {
                mat.map = null;
              }

              // A. Luxury Gold / Champagne Brass Metallic Accents (Engine cowlings, de-icing rings, exhaust rims)
              if (
                matName.includes("deicing") ||
                matName.includes("titanium_burnt") ||
                matName.includes("copper") ||
                matName.includes("nacelle_inside") ||
                matName.includes("engine_axle") ||
                matName.includes("antenna_metal_glossy")
              ) {
                mat.color = new THREE.Color(0xd4af37); // Rich 24K Champagne Gold
                mat.metalness = 0.94;
                mat.roughness = 0.12;
                mat.envMapIntensity = 2.4;
                mat.needsUpdate = true;
              }
              // B. Electric / Deep Sapphire Blue Aerodynamic Highlights (Wingpods, wingtip edges, aero livery lines)
              else if (
                matName.includes("wingpod") ||
                matName.includes("sky_blue") ||
                matName.includes("crimson_red") ||
                matName.includes("fuselage_blue")
              ) {
                mat.color = new THREE.Color(0x0ea5e9); // Electric Cyan / Sapphire Blue
                mat.metalness = 0.82;
                mat.roughness = 0.15;
                mat.envMapIntensity = 2.2;
                mat.needsUpdate = true;
              }
              // C. Cockpit Canopy: Deep Tinted Sapphire Aerospace Glass
              else if (
                matName.includes("glass") ||
                matName.includes("clear") ||
                matName.includes("cockpit")
              ) {
                mat.transparent = true;
                mat.opacity = 0.90;
                mat.color = new THREE.Color(0x030a14); // Deep Midnight Sapphire
                mat.metalness = 0.96;
                mat.roughness = 0.08;
                mat.envMapIntensity = 2.5;
                mat.needsUpdate = true;
              }
              // D. Machined Titanium / Dark Metal Mechanical Trim
              else if (
                matName.includes("titanium") ||
                matName.includes("dark_metal") ||
                matName.includes("metal") ||
                matName.includes("landing_gear")
              ) {
                mat.color = new THREE.Color(0x283140); // Dark Titanium Alloy
                mat.metalness = 0.88;
                mat.roughness = 0.18;
                mat.needsUpdate = true;
              }
              // E. Main Airframe: Ultra-Smooth, Consistent, Deep Dark Obsidian Metallic Composite
              else {
                mat.color = new THREE.Color(0x151e2c); // Deep metallic midnight obsidian
                mat.metalness = 0.62;
                mat.roughness = 0.22;
                mat.envMapIntensity = 2.4;
                mat.needsUpdate = true;
              }
            }
          }
        });

        // 3. Supersonic Propulsion Exhaust Flame Cones (NO WEIRD DOTS)
        // Only active during high-speed flight maneuvers (invisible when parked or showcase)
        const engineGlowGroup = new THREE.Group();
        engineGlowGroup.name = "EngineGlowGroup";
        engineGlowGroup.visible = false; // Hidden by default (completely off when parked)

        // Realistic elongated supersonic thrust flame cone
        // Cylinder pointing along +X (tail direction)
        const flameGeo = new THREE.CylinderGeometry(0.04, 0.22, 2.2, 16, 1, true);
        flameGeo.rotateZ(Math.PI / 2); // Point along +X axis
        flameGeo.translate(1.1, 0, 0); // Origin at nozzle

        const flameMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x38bdf8),
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        // Inner white-hot supersonic core cone
        const coreGeo = new THREE.CylinderGeometry(0.02, 0.12, 1.4, 16, 1, true);
        coreGeo.rotateZ(Math.PI / 2);
        coreGeo.translate(0.7, 0, 0);

        const coreMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xffffff),
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        // Left turbine assembly
        const leftEngine = new THREE.Group();
        leftEngine.position.set(1.2, 0.45, -1.18);
        leftEngine.add(new THREE.Mesh(flameGeo, flameMaterial));
        leftEngine.add(new THREE.Mesh(coreGeo, coreMaterial));
        engineGlowGroup.add(leftEngine);

        // Right turbine assembly
        const rightEngine = new THREE.Group();
        rightEngine.position.set(1.2, 0.45, 1.18);
        rightEngine.add(new THREE.Mesh(flameGeo, flameMaterial));
        rightEngine.add(new THREE.Mesh(coreGeo, coreMaterial));
        engineGlowGroup.add(rightEngine);

        root.add(engineGlowGroup);

        cachedScene = pivot;
        const result = pivot.clone(true);
        if (colors) applyJetColors(result, colors);
        resolve(result);
      },
      undefined,
      (err) => {
        console.error("Failed to load Bombardier Windjet 365 model:", err);
        reject(err);
      }
    );
  });

  return loadPromise.then((scene) => {
    const clone = scene.clone(true);
    if (colors) applyJetColors(clone, colors);
    return clone;
  });
}
