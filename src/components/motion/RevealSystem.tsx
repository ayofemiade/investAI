'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal: Decodes or slides text with algorithmic precision (no bounce).
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  scrub = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scrub?: boolean | number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Split text into words and chars for high-end cinematic feel
    const split = new SplitType(containerRef.current, { types: 'lines,words' });

    gsap.fromTo(
      split.words,
      {
        y: 40,
        opacity: 0,
        rotateX: -45,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.04,
        duration: 1.2,
        ease: 'expo.out',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          scrub: scrub,
        },
      }
    );

    return () => {
      split.revert();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * GlassReveal: Settles a glassmorphism card into place (blur-to-clear).
 */
export function GlassReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        scale: 0.95,
        opacity: 0,
        filter: 'blur(10px)',
        y: 30,
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
