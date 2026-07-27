'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Globe, Trophy, Sparkles, CheckCircle2, TrendingUp, Cpu, HeartHandshake } from 'lucide-react';

const coreValues = [
  {
    title: 'Innovation First',
    description: 'We constantly push the boundaries of what\'s possible in digital investing, staying ahead of market trends.',
    icon: Sparkles,
  },
  {
    title: 'Customer Centric',
    description: 'Your success is our success. We prioritize user experience and provide exceptional support at every step.',
    icon: HeartHandshake,
  },
  {
    title: 'Security First',
    description: 'We employ military-grade encryption and best-in-class security protocols to protect your investments.',
    icon: ShieldCheck,
  },
  {
    title: 'Global Reach',
    description: 'Operating in over 150 countries, we provide worldwide access to investment opportunities.',
    icon: Globe,
  },
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in every aspect of our platform and service delivery.',
    icon: Trophy,
  },
  {
    title: 'Growth Focused',
    description: 'We\'re committed to helping our investors achieve their financial goals through strategic growth.',
    icon: TrendingUp,
  },
];

const leadershipTeam = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former VP at Goldman Sachs, 15 years in financial technology',
    avatar: 'SC',
    border: 'border-emerald-500/40 text-emerald-400',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Former Lead Engineer at Google, expert in AI and blockchain',
    avatar: 'MR',
    border: 'border-cyan-500/40 text-cyan-400',
  },
  {
    name: 'Emily Thompson',
    role: 'Chief Investment Officer',
    bio: '20 years experience in portfolio management and crypto trading',
    avatar: 'ET',
    border: 'border-amber-500/40 text-amber-400',
  },
];

const awards = [
  {
    title: 'Best Crypto Platform 2025',
    issuer: 'FinTech Innovation Awards',
    badge: 'WINNER',
  },
  {
    title: 'Top AI Investment Fund',
    issuer: 'Global Investment Review',
    badge: 'GOLD AWARD',
  },
  {
    title: 'Security Excellence',
    issuer: 'CyberSafe Certification',
    badge: 'VERIFIED',
  },
];

export function AboutMissionSection() {
  return (
    <section className="py-24 bg-[#08090d] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Mission Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs font-mono">
              <Target className="w-3.5 h-3.5" />
              <span>About InvestAI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Pioneering the Future of <span className="text-gradient-emerald">Digital Investments</span>
            </h2>
            <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              <p>
                At InvestAI, we believe in democratizing access to cutting-edge investment opportunities. Our mission is to empower individuals and businesses to participate in the digital revolution through cryptocurrency and artificial intelligence investments.
              </p>
              <p>
                We combine advanced technology with expert market insights to provide a seamless, secure, and intelligent investment platform that serves both novice and experienced investors.
              </p>
              <p className="font-semibold text-slate-300">
                Founded in 2020, we&apos;ve grown to become a trusted partner for over 50,000 investors worldwide, managing billions in digital assets.
              </p>
            </div>
          </div>

          {/* Awards & Recognition Highlight Card */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Awards & Industry Recognition
              </h3>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm">{award.title}</div>
                    <div className="text-slate-400 font-sans">{award.issuer}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 font-bold">
                    {award.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Our Core <span className="text-gradient-emerald">Values</span>
            </h3>
            <p className="text-slate-400 text-sm">
              The fundamental principles that guide our product engineering, investment strategy, and customer relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-xl hover:border-emerald-500/30 transition-colors"
                >
                  <Icon className="w-6 h-6 text-emerald-400" />
                  <h4 className="text-lg font-bold text-white">{val.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="space-y-12 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Our Leadership <span className="text-gradient-cyan">Team</span>
            </h3>
            <p className="text-slate-400 text-sm">
              Industry experts driving innovation in digital finance, AI algorithms, and quantitative portfolio management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member) => (
              <div
                key={member.name}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-4 text-center hover:border-white/20 transition-all"
              >
                <div className={`w-20 h-20 rounded-full mx-auto border-2 flex items-center justify-center font-mono font-bold text-2xl bg-white/5 ${member.border}`}>
                  {member.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{member.name}</h4>
                  <div className="text-xs font-mono text-emerald-400 mt-1">{member.role}</div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
