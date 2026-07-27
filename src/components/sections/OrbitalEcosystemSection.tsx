'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ASSETS = [
  {
    id: 'btc',
    label: 'BTC',
    name: 'Bitcoin',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    strategy: 'Momentum Alpha',
    allocation: '28%',
    apy: '+34.2%',
    angle: 0,
    detail: 'High-conviction trend-following with dynamic stop-loss at 1.2% drawdown threshold.',
  },
  {
    id: 'eth',
    label: 'ETH',
    name: 'Ethereum',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.4)',
    strategy: 'Delta-Neutral Arb',
    allocation: '24%',
    apy: '+18.4%',
    angle: 72,
    detail: 'Perp-spot arbitrage capturing funding rate inefficiencies across 12 venues.',
  },
  {
    id: 'sol',
    label: 'SOL',
    name: 'Solana',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    strategy: 'Concentrated Liquidity',
    allocation: '20%',
    apy: '+26.8%',
    angle: 144,
    detail: 'Automated concentrated liquidity management with rebalance triggers at ±2% drift.',
  },
  {
    id: 'ai16z',
    label: 'AI16Z',
    name: 'AI Compute',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    strategy: 'AI Token Yield',
    allocation: '16%',
    apy: '+41.5%',
    angle: 216,
    detail: 'Long AI infrastructure tokens with covered call overlay for enhanced yield.',
  },
  {
    id: 'arb',
    label: 'ARB',
    name: 'Arbitrum',
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.4)',
    strategy: 'L2 Arb Spread',
    allocation: '12%',
    apy: '+22.1%',
    angle: 288,
    detail: 'Layer-2 bridge arbitrage exploiting canonical price divergences in real-time.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Non-Custodial MPC Architecture',
    description: 'Your keys, mathematically sharded across independent HSM nodes. Zero centralized risk. You retain cryptographic ownership at all times.',
    tag: 'SECURITY',
    tagColor: 'text-cyan-400',
    tagBg: 'bg-cyan-950/30',
    tagBorder: 'border-cyan-500/25',
    icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
    glowColor: 'rgba(6,182,212,0.08)',
  },
  {
    title: 'Real-Time Delta-Neutral Hedging',
    description: 'Simultaneous long/short positions eliminate directional market risk. Pure yield, regardless of whether Bitcoin goes to $100K or $30K.',
    tag: 'STRATEGY',
    tagColor: 'text-emerald-400',
    tagBg: 'bg-emerald-950/30',
    tagBorder: 'border-emerald-500/25',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    glowColor: 'rgba(16,185,129,0.08)',
  },
  {
    title: 'Institutional FIX Protocol API',
    description: 'Co-located execution with sub-1ms latency. Built for prime brokers, family offices, and institutional desks requiring FIX 4.4 compliance.',
    tag: 'INFRASTRUCTURE',
    tagColor: 'text-amber-400',
    tagBg: 'bg-amber-950/30',
    tagBorder: 'border-amber-500/25',
    icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
    glowColor: 'rgba(245,158,11,0.08)',
  },
  {
    title: 'Cryptographic Proof of Reserves',
    description: 'On-chain Merkle-tree attestations updated every 6 hours. Verify your exact holdings independently — no trust required, just math.',
    tag: 'TRANSPARENCY',
    tagColor: 'text-violet-400',
    tagBg: 'bg-violet-950/30',
    tagBorder: 'border-violet-500/25',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    glowColor: 'rgba(139,92,246,0.08)',
  },
];

