import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

function SpinningLogo() {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <mesh ref={ref} position={[0, 1, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load('/streetwise-logo.png')}
        metalness={1}
        roughness={0.2}
        color={'black'}
      />
    </mesh>
  );
}

function DollarSigns() {
  const signs = Array.from({ length: 200 }, () => ({
    pos: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ],
  }));
  return signs.map((s, i) => (
    <Text
      key={i}
      position={s.pos}
      fontSize={0.3}
      color="lime"
      font="/fonts/Orbitron-Regular.ttf"
    >
      $
    </Text>
  ));
}

export default function CosmicIntro() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <SpinningLogo />
        <DollarSigns />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <h1
        style={{
          position: 'absolute',
          bottom: '50px',
          width: '100%',
          textAlign: 'center',
          fontSize: '3em',
          color: 'white',
          fontFamily: 'Orbitron, sans-serif',
        }}
      >
        STREETWI$E
      </h1>
    </div>
  );
}



