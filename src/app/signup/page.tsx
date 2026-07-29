'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Building,
  KeyRound,
  RefreshCw,
  Eye,
  EyeOff,
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
      return { score: 100, label: 'Very Strong', color: 'bg-emerald-300' };
    default:
      return { score: 10, label: 'Too short', color: 'bg-red-600' };
  }
}

// ─── Reusable Input Field ──────────────────────────────────────────────────────
function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  accent = 'emerald',
  required = true,
  rightElement,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.FC<{ className?: string }>;
  accent?: 'emerald' | 'cyan';
  required?: boolean;
  rightElement?: React.ReactNode;
}) {
  const focusClass = accent === 'cyan' ? 'focus:border-cyan-500' : 'focus:border-emerald-500';
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="w-4 h-4 text-slate-500 absolute left-4 top-3.5 pointer-events-none" />}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[#0d0f15] border border-white/10 rounded-xl ${Icon ? 'pl-11' : 'pl-4'} ${rightElement ? 'pr-12' : 'pr-4'} py-3 text-sm text-white placeholder-slate-600 focus:outline-none ${focusClass} transition-colors`}
        />
        {rightElement && (
          <div className="absolute right-4 top-3.5">{rightElement}</div>
        )}
      </div>
    </div>
  );
}

// ─── Reusable Select Field ─────────────────────────────────────────────────────
function SelectField({
  label,
  value,
  onChange,
  options,
  accent = 'emerald',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  accent?: 'emerald' | 'cyan';
}) {
  const focusClass = accent === 'cyan' ? 'focus:border-cyan-500' : 'focus:border-emerald-500';
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-[#0d0f15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none ${focusClass} transition-colors`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Main Content ──────────────────────────────────────────────────────────────
function SignUpContent() {
  const searchParams = useSearchParams();

  const initialMode = searchParams.get('mode') === 'signin' ? 'signin' : 'signup';
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  const [accountType, setAccountType] = useState<AccountType>('individual');

  // Individual Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [individualEmail, setIndividualEmail] = useState('');
  const [individualPhone, setIndividualPhone] = useState('');
  const [individualPass, setIndividualPass] = useState('');
  const [individualAccredited, setIndividualAccredited] = useState(false);

  // Business Fields
  const [companyName, setCompanyName] = useState('');
  const [entityType, setEntityType] = useState('LLC');
  const [registrationId, setRegistrationId] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [officerTitle, setOfficerTitle] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [businessPass, setBusinessPass] = useState('');
  const [businessCompliance, setBusinessCompliance] = useState(false);

  // Sign In Fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPass, setSignInPass] = useState('');

  // Password visibility
  const [showIndPass, setShowIndPass] = useState(false);
  const [showBizPass, setShowBizPass] = useState(false);
  const [showSignInPass, setShowSignInPass] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [generatedAccount, setGeneratedAccount] = useState<{
    id: string;
    accountType: string;
    name: string;
  } | null>(null);

  const activePass =
    mode === 'signin' ? signInPass : accountType === 'individual' ? individualPass : businessPass;
  const passStrength = useMemo(() => getPasswordStrength(activePass), [activePass]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStep(1);

    setTimeout(() => setSubmitStep(2), 1200);
    setTimeout(() => {
      setSubmitStep(3);
      const accId = `INV-${Math.floor(100000 + Math.random() * 900000)}-${accountType === 'individual' ? 'IND' : 'CORP'}`;
      const accName =
        mode === 'signin'
          ? signInEmail.split('@')[0] || 'User'
          : accountType === 'individual'
          ? `${firstName} ${lastName}`.trim() || 'Investor'
          : companyName || 'Business Client';

      const accountData = {
        id: accId,
        accountType: accountType === 'individual' ? 'Individual Account' : 'Business Account',
        name: accName,
      };

      setGeneratedAccount(accountData);
      setIsSubmitting(false);

      if (typeof window !== 'undefined') {
        localStorage.setItem('investai_user', JSON.stringify(accountData));
      }
    }, 2400);
  };

  const ENTITY_TYPES = [
    { value: 'LLC', label: 'Limited Liability Company (LLC)' },
    { value: 'C-Corp', label: 'C-Corporation' },
    { value: 'Family Office', label: 'Family Office' },
    { value: 'Hedge Fund', label: 'Hedge Fund / Asset Manager' },
    { value: 'Trust', label: 'Private Trust' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-[#06070a] text-white flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />

      {/* Ambient background */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-emerald-500/[0.04] blur-[150px] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.02] blur-[150px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Page */}
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/25 text-xs font-mono text-emerald-400 mb-5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Account Registration</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            {mode === 'signup' ? (
              <>
                Create your{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  InvestAI
                </span>{' '}
                account
              </>
            ) : (
              <>
                Sign in to{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  your account
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base mt-3"
          >
            {mode === 'signup'
              ? 'Choose your account type and fill in your details to get started.'
              : 'Enter your credentials to access your account.'}
          </motion.p>

          {/* Mode Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 inline-flex p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
          >
            <button
              onClick={() => { setMode('signup'); setGeneratedAccount(null); }}
              className={`px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => { setMode('signin'); setGeneratedAccount(null); }}
              className={`px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </motion.div>
        </div>

        {/* ─── SUCCESS STATE ─── */}
        <AnimatePresence mode="wait">
          {generatedAccount ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto rounded-3xl border border-emerald-500/30 bg-[#0c0e14]/90 backdrop-blur-2xl p-10 text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Account Created!
              </h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                Welcome to InvestAI, {generatedAccount.name}. Your account is ready.
              </p>

              <div className="bg-black/60 border border-white/10 rounded-2xl p-5 font-mono text-left text-xs space-y-3 mb-8">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-slate-500">Account ID</span>
                  <span className="text-emerald-400 font-bold">{generatedAccount.id}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-slate-500">Name</span>
                  <span className="text-white font-medium">{generatedAccount.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Account Type</span>
                  <span className="text-cyan-400">{generatedAccount.accountType}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/analytics"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/50 transition-all"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/strategies"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-white/5 border border-white/10 hover:text-white transition-all"
                >
                  <span>Browse Strategies</span>
                </Link>
              </div>
            </motion.div>

          ) : mode === 'signup' ? (
            /* ─── SIGN UP FLOW ─── */
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Account Type Cards */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-5">
                  Choose Account Type
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Individual Card */}
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    onClick={() => setAccountType('individual')}
                    className={`relative p-7 rounded-3xl cursor-pointer border transition-all duration-300 ${
                      accountType === 'individual'
                        ? 'bg-gradient-to-b from-emerald-950/40 to-[#08090e] border-emerald-500/50 shadow-2xl shadow-emerald-950/30 ring-1 ring-emerald-500/15'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {accountType === 'individual' && (
                      <motion.div
                        layoutId="cardCheck"
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                      </motion.div>
                    )}

                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                        accountType === 'individual'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      <User className="w-6 h-6" />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">Individual</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Personal investment account for individuals looking to grow and manage their portfolio.
                    </p>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Personal Portfolio</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Analytics Access</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">24/7 Support</span>
                    </div>
                  </motion.div>

                  {/* Business Card */}
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    onClick={() => setAccountType('business')}
                    className={`relative p-7 rounded-3xl cursor-pointer border transition-all duration-300 ${
                      accountType === 'business'
                        ? 'bg-gradient-to-b from-cyan-950/40 to-[#08090e] border-cyan-500/50 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-500/15'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {accountType === 'business' && (
                      <motion.div
                        layoutId="cardCheck"
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                      </motion.div>
                    )}

                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                        accountType === 'business'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">Business</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Corporate account for companies, family offices, hedge funds, and institutional organizations.
                    </p>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Multi-User Access</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Team Management</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Audit Reports</span>
                    </div>
                  </motion.div>

                </div>
              </div>

              {/* Registration Form */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={accountType}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-7 sm:p-10 shadow-2xl"
                >
                  {/* Form Header */}
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {accountType === 'individual' ? 'Personal Details' : 'Business Details'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {accountType === 'individual'
                          ? 'Fill in your personal information to create your account.'
                          : 'Fill in your business information to create your account.'}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300 whitespace-nowrap">
                      {accountType === 'individual' ? 'Individual' : 'Business'}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    {accountType === 'individual' ? (
                      /* ── INDIVIDUAL FIELDS ── */
                      <>
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            placeholder="e.g. Sarah"
                          />
                          <InputField
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            placeholder="e.g. Johnson"
                          />
                        </div>

                        {/* Email + Phone Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField
                            label="Email Address"
                            type="email"
                            value={individualEmail}
                            onChange={setIndividualEmail}
                            placeholder="sarah@example.com"
                            icon={Mail}
                          />
                          <InputField
                            label="Phone Number"
                            type="tel"
                            value={individualPhone}
                            onChange={setIndividualPhone}
                            placeholder="+1 (555) 000-0000"
                            icon={Phone}
                          />
                        </div>

                        {/* Password */}
                        <InputField
                          label="Password"
                          type={showIndPass ? 'text' : 'password'}
                          value={individualPass}
                          onChange={setIndividualPass}
                          placeholder="Create a strong password"
                          icon={Lock}
                          rightElement={
                            <button
                              type="button"
                              onClick={() => setShowIndPass((p) => !p)}
                              className="text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              {showIndPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          }
                        />

                        {/* Password strength meter */}
                        {individualPass && (
                          <div className="-mt-2 space-y-1">
                            <div className="flex justify-between text-[11px] font-mono">
                              <span className="text-slate-500">Password strength</span>
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

                        {/* Checkbox */}
                        <div className="flex items-start gap-3 pt-1">
                          <input
                            type="checkbox"
                            id="ind-terms"
                            required
                            checked={individualAccredited}
                            onChange={(e) => setIndividualAccredited(e.target.checked)}
                            className="mt-1 rounded bg-black border-white/20 text-emerald-500 focus:ring-emerald-500 shrink-0"
                          />
                          <label htmlFor="ind-terms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                            I agree to the{' '}
                            <span className="text-slate-200 underline underline-offset-2">Terms of Service</span>{' '}
                            and{' '}
                            <span className="text-slate-200 underline underline-offset-2">Privacy Policy</span>.
                          </label>
                        </div>
                      </>
                    ) : (
                      /* ── BUSINESS FIELDS ── */
                      <>
                        {/* Company Name + Entity Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField
                            label="Company / Entity Name"
                            value={companyName}
                            onChange={setCompanyName}
                            placeholder="e.g. Apex Capital Partners"
                            icon={Building}
                            accent="cyan"
                          />
                          <SelectField
                            label="Entity Type"
                            value={entityType}
                            onChange={setEntityType}
                            options={ENTITY_TYPES}
                            accent="cyan"
                          />
                        </div>

                        {/* Registration ID + Business Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField
                            label="Registration / Company ID"
                            value={registrationId}
                            onChange={setRegistrationId}
                            placeholder="e.g. 98420"
                            accent="cyan"
                          />
                          <InputField
                            label="Work Email Address"
                            type="email"
                            value={businessEmail}
                            onChange={setBusinessEmail}
                            placeholder="name@company.com"
                            icon={Mail}
                            accent="cyan"
                          />
                        </div>

                        {/* Authorized Officer + Title */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField
                            label="Authorized Officer Name"
                            value={officerName}
                            onChange={setOfficerName}
                            placeholder="e.g. Michael Rodriguez"
                            accent="cyan"
                          />
                          <InputField
                            label="Job Title"
                            value={officerTitle}
                            onChange={setOfficerTitle}
                            placeholder="e.g. Managing Director"
                            accent="cyan"
                          />
                        </div>

                        {/* Work Phone */}
                        <InputField
                          label="Work Phone Number"
                          type="tel"
                          value={workPhone}
                          onChange={setWorkPhone}
                          placeholder="+1 (212) 555-0000"
                          icon={Phone}
                          accent="cyan"
                        />

                        {/* Password */}
                        <InputField
                          label="Password"
                          type={showBizPass ? 'text' : 'password'}
                          value={businessPass}
                          onChange={setBusinessPass}
                          placeholder="Create a strong password"
                          icon={Lock}
                          accent="cyan"
                          rightElement={
                            <button
                              type="button"
                              onClick={() => setShowBizPass((p) => !p)}
                              className="text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              {showBizPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          }
                        />

                        {/* Password strength meter */}
                        {businessPass && (
                          <div className="-mt-2 space-y-1">
                            <div className="flex justify-between text-[11px] font-mono">
                              <span className="text-slate-500">Password strength</span>
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

                        {/* Checkbox */}
                        <div className="flex items-start gap-3 pt-1">
                          <input
                            type="checkbox"
                            id="biz-terms"
                            required
                            checked={businessCompliance}
                            onChange={(e) => setBusinessCompliance(e.target.checked)}
                            className="mt-1 rounded bg-black border-white/20 text-cyan-500 focus:ring-cyan-500 shrink-0"
                          />
                          <label htmlFor="biz-terms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                            I confirm that I am an authorized representative of this business entity and agree to the{' '}
                            <span className="text-slate-200 underline underline-offset-2">Terms of Service</span>{' '}
                            and{' '}
                            <span className="text-slate-200 underline underline-offset-2">Privacy Policy</span>.
                          </label>
                        </div>
                      </>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70 ${
                        accountType === 'individual'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/50'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-950/50'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 font-mono text-xs">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          {submitStep === 1 ? 'Setting up your account...' : 'Almost done...'}
                        </span>
                      ) : (
                        <>
                          <span>
                            {accountType === 'individual' ? 'Create Individual Account' : 'Create Business Account'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          ) : (
            /* ─── SIGN IN FLOW ─── */
            <motion.div
              key="signin"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="max-w-md mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-8 sm:p-10 shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Welcome back</h3>
                <p className="text-xs text-slate-400 mt-1">Sign in to your InvestAI account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  label="Email Address"
                  type="email"
                  value={signInEmail}
                  onChange={setSignInEmail}
                  placeholder="name@example.com"
                  icon={Mail}
                  accent="cyan"
                />

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-semibold text-slate-300">Password</label>
                    <a href="#" className="text-[11px] text-cyan-400 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5 pointer-events-none" />
                    <input
                      type={showSignInPass ? 'text' : 'password'}
                      required
                      value={signInPass}
                      onChange={(e) => setSignInPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#0d0f15] border border-white/10 rounded-xl pl-11 pr-12 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPass((p) => !p)}
                      className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showSignInPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 pt-1">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setGeneratedAccount(null); }}
                    className="text-emerald-400 hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#06070a] flex items-center justify-center text-slate-400 text-sm">
          Loading...
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
