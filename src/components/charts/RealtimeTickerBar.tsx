'use client';

import React from 'react';
import { TrendingUp, ShieldCheck, Zap, Activity } from 'lucide-react';

const tickerItems = [
  { symbol: 'QUANT-ALPHA-I', yield: '+34.2% APY', status: 'Optimal', change: '+2.4%' },
  { symbol: 'BTC-DELTA-NEUTRAL', yield: '+18.4% APY', status: 'Active', change: '+1.1%' },
  { symbol: 'ETH-LIQUIDITY-V4', yield: '+26.8% APY', status: 'Rebalancing', change: '+3.5%' },
  { symbol: 'SOL-ARBITRAGE-NODE', yield: '+41.9% APY', status: 'High Yield', change: '+4.8%' },
  { symbol: 'VOLATILITY-GUARD', maxDrawdown: '3.8% Max DD', status: 'Secured', change: '0.0%' },
];

export function RealtimeTickerBar() {
  return (
    <div className="w-full bg-[#08090d]/90 border-y border-white/10 py-3 overflow-hidden font-mono text-xs relative">
      <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors"
          >
            <span className="text-slate-200 font-semibold">{item.symbol}</span>
            <span className="text-emerald-400 font-bold">{item.yield || item.maxDrawdown}</span>
            <span className="text-slate-400 text-[10px] bg-slate-800 px-2 py-0.5 rounded">
              {item.status}
            </span>
            <span className="text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
