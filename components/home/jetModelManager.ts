import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Cached parsed GLTF results per model path to prevent re-fetching large 3D models
const cachedScenes = new Map<string, THREE.Group>();
const loadPromises = new Map<string, Promise<THREE.Group>>();

export interface JetColorConfig {
  fuselageColor?: string; // Main aircraft body paint (e.g. "#0f172a", "#ffffff", "#000000")
  accentColor?: string;   // Wingpod, stripes, winglet paint (e.g. "#38bdf8", "#f59e0b", "#ef4444")
  trimMetalColor?: string;// Titanium & leading edge deicing trim (e.g. "#94a3b8")
  glassColor?: string;    // Cockpit canopy tint (e.g. "#081525")
}

/**
 * Dynamically applies custom paint and material colors to any 3D jet instance.
 */
export function applyJetColors(root: THREE.Object3D, config: JetColorConfig) {
  root.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh && child.material) {
      const mat = child.material as THREE.MeshStandardMaterial;
      const matName = (mat.name || "").toLowerCase();

      // Clone material if it hasn't been cloned for this instance
      if (!mat.userData?.isInstanceCloned) {
        child.material = mat.clone();
        child.material.userData = { ...(child.material.userData || {}), isInstanceCloned: true };
      }
      const instanceMat = child.material as THREE.MeshStandardMaterial;

      // 1. Primary fuselage and main airframe paint
      if (config.fuselageColor) {
        if (
          matName.includes("fuselage") ||
          matName.startsWith("material_") ||
          matName.includes("gray") ||
          matName.includes("nose_door") ||
          matName.includes("body") ||
          matName.includes("main") ||
          matName.includes("wing") ||
          matName.includes("fin") ||
          matName.includes("turbine") ||
          matName.includes("private_jet_black")
        ) {
          instanceMat.color = new THREE.Color(config.fuselageColor);
          instanceMat.metalness = 0.88;
          instanceMat.roughness = 0.22;
          instanceMat.needsUpdate = true;
        }
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
        instanceMat.metalness = 0.85;
        instanceMat.roughness = 0.16;
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

      // 4. Titanium trim & leading edge deicing
      if (
        config.trimMetalColor &&
        (matName.includes("titanium") ||
          matName.includes("deicing") ||
          matName.includes("dark_metal") ||
          matName.includes("copper") ||
          matName.includes("nacelle_inside") ||
          matName.includes("engine_axle"))
      ) {
        instanceMat.color = new THREE.Color(config.trimMetalColor);
        instanceMat.metalness = 0.94;
        instanceMat.roughness = 0.12;
        instanceMat.needsUpdate = true;
      }
    }
  });
}

/**
 * Loads and preprocesses a 3D aircraft model.
 * - Centers the geometry pivot at the center of gravity.
 * - Normalizes scale across models for consistent framing.
 * - Upgrades materials with luxury aeronautical finishes.
 */
export function getJetModel(
  colors?: JetColorConfig,
  modelPath: string = "/models/bombardier_windjet_365/scene.gltf"
): Promise<THREE.Group> {
  const cached = cachedScenes.get(modelPath);
  if (cached) {
    const clone = cached.clone(true);
    if (colors) applyJetColors(clone, colors);
    return Promise.resolve(clone);
  }

  const existingPromise = loadPromises.get(modelPath);
  if (existingPromise) {
    return existingPromise.then((scene) => {
      const clone = scene.clone(true);
      if (colors) applyJetColors(clone, colors);
      return clone;
    });
  }

  const promise = new Promise<THREE.Group>((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        const root = gltf.scene;

        // 1. Calculate bounding box and center pivot exactly at center of gravity
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center pivot at model center of gravity to ensure entire nose and tail are visible
        const xOffset = modelPath.includes("bombardier") ? 0.4 : 0;
        root.position.set(-center.x + xOffset, -center.y, -center.z);

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
        root.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const mat = child.material as THREE.MeshStandardMaterial;
            if (mat) {
              const matName = (mat.name || "").toLowerCase();
              const childName = (child.name || "").toLowerCase();

              // Completely remove any visible dotted wire / HF antenna lines
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

              // Special handling for private_jet_black.glb model
              if (modelPath.includes("private_jet_black")) {
                mat.roughness = 0.24;
                mat.metalness = 0.90;
                mat.envMapIntensity = 2.4;
                mat.needsUpdate = true;
                return;
              }

              // Remove noisy patchwork camo textures
              if (mat.map && !matName.includes("texture")) {
                mat.map = null;
              }

              // A. Luxury Gold / Champagne Brass Metallic Accents
              if (
                matName.includes("deicing") ||
                matName.includes("titanium_burnt") ||
                matName.includes("copper") ||
                matName.includes("nacelle_inside") ||
                matName.includes("engine_axle") ||
                matName.includes("antenna_metal_glossy")
              ) {
                mat.color = new THREE.Color(0xd4af37);
                mat.metalness = 0.94;
                mat.roughness = 0.12;
                mat.envMapIntensity = 2.4;
                mat.needsUpdate = true;
              }
              // B. Electric / Deep Sapphire Blue Aerodynamic Highlights
              else if (
                matName.includes("wingpod") ||
                matName.includes("sky_blue") ||
                matName.includes("crimson_red") ||
                matName.includes("fuselage_blue")
              ) {
                mat.color = new THREE.Color(0x0ea5e9);
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
                mat.opacity = 0.92;
                mat.color = new THREE.Color(0x050e18);
                mat.metalness = 0.96;
                mat.roughness = 0.06;
                mat.envMapIntensity = 2.5;
                mat.needsUpdate = true;
              }
              // D. Machined Titanium / Mechanical Trim
              else if (
                matName.includes("titanium") ||
                matName.includes("dark_metal") ||
                matName.includes("metal") ||
                matName.includes("landing_gear")
              ) {
                mat.color = new THREE.Color(0x475569);
                mat.metalness = 0.85;
                mat.roughness = 0.20;
                mat.needsUpdate = true;
              }
              // E. Main Airframe: Light Luxury Aerospace Platinum Titanium Silver
              else {
                mat.color = new THREE.Color(0xc2cdda);
                mat.metalness = 0.78;
                mat.roughness = 0.18;
                mat.envMapIntensity = 2.5;
                mat.needsUpdate = true;
              }
            }
          }
        });

        cachedScenes.set(modelPath, pivot);
        const result = pivot.clone(true);
        if (colors) applyJetColors(result, colors);
        resolve(result);
      },
      undefined,
      (err) => {
        console.error(`Failed to load 3D jet model at ${modelPath}:`, err);
        reject(err);
      }
    );
  });

  loadPromises.set(modelPath, promise);
  return promise.then((scene) => {
    const clone = scene.clone(true);
    if (colors) applyJetColors(clone, colors);
    return clone;
  });
}
