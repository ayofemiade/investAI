'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Key, Server, Cpu, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const auditLogs = [
  { auditor: 'CertiK', rating: '99.2/100 Security Score', date: 'Q2 2026 Audit', badge: 'PASSED' },
  { auditor: 'Trail of Bits', rating: '0 Critical Vulnerabilities', date: 'Q1 2026 Audit', badge: 'PASSED' },
  { auditor: 'OpenZeppelin', rating: 'MPC Architecture Verified', date: 'Q4 2025 Audit', badge: 'PASSED' },
];

export function SecurityVaultSection() {
  return (
    <section className="py-24 bg-[#08090d] relative overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Security Specs & Audits */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-cyan-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Institutional Custody & Protection</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Cryptographic <span className="text-gradient-cyan">MPC Cold Storage</span> & Real-Time Proof of Reserves.
            </h2>

            <p className="text-slate-400 text-base leading-relaxed">
              Your assets never touch single-point-of-failure hot wallets. InvestAI utilizes Threshold Multi-Party Computation (MPC) across geographically distributed Hardware Security Modules (HSM).
            </p>

            {/* Feature List */}
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold mb-1">Non-Custodial Multi-Party Computation</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Private key shares are split mathematically across independent institutional nodes. No single entity ever possesses full private key access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <Server className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold mb-1">$500M Insured Institutional Custody</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Backed by tier-1 institutional custody partners with Lloyd's of London underwriting for digital asset insurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/security"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                <span>Read Full Cryptographic Security & Audit Whitepaper</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Cryptographic Proof Matrix */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Live Cryptographic Audit Matrix
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                100% VERIFIED
              </span>
            </div>

            {/* Audit Logs Cards */}
            <div className="space-y-3 font-mono">
              {auditLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-white">{log.auditor}</div>
                      <div className="text-xs text-slate-400 font-sans">{log.rating}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                      {log.badge}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">{log.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Proof of Reserves Live Telemetry Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-emerald-950/30 border border-cyan-500/30 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Merkle Tree Root Hash:</span>
                <span className="text-cyan-400 text-[11px]">0x8f92...a34e</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Reserve Ratio:</span>
                <span className="text-emerald-400 font-bold">102.4% (Over-Collateralized)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
