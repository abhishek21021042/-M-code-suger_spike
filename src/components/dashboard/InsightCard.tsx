'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';

export default function InsightCard() {
    const { showInsight, latestInsight, pendingLog, commitLog, cancelLog } = useOnboardingStore();

    if (!showInsight || !latestInsight) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="w-full max-w-sm"
                >
                    <GlassCard className="p-6 flex flex-col gap-4 border-brand-teal/30 shadow-[0_0_50px_rgba(78,205,196,0.3)] bg-[var(--bg-neu-light)]">
                        {/* Header with status */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">
                                    {latestInsight.type === 'warning' ? '⚠️' : latestInsight.type === 'info' ? '💡' : '🎉'}
                                </span>
                                <div>
                                    <h3 className="font-black text-lg uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                                        {pendingLog ? 'Confirm Your Log' : latestInsight.message}
                                    </h3>
                                    <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mt-0.5">
                                        Potential metabolic impact detected
                                    </p>
                                </div>
                            </div>
                            <button onClick={cancelLog} className="text-white/40 hover:text-white transition-colors">
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        {/* Pending Log Quick View from sketch style */}
                        {pendingLog && (
                            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-4 rounded-2xl">
                                <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                                    {pendingLog.emoji}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-0.5">Logging Item</p>
                                    <h4 className="text-white font-black text-lg italic uppercase tracking-tight">{pendingLog.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[9px] font-black text-brand-teal uppercase tracking-widest bg-brand-teal/10 px-1.5 py-0.5 rounded">
                                            {pendingLog.sugar || 0}g Sugar
                                        </span>
                                        <span className="text-[9px] font-black text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-1.5 py-0.5 rounded">
                                            +{pendingLog.calculatedXP} XP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* The Insight Message */}
                            <div className="bg-brand-coral/5 border-l-2 border-brand-coral/40 p-3 italic">
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    "{latestInsight.reason}"
                                </p>
                            </div>

                            {/* New Mission / Quick Fix */}
                            <div className="p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-brand-teal/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000" />
                                <div className="flex items-center justify-between mb-1 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons text-brand-teal text-sm">
                                            {latestInsight.mission ? 'assignment' : 'bolt'}
                                        </span>
                                        <span className="text-xs font-bold text-brand-teal uppercase">
                                            {latestInsight.mission ? 'New Recovery Mission' : 'Metabolic Quick Fix'}
                                        </span>
                                    </div>
                                    {latestInsight.mission && (
                                        <span className="text-[10px] font-black text-brand-teal">
                                            +{latestInsight.mission.xp} XP
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-bold relative z-10" style={{ color: 'var(--foreground)' }}>
                                    {latestInsight.mission ? latestInsight.mission.title : latestInsight.action}
                                </p>
                            </div>

                            {/* Scientist Insight */}
                            <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-icons text-brand-gold text-xs">psychology</span>
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Metabolic Science</span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-white/50 font-medium">
                                    {latestInsight.explanation}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-2">
                            <button
                                onClick={commitLog}
                                className="w-full py-4 rounded-xl bg-brand-teal text-bg-base font-black uppercase tracking-widest shadow-lg shadow-brand-teal/20 active:scale-95 transition-transform flex items-center justify-center gap-3 group"
                            >
                                <span className="material-icons text-sm group-hover:animate-bounce">check_circle</span>
                                Confirm & Log Entry
                            </button>
                            <button
                                onClick={cancelLog}
                                className="w-full py-3 rounded-xl border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-icons text-sm">cancel</span>
                                Discard (Misclick)
                            </button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
