'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import { useState } from 'react';
import VoiceLogger from './inputs/VoiceLogger';
import PhotoLogger from './inputs/PhotoLogger';
import WeeklyReport from './WeeklyReport';

export default function Header() {
    const { xp, streak, level, theme, toggleTheme, setOverlayActive } = useOnboardingStore();
    const [showVoice, setShowVoice] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const [showReport, setShowReport] = useState(false);

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
            className="w-full flex flex-col gap-5"
        >
            <AnimatePresence>
                {showVoice && <VoiceLogger onClose={handleVoiceClose} />}
                {showPhoto && <PhotoLogger onClose={handlePhotoClose} />}
                {showReport && <WeeklyReport onClose={() => setShowReport(false)} />}
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
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center active:scale-90 transition-all text-brand-teal hover:bg-white/[0.08]"
                    >
                        <span className="material-icons text-lg">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/20">
                        <span className="text-base">🔥</span>
                        <span className="font-extrabold text-sm text-orange-400">{streak}</span>
                    </div>
                </div>
            </div>

            {/* Row 2: Action buttons */}
            <div className="flex gap-2">
                <button
                    onClick={handleVoiceOpen}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-teal-light text-bg-base font-bold text-xs shadow-lg shadow-brand-teal/15 active:scale-[0.97] transition-transform"
                >
                    <span className="material-icons text-base">mic</span>
                    Voice
                </button>
                <button
                    onClick={handlePhotoOpen}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white/80 font-bold text-xs active:scale-[0.97] transition-transform hover:bg-white/[0.08]"
                >
                    <span className="material-icons text-base">photo_camera</span>
                    Photo
                </button>
                <button
                    onClick={() => setShowReport(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-brand-coral/10 border border-brand-coral/15 text-brand-coral font-bold text-xs active:scale-[0.97] transition-transform hover:bg-brand-coral/15"
                >
                    <span className="material-icons text-base">assessment</span>
                    Report
                </button>
            </div>

            {/* NEW XP / Level Card */}
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
        </motion.div>
    );
}
