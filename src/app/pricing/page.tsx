'use client';

import React, { useState } from 'react';
import { Check, Cpu, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="pt-32 pb-24 bg-[#08090d] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Alignment & Performance Tiers</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Transparent <span className="text-gradient-emerald">Pricing & Tiers</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            We only win when you win. Zero deposit or withdrawal lockup fees.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 font-mono text-xs">
            <span className={billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-500'}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual')}
              className="w-12 h-6 rounded-full bg-white/10 p-1 border border-white/20 relative transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full bg-emerald-400 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={billingCycle === 'annual' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
              Annual Billing (20% Fee Discount)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1: Essential */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Essential</div>
              <h3 className="text-2xl font-bold text-white">Self-Directed Quant</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For self-directed investors seeking AI trade signals and risk alerts.
              </p>
              <div className="font-mono pt-2">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === 'annual' ? '$99' : '$125'}
                </span>
                <span className="text-slate-500 text-xs"> / month</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Market Signals Feed</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Basic Risk Telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standard Email Support</span>
              </div>
            </div>

            <Link
              href="/strategies"
              className="w-full text-center py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors block mt-6"
            >
              Get Started
            </Link>
          </div>

          {/* Tier 2: Pro Quant (Featured) */}
          <div className="bg-gradient-to-b from-emerald-950/40 to-slate-900/60 border border-emerald-500/50 rounded-3xl p-8 backdrop-blur-xl space-y-6 flex flex-col justify-between relative shadow-2xl shadow-emerald-950/50">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-black font-mono text-[10px] font-bold tracking-wider uppercase">
              MOST POPULAR
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Pro Quant</div>
              <h3 className="text-2xl font-bold text-white">Autonomous APY Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full automated AI strategy execution with non-custodial MPC vaults.
              </p>
              <div className="font-mono pt-2">
                <span className="text-4xl font-extrabold text-emerald-400">1.0%</span>
                <span className="text-slate-400 text-xs"> Management Fee / year</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-200 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All 4 Autonomous AI Strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MPC Cold Storage Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-Time Proof of Reserves</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Priority 24/7 Support</span>
              </div>
            </div>

            <Link
              href="/strategies"
              className="w-full text-center py-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all duration-200 shadow-xl shadow-emerald-950/50 block mt-6"
            >
              Start Autonomous Investing
            </Link>
          </div>

          {/* Tier 3: Institutional Partner */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">Institutional</div>
              <h3 className="text-2xl font-bold text-white">Custom Quant Nodes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single-tenant HSM vault infrastructure with dedicated FIX API access.
              </p>
              <div className="font-mono pt-2">
                <span className="text-4xl font-extrabold text-white">Custom</span>
                <span className="text-slate-500 text-xs"> High Water Mark</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dedicated HSM Security Node</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>FIX Protocol & REST API</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Custom Quant Backtesting Suite</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dedicated Account Manager</span>
              </div>
            </div>

            <Link
              href="/institution"
              className="w-full text-center py-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors block mt-6"
            >
              Contact Prime Brokerage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
