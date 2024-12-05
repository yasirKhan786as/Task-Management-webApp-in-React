import React from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const particles = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push(
        THREE.MathUtils.randFloatSpread(50), // X
        THREE.MathUtils.randFloatSpread(50), // Y
        THREE.MathUtils.randFloatSpread(50)  // Z
      );
    }
    return new Float32Array(positions);
  }, []);

  return (
    <Points positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function Background() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <Particles />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
