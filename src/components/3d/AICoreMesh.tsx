'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Shaders/GlassFresnelMaterial';

export function AICoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.15;
      outerRingRef.current.rotation.y += delta * 0.25;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.3;
      innerRingRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group scale={1.8}>
      {/* Central 3D Refractive AI Core Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 64]} />
        {/* @ts-ignore */}
        <glassFresnelMaterial ref={materialRef} transparent depthWrite={false} />
      </mesh>

      {/* Orbiting Quant Ring 1 */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.6, 0.015, 16, 100]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} wireframe />
        </mesh>
      </group>

      {/* Orbiting Quant Ring 2 */}
      <group ref={innerRingRef}>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[2.0, 0.008, 16, 100]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Ambient Inner Node Glow */}
      <pointLight color="#10b981" intensity={2} distance={5} />
      <pointLight color="#06b6d4" intensity={1.5} distance={6} position={[2, 2, 2]} />
    </group>
  );
}
