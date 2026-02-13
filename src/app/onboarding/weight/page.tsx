'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOnboardingStore } from '@/lib/store';
import NeumorphicSlider from '@/components/ui/NeumorphicSlider';
import GlassCard from '@/components/ui/GlassCard';

export default function WeightSelection() {
    const { weight, setWeight } = useOnboardingStore();
    const [mounted, setMounted] = useState(false);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Conversion display logic
    const displayWeight = unit === 'kg'
        ? `${Math.round(weight)} kg`
        : `${Math.round(weight * 2.20462)} lbs`;

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto px-6 py-8 relative z-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <Link href="/onboarding/height" className="w-12 h-12 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] flex items-center justify-center text-white/60 active:shadow-[var(--shadow-neu-pressed)] active:scale-95 transition-all">
                    <span className="material-icons">arrow_back</span>
                </Link>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-8 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-2 h-2 rounded-full bg-bg-neu-light shadow-[var(--shadow-neu-pressed)]"></div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col items-center justify-center space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-white">Current Weight?</h1>
                    <p className="text-white/40">Tracking this helps visualize progress.</p>
                </div>

                {/* Display & Toggle */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-56 h-56 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] flex items-center justify-center border border-white/5">
                        {/* Decorative outer ring */}
                        <div className="absolute inset-2 rounded-full border border-dashed border-white/10 opacity-50 animate-[spinSlow_20s_linear_infinite]"></div>

                        <span className="text-5xl font-bold text-white drop-shadow-md">
                            {displayWeight}
                        </span>
                    </div>

                    {/* Neumorphic Toggle */}
                    <div className="flex bg-bg-neu-dark p-1 rounded-full shadow-[var(--shadow-neu-pressed)]">
                        <button
                            onClick={() => setUnit('kg')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${unit === 'kg' ? 'bg-bg-neu-light text-white shadow-[var(--shadow-neu-flat)]' : 'text-white/30'}`}
                        >
                            KG
                        </button>
                        <button
                            onClick={() => setUnit('lbs')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${unit === 'lbs' ? 'bg-bg-neu-light text-white shadow-[var(--shadow-neu-flat)]' : 'text-white/30'}`}
                        >
                            LBS
                        </button>
                    </div>
                </div>

                {/* Horizontal Slider */}
                <div className="w-full px-4 pt-8">
                    <p className="text-center text-xs text-white/20 font-bold mb-4 uppercase tracking-widest">Slide to adjust</p>
                    <NeumorphicSlider
                        value={weight}
                        onChange={setWeight}
                        min={30}
                        max={180}
                        className="my-4"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto">
                <Link href="/onboarding/gender">
                    <button className="w-full py-5 rounded-2xl bg-brand-coral text-white font-bold text-lg shadow-[0_10px_30px_rgba(255,107,107,0.3)] hover:shadow-[0_10px_40px_rgba(255,107,107,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                        <span>Continue</span>
                        <span className="material-icons">arrow_forward</span>
                    </button>
                </Link>
            </footer>
        </div>
    );
}
