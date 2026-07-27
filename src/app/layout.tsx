import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'InvestAI — Next-Generation AI Cryptocurrency Investment Platform',
  description:
    'Institutional-grade AI investment strategies, delta-neutral quantitative models, and cold-storage multi-sig security for high-net-worth crypto investors.',
  keywords: [
    'AI Investment',
    'Crypto Quantitative Trading',
    'Algorithmic Asset Management',
    'Institutional Crypto Custody',
    'Proof of Reserves',
    'Delta Neutral Yield',
  ],
  authors: [{ name: 'InvestAI Technology Group' }],
  openGraph: {
    title: 'InvestAI — AI-Powered Cryptocurrency Wealth Intelligence',
    description:
      'Invest confidently in the future through real-time AI quant models, risk-adjusted yield engines, and bulletproof cold-storage security.',
    url: 'https://investai.com',
    siteName: 'InvestAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InvestAI — Next-Gen AI Crypto Investment Platform',
    description:
      'Institutional-grade AI investment strategies and cryptographic proof of reserves.',
    creator: '@InvestAI',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-[#f8fafc] antialiased selection:bg-emerald-500/20 selection:text-emerald-300 min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
