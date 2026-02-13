'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';

export default function InsightCard() {
    const { showInsight, latestInsight, dismissInsight, completeAction, pendingActionId } = useOnboardingStore();

    if (!showInsight || !latestInsight) return null;

    const handleActionClick = () => {
        if (pendingActionId) {
            completeAction(pendingActionId);
        } else {
            dismissInsight();
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="w-full max-w-sm"
                >
                    <GlassCard className="p-6 flex flex-col gap-4 border-brand-teal/30 shadow-[0_0_50px_rgba(78,205,196,0.3)] bg-[var(--bg-neu-light)]">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">
                                    {latestInsight.type === 'warning' ? '⚠️' : latestInsight.type === 'info' ? '💡' : '🎉'}
                                </span>
                                <div>
                                    <h3 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>
                                        {latestInsight.message}
                                    </h3>
                                    <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                                        +{latestInsight.xpBonus} XP Earned
                                    </span>
                                </div>
                            </div>
                            <button onClick={dismissInsight} className="text-white/40 hover:text-white">
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {latestInsight.reason}
                            </p>

                            <div className="p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-brand-teal/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000" />
                                <div className="flex items-center justify-between mb-1 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="material-icons text-brand-teal text-sm">bolt</span>
                                        <span className="text-xs font-bold text-brand-teal uppercase">Quick Fix</span>
                                    </div>
                                    <span className="text-[10px] font-black text-brand-teal">+25 XP</span>
                                </div>
                                <p className="text-sm font-medium relative z-10" style={{ color: 'var(--foreground)' }}>{latestInsight.action}</p>
                            </div>

                            {/* Scientist Insight (Explainability) */}
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-icons text-white/40 text-sm">psychology</span>
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">The Science</span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-white/60 italic">
                                    {latestInsight.explanation}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleActionClick}
                                className="w-full py-3 rounded-xl bg-brand-teal text-bg-base font-bold shadow-lg shadow-brand-teal/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <span className="material-icons text-sm">rocket_launch</span>
                                I'm doing this!
                            </button>
                            <button
                                onClick={dismissInsight}
                                className="w-full py-2 rounded-xl text-white/40 text-xs font-bold hover:text-white/60 transition-colors"
                            >
                                Not right now
                            </button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
