'use client';

import React from 'react';
import { useOnboardingStore } from '@/lib/store';
import { getWeeklyStats } from '@/lib/analytics';
import Header from '@/components/dashboard/Header';
import SugarChart from '@/components/dashboard/charts/SugarChart';
import XPChart from '@/components/dashboard/charts/XPChart';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

export default function StatsPage() {
    const logs = useOnboardingStore((state) => state.logs);
    const weeklyStats = getWeeklyStats(logs);

    return (
        <div className="min-h-screen pb-32">
            <Header />

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

                <SugarChart data={weeklyStats} />
                <XPChart data={weeklyStats} />

                <GlassCard className="p-6 border-white/10">
                    <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                        <span className="material-icons text-brand-teal text-lg">auto_awesome</span>
                        Weekly Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[9px] text-white/40 uppercase font-bold mb-1 font-mono">Total Intake</p>
                            <p className="text-xl font-black text-white">420g</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[9px] text-white/40 uppercase font-bold mb-1 font-mono">Streak Health</p>
                            <p className="text-xl font-black text-brand-teal">85%</p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
