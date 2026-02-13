'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-bg-base flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-coral/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <main className="z-10 flex flex-col items-center gap-12 text-center max-w-md w-full">
        {/* Logo / Title Area */}
        <div className="relative">
          <div className="absolute inset-0 bg-brand-coral/20 blur-[40px] rounded-full"></div>
          <h1 className="relative text-5xl font-black text-white leading-tight drop-shadow-xl">
            Beat the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral to-brand-coral-dark">
              Sugar Spike
            </span>
          </h1>
        </div>

        <p className="text-white/60 text-lg">
          Master your metabolism with data-driven insights.
        </p>

        {/* Action Card */}
        <GlassCard className="w-full p-2 bg-white/5 border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/onboarding/age" className="block w-full">
              <motion.button
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 rounded-2xl bg-bg-base shadow-[var(--shadow-neu-flat)] text-brand-coral font-bold text-xl border border-white/5 active:shadow-[var(--shadow-neu-pressed)] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Get Started</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </motion.button>
            </Link>
          </motion.div>
        </GlassCard>
      </main>

      <footer className="absolute bottom-8 text-white/20 text-xs font-medium">
        Version 1.2 (Neumorphic)
      </footer>
    </div>
  );
}
