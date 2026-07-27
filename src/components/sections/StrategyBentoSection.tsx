'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldAlert, Cpu, ArrowUpRight, Layers, BarChart3, Lock } from 'lucide-react';

const strategies = [
  {
    id: 'quant-momentum',
    title: 'Quant Momentum Alpha',
    category: 'High Alpha Strategy',
    apy: '+34.2%',
    winRate: '88.4%',
    maxDrawdown: '4.2%',
    description:
      'Multi-factor machine learning model executing trend-following and momentum breakout signals across top 20 liquidity pairs.',
    tags: ['Machine Learning', 'Trend Following', 'Sub-second Execution'],
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
    featured: true,
  },
  {
    id: 'delta-neutral',
    title: 'Delta-Neutral Volatility Arbitrage',
    category: 'Market Neutral Yield',
    apy: '+18.4%',
    winRate: '99.1%',
    maxDrawdown: '0.6%',
    description:
      'Captures funding rate differentials and basis spreads between spot and perpetual futures markets with zero directional market exposure.',
    tags: ['Zero Directional Risk', 'Funding Rate Arb', 'Capital Preservation'],
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
    featured: false,
  },
  {
    id: 'liquidity-engine',
    title: 'Automated Cross-Chain Liquidity Engine',
    category: 'DeFi Yield Optimizer',
    apy: '+26.8%',
    winRate: '94.2%',
    maxDrawdown: '2.1%',
    description:
      'Dynamic liquidity provisioning engine that automatically shifts concentrated liquidity ranges across Uniswap v3 and Curve pools to minimize impermanent loss.',
    tags: ['Concentrated Liquidity', 'Auto-Rebalancing', 'Impermanent Loss Guard'],
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
    featured: false,
  },
  {
    id: 'downside-guard',
    title: 'Predictive Volatility & Downside Guard',
    category: 'Risk Mitigation Enclave',
    apy: '+14.1%',
    winRate: '96.5%',
    maxDrawdown: '1.2%',
    description:
      'AI sentiment analysis and options hedging strategy that scales into protective put options ahead of macro volatility spikes.',
    tags: ['Tail-Risk Protection', 'Options Hedging', 'Sentiment Analytics'],
    badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40',
    featured: false,
  },
];

export function StrategyBentoSection() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#08090d] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs font-mono mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>Algorithmic Execution Suite</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Autonomous <span className="text-gradient-emerald">AI Quant Models</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Every strategy is powered by real-time neural network backtesting, continuous risk modeling, and instant execution via non-custodial MPC vaults.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {strategies.map((strategy, idx) => {
            const isFirst = idx === 0;
            return (
              <motion.div
                key={strategy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveHover(strategy.id)}
                onMouseLeave={() => setActiveHover(null)}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isFirst ? 'lg:col-span-7' : idx === 1 ? 'lg:col-span-5' : 'lg:col-span-6'
                }`}
              >
                {/* Specular Highlight Shader Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Card Top Row */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium border ${strategy.badgeColor}`}
                    >
                      {strategy.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">YTD APY</span>
                      <span className="text-xl font-mono font-extrabold text-emerald-400">
                        {strategy.apy}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                    <span>{strategy.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-emerald-400" />
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {strategy.description}
                  </p>
                </div>

                {/* Metrics Breakdown Bar */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="text-slate-500 block text-[10px] uppercase">Win Rate</span>
                      <span className="text-slate-200 font-bold text-sm">{strategy.winRate}</span>
                    </div>
                    <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <span className="text-slate-500 block text-[10px] uppercase">Max Drawdown</span>
                      <span className="text-emerald-400 font-bold text-sm">{strategy.maxDrawdown}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {strategy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/strategies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
          >
            <span>View Complete Strategy Directory & Performance Analytics</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
