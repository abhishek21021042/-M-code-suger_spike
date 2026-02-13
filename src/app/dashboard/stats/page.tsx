'use client';

import React from 'react';
import { useOnboardingStore } from '@/lib/store';
import { getWeeklyStats } from '@/lib/analytics';
import Header from '@/components/dashboard/Header';
import SugarTrendChart from '@/components/dashboard/charts/SugarTrendChart';
import SugarLogHistory from '@/components/dashboard/SugarLogHistory';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { getXPStats } from '@/lib/analytics';

export default function StatsPage() {
    const logs = useOnboardingStore((state) => state.logs);
    const weeklyStats = getWeeklyStats(logs);

    return (
        <div className="min-h-screen pb-32">
            <Header hideXPBar={true} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 space-y-6"
            >
                <div className="px-1">
                    <h2 className="text-2xl font-black text-white italic truncate uppercase tracking-tight">
                        Insights & Trends 📊
                    </h2>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">
                        Your metabolic journey, visualized.
                    </p>
                </div>

                <div className="space-y-4">
                    <SugarTrendChart data={weeklyStats} />

                    <GlassCard className="p-6 border-white/10 overflow-hidden relative">
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 blur-3xl -mr-16 -mt-16 rounded-full" />

                        <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2 relative z-10">
                            <span className="material-icons text-brand-teal text-lg">bolt</span>
                            Weekly Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                                <p className="text-[9px] text-white/40 uppercase font-bold mb-1 font-mono tracking-tighter">Total Intake</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-2xl font-black text-white">{logs.reduce((acc, l) => acc + (l.sugar || 0), 0)}g</p>
                                    <span className="text-[10px] text-white/20 font-bold uppercase italic">Total</span>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                                <p className="text-[9px] text-white/40 uppercase font-bold mb-1 font-mono tracking-tighter">Streak Health</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-2xl font-black text-brand-teal">85%</p>
                                    <span className="text-[10px] text-brand-teal/40 font-bold uppercase italic">Avg</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <SugarLogHistory />
                </div>
            </motion.div>
        </div>
    );
}
