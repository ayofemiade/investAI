'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Still register ScrollTrigger so components work, just skip smooth scroll
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    // Correct pattern: sync Lenis with GSAP ticker (not rAF)
    // This ensures ScrollTrigger.update fires after Lenis updates scroll position
    const gsapTickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Sync lenis scroll events to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP ticker (prevents double rAF loops)
    gsap.ticker.add(gsapTickerCallback);

    // Disable lag smoothing for frame-perfect scroll sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(gsapTickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
