'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import NeumorphicSlider from '@/components/ui/NeumorphicSlider';

export default function AgeSelection() {
    const { age, setAge } = useOnboardingStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto px-6 py-8 relative z-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <Link href="/" className="w-12 h-12 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] flex items-center justify-center text-white/60 active:shadow-[var(--shadow-neu-pressed)] active:scale-95 transition-all">
                    <span className="material-icons">arrow_back</span>
                </Link>
                <div className="flex gap-2">
                    <div className="w-8 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-2 h-2 rounded-full bg-bg-neu-light shadow-[var(--shadow-neu-pressed)]"></div>
                    <div className="w-2 h-2 rounded-full bg-bg-neu-light shadow-[var(--shadow-neu-pressed)]"></div>
                    <div className="w-2 h-2 rounded-full bg-bg-neu-light shadow-[var(--shadow-neu-pressed)]"></div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col items-center justify-center space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-white">How old are you?</h1>
                    <p className="text-white/40">This helps us calculate your metabolic baseline.</p>
                </div>

                {/* Big Number Display */}
                <div className="relative w-48 h-48 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] flex items-center justify-center border border-white/5">
                    <span className="text-6xl font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                        {age}
                    </span>
                    <span className="absolute bottom-10 text-sm text-white/30 font-medium">YEARS</span>
                </div>

                {/* Slider */}
                <div className="w-full px-4">
                    <NeumorphicSlider
                        value={age}
                        onChange={setAge}
                        min={1}
                        max={100}
                        className="my-8"
                    />
                    <div className="flex justify-between text-xs text-white/20 font-bold px-1">
                        <span>Min</span>
                        <span>Max</span>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto">
                <Link href="/onboarding/height">
                    <button className="w-full py-5 rounded-2xl bg-brand-coral text-white font-bold text-lg shadow-[0_10px_30px_rgba(255,107,107,0.3)] hover:shadow-[0_10px_40px_rgba(255,107,107,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        <span>Continue</span>
                        <span className="material-icons">arrow_forward</span>
                    </button>
                </Link>
            </footer>
        </div>
    );
}
