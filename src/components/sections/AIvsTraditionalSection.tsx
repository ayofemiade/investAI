'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue, animate } from 'framer-motion';

const BIASES = [
  { label: 'Fear of Loss',      val: 87 },
  { label: 'Greed Overextension', val: 73 },
  { label: 'Recency Bias',       val: 91 },
  { label: 'Herd Mentality',     val: 68 },
];

const AI_METRICS = [
  { label: 'Signal Latency',     val: '0.001s', sub: 'Sub-millisecond execution' },
  { label: 'Emotion Factor',     val: '0.00%',  sub: 'Zero cognitive bias'       },
  { label: 'Data Points / sec',  val: '100K+',  sub: 'Order book depth'          },
  { label: 'Management Fee',     val: '0%',     sub: 'vs 2.5% industry avg'      },
];

// Sweeping data line
function DataLine({ delay = 0, opacity = 0.35 }: { delay?: number; opacity?: number }) {
  return (
    <motion.div
      className="absolute h-px w-full left-0"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.7), transparent)' }}
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '200%', opacity: [0, opacity, 0] }}
      transition={{ duration: 2.6, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function LivePulse() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
  );
}

// Animated number that counts down from `from` to `to`
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    prev.current = value;
    const ctrl = animate(start, end, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => {
        if (ref.current) ref.current.textContent = `${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => ctrl.stop();
  }, [value, suffix]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

export function AIvsTraditionalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0c0f18 100%)' }}
    >
      {/* Ghost watermark */}
      <div
        aria-hidden
        className="text-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap"
      >
        SPEED
      </div>

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Red ambient glow on left */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-red-500/[0.04] blur-[120px] pointer-events-none rounded-full" />
      {/* Emerald ambient glow on right */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-emerald-500/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1340px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 lg:mb-28 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-400 mb-6">
            <LivePulse />
            <span>Performance Comparison Matrix</span>
          </div>
          <h2 className="text-display-section text-white">
            Human intuition{' '}
            <span className="font-editorial-serif italic text-gradient-silver">costs you</span>
            <br />
            <span className="text-gradient-emerald">milliseconds become millions.</span>
          </h2>
        </motion.div>

        {/* Split comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── LEFT: Traditional (degraded) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-8 lg:p-10 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.018)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Muted red glow corner */}
            <div className="absolute -top-8 -right-8 w-56 h-56 bg-red-500/[0.08] blur-[70px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <div className="text-[11px] font-mono text-slate-600 uppercase tracking-[0.15em] mb-1">Traditional Human Management</div>
                <div className="text-slate-300 text-lg font-bold">Active Fund Manager</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-950/50 border border-red-500/20 text-red-400/80 text-[11px] font-mono">
                UNDERPERFORMING
              </span>
            </div>

            {/* Decision timer */}
            <div className="mb-8 p-6 rounded-2xl relative z-10" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-2">Avg. Decision Latency</div>
              <div className="font-mono font-black text-slate-500" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                72<span className="text-slate-700 text-4xl">,000</span>
                <span className="text-slate-700 text-2xl ml-1.5">ms</span>
              </div>
              <div className="text-slate-700 text-xs font-mono mt-2">72 seconds of cognitive processing per signal</div>
            </div>

            {/* Cognitive bias bars */}
            <div className="space-y-4 relative z-10">
              <div className="text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-3">Cognitive Bias Exposure</div>
              {BIASES.map((bias, i) => (
                <div key={bias.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">{bias.label}</span>
                    <span className="text-red-500/60">{bias.val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${bias.val}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, rgba(127,29,29,0.8), rgba(239,68,68,0.4))' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Overlay to dim it */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
          </motion.div>

          {/* ── RIGHT: AI (dominant, bright) ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-8 lg:p-10 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(16,185,129,0.2)',
              boxShadow: '0 0 80px rgba(16,185,129,0.04) inset',
            }}
          >
            {/* Emerald glow */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-emerald-500/[0.1] blur-[80px] rounded-full pointer-events-none" />

            {/* Sweeping data streams */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              {[0, 0.5, 1.1, 1.8, 2.6].map((d, i) => (
                <div key={i} className="absolute left-0 right-0" style={{ top: `${15 + i * 17}%` }}>
                  <DataLine delay={d} opacity={0.25 + i * 0.04} />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <div className="text-[11px] font-mono text-emerald-400/50 uppercase tracking-[0.15em] mb-1">
                  InvestAI Neural Execution Engine
                </div>
                <div className="text-white text-lg font-bold">Autonomous Quant System v4.2</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono flex items-center gap-1.5">
                <LivePulse />
                LIVE
              </span>
            </div>

            {/* AI latency */}
            <div className="mb-8 p-6 rounded-2xl relative z-10" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
              <div className="text-[11px] font-mono text-emerald-400/50 uppercase tracking-wider mb-2">Execution Latency</div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono font-black text-emerald-400"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                0<span className="text-emerald-600">.001</span>
                <span className="text-emerald-600 text-2xl ml-1.5">ms</span>
              </motion.div>
              <div className="text-emerald-400/40 text-xs font-mono mt-2">
                Sub-millisecond signal-to-execution across 100+ venues
              </div>
            </div>

            {/* AI metrics grid */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {AI_METRICS.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">{metric.label}</div>
                  <div className="font-mono font-bold text-white text-sm">{metric.val}</div>
                  <div className="text-[10px] text-emerald-400/50 mt-0.5">{metric.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom performance line */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center"
        >
          <p className="font-mono text-xs text-slate-500 max-w-md leading-relaxed">
            While a fund manager reviews a signal over 72 seconds of emotional processing,
            our engine has already executed, hedged, and cryptographically logged the position.
          </p>
          <div className="h-px w-16 bg-white/[0.08] rotate-90 hidden md:block shrink-0" />
          <div className="shrink-0">
            <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1">Average Alpha Advantage</div>
            <div className="font-mono font-black text-3xl text-gradient-emerald">+16.1% / yr</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
