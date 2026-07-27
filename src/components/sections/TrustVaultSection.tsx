'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const AUDIT_LOGS = [
  {
    auditor: 'CertiK Security',
    score: '99.2 / 100',
    detail: 'Smart Contract Security Score',
    period: 'Q2 2026',
    status: 'VERIFIED',
    hash: '0x3f8a...c91d',
  },
  {
    auditor: 'Trail of Bits',
    score: '0 Critical',
    detail: 'Zero critical vulnerabilities found',
    period: 'Q1 2026',
    status: 'PASSED',
    hash: '0x91b2...e40a',
  },
  {
    auditor: 'OpenZeppelin',
    score: 'MPC Verified',
    detail: 'Multi-Party Computation architecture',
    period: 'Q4 2025',
    status: 'PASSED',
    hash: '0x7e5c...81f3',
  },
];

const TEAM = [
  {
    name: 'Sarah Chen',
    title: 'Chief Executive Officer',
    credential: 'Former VP, Goldman Sachs Quant Division',
    monogram: 'SC',
    color: '#10b981',
  },
  {
    name: 'Michael Rodriguez',
    title: 'Chief Technology Officer',
    credential: 'Former Lead Engineer, Google AI Research',
    monogram: 'MR',
    color: '#06b6d4',
  },
  {
    name: 'Emily Thompson',
    title: 'Chief Investment Officer',
    credential: '20-Year Quantitative Fund Manager',
    monogram: 'ET',
    color: '#a78bfa',
  },
];

function VaultGlyph({ isInView }: { isInView: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border border-cyan-500/20 animate-pulse" />
      </div>
    );
  }

  return (
    <svg
      viewBox="-130 -130 260 260"
      className="w-full h-full"
      suppressHydrationWarning
      style={{ maxWidth: 340, maxHeight: 340 }}
    >
      {/* Outer converging ring */}
      <motion.g
        initial={{ rotate: -90, scale: 1.3, opacity: 0 }}
        animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center' }}
      >
        <circle cx="0" cy="0" r="112" fill="none" stroke="rgba(6,182,212,0.18)" strokeWidth="1" strokeDasharray="6 4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <rect
              key={angle}
              x={Math.cos(rad) * 112 - 3}
              y={Math.sin(rad) * 112 - 3}
              width="6"
              height="6"
              rx="1.5"
              fill="rgba(6,182,212,0.6)"
              transform={`rotate(${angle}, ${Math.cos(rad) * 112}, ${Math.sin(rad) * 112})`}
              suppressHydrationWarning
            />
          );
        })}
      </motion.g>

      {/* Middle counter-rotating key ring */}
      <motion.g
        initial={{ rotate: 120, scale: 0.7, opacity: 0 }}
        animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center' }}
      >
        <circle cx="0" cy="0" r="76" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 76;
          const y = Math.sin(rad) * 76;
          return (
            <g key={angle} transform={`translate(${x}, ${y})`}>
              <circle r="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.75" />
              <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(16,185,129,0.6)" strokeWidth="1" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(16,185,129,0.6)" strokeWidth="1" />
            </g>
          );
        })}
      </motion.g>

      {/* Continuous spin container */}
      <g className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '60s' }}>
        <circle cx="0" cy="0" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
      </g>

      {/* Center lock core */}
      <motion.g
        initial={{ scale: 0.4, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: 'center' }}
      >
        <circle cx="0" cy="0" r="42" fill="rgba(8,9,13,0.95)" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="42" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="8" />

        {/* Shield icon */}
        <path
          d="M0,-22 L14,-13 L14,4 C14,15 7,22 0,25 C-7,22 -14,15 -14,4 L-14,-13 Z"
          fill="rgba(16,185,129,0.08)"
          stroke="rgba(16,185,129,0.8)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="-4" r="5" fill="none" stroke="rgba(16,185,129,0.9)" strokeWidth="1.25" />
        <line x1="0" y1="-4" x2="0" y2="5" stroke="rgba(16,185,129,0.9)" strokeWidth="1.75" />
      </motion.g>

      {/* Live status badge on glyph */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <circle cx="34" cy="-34" r="5" fill="#10b981" />
        <circle cx="34" cy="-34" r="8" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1">
          <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </motion.g>
    </svg>
  );
}

