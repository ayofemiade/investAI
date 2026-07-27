'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: (i * 37) % 100,
  y: (i * 53) % 100,
  size: (i % 3) + 1,
  duration: 12 + (i % 8) * 2,
  delay: (i % 5) * 0.8,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px rgba(16,185,129,0.5)',
          }}
          animate={{
            y: ['0px', '-40px', '0px'],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative py-36 lg:py-52 overflow-hidden bg-black">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Radial glow background */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Watermark */}
      <div
        aria-hidden
        className="text-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
      >
        NOW
      </div>

      <div className="max-w-[900px] mx-auto px-6 lg:px-8 relative z-10 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Frictionless Institutional Onboarding
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 space-y-2"
        >
          <h2
            className="text-white leading-[1.04]"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
            }}
          >
            The future of wealth
          </h2>
          <h2
            className="font-editorial-serif italic"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 0%, #10b981 60%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}
          >
            doesn't wait.
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-12"
        >
          Join high-net-worth investors and quantitative institutions already running
          institutional-grade AI portfolios. Onboarding completed within 2 business hours.
        </motion.p>

        {/* Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto mb-12"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-sm flex items-center justify-center gap-3 shadow-2xl"
            >
              <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Access Request Received. A Quant Specialist Will Contact You Within 2 Hours.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative">
              {/* Expanding radial focus glow */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.3) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                  opacity: focused ? 1 : 0,
                }}
              />
              <div
                className="relative flex rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: `1px solid ${focused ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: focused ? '0 0 32px rgba(16,185,129,0.18)' : '0 10px 30px rgba(0,0,0,0.5)',
                  background: 'rgba(10,12,16,0.9)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <input
                  id="cta-email-input"
                  type="email"
                  placeholder="Enter your institutional email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  id="cta-submit-btn"
                  className="relative group shrink-0 px-7 py-4 font-bold text-sm text-white transition-all duration-300 flex items-center gap-2 overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                  }}
                >
                  <span className="relative z-10">Request Access</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Institutional Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 font-mono text-xs text-slate-500"
        >
          {[
            { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', label: 'Non-Custodial MPC Security', color: '#10b981' },
            { icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605', label: 'FIX Protocol API Ready', color: '#06b6d4' },
            { icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', label: '$500M Insured Custody', color: '#f59e0b' },
            { icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Zero Lockup Periods', color: '#a78bfa' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke={item.color} strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Footer Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <Link href="/strategies" className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono underline underline-offset-4">
            View Strategies
          </Link>
          <span className="text-slate-800">·</span>
          <Link href="/security" className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono underline underline-offset-4">
            Security Audits
          </Link>
          <span className="text-slate-800">·</span>
          <Link href="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono underline underline-offset-4">
            Meet the Team
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
