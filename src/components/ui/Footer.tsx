import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Lock, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#040508] border-t border-white/10 text-slate-400 relative z-20 overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Invest<span className="text-emerald-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering high-net-worth individuals and institutions with autonomous AI quant models, risk-managed cryptocurrency strategies, and multi-sig cold storage custody.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav Links Column 1: AI Strategies */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              AI Strategies
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/strategies" className="hover:text-emerald-400 transition-colors">
                  Quant Momentum Alpha
                </Link>
              </li>
              <li>
                <Link href="/strategies" className="hover:text-emerald-400 transition-colors">
                  Delta-Neutral Arbitrage
                </Link>
              </li>
              <li>
                <Link href="/strategies" className="hover:text-emerald-400 transition-colors">
                  Automated Liquidity Engine
                </Link>
              </li>
              <li>
                <Link href="/strategies" className="hover:text-emerald-400 transition-colors">
                  Predictive Volatility Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: Security & Audits */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Security & Audits
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/security" className="hover:text-emerald-400 transition-colors">
                  MPC Multi-Sig Custody
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-emerald-400 transition-colors">
                  Real-Time Proof of Reserves
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-emerald-400 transition-colors">
                  CertiK & OpenZeppelin Logs
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-emerald-400 transition-colors">
                  $500M Custody Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 3: Institutional */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
              Institutional
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/institution" className="hover:text-emerald-400 transition-colors">
                  FIX Protocol & REST API
                </Link>
              </li>
              <li>
                <Link href="/institution" className="hover:text-emerald-400 transition-colors">
                  Prime Brokerage OTC
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Custom Quant Nodes
                </Link>
              </li>
              <li>
                <Link href="/institution" className="hover:text-emerald-400 transition-colors">
                  Regulatory Compliance (KYC/AML)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Cryptographic Proof Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Proof-of-Reserves: Active (Block #20,491,823)</span>
          </div>
          <div>
            © {new Date().getFullYear()} InvestAI Technologies Inc. All rights reserved. NFA / FINRA Compliant Software Telemetry.
          </div>
        </div>
      </div>
    </footer>
  );
}
