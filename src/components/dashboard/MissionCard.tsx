'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import { Mission } from '@/lib/rulesEngine';
import GlassCard from '@/components/ui/GlassCard';

interface MissionCardProps {
    mission: Mission;
}

export default function MissionCard({ mission }: MissionCardProps) {
    const completeMission = useOnboardingStore((state) => state.completeMission);

    const getTypeColor = (type: Mission['type']) => {
        switch (type) {
            case 'physical': return 'text-brand-coral';
            case 'hydration': return 'text-brand-teal';
            case 'nutritional': return 'text-yellow-400';
            default: return 'text-white';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full"
        >
            <GlassCard className="p-4 border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-3 rounded-2xl bg-white/5 ${getTypeColor(mission.type)} shadow-inner`}>
                        <span className="material-icons text-2xl">{mission.icon}</span>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-white font-black text-sm uppercase tracking-tight italic">
                            {mission.title}
                        </h4>
                        <p className="text-[10px] text-white/50 font-bold leading-tight mt-0.5">
                            {mission.description}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="bg-brand-coral/10 px-2 py-0.5 rounded-full border border-brand-coral/20">
                            <span className="text-[10px] font-black text-brand-coral">+{mission.xp} XP</span>
                        </div>

                        <button
                            onClick={() => completeMission(mission.id)}
                            className="bg-white text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-lg hover:bg-brand-teal hover:text-white transition-all active:scale-95 shadow-lg"
                        >
                            Complete
                        </button>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <span className="material-icons text-6xl rotate-12">{mission.icon}</span>
                </div>
            </GlassCard>
        </motion.div>
    );
}
