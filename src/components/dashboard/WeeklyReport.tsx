'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useOnboardingStore } from '@/lib/store';

export default function WeeklyReport({ onClose }: { onClose: () => void }) {
    const { logs, level, streak } = useOnboardingStore();

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-sm"
            >
                <GlassCard className="p-8 border-brand-teal/30 shadow-[0_0_50px_rgba(45,212,191,0.2)] bg-[var(--bg-neu-dark)]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-white italic">WEEKLY REPORT</h2>
                            <p className="text-brand-teal text-[10px] font-bold tracking-widest uppercase">Performance Summary</p>
                        </div>
                        <button onClick={onClose} className="text-white/20 hover:text-white">
                            <span className="material-icons">close</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <p className="text-[9px] text-white/40 uppercase font-bold mb-1">Total Logs</p>
                                <p className="text-xl font-black text-white">{logs.length}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <p className="text-[9px] text-white/40 uppercase font-bold mb-1">Avg Spike</p>
                                <p className="text-xl font-black text-brand-coral">Moderate</p>
                            </div>
                        </div>

                        {/* Achievement Summary */}
                        <div className="p-4 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">🏆</span>
                                <div>
                                    <h4 className="text-white font-bold text-sm text-brand-teal">Top Performer</h4>
                                    <p className="text-[10px] text-white/40 italic">You reached Level {level} this week!</p>
                                </div>
                            </div>
                        </div>

                        {/* Motivational Quote */}
                        <p className="text-center text-xs text-white/60 italic leading-relaxed px-4">
                            "One bad log doesn't break a streak, but data mindfulness builds a legacy."
                        </p>
                    </div>

                    <button
                        onClick={() => window.print()}
                        className="w-full mt-8 py-3 rounded-xl bg-brand-teal text-bg-base font-black uppercase tracking-widest text-sm shadow-lg shadow-brand-teal/20"
                    >
                        Download PDF
                    </button>
                </GlassCard>
            </motion.div>
        </div>
    );
}
