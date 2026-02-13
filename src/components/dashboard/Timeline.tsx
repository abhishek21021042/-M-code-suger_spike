'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore, LogEntry } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';

export default function Timeline() {
    const { logs, deleteLog } = useOnboardingStore();

    const formatTime = (iso: string) => {
        return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="w-full flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-white/50 font-bold text-[11px] uppercase tracking-[0.15em]">Today's Timeline</h2>
                {logs.length > 0 && (
                    <span className="text-[10px] font-bold text-brand-teal/60 bg-brand-teal/10 px-2 py-0.5 rounded-full">
                        {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
                    </span>
                )}
            </div>

            {logs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                        <span className="text-3xl opacity-30">🦕</span>
                    </div>
                    <p className="text-[11px] text-white/25 font-medium">No activity yet</p>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto pr-1 space-y-2 pb-4 scrollbar-hide relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[23px] top-2 bottom-6 w-px bg-gradient-to-b from-brand-teal/20 via-brand-teal/10 to-transparent pointer-events-none" />

                    <AnimatePresence mode="popLayout">
                        {logs.map((log, index) => (
                            <motion.div
                                key={log.id}
                                layout
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="relative group"
                            >
                                {/* Front Card */}
                                <GlassCard className="relative z-10 flex items-center gap-3 p-3 border-white/[0.04] hover:border-white/[0.08] transition-colors">
                                    {/* Timeline dot */}
                                    <div className="w-[46px] h-[46px] rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xl flex-shrink-0">
                                        {log.emoji}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--foreground)' }}>{log.name}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-white/30">{formatTime(log.timestamp)}</span>
                                            {log.sugar !== undefined && (
                                                <span className="text-[9px] font-semibold text-white/25">• {log.sugar}g sugar</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 bg-brand-gold/10 px-2 py-1 rounded-lg border border-brand-gold/15">
                                        <span className="text-[10px] font-black text-brand-gold">+{log.xp}</span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
