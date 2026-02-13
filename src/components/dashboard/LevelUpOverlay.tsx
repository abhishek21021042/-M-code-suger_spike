'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function LevelUpOverlay() {
    const { level } = useOnboardingStore();
    const [prevLevel, setPrevLevel] = useState(level);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (level > prevLevel) {
            setShow(true);
            setPrevLevel(level);
            // Auto hide after 5 seconds
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [level, prevLevel]);

    if (!show) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-teal/20 backdrop-blur-xl pointer-events-none">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="relative text-center pointer-events-auto"
                >
                    {/* Confetti Particles (Mock) */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                    x: (Math.random() - 0.5) * 400,
                                    y: (Math.random() - 0.5) * 400,
                                    rotate: Math.random() * 360,
                                    scale: 0
                                }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute w-2 h-2 bg-brand-teal rounded-full"
                            />
                        ))}
                    </div>

                    <GlassCard className="p-8 border-white/20 shadow-[0_0_50px_rgba(45,212,191,0.5)]">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="text-7xl mb-6 opacity-80"
                        >
                            🌟
                        </motion.div>

                        <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-2">New Milestone</h2>
                        <h1 className="text-6xl font-black text-white italic mb-4">LEVEL {level}</h1>
                        <p className="text-brand-teal font-bold mb-6">You're becoming a Sugar Slayer!</p>

                        <button
                            onClick={() => setShow(false)}
                            className="px-8 py-3 rounded-xl bg-white text-bg-base font-black uppercase tracking-wider text-sm hover:scale-105 active:scale-95 transition-transform"
                        >
                            Awesome!
                        </button>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
