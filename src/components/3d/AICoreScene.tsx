'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { AICoreMesh } from './AICoreMesh';

function Fallback2DGlow() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl animate-pulse" />
      <div className="absolute w-48 h-48 rounded-full border border-emerald-500/30 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-cyan-500/40 animate-spin" style={{ animationDuration: '12s' }} />
      </div>
    </div>
  );
}

export function AICoreScene() {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // WebGL capability check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setIsSupported(false);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return <Fallback2DGlow />;
  }

  return (
    <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] relative">
      <Suspense fallback={<Fallback2DGlow />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          dpr={1}
        >
          <ambientLight intensity={0.5} />
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <AICoreMesh />
          </Float>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </Suspense>

      {/* Decorative Gradient Shadow Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08090d] to-transparent pointer-events-none" />
    </div>
  );
}
