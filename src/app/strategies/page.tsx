'use client';

import React, { useState } from 'react';
import { Cpu, ArrowUpRight, TrendingUp, ShieldCheck, BarChart3, Filter } from 'lucide-react';
import Link from 'next/link';

const strategyList = [
  {
    id: 'quant-alpha',
    name: 'Quant Momentum Alpha v4',
    category: 'Trend Following',
    targetApy: '34.2%',
    sharpeRatio: '3.12',
    maxDrawdown: '4.2%',
    tvl: '$420.5M',
    status: 'ACTIVE',
    riskLevel: 'Moderate',
    description:
      'Sub-second machine learning execution engine capturing momentum surges across top 20 crypto assets.',
  },
  {
    id: 'delta-neutral',
    name: 'Delta-Neutral Basis Arbitrage',
    category: 'Market Neutral',
    targetApy: '18.4%',
    sharpeRatio: '4.85',
    maxDrawdown: '0.6%',
    tvl: '$680.2M',
    status: 'ACTIVE',
    riskLevel: 'Low',
    description:
      'Zero directional exposure strategy harvesting funding rate spreads across perpetual futures exchanges.',
  },
  {
    id: 'liquidity-v3',
    name: 'Concentrated Liquidity Engine',
    category: 'DeFi Yield',
    targetApy: '26.8%',
    sharpeRatio: '2.95',
    maxDrawdown: '2.1%',
    tvl: '$310.8M',
    status: 'ACTIVE',
    riskLevel: 'Moderate',
    description:
      'Algorithmic range management on DEX liquidity pools with automated impermanent loss hedging.',
  },
  {
    id: 'volatility-guard',
    name: 'Predictive Volatility Guard',
    category: 'Tail Risk Protection',
    targetApy: '14.1%',
    sharpeRatio: '5.10',
    maxDrawdown: '0.2%',
    tvl: '$390.1M',
    status: 'ACTIVE',
    riskLevel: 'Ultra-Low',
    description:
      'Dynamic options hedging protocol designed to preserve capital during severe market drawdowns.',
  },
];

export default function StrategiesPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <div className="pt-32 pb-24 bg-[#08090d] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Model Directory & Live Performance Telemetry</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            InvestAI <span className="text-gradient-emerald">Strategy Matrix</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            All strategies are continuously audited, backtested across 5+ years of market data, and executed non-custodially.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          {['All', 'Trend Following', 'Market Neutral', 'DeFi Yield', 'Tail Risk Protection'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 ${
                selectedFilter === filter
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Strategy Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategyList
            .filter((s) => selectedFilter === 'All' || s.category === selectedFilter)
            .map((strategy) => (
              <div
                key={strategy.id}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-medium">
                      {strategy.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">TVL: {strategy.tvl}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{strategy.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {strategy.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Target APY</span>
                    <span className="text-emerald-400 font-bold text-base">{strategy.targetApy}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Sharpe Ratio</span>
                    <span className="text-white font-bold text-base">{strategy.sharpeRatio}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Max Drawdown</span>
                    <span className="text-cyan-400 font-bold text-base">{strategy.maxDrawdown}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
