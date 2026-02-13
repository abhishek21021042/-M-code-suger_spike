'use client';

import { useOnboardingStore, Badge } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import Header from '@/components/dashboard/Header';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const { xp, level, badges, unlockedBadgeIds, age, height, weight, logs, streak } = useOnboardingStore();

    const nextLevelXP = 500;
    const progress = (xp % nextLevelXP) / nextLevelXP * 100;

    const totalSugarLogs = logs.length;

    return (
        <>
            <Header hideXPBar={true} />

            <div className="mt-8 space-y-6 pb-24">
                {/* Level & XP Card */}
                <GlassCard className="p-6 bg-gradient-to-br from-brand-teal/10 to-transparent border-brand-teal/20">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-white/40 text-xs uppercase font-bold tracking-wider mb-1">Current Level</p>
                            <h2 className="text-4xl font-black text-white italic">LVL {level}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-white/40 text-xs font-bold mb-1">{xp} / {nextLevelXP} XP</p>
                            <p className="text-brand-teal text-xs font-bold italic">{(nextLevelXP - (xp % nextLevelXP))} XP to next</p>
                        </div>
                    </div>

                    {/* XP Progress Bar */}
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-light rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                        />
                    </div>
                </GlassCard>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="material-icons text-brand-coral mb-1">local_fire_department</span>
                        <p className="text-2xl font-black text-white">{streak}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold">Current Streak</p>
                    </GlassCard>
                    <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="material-icons text-brand-teal mb-1">analytics</span>
                        <p className="text-2xl font-black text-white">{totalSugarLogs}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold">Total Logs</p>
                    </GlassCard>
                </div>

                {/* Physical Stats */}
                <GlassCard className="p-4">
                    <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 px-2">Physical Profile</h3>
                    <div className="grid grid-cols-3 divide-x divide-white/10">
                        <div className="text-center">
                            <p className="text-lg font-bold text-white">{age}</p>
                            <p className="text-[9px] text-white/40 uppercase">Age</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white">{height}cm</p>
                            <p className="text-[9px] text-white/40 uppercase">Height</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white">{weight}kg</p>
                            <p className="text-[9px] text-white/40 uppercase">Weight</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Badge Showcase */}
                <div>
                    <h3 className="text-white/80 font-bold text-lg mb-4 px-2">Achievements</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {badges.map((badge: Badge) => {
                            const isUnlocked = unlockedBadgeIds.includes(badge.id);
                            return (
                                <motion.div
                                    key={badge.id}
                                    whileHover={isUnlocked ? { scale: 1.05 } : {}}
                                    className="relative"
                                >
                                    <GlassCard className={`p-4 flex flex-col items-center gap-2 aspect-square justify-center border-white/5 ${isUnlocked ? 'bg-white/5' : 'bg-black/40 grayscale opacity-40'}`}>
                                        <span className={`material-icons text-3xl ${isUnlocked ? 'text-brand-coral' : 'text-white/20'}`}>
                                            {isUnlocked ? badge.icon : 'lock'}
                                        </span>
                                        <p className="text-[9px] font-bold text-center leading-tight">
                                            {badge.name}
                                        </p>
                                    </GlassCard>
                                    {!isUnlocked && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Grayscale overlay handled by classes */}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