function OrbitalDiagram({
  hoveredAsset,
  onHover,
}: {
  hoveredAsset: string | null;
  onHover: (id: string | null) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const SIZE = 380;
  const RADIUS = 150;
  const CENTER = SIZE / 2;

  // Calculate positions
  const positions = ASSETS.map(asset => {
    const rad = (asset.angle * Math.PI) / 180;
    return { ...asset, cx: CENTER + Math.cos(rad) * RADIUS, cy: CENTER + Math.sin(rad) * RADIUS };
  });

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      {/* SVG for rings and connection lines */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 w-full h-full"
        suppressHydrationWarning
      >
        {/* Outer dashed orbit ring */}
        <circle
          cx={CENTER} cy={CENTER} r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="5 7"
        />
        {/* Inner ring */}
        <circle
          cx={CENTER} cy={CENTER} r={RADIUS * 0.58}
          fill="none"
          stroke="rgba(16,185,129,0.07)"
          strokeWidth="0.75"
        />

        {/* Connection lines from center to hovered asset */}
        {positions.map(p => (
          <motion.line
            key={`line-${p.id}`}
            x1={CENTER} y1={CENTER}
            x2={p.cx} y2={p.cy}
            stroke={p.color}
            strokeWidth="0.75"
            strokeOpacity={hoveredAsset === p.id ? 0.6 : 0.08}
            strokeDasharray="3 4"
            animate={{ strokeOpacity: hoveredAsset === p.id ? 0.6 : 0.08 }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {/* Center AI core */}
        <circle cx={CENTER} cy={CENTER} r="28" fill="rgba(16,185,129,0.06)" />
        <circle cx={CENTER} cy={CENTER} r="18" fill="rgba(16,185,129,0.1)" />
        <circle cx={CENTER} cy={CENTER} r="10" fill="rgba(16,185,129,0.18)" />
        <text x={CENTER} y={CENTER + 4} textAnchor="middle" fontSize="8" fill="rgba(16,185,129,0.7)" fontFamily="monospace" fontWeight="bold">
          CORE
        </text>
      </svg>

      {/* Orbiting asset nodes */}
      <div
        className="absolute inset-0 animate-spin-slow"
      >
          {positions.map(asset => {
            const isHovered = hoveredAsset === asset.id;
            return (
              <div
                key={asset.id}
                className="absolute"
                style={{
                  left: asset.cx,
                  top: asset.cy,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 20 : 1,
                }}
                onMouseEnter={() => onHover(asset.id)}
                onMouseLeave={() => onHover(null)}
              >
                {/* Counter-rotate so label stays upright */}
                <div className="animate-spin-slow-reverse" suppressHydrationWarning>
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.35 : 1,
                      boxShadow: isHovered
                        ? `0 0 28px ${asset.glow}, 0 0 56px ${asset.glow}`
                        : `0 0 10px ${asset.glow}`,
                    }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${asset.color}28, ${asset.color}10)`,
                      border: `1px solid ${asset.color}55`,
                    }}
                  >
                    <span className="text-[10px] font-mono font-bold" style={{ color: asset.color }}>
                      {asset.label}
                    </span>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

      {/* Tooltip — rendered outside the rotating container */}
      <AnimatePresence>
        {hoveredAsset && (() => {
          const asset = ASSETS.find(a => a.id === hoveredAsset);
          if (!asset) return null;
          const pos = positions.find(p => p.id === hoveredAsset);
          if (!pos) return null;
          return (
            <motion.div
              key={hoveredAsset}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-30 w-52 p-4 rounded-2xl pointer-events-none"
              style={{
                background: 'rgba(8,9,13,0.92)',
                border: `1px solid ${asset.color}30`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${asset.color}15`,
                left: pos.cx > CENTER ? pos.cx - SIZE : pos.cx + 52,
                top: Math.max(0, pos.cy - 60),
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: asset.color, boxShadow: `0 0 6px ${asset.color}` }} />
                <div className="font-bold text-white text-sm">{asset.name}</div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Strategy</span>
                  <span style={{ color: asset.color }}>{asset.strategy}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Allocation</span>
                  <span className="text-white">{asset.allocation}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Target APY</span>
                  <span className="text-emerald-400 font-bold">{asset.apy}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">{asset.detail}</p>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export function OrbitalEcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden bg-black">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 65%)', filter: 'blur(20px)' }}
      />

      {/* Watermark */}
      <div
        aria-hidden
        className="text-watermark absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
      >
        EQUILIBRIUM
      </div>

      <div className="max-w-[1340px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Multi-Asset Algorithmic Ecosystem
          </div>
          <h2 className="text-display-section text-white">
            One platform.{' '}
            <span className="font-editorial-serif italic text-gradient-silver">Every asset.</span>
            <br />
            <span className="text-gradient-emerald">One equilibrium.</span>
          </h2>
          <p className="text-slate-400 mt-6 leading-relaxed text-base max-w-lg">
            Our quant engine simultaneously manages 5 asset classes through independent strategies,
            dynamically rebalancing to maintain your risk-adjusted return target.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Orbital diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <OrbitalDiagram hoveredAsset={hoveredAsset} onHover={setHoveredAsset} />
          </motion.div>

          {/* Differentiator cards */}
          <div className="lg:col-span-7 space-y-3">
            {DIFFERENTIATORS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-5 lg:p-6 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.018)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{
                  background: item.glowColor,
                  borderColor: 'rgba(255,255,255,0.10)',
                  y: -1,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 ${item.tagBg} border ${item.tagBorder}`}
                  >
                    <svg className={`w-5 h-5 ${item.tagColor}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-md border text-[10px] font-mono font-semibold ${item.tagColor} ${item.tagBg} ${item.tagBorder}`}>
                        {item.tag}
                      </span>
                    </div>
                    <h3 className={`text-white font-bold text-base mb-1.5 transition-colors ${item.tagColor} group-hover:${item.tagColor}`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1.5"
                    fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
