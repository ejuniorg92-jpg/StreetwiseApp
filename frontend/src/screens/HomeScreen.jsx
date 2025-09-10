// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function DollarParticles() {
  const ref = useRef();
  const count = 1500;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, [count]);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    ctx.fillStyle = 'lime';
    ctx.font = '48px Arial Black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial map={texture} size={0.7} transparent depthWrite={false} />
    </Points>
  );
}

function Earth() {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });
  return (
    <mesh ref={ref} position={[0, -3, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="blue"
        emissive="lime"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export default function HomeScreen() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 12], fov: 70 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Stars radius={200} depth={50} count={6000} factor={4} fade />
        <DollarParticles />
        <Earth />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-10">
        <h1 className="text-green-400 font-extrabold text-6xl drop-shadow-[0_0_25px_rgba(0,255,0,0.8)]">
          $treetwi$e
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/70 border-2 border-green-500 rounded-2xl p-6 text-center text-green-400 shadow-[0_0_25px_rgba(0,255,0,0.8)]">
            <h2 className="text-2xl font-bold mb-4">Streetwise</h2>
            <p className="mb-4">
              Motivational tools, daily tips, and a light AI companion.
            </p>
            <button className="px-4 py-2 border border-green-500 rounded hover:bg-green-700">
              Join Free
            </button>
          </div>

          <div className="bg-black/70 border-2 border-yellow-400 rounded-2xl p-6 text-center text-yellow-300 shadow-[0_0_25px_rgba(255,255,0,0.8)]">
            <h2 className="text-2xl font-bold mb-4">Hustler</h2>
            <p className="mb-4">
              AI-driven challenges, missions, and advanced tools.
            </p>
            <button className="px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-600">
              Upgrade
            </button>
          </div>

          <div className="bg-black/70 border-2 border-purple-500 rounded-2xl p-6 text-center text-purple-300 shadow-[0_0_25px_rgba(200,0,255,0.8)]">
            <h2 className="text-2xl font-bold mb-4">Godmode</h2>
            <p className="mb-4">
              Immortalized edition: encrypted AI, full companion, all-seeing
              eye.
            </p>
            <button className="px-4 py-2 border border-purple-500 rounded hover:bg-purple-700">
              Ascend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}






