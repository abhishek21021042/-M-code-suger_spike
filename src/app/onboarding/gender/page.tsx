'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/lib/store';
import { syncUserToSupabase } from '@/lib/auth';

export default function GenderSelection() {
    const router = useRouter();
    const { gender, setGender, age, height, weight } = useOnboardingStore();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleStart = async () => {
        setIsSubmitting(true);
        // Sync to Supabase
        await syncUserToSupabase({
            age,
            height,
            weight,
            gender: gender || 'pns',
            onboarding_completed: true
        });

        // Push slightly delayed to show loading state if we had one, but instant is fine
        router.push('/dashboard');
    };

    const genders = [
        { id: 'male', label: 'Male', icon: '👨' },
        { id: 'female', label: 'Female', icon: '👩' },
        { id: 'other', label: 'Other', icon: '🌈' },
        { id: 'pns', label: 'Skip', icon: '🔒' },
    ];

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto px-6 py-8 relative z-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <Link href="/onboarding/weight" className="w-12 h-12 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] flex items-center justify-center text-white/60 active:shadow-[var(--shadow-neu-pressed)] active:scale-95 transition-all">
                    <span className="material-icons">arrow_back</span>
                </Link>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                    <div className="w-8 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col items-center justify-center space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-white">Details</h1>
                    <p className="text-white/40">Biological factors affect glucose spikes.</p>
                </div>

                {/* Gender Grid */}
                <div className="grid grid-cols-2 gap-6 w-full">
                    {genders.map((item) => {
                        const isSelected = gender === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setGender(item.id)}
                                className={`
                                    relative aspect-square rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300
                                    ${isSelected
                                        ? 'bg-bg-base shadow-[var(--shadow-neu-pressed)] text-brand-coral border border-brand-coral/20'
                                        : 'bg-bg-base shadow-[var(--shadow-neu-flat)] text-white/60 hover:text-white border border-transparent'}
                                `}
                            >
                                <span className={`text-5xl transition-transform ${isSelected ? 'scale-110' : 'scale-100'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-bold text-sm tracking-wide">{item.label}</span>

                                {isSelected && (
                                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto">
                <button
                    onClick={handleStart}
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-brand-coral to-brand-coral-dark text-white font-bold text-lg shadow-[0_10px_30px_rgba(255,107,107,0.3)] hover:shadow-[0_10px_40px_rgba(255,107,107,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Syncing...' : 'Start Journey'}
                    {!isSubmitting && <span className="material-icons">rocket_launch</span>}
                </button>
            </footer>
        </div>
    );
}
