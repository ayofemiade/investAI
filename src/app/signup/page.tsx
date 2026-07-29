'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Building,
  KeyRound,
  FileCheck2,
  Sparkles,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

type AccountType = 'individual' | 'business';

// ─── Password Strength Evaluator ──────────────────────────────────────────────
function getPasswordStrength(pass: string) {
  let score = 0;
  if (!pass) return { score: 0, label: '', color: 'bg-slate-700' };
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  switch (score) {
    case 1:
      return { score: 25, label: 'Weak', color: 'bg-red-500' };
    case 2:
      return { score: 50, label: 'Moderate', color: 'bg-amber-500' };
    case 3:
      return { score: 75, label: 'Strong', color: 'bg-emerald-400' };
    case 4:
      return { score: 100, label: 'Institutional Grade', color: 'bg-emerald-300 shadow-glow' };
    default:
      return { score: 10, label: 'Too short', color: 'bg-red-600' };
  }
}

function SignUpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Mode: 'signup' or 'signin'
  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup';
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  const [accountType, setAccountType] = useState<AccountType>('individual');

  // Individual Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [individualEmail, setIndividualEmail] = useState('');
  const [individualPhone, setIndividualPhone] = useState('');
  const [individualPass, setIndividualPass] = useState('');
  const [allocationTier, setAllocationTier] = useState('$10k - $100k');
  const [individualAccredited, setIndividualAccredited] = useState(false);

  // Business Form Fields
  const [companyName, setCompanyName] = useState('');
  const [entityType, setEntityType] = useState('LLC');
  const [registrationId, setRegistrationId] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [businessPass, setBusinessPass] = useState('');
  const [businessCompliance, setBusinessCompliance] = useState(false);

  // Sign In Form Fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPass, setSignInPass] = useState('');

  // Status & Key Generation Animation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: Idle, 1: Sharding Key, 2: HSM Attestation, 3: Completed
  const [generatedAccount, setGeneratedAccount] = useState<{
    id: string;
    mpcHash: string;
    accountType: string;
    name: string;
  } | null>(null);

  const activePass = mode === 'signin' ? signInPass : accountType === 'individual' ? individualPass : businessPass;
  const passStrength = useMemo(() => getPasswordStrength(activePass), [activePass]);

  // Handle Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStep(1);

    // Simulate key generation progress steps
    setTimeout(() => setSubmitStep(2), 1200);
    setTimeout(() => {
      setSubmitStep(3);
      const accId = `INV-${Math.floor(100000 + Math.random() * 900000)}-${accountType === 'individual' ? 'IND' : 'CORP'}`;
      const hash = `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const accName = mode === 'signin'
        ? (signInEmail.split('@')[0] || 'User')
        : accountType === 'individual'
        ? `${firstName} ${lastName}`.trim() || 'Investor'
        : companyName || 'Corporate Client';

      const accountData = {
        id: accId,
        mpcHash: hash,
        accountType: accountType === 'individual' ? 'Individual Portfolio' : 'Institutional Business Account',
        name: accName,
      };

      setGeneratedAccount(accountData);
      setIsSubmitting(false);

      // Store persistent session
      if (typeof window !== 'undefined') {
        localStorage.setItem('investai_user', JSON.stringify(accountData));
      }
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#06070a] text-white flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />

      {/* Background ambient lighting */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/[0.04] blur-[150px] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.02] blur-[160px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Container */}
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Non-Custodial Cryptographic Registration</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            {mode === 'signup' ? (
              <>
                Create your <span className="text-gradient-emerald">InvestAI</span> account
              </>
            ) : (
              <>
                Access your <span className="text-gradient-cyan">Quant Portal</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-3"
          >
            {mode === 'signup'
              ? 'Select your account type to configure institutional MPC key shards and automated strategy execution.'
              : 'Enter your credentials to connect to your non-custodial quantitative portfolio.'}
          </motion.p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => { setMode('signup'); setGeneratedAccount(null); }}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => { setMode('signin'); setGeneratedAccount(null); }}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all duration-200 ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* ─── SUCCESS / ACCOUNT CREATED STATE ─── */}
        {generatedAccount ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-500/40 bg-[#0c0e14]/90 backdrop-blur-2xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Registration Successful!
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Your non-custodial MPC key shard has been initialized across 5 geographically isolated HSM nodes.
            </p>

            {/* Generated Details Box */}
            <div className="max-w-md mx-auto bg-black/60 border border-white/10 rounded-2xl p-5 font-mono text-left text-xs space-y-3 mb-8">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-slate-500">Account ID</span>
                <span className="text-emerald-400 font-bold">{generatedAccount.id}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-slate-500">Account Name</span>
                <span className="text-white font-medium">{generatedAccount.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-slate-500">Type</span>
                <span className="text-cyan-400">{generatedAccount.accountType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">MPC Shard Hash</span>
                <span className="text-slate-300 font-mono text-[11px]">{generatedAccount.mpcHash}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/analytics"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/60 transition-all"
              >
                <span>Launch Analytics Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/strategies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-white/5 border border-white/10 hover:text-white transition-all"
              >
                <span>Browse Quant Strategies</span>
              </Link>
            </div>
          </motion.div>
        ) : mode === 'signup' ? (
          /* ─── SIGN UP FLOW ─── */
          <div className="space-y-10">

            {/* 1. Account Type Cards (Figma Reference Match) */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider text-center mb-4">
                Choose Account Type
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Individual Account Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  onClick={() => setAccountType('individual')}
                  className={`relative p-6 sm:p-8 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
                    accountType === 'individual'
                      ? 'bg-gradient-to-b from-emerald-950/30 to-black border-emerald-500/60 shadow-2xl shadow-emerald-950/40 ring-2 ring-emerald-500/20'
                      : 'bg-white/[0.015] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Selected Indicator */}
                  {accountType === 'individual' && (
                    <motion.div
                      layoutId="selectedCardBorder"
                      className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                    </motion.div>
                  )}

                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                        accountType === 'individual'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      <User className="w-7 h-7" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Individual
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                      Personal investment account for individual investors seeking high-conviction automated quantitative strategies.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Non-Custodial MPC</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">$10k Min Allocation</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Personal Analytics</span>
                  </div>
                </motion.div>

                {/* Business Account Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  onClick={() => setAccountType('business')}
                  className={`relative p-6 sm:p-8 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
                    accountType === 'business'
                      ? 'bg-gradient-to-b from-cyan-950/30 to-black border-cyan-500/60 shadow-2xl shadow-cyan-950/40 ring-2 ring-cyan-500/20'
                      : 'bg-white/[0.015] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Selected Indicator */}
                  {accountType === 'business' && (
                    <motion.div
                      layoutId="selectedCardBorder"
                      className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                    </motion.div>
                  )}

                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                        accountType === 'business'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      <Building2 className="w-7 h-7" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Business
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                      Corporate account for businesses, family offices, hedge funds, and institutional organizations.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Multi-User HSM Quorum</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">FIX Protocol API</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Tax & Audit Exports</span>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* 2. Registration Form Container */}
            <motion.div
              key={accountType}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {accountType === 'individual'
                      ? 'Individual Account Registration'
                      : 'Business Account Registration'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out your required verification credentials to configure your account keys.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                  {accountType === 'individual' ? 'Personal Tier' : 'Institutional Tier'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* ── INDIVIDUAL FIELDS ── */}
                {accountType === 'individual' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Sarah"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Chen"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Personal Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                          <input
                            type="email"
                            required
                            value={individualEmail}
                            onChange={(e) => setIndividualEmail(e.target.value)}
                            placeholder="sarah@investor.com"
                            className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={individualPhone}
                            onChange={(e) => setIndividualPhone(e.target.value)}
                            placeholder="+1 (555) 019-2834"
                            className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2">Target Investment Deployment</label>
                      <select
                        value={allocationTier}
                        onChange={(e) => setAllocationTier(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="$10k - $100k">$10,000 – $100,000 (Growth Tier)</option>
                        <option value="$100k - $500k">$100,000 – $500,000 (Private Alpha Tier)</option>
                        <option value="$500k+">$500,000+ (Institutional Quant Tier)</option>
                      </select>
                    </div>
                  </>
                ) : (
                  /* ── BUSINESS FIELDS ── */
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Company / Entity Name</label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Apex Capital Partners LLC"
                            className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Corporate Entity Type</label>
                        <select
                          value={entityType}
                          onChange={(e) => setEntityType(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        >
                          <option value="LLC">Limited Liability Company (LLC)</option>
                          <option value="C-Corp">C-Corporation</option>
                          <option value="Family Office">Family Office</option>
                          <option value="Hedge Fund">Hedge Fund / Asset Manager</option>
                          <option value="DAO/Foundation">DAO / Web3 Foundation</option>
                          <option value="Trust">Private Trust</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Registration / Incorporation ID</label>
                        <input
                          type="text"
                          required
                          value={registrationId}
                          onChange={(e) => setRegistrationId(e.target.value)}
                          placeholder="e.g. REG-98420-US"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Corporate Work Email</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                          <input
                            type="email"
                            required
                            value={businessEmail}
                            onChange={(e) => setBusinessEmail(e.target.value)}
                            placeholder="treasury@apexcapital.com"
                            className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Authorized Corporate Officer</label>
                        <input
                          type="text"
                          required
                          value={officerName}
                          onChange={(e) => setOfficerName(e.target.value)}
                          placeholder="e.g. Michael Rodriguez (Managing Director)"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-2">Work Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={workPhone}
                            onChange={(e) => setWorkPhone(e.target.value)}
                            placeholder="+1 (212) 555-0198"
                            className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ── PASSWORD FIELD WITH METER ── */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">Cryptographic Key Access Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                    <input
                      type="password"
                      required
                      value={accountType === 'individual' ? individualPass : businessPass}
                      onChange={(e) =>
                        accountType === 'individual'
                          ? setIndividualPass(e.target.value)
                          : setBusinessPass(e.target.value)
                      }
                      placeholder="••••••••••••"
                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>

                  {/* Password meter bar */}
                  {activePass && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-400">Security Score:</span>
                        <span className={passStrength.score > 50 ? 'text-emerald-400' : 'text-amber-400'}>
                          {passStrength.label}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passStrength.color}`}
                          style={{ width: `${passStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkbox Attestation */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="compliance-check"
                    required
                    checked={accountType === 'individual' ? individualAccredited : businessCompliance}
                    onChange={(e) =>
                      accountType === 'individual'
                        ? setIndividualAccredited(e.target.checked)
                        : setBusinessCompliance(e.target.checked)
                    }
                    className="mt-1 rounded bg-black border-white/20 text-emerald-500 focus:ring-emerald-500"
                  />
                  <label htmlFor="compliance-check" className="text-xs text-slate-400 leading-relaxed cursor-pointer select-none">
                    {accountType === 'individual' ? (
                      <>
                        I certify that I am an accredited investor or authorized client, and I agree to the{' '}
                        <span className="text-slate-200 underline">Terms of Non-Custodial MPC Vault Custody</span>.
                      </>
                    ) : (
                      <>
                        I certify that I am an authorized officer representing this business entity, entitled to configure HSM multi-sig quorum keys under institutional compliance rules.
                      </>
                    )}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-3 transition-all duration-300 ${
                    accountType === 'individual'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/60'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-950/60'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>
                        {submitStep === 1
                          ? 'Sharding MPC Key Pairs across HSM Nodes...'
                          : 'Generating Cryptographic Attestation...'}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {accountType === 'individual'
                          ? 'Initialize Individual Quant Account'
                          : 'Initialize Business Institutional Account'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </motion.div>

          </div>
        ) : (
          /* ─── SIGN IN FLOW ─── */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-8 sm:p-10 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Quant Portal Sign In</h3>
              <p className="text-xs text-slate-400 mt-1">Access your registered Individual or Corporate account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-mono text-slate-300">Password</label>
                  <a href="#" className="text-[11px] font-mono text-cyan-400 hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                  <input
                    type="password"
                    required
                    value={signInPass}
                    onChange={(e) => setSignInPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-950/60 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Authenticate & Enter Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#06070a] flex items-center justify-center text-slate-400 font-mono text-xs">
          Loading Quant Vault...
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
