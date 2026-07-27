import React from 'react';
import { ShieldCheck, Lock, Key, Server, CheckCircle, FileText, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090d] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Trust Architecture & Audits</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Institutional <span className="text-gradient-cyan">Security Framework</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            InvestAI combines non-custodial Threshold Multi-Party Computation (MPC), geographically distributed Hardware Security Modules (HSM), and continuous third-party audits.
          </p>
        </div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 font-mono">
            <Lock className="w-8 h-8 text-cyan-400" />
            <h3 className="text-xl font-bold text-white font-sans">MPC Threshold Signatures</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Private keys are divided into encrypted mathematical shards distributed across isolated cloud and hardware enclaves.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 font-mono">
            <Server className="w-8 h-8 text-emerald-400" />
            <h3 className="text-xl font-bold text-white font-sans">Real-Time Proof of Reserves</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Automated Merkle-tree cryptographic verification guarantees 1:1 asset backing on-chain at all times.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 font-mono">
            <Key className="w-8 h-8 text-amber-400" />
            <h3 className="text-xl font-bold text-white font-sans">$500M Custody Insurance</h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Underwritten by leading Lloyd's syndicate insurers covering physical, cyber, and operational risks.
            </p>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-2xl font-bold text-white font-sans">Third-Party Smart Contract & Infrastructure Audits</h2>
          
          <div className="space-y-4 font-mono text-xs">
            {[
              { firm: 'CertiK', scope: 'Smart Contract Suite & AI Execution Engine', result: 'Passed (99.2/100 Score)', date: 'June 2026' },
              { firm: 'Trail of Bits', scope: 'MPC Key Generation & Cryptographic Protocol', result: '0 Vulnerabilities Found', date: 'March 2026' },
              { firm: 'OpenZeppelin', scope: 'Cross-Chain Liquidity Bridge Adapters', result: 'Passed & Verified', date: 'December 2025' },
            ].map((audit, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">{audit.firm}</div>
                  <div className="text-slate-400 font-sans">{audit.scope}</div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <span className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                    {audit.result}
                  </span>
                  <span className="text-slate-500">{audit.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
