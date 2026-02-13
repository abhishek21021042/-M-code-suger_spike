'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOnboardingStore } from '@/lib/store';
import NeumorphicSlider from '@/components/ui/NeumorphicSlider';
import GlassCard from '@/components/ui/GlassCard';

export default function HeightSelection() {
    const { height, setHeight } = useOnboardingStore();
    const [mounted, setMounted] = useState(false);
    const [unit, setUnit] = useState<'cm' | 'ft'>('cm');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Conversion display logic
    const displayHeight = unit === 'cm'
        ? `${Math.round(height)} cm`
        : `${Math.floor((height / 2.54) / 12)}' ${Math.round((height / 2.54) % 12)}"`;

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto px-6 py-8 relative z-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <Link href="/onboarding/age" className="w-12 h-12 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] flex items-center justify-center text-white/60 active:shadow-[var(--shadow-neu-pressed)] active:scale-95 transition-all">
                    <span className="material-icons">arrow_back</span>
                </Link>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-8 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-2 h-2 rounded-full bg-bg-neu-light shadow-[var(--shadow-neu-pressed)]"></div>
                    <div className="w-2 h-2 rounded-full bg-bg-neu-light shadow-[var(--shadow-neu-pressed)]"></div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-row items-center justify-between gap-8 pl-4">

                <div className="flex flex-col gap-8 flex-1">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white leading-tight">Height?</h1>
                        <p className="text-white/40 text-sm">Taller means more metabolic surface area.</p>
                    </div>

                    {/* Display & Toggle */}
                    <GlassCard className="p-6 flex flex-col items-center gap-4">
                        <span className="text-4xl font-bold text-brand-teal drop-shadow-md whitespace-nowrap">
                            {displayHeight}
                        </span>

                        {/* Neumorphic Toggle */}
                        <div className="flex bg-bg-neu-dark p-1 rounded-full shadow-[var(--shadow-neu-pressed)]">
                            <button
                                onClick={() => setUnit('cm')}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${unit === 'cm' ? 'bg-bg-neu-light text-white shadow-[var(--shadow-neu-flat)]' : 'text-white/30'}`}
                            >
                                CM
                            </button>
                            <button
                                onClick={() => setUnit('ft')}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${unit === 'ft' ? 'bg-bg-neu-light text-white shadow-[var(--shadow-neu-flat)]' : 'text-white/30'}`}
                            >
                                FT
                            </button>
                        </div>
                    </GlassCard>
                </div>

                {/* Vertical Slider */}
                <div className="h-[60vh] flex flex-col items-center justify-center py-4 bg-bg-neu-dark/30 rounded-full border border-white/5">
                    <NeumorphicSlider
                        value={height}
                        onChange={setHeight}
                        min={120}
                        max={220}
                        orientation="vertical"
                        className="h-full"
                    />
                    <div className="mt-4 text-xs text-white/20 font-mono rotate-[-90deg]">RULER</div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-8">
                <Link href="/onboarding/weight">
                    <button className="w-full py-5 rounded-2xl bg-brand-coral text-white font-bold text-lg shadow-[0_10px_30px_rgba(255,107,107,0.3)] hover:shadow-[0_10px_40px_rgba(255,107,107,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        <span>Continue</span>
                        <span className="material-icons">arrow_forward</span>
                    </button>
                </Link>
            </footer>
        </div>
    );
}
