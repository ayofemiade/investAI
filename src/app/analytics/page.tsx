import React from 'react';
import { Activity, TrendingUp, Cpu, BarChart2, ShieldCheck, Terminal } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#08090d] min-h-screen relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>Real-time AI Market Intelligence Terminal</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            Market <span className="text-gradient-emerald">Analytics & Telemetry</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed font-sans">
            Sub-second liquidity monitoring, market sentiment heatmaps, and AI rebalancing signals.
          </p>
        </div>

        {/* Live Terminal Window Mockup */}
        <div className="bg-[#050608] border border-white/15 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-white font-bold">InvestAI-Quant-Terminal-v4.2.sh</span>
            </div>
            <span className="text-emerald-400">NODE STATUS: ONLINE • 12ms LATENCY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="text-slate-500 text-xs">BTC/USD Funding Basis</div>
              <div className="text-2xl font-bold text-white">+0.0142% / 8h</div>
              <div className="text-xs text-emerald-400">Arbitrage Window: OPEN</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="text-slate-500 text-xs">AI Volatility Index (VIX-AI)</div>
              <div className="text-2xl font-bold text-cyan-400">22.4 (Low Regime)</div>
              <div className="text-xs text-slate-400">Strategy Allocation: 85% Risk-On</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="text-slate-500 text-xs">Network Sentiment Meter</div>
              <div className="text-2xl font-bold text-emerald-400">78.5 / 100 (Bullish)</div>
              <div className="text-xs text-emerald-400">Confidence Score: High</div>
            </div>
          </div>

          {/* Live Execution Stream */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs space-y-2 text-slate-300">
            <div className="text-slate-500 font-bold border-b border-white/10 pb-2">LIVE AI REBALANCING STREAM</div>
            <div className="text-emerald-400">[14:38:12] EXECUTED: Buy 120 ETH @ $3,450.20 (Quant Momentum Signal #892)</div>
            <div className="text-cyan-400">[14:37:45] REBALANCED: Delta-Neutral Perp Short Basis Adjusted (+0.04% Yield Lock)</div>
            <div className="text-slate-400">[14:35:10] RISK CHECK: Portfolio Drawdown 0.00% (Safety Guard Inactive)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