export function TrustVaultSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden bg-[#0a0c10] border-t border-b border-white/[0.05]">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 15% 50%, rgba(6,182,212,0.06) 0%, transparent 60%)', filter: 'blur(30px)' }}
      />

      {/* Watermark */}
      <div
        aria-hidden
        className="text-watermark absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
      >
        TRUST
      </div>

      <div className="max-w-[1340px] mx-auto px-6 lg:px-10 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Institutional Custody & Cryptographic Proof
          </div>
          <h2 className="text-display-section text-white max-w-3xl">
            Not a single coin
            <br />
            <span className="font-editorial-serif italic text-gradient-silver">touches a hot wallet.</span>
            <br />
            <span className="text-gradient-cyan">Ever.</span>
          </h2>
        </motion.div>

        {/* Main Grid: Vault Glyph + Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center mb-24">

          {/* Vault Glyph */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
              <VaultGlyph isInView={isInView} />
            </div>
          </div>

          {/* Security Features */}
          <div className="lg:col-span-8 space-y-4">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                ),
                color: 'text-cyan-400',
                border: 'border-cyan-500/20',
                bg: 'bg-cyan-950/20',
                title: 'Non-Custodial Threshold MPC',
                body: 'Private key shares are mathematically split across 5 geographically isolated Hardware Security Modules. Requires 3-of-5 quorum for any transaction authorization. No single point of failure.',
                stat: '5-of-5 HSM Nodes Active',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                ),
                color: 'text-emerald-400',
                border: 'border-emerald-500/20',
                bg: 'bg-emerald-950/20',
                title: "$500M Lloyd's of London Digital Asset Insurance",
                body: "Tier-1 institutional custody underwritten by Lloyd's of London syndicate. Complete coverage for theft, physical breach, and insider exploitation. Zero loss record since 2020.",
                stat: '$0 Loss Record Since Inception',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`p-6 lg:p-7 rounded-2xl border ${item.border} ${item.bg} backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-white/[0.04] border border-white/[0.08] ${item.color}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.body}</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] font-semibold ${item.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.stat}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Terminal Panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-2xl bg-black/60 border border-white/[0.08] font-mono text-xs space-y-2"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.05]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-slate-500 text-[10px] uppercase tracking-wider">Cryptographic Proof Terminal</span>
              </div>
              {[
                { label: 'Merkle Root Hash', value: '0x8f92c4a1d3e9b7f0...a34e', color: 'text-cyan-400' },
                { label: 'Reserve Ratio', value: '102.4% (Over-Collateralized)', color: 'text-emerald-400 font-bold' },
                { label: 'Last Attestation', value: 'Block #21,847,332 · 12s ago', color: 'text-slate-300' },
                { label: 'HSM Status', value: '5 / 5 Nodes Online · 0ms Latency', color: 'text-emerald-400' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-1 text-[11px]">
                  <span className="text-slate-500">{row.label}</span>
                  <span className={row.color}>{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Third-Party Security Audits */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-6"
          >
            Third-Party Security Audits
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {AUDIT_LOGS.map((log, i) => (
              <motion.div
                key={log.auditor}
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.52 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{log.auditor}</div>
                    <div className="text-emerald-400 font-mono text-xs font-bold mt-0.5">{log.score}</div>
                    <div className="text-slate-400 text-xs mt-1 leading-snug">{log.detail}</div>
                    <div className="text-slate-600 font-mono text-[10px] mt-2">{log.period} · {log.hash}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team & Leadership with scanline effect */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-6"
          >
            Leadership & Quantitative Background
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.68 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="group relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.14] transition-all duration-300 overflow-hidden"
              >
                {/* Subtle scanline hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${member.color}10, transparent 70%)`,
                  }}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-sm"
                    style={{
                      background: `${member.color}15`,
                      border: `1px solid ${member.color}35`,
                      color: member.color,
                      boxShadow: `0 0 16px ${member.color}20`,
                    }}
                  >
                    {member.monogram}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm group-hover:text-white transition-colors">{member.name}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{member.title}</div>
                    <div className="text-slate-500 text-[11px] font-mono mt-1 leading-snug">{member.credential}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
