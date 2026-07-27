'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const RISK_PROFILES = [
  {
    id: 'defensive',
    label: 'Defensive',
    apy: 0.141,
    apyLabel: '14.1%',
    maxDD: '< 0.2%',
    sharpe: '5.10',
    strategy: 'Delta-Neutral Arbitrage',
    color: '#06b6d4',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    apy: 0.184,
    apyLabel: '18.4%',
    maxDD: '< 0.6%',
    sharpe: '4.21',
    strategy: 'Multi-Factor Momentum + Arb',
    color: '#10b981',
  },
  {
    id: 'aggressive',
    label: 'Aggressive',
    apy: 0.342,
    apyLabel: '34.2%',
    maxDD: '< 4.2%',
    sharpe: '3.12',
    strategy: 'Quant Momentum Alpha',
    color: '#f59e0b',
  },
];

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    prevValue.current = value;

    const controls = animate(start, end, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [value, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

export function SimulatorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [capital, setCapital] = useState(100000);
  const [horizon, setHorizon] = useState(3);
  const [riskId, setRiskId] = useState('balanced');

  const profile = RISK_PROFILES.find(r => r.id === riskId) || RISK_PROFILES[1];

  const { projectedValue, netYield, points } = useMemo(() => {
    const projected = Math.round(capital * Math.pow(1 + profile.apy, horizon));
    const steps = 30;
    const pts: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const t = (horizon / steps) * i;
      pts.push([i / steps, capital * Math.pow(1 + profile.apy, t)]);
    }
    return { projectedValue: projected, netYield: projected - capital, points: pts };
  }, [capital, horizon, profile]);

  // Build SVG path coordinates
  const svgPath = useMemo(() => {
    const W = 600;
    const H = 200;
    const minVal = capital;
    const maxVal = points[points.length - 1][1] * 1.05;
    const range = maxVal - minVal || 1;

    const coords = points.map(([t, v]) => {
      const x = t * W;
      const y = H - ((v - minVal) / range) * H;
      return `${x},${y}`;
    });

    return `M ${coords.join(' L ')}`;
  }, [points, capital]);

  const svgFill = `${svgPath} L 600,200 L 0,200 Z`;

  return (
    <section ref={ref} className="relative py-32 lg:py-44 bg-[#0a0c10] border-t border-b border-white/[0.05] overflow-hidden">
      {/* Glow background */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 65%)', filter: 'blur(30px)' }}
      />

      {/* Watermark */}
      <div
        aria-hidden
        className="text-watermark absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
      >
        COMPOUND
      </div>

      <div className="max-w-[1340px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Interactive Backtested Yield Simulator
          </div>
          <h2 className="text-display-section text-white">
            What does
            <br />
            <span className="font-editorial-serif italic text-gradient-silver">compounding intelligence</span>
            <br />
            <span className="text-gradient-emerald">actually look like?</span>
          </h2>
        </motion.div>

        {/* Main Simulator Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl p-8 lg:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* Controls Left Column */}
            <div className="lg:col-span-4 space-y-9">

              {/* Capital Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="capital-range" className="text-slate-300 text-sm font-semibold">Capital Deployment</label>
                  <span className="font-mono font-bold text-white text-xl">
                    ${capital.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="capital-range"
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={capital}
                    onChange={e => setCapital(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer"
                    aria-label="Adjust capital deployment amount"
                    style={{
                      height: '4px',
                      background: `linear-gradient(to right, ${profile.color} ${(capital - 10000) / 990000 * 100}%, rgba(255,255,255,0.1) 0%)`,
                      borderRadius: '999px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-500">
                  <span>$10,000</span>
                  <span>$500,000</span>
                  <span>$1,000,000+</span>
                </div>
              </div>

              {/* Horizon Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 text-sm font-semibold">Time Horizon</label>
                  <span className="font-mono font-bold text-white text-lg">
                    {horizon} {horizon === 1 ? 'Year' : 'Years'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(h => (
                    <button
                      key={h}
                      onClick={() => setHorizon(h)}
                      aria-label={`${h} year time horizon`}
                      aria-pressed={horizon === h}
                      className="flex-1 py-2 rounded-xl font-mono text-sm font-semibold transition-all duration-200 cursor-pointer"
                      style={{
                        background: horizon === h ? `${profile.color}20` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${horizon === h ? profile.color + '50' : 'rgba(255,255,255,0.06)'}`,
                        color: horizon === h ? profile.color : '#64748b',
                      }}
                    >
                      {h}Y
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Engine Selector */}
              <div className="space-y-3">
                <label className="text-slate-300 text-sm font-semibold block">Risk Engine</label>
                <div className="space-y-2">
                  {RISK_PROFILES.map(r => {
                    const isSelected = riskId === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRiskId(r.id)}
                        aria-label={`${r.label} risk profile, ${r.strategy}, ${r.apyLabel} APY`}
                        aria-pressed={isSelected}
                        className="w-full relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 text-left cursor-pointer overflow-hidden"
                        style={{
                          background: isSelected ? `${r.color}12` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isSelected ? r.color + '40' : 'rgba(255,255,255,0.05)'}`,
                        }}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeRiskIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1"
                            style={{ background: r.color }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                        <div>
                          <div className="font-bold text-sm" style={{ color: isSelected ? r.color : '#cbd5e1' }}>
                            {r.label}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500 mt-0.5">{r.strategy}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-sm" style={{ color: isSelected ? r.color : '#475569' }}>
                            {r.apyLabel}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500">APY Target</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results & Interactive SVG Chart */}
            <div className="lg:col-span-8 space-y-8 flex flex-col justify-between">

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Projected Balance', value: projectedValue, prefix: '$', color: '#f8fafc' },
                  { label: 'Net Yield Earned', value: netYield, prefix: '$', color: profile.color },
                  { label: 'Sharpe Ratio', raw: profile.sharpe, color: '#a78bfa' },
                  { label: 'Max Drawdown', raw: profile.maxDD, color: '#06b6d4' },
                ].map((m) => (
                  <div key={m.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">{m.label}</div>
                    <div className="font-mono font-black text-xl leading-none" style={{ color: m.color }}>
                      {m.raw ? (
                        m.raw
                      ) : (
                        <AnimatedCounter value={m.value ?? 0} prefix={m.prefix} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* SVG Curve Chart */}
              <div className="relative w-full h-[230px] rounded-2xl bg-black/70 border border-white/[0.08] overflow-hidden">
                {/* Horizontal grid lines */}
                <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  ))}
                </svg>

                <svg
                  viewBox="0 0 600 200"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={profile.color} stopOpacity="0.28" />
                      <stop offset="100%" stopColor={profile.color} stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <motion.path
                    key={`fill-${riskId}-${capital}-${horizon}`}
                    d={svgFill}
                    fill="url(#fillGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Curve Line */}
                  <motion.path
                    key={`line-${riskId}-${capital}-${horizon}`}
                    d={svgPath}
                    fill="none"
                    stroke={profile.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-4 font-mono text-[10px] text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: profile.color, boxShadow: `0 0 8px ${profile.color}` }} />
                  Compounding Trajectory · {profile.apyLabel} APY Target
                </div>

                {/* End Return % Callout */}
                <div className="absolute right-4 top-3 font-mono text-xs font-bold" style={{ color: profile.color }}>
                  +{((Math.pow(1 + profile.apy, horizon) - 1) * 100).toFixed(1)}% Return
                </div>
              </div>

              {/* Disclaimer */}
              <p className="font-mono text-[10px] text-slate-600 leading-relaxed">
                DISCLAIMER: Projections are simulated based on historical quantitative backtesting (2020–2025). Actual yield is dependent on real-time market liquidity and volatility conditions. Past performance does not guarantee future results.
              </p>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
