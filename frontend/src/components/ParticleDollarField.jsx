// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const DollarParticles = () => {
  const mesh = useRef();
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0009;
    }
  });

  return (
    <points ref={mesh} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.4} color="#00ff00" />
    </points>
  );
};

const ParticleDollarField = () => {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
      <ambientLight />
      <DollarParticles />
    </Canvas>
  );
};

export default DollarParticles;






