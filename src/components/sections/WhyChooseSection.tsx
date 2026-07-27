'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Cpu, ShieldCheck, BarChart3, Users, Headphones, CheckCircle2, Award } from 'lucide-react';

const whyChooseFeatures = [
  {
    icon: Coins,
    title: 'Crypto Investments',
    description: 'Access to a diverse portfolio of cryptocurrencies including Bitcoin, Ethereum, and emerging altcoins.',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
  },
  {
    icon: Cpu,
    title: 'AI Technology',
    description: 'Invest in cutting-edge AI companies and machine learning startups shaping the future.',
    accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description: 'Bank-level security with multi-factor authentication and cold storage for digital assets.',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Advanced analytics and market insights to help you make informed investment decisions.',
    accent: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40',
  },
  {
    icon: Users,
    title: 'Individual & Business',
    description: 'Tailored investment solutions for both individual investors and corporate entities.',
    accent: 'text-teal-400 border-teal-500/30 bg-teal-950/40',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: '24/7 customer support from our team of investment advisors and tech specialists.',
    accent: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-24 bg-[#08090d] relative overflow-hidden border-t border-white/10">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Cryptocurrency Technology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Why Choose <span className="text-gradient-emerald">InvestAI</span>?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Leading the way in digital asset management and AI-powered investments through institutional grade infrastructure and intelligence.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feature.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl text-center font-mono">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">$2.5B+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Assets Under Management</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">50K+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Active Investors</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400">150+</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Investment Options</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">99.9%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}
