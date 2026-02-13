'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import { useState } from 'react';
import VoiceLogger from './inputs/VoiceLogger';
import PhotoLogger from './inputs/PhotoLogger';
import WeeklyReport from './WeeklyReport';

type HeaderProps = {
    hideXPBar?: boolean;
};

export default function Header({ hideXPBar = false }: HeaderProps) {
    const { xp, streak, level, setOverlayActive } = useOnboardingStore();
    const [showVoice, setShowVoice] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showStreakInfo, setShowStreakInfo] = useState(false);

    // Calculate current streak bonus
    const streakBonus = (streak > 7) ? 7 : (streak > 3) ? 2 : 0;
    const nextMilestone = (streak <= 3) ? 4 : (streak <= 7) ? 8 : null;

    // Toggle overlay state when loggers open/close
    const handleVoiceOpen = () => { setShowVoice(true); setOverlayActive(true); };
    const handleVoiceClose = () => { setShowVoice(false); setOverlayActive(false); };

    const handlePhotoOpen = () => { setShowPhoto(true); setOverlayActive(true); };
    const handlePhotoClose = () => { setShowPhoto(false); setOverlayActive(false); };

    return (
        <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col gap-5 relative"
        >
            <AnimatePresence>
                {showVoice && <VoiceLogger onClose={handleVoiceClose} />}
                {showPhoto && <PhotoLogger onClose={handlePhotoClose} />}
                {showReport && <WeeklyReport onClose={() => setShowReport(false)} />}

                {showStreakInfo && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowStreakInfo(false)}
                            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute top-12 right-0 z-[110] w-56 p-4 rounded-2xl bg-[#1e1e1e] border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-xl">
                                    🔥
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-sm uppercase italic tracking-tight">Streak Status</h4>
                                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">{streak} Day Streak</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between font-bold">
                                    <span className="text-[10px] text-white/40 uppercase">Current Bonus</span>
                                    <span className="text-brand-teal text-xs">+{streakBonus} XP / Log</span>
                                </div>

                                {nextMilestone && (
                                    <div className="p-2 rounded-xl bg-orange-500/5 border border-orange-500/10 flex flex-col gap-1">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tight">
                                            <span className="text-white/40">Next Milestone</span>
                                            <span className="text-orange-400">{nextMilestone} Days</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-orange-500 rounded-full"
                                                style={{ width: `${(streak / nextMilestone) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-[9px] text-white/30 italic">Reach {nextMilestone} days for increased XP bonus!</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Row 1: Greeting + Streak */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--foreground)' }}>
                        Hey, there! 👋
                    </h1>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/35 mt-0.5">
                        Level {level} Slayer
                    </p>
                </div>
                <div className="flex items-center gap-2">

                    <div
                        onClick={() => setShowStreakInfo(!showStreakInfo)}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/20 cursor-pointer active:scale-95 transition-all hover:bg-orange-500/20"
                    >
                        <span className="text-base">🔥</span>
                        <span className="font-extrabold text-sm text-orange-400">{streak}</span>
                    </div>
                </div>
            </div>

            {/* Row 2: Action buttons */}
            <div className="flex gap-2">
                <button
                    onClick={handleVoiceOpen}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-teal-light text-bg-base font-bold text-xs shadow-lg shadow-brand-teal/15 active:scale-[0.97] transition-transform relative overflow-hidden"
                >
                    <span className="material-icons text-base">mic</span>
                    Voice
                    <span className="absolute top-1 right-2 text-[7px] font-black uppercase bg-black/10 px-1 rounded-sm">Beta</span>
                </button>
                <button
                    onClick={handlePhotoOpen}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white/80 font-bold text-xs active:scale-[0.97] transition-transform hover:bg-white/[0.08] relative overflow-hidden"
                >
                    <span className="material-icons text-base">photo_camera</span>
                    Photo
                    <span className="absolute top-1 right-2 text-[7px] font-black uppercase text-brand-coral bg-brand-coral/10 px-1 rounded-sm border border-brand-coral/20">Beta</span>
                </button>
                <button
                    onClick={() => setShowReport(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-brand-coral/10 border border-brand-coral/15 text-brand-coral font-bold text-xs active:scale-[0.97] transition-transform hover:bg-brand-coral/15"
                >
                    <span className="material-icons text-base">assessment</span>
                    Report
                </button>
            </div>

            {/* XP / Level Card - Hidden if hideXPBar is true */}
            {!hideXPBar && (
                <GlassCard className="p-4 relative overflow-hidden bg-gradient-to-br from-brand-teal/10 to-transparent border-brand-teal/20">
                    <div className="flex justify-between items-end mb-3 relative z-10">
                        <div>
                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Current Level</div>
                            <div className="text-3xl font-black italic tracking-tight text-white flex items-baseline gap-1">
                                <span className="text-lg opacity-50 not-italic font-bold">LVL</span>
                                {level}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-white/50 mb-0.5">
                                <span className="text-white">{xp}</span> <span className="opacity-50">/ {level * 500} XP</span>
                            </div>
                            <div className="text-[10px] font-bold text-brand-teal italic">
                                {(level * 500) - xp} XP to next
                            </div>
                        </div>
                    </div>

                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden relative z-10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, ((xp % 500) / 500) * 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-brand-teal rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20" style={{ animation: 'shimmer 2s infinite linear' }} />
                        </motion.div>
                    </div>
                </GlassCard>
            )}
        </motion.div>
    );
}
