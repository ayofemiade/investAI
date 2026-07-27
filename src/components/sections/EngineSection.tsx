'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PIPELINE_STAGES = [
  {
    id: 1,
    layer: 'DATA INGESTION LAYER',
    title: 'Market Intelligence Aggregation',
    description:
      'Simultaneous ingestion of 100,000+ order book events per second across 47 centralized and decentralized exchanges. WebSocket streams processed through zero-copy memory ring buffers.',
    stats: [
      { label: 'Order Book Events/sec', val: '100,000+' },
      { label: 'Exchange Connections', val: '47' },
      { label: 'Data Latency', val: '<2ms' },
    ],
    log: [
      '> STREAM_CONNECT[binance|coinbase|kraken|bybit|...]  OK',
      '> ORDERBOOK_DEPTH[BTC-USDT] → 47,821 events/sec indexed',
      '> MEMPOOL_SCAN[ETH] → 12,043 pending txns analyzed',
      '> SENTIMENT_FEED[twitter|bloomberg|reddit] → ACTIVE',
      '> ZERO_COPY_RINGBUFFER → 0 dropped frames',
    ],
    accent: '#10b981',
    accentGlow: 'rgba(16,185,129,0.15)',
  },
  {
    id: 2,
    layer: 'NEURAL SIGNAL LAYER',
    title: 'Pattern Recognition & Sentiment Matrix',
    description:
      'Multi-head transformer neural network identifies micro-structural market patterns invisible to human analysis. Sentiment scoring across 200+ data dimensions, updated every 50ms.',
    stats: [
      { label: 'Model Parameters', val: '1.4B' },
      { label: 'Sentiment Dimensions', val: '200+' },
      { label: 'Prediction Latency', val: '50ms' },
    ],
    log: [
      '> MODEL[quant-transformer-v4] RUNNING',
      '> SIGNAL_MATRIX → [momentum:0.87, vol:0.34, sentiment:0.91]',
      '> ARBITRAGE_WINDOW → DETECTED [ETH perp spread: 0.12%]',
      '> RISK_THRESHOLD → WITHIN BOUNDS  ✓',
      '> HYPERPARAMETER_ADJUST → AUTO-TUNED (lr=1e-5)',
    ],
    accent: '#06b6d4',
    accentGlow: 'rgba(6,182,212,0.15)',
  },
  {
    id: 3,
    layer: 'EXECUTION ENCLAVE',
    title: 'MPC Key Authorization & Trade Settlement',
    description:
      'Non-custodial MPC vault authorizes trade execution via 3-of-5 HSM quorum signature. Settlement occurs across multiple venues simultaneously for optimal fill rates and minimal market impact.',
    stats: [
      { label: 'MPC Quorum', val: '3-of-5' },
      { label: 'Settlement Time', val: '<500ms' },
      { label: 'Fill Rate', val: '99.3%' },
    ],
    log: [
      '> MPC_QUORUM → NODE_1 ✓  NODE_2 ✓  NODE_3 ✓',
      '> TX_SIGN[0x8f92...a34e] → AUTHORIZED IN ENCLAVE',
      '> ORDER_ROUTE → [binance:60%, bybit:30%, kraken:10%]',
      '> EXECUTION → COMPLETE  |  FILL_RATE: 99.8%',
      '> PROOF_LOG → MERKLE ATTESTATION COMMITTED ON-CHAIN',
    ],
    accent: '#a78bfa',
    accentGlow: 'rgba(167,139,250,0.15)',
  },
];

function TerminalBlock({ stage, visible }: { stage: typeof PIPELINE_STAGES[0]; visible: boolean }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    setDisplayedLines([]);
    const ival = setInterval(() => {
      if (i < stage.log.length) {
        setDisplayedLines(prev => [...prev, stage.log[i]]);
        i++;
      } else {
        clearInterval(ival);
      }
    }, 220);
    return () => clearInterval(ival);
  }, [visible, stage]);

  return (
    <div
      className="relative rounded-2xl bg-black/80 border p-5 font-mono text-xs leading-relaxed overflow-hidden"
      style={{
        borderColor: `${stage.accent}30`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 30px ${stage.accentGlow}`,
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-2 text-[10px] text-slate-500 uppercase tracking-widest">
            Telemetry Stream · Layer 0{stage.id}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ background: stage.accent }} />
          <span style={{ color: stage.accent }}>LIVE</span>
        </div>
      </div>

      {/* Code output lines */}
      <div className="space-y-1.5 min-h-[140px]">
        {displayedLines.map((line, idx) => {
          if (typeof line !== 'string') return null;
          const isCommand = line.startsWith('>');
          const content = isCommand ? line.slice(1).trimStart() : line;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-start gap-2"
            >
              <span style={{ color: stage.accent }} className="shrink-0 font-bold">&gt;</span>
              <span className="text-slate-200">{content}</span>
            </motion.div>
          );
        })}
        {displayedLines.length < stage.log.length && (
          <span className="animate-pulse font-bold" style={{ color: stage.accent }}>█</span>
        )}
      </div>
    </div>
  );
}

export function EngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeStage, setActiveStage] = useState(0);

  // Auto progression every 5s if user doesn't interact
  useEffect(() => {
    if (!isInView) return;
    const ival = setInterval(() => {
      setActiveStage(s => (s + 1) % PIPELINE_STAGES.length);
    }, 5000);
    return () => clearInterval(ival);
  }, [isInView]);

  const stage = PIPELINE_STAGES[activeStage];

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden bg-black">
      {/* Subtle border lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Watermark */}
      <div
        aria-hidden
        className="text-watermark absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        ENGINE
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
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Quantum Telemetry — Autonomous Engine
          </div>
          <h2 className="text-display-section text-white">
            Three layers.
            <br />
            <span className="font-editorial-serif italic text-gradient-silver">Zero latency.</span>
            <br />
            <span className="text-gradient-emerald">One outcome: alpha.</span>
          </h2>
        </motion.div>

        {/* Pipeline Stage Buttons */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((s, i) => {
            const isActive = activeStage === i;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(i)}
                className="flex items-center gap-3.5 p-4 lg:p-5 rounded-2xl transition-all duration-300 text-left shrink-0 cursor-pointer"
                style={{
                  background: isActive ? `${s.accent}12` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? s.accent + '45' : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive ? `0 0 24px ${s.accentGlow}` : 'none',
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors"
                  style={{
                    background: isActive ? s.accent : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#000000' : '#64748b',
                  }}
                >
                  0{s.id}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{s.layer}</div>
                  <div className="text-sm font-bold text-white whitespace-nowrap">{s.title.split(' ').slice(0, 2).join(' ')}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Stage Left Info */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: stage.accent }}>
                  {stage.layer}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
                  {stage.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* Stat Boxes */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {stage.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-colors"
                  >
                    <div
                      className="font-mono font-bold text-xl leading-none mb-1 text-white"
                      style={{ color: stat.val.includes('ms') || stat.val.includes('+') ? stage.accent : undefined }}
                    >
                      {stat.val}
                    </div>
                    <div className="text-slate-500 text-[10px] font-mono leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Right Terminal */}
            <div className="lg:col-span-6">
              <TerminalBlock stage={stage} visible={isInView} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="mt-12 flex gap-2">
          {PIPELINE_STAGES.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setActiveStage(i)}
              className="h-1 flex-1 rounded-full bg-white/[0.06] overflow-hidden cursor-pointer"
            >
              {activeStage === i && (
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: s.accent }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              )}
              {activeStage > i && (
                <div className="h-full rounded-full" style={{ background: s.accent, opacity: 0.4 }} />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
