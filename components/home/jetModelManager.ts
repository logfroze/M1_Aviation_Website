import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Cached parsed GLTF result to prevent re-fetching the 74MB Bombardier model
let cachedScene: THREE.Group | null = null;
let loadPromise: Promise<THREE.Group> | null = null;

/**
 * Loads and preprocesses the Bombardier Windjet 365 3D aircraft model.
 * - Centers the geometry pivot at the center of gravity.
 * - Upgrades materials with luxury aeronautical metallic finish and tinted glass canopy.
 * - Adds engine turbine exhaust glow emitters at the dual rear turbofan nozzles.
 */
export function getJetModel(): Promise<THREE.Group> {
  if (cachedScene) {
    return Promise.resolve(cachedScene.clone(true));
  }

  if (loadPromise) {
    return loadPromise.then((scene) => scene.clone(true));
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
        console.log("BOMBARDIER RAW BOUNDS:", JSON.stringify({ min: box.min, max: box.max, center, size }));

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

              if (
                matName.includes("fuselage") ||
                matName.includes("wingpod") ||
                matName.includes("paint") ||
                matName.includes("material_")
              ) {
                // Sleek aeronautical gloss finish
                mat.metalness = 0.42;
                mat.roughness = 0.22;
                mat.envMapIntensity = 1.6;
                mat.needsUpdate = true;
              } else if (
                matName.includes("glass") ||
                matName.includes("clear") ||
                matName.includes("cockpit")
              ) {
                // Cockpit canopy windows: Deep tinted sapphire aerospace glass
                mat.transparent = true;
                mat.opacity = 0.88;
                mat.color = new THREE.Color(0x081525);
                mat.metalness = 0.95;
                mat.roughness = 0.10;
                mat.envMapIntensity = 2.0;
                mat.needsUpdate = true;
              } else if (
                matName.includes("metal") ||
                matName.includes("titanium") ||
                matName.includes("copper") ||
                matName.includes("deicing")
              ) {
                // Precision machined titanium / metal trim
                mat.metalness = 0.85;
                mat.roughness = 0.18;
                mat.needsUpdate = true;
              }
            }
          }
        });

        // 3. Add dual glowing cyan engine exhaust emitters at the rear turbofan nozzles
        const engineGlowGroup = new THREE.Group();
        engineGlowGroup.name = "EngineGlowGroup";

        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x38bdf8),
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
        });

        const glowGeo = new THREE.SphereGeometry(0.24, 16, 16);

        // Turbine nozzle positions for Bombardier Windjet 365
        const leftGlow = new THREE.Mesh(glowGeo, glowMaterial);
        leftGlow.position.set(1.2, 0.45, -1.18);
        engineGlowGroup.add(leftGlow);

        const rightGlow = new THREE.Mesh(glowGeo, glowMaterial.clone());
        rightGlow.position.set(1.2, 0.45, 1.18);
        engineGlowGroup.add(rightGlow);

        const leftLight = new THREE.PointLight(0x38bdf8, 3.5, 5.0);
        leftLight.position.set(1.4, 0.45, -1.18);
        engineGlowGroup.add(leftLight);

        const rightLight = new THREE.PointLight(0x38bdf8, 3.5, 5.0);
        rightLight.position.set(1.4, 0.45, 1.18);
        engineGlowGroup.add(rightLight);

        root.add(engineGlowGroup);

        cachedScene = pivot;
        resolve(pivot.clone(true));
      },
      undefined,
      (err) => {
        console.error("Failed to load Bombardier Windjet 365 model:", err);
        reject(err);
      }
    );
  });

  return loadPromise.then((scene) => scene.clone(true));
}
