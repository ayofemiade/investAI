'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { AICoreScene } from '@/components/3d/AICoreScene';

// ─── Telemetry pill ───────────────────────────────────────────────────────────
const TELEMETRY_ITEMS = [
  'LATENCY 12ms',
  'HSM QUORUM 5/5',
  'BLOCK #21,847,402',
  'AUM $2.5B+',
  'POSITIONS 1,847',
  'UPTIME 99.9%',
];

function TelemetryPill() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const ival = setInterval(() => setIdx(i => (i + 1) % TELEMETRY_ITEMS.length), 2800);
    return () => clearInterval(ival);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md"
      style={{
        background: 'rgba(16,185,129,0.06)',
        borderColor: 'rgba(16,185,129,0.25)',
      }}
    >
      {/* Live pulse dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-[0.14em]">
        SYSTEM ONLINE
      </span>
      <span className="w-px h-3 bg-white/15" />
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.35 }}
        className="font-mono text-[11px] text-slate-400 uppercase tracking-[0.08em]"
      >
        {TELEMETRY_ITEMS[idx]}
      </motion.span>
    </motion.div>
  );
}

// ─── Staggered word reveal ─────────────────────────────────────────────────────
function WordReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.22em] ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Trust metrics ──────────────────────────────────────────────────────────
const TRUST_METRICS = [
  { value: '$2.5B+', label: 'Assets Under Management', color: '#f8fafc', accent: '#f8fafc' },
  { value: '50K+',   label: 'Active Investors',         color: '#10b981', accent: '#10b981' },
  { value: '0.001ms',label: 'Execution Speed',           color: '#06b6d4', accent: '#06b6d4' },
  { value: '99.9%',  label: 'System Uptime',             color: '#f59e0b', accent: '#f59e0b' },
];

// ─── Animated floating particles ───────────────────────────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 1 + Math.random() * 2,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 4,
    color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#06b6d4' : '#8b5cf6',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Magnetic CTA Button ───────────────────────────────────────────────────────
function MagneticButton({ children, href, id, className, style }: {
  children: React.ReactNode;
  href: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 25 });
  const y = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      id={id}
      style={{ x, y, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {children}
    </motion.a>
  );
}

// ─── Ticker bar ────────────────────────────────────────────────────────────────
const TICKERS = [
  { sym: 'BTC/USDT',  price: '$67,421',  change: '+2.34%', up: true  },
  { sym: 'ETH/USDT',  price: '$3,847',   change: '+1.87%', up: true  },
  { sym: 'SOL/USDT',  price: '$182.40',  change: '+5.21%', up: true  },
  { sym: 'BNB/USDT',  price: '$612.30',  change: '-0.43%', up: false },
  { sym: 'ARB/USDT',  price: '$1.248',   change: '+3.12%', up: true  },
  { sym: 'AVAX/USDT', price: '$39.84',   change: '+2.08%', up: true  },
  { sym: 'ADA/USDT',  price: '$0.621',   change: '-1.20%', up: false },
  { sym: 'LINK/USDT', price: '$18.44',   change: '+4.10%', up: true  },
];

function RealtimeTicker() {
  return (
    <div className="w-full border-t border-white/[0.04] bg-black/70 py-3 overflow-hidden relative z-10">
      <div className="flex gap-10 whitespace-nowrap animate-ticker">
        {[...TICKERS, ...TICKERS, ...TICKERS].map((ticker, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[11px] text-slate-500 font-semibold tracking-wide">{ticker.sym}</span>
            <span className="font-mono text-[11px] text-slate-300 font-bold">{ticker.price}</span>
            <span className={`font-mono text-[11px] font-bold ${ticker.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {ticker.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const coreY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.8]);

  const bgGradient = useMotionTemplate`radial-gradient(900px circle at calc(${mouseX} * 100%) calc(${mouseY} * 100%), rgba(16,185,129,0.08) 0%, transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Mouse-reactive radial glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: bgGradient }}
      />

      {/* Static ambient glow at top */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Scroll fade overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black pointer-events-none z-20"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col justify-center max-w-[1340px] mx-auto px-6 lg:px-10 pt-28 pb-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Left: Text column */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Telemetry pill */}
            <TelemetryPill />

            {/* Hero headline — word-by-word reveal */}
            <div className="space-y-1" aria-label="The future of your wealth runs on AI">
              <h1
                className="text-white leading-[1.02] block"
                style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)', fontWeight: 800, letterSpacing: '-0.038em' }}
              >
                <WordReveal text="The future" delay={0.15} />
              </h1>
              <h1
                className="font-editorial-serif italic leading-[1.02] block"
                style={{
                  fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.022em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #10b981 55%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <WordReveal text="of your wealth" delay={0.3} />
              </h1>
              <h1
                className="text-slate-300 leading-[1.02] block"
                style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)', fontWeight: 800, letterSpacing: '-0.038em' }}
              >
                <WordReveal text="runs on AI." delay={0.48} />
              </h1>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 max-w-[520px] leading-[1.7]"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)' }}
            >
              Institutional-grade algorithmic execution. Delta-neutral yield strategies.
              Cryptographic cold-storage custody. Built for those who treat investing as a science.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="/strategies"
                id="hero-cta-primary"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm text-white"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                  boxShadow: '0 0 40px rgba(16,185,129,0.22), 0 4px 24px rgba(0,0,0,0.5)',
                }}
              >
                <span className="relative z-10">Explore AI Strategies</span>
                <motion.svg
                  className="w-4 h-4 relative z-10"
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
                {/* Sweep shimmer on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                  <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700" />
                </div>
              </MagneticButton>

              <MagneticButton
                href="/security"
                id="hero-cta-secondary"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 border backdrop-blur-md transition-colors duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.10)',
                }}
              >
                <svg aria-hidden className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>View Security Audits</span>
              </MagneticButton>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-8 border-t border-white/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {TRUST_METRICS.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="font-mono font-black leading-none mb-1.5"
                    style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-tight">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Neural Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: coreY }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer halo */}
            <div
              aria-hidden
              className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, rgba(6,182,212,0.03) 50%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* GLSL code watermark overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-start justify-start pl-4 pt-4" aria-hidden>
              <div className="font-mono text-[9px] text-emerald-400/15 leading-5 select-none">
                {[
                  'v[x] = sin(t * 0.3 + p * 1.5) * 0.15',
                  'fresnel = pow(1 + dot(eye, n), 2.5)',
                  'color = mix(base, edge, fresnel)',
                  'gl_Position = mvp * pos',
                ].map((line, i) => <div key={i}>{line}</div>)}
              </div>
            </div>

            <AICoreScene />
          </motion.div>
        </div>
      </div>

      {/* Realtime Ticker Bottom */}
      <div className="relative z-10">
        <RealtimeTicker />
      </div>

      {/* Section transition fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0f172a 0%, transparent 100%)' }}
      />
    </section>
  );
}
