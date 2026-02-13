'use client';

import React from 'react';
import { useOnboardingStore } from '@/lib/store';
import MissionCard from './MissionCard';
import { AnimatePresence, motion } from 'framer-motion';

export default function MissionList() {
    const activeMissions = useOnboardingStore((state) => state.activeMissions);

    if (activeMissions.length === 0) return null;

    return (
        <section className="px-1 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="material-icons text-brand-coral text-sm">bolt</span>
                    Active Missions
                </h3>
                <span className="text-[10px] bg-white/10 text-white/40 px-2 py-0.5 rounded-full font-bold">
                    {activeMissions.length}
                </span>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {activeMissions.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Hint */}
            <p className="text-[9px] text-white/30 text-center font-bold uppercase tracking-widest mt-2">
                Complete missions to recover metabolic balance
            </p>
        </section>
    );
}
