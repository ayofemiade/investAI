import React from 'react';
import { Building2, Terminal, ShieldCheck, Cpu, ArrowUpRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function InstitutionPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090d] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>Prime Brokerage & API Protocol Integration</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            InvestAI <span className="text-gradient-emerald">Institutional Solutions</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Tailored prime brokerage custody, low-latency FIX protocol execution, and dedicated quantitative strategy nodes for family offices and institutional funds.
          </p>
        </div>

        {/* Institutional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <Terminal className="w-8 h-8 text-emerald-400" />
            <h3 className="text-xl font-bold text-white font-sans">FIX Protocol & REST / WebSocket API</h3>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Direct programmatic access to AI signals, real-time portfolio telemetry, and low-latency automated trade execution.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <Lock className="w-8 h-8 text-amber-400" />
            <h3 className="text-xl font-bold text-white font-sans">Custom Institutional HSM Enclaves</h3>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              Dedicated single-tenant cold-storage vault architecture with customizable multi-signature governance policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
