'use client';

import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import Header from '@/components/dashboard/Header';
import { motion } from 'framer-motion';

export default function InsightsPage() {
    const history = useOnboardingStore((state) => state.insightHistory);

    return (
        <>
            <Header />
            <div className="mt-8 flex flex-col gap-4">
                <h2 className="text-white/80 font-bold text-lg px-2">Insight History</h2>

                {history.length === 0 ? (
                    <div className="text-center py-12 text-white/40">
                        <p>No insights yet. Log some food!</p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-20">
                        {history.map((insight, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className="p-4 border-white/5 bg-white/5 relative overflow-hidden">
                                    {/* Accent Line */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${insight.type === 'success' ? 'bg-green-400' :
                                        insight.type === 'warning' ? 'bg-brand-coral' : 'bg-brand-teal'
                                        }`} />

                                    <div className="pl-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-icons text-lg text-white/60">
                                                {insight.type === 'success' ? 'check_circle' :
                                                    insight.type === 'warning' ? 'warning' : 'lightbulb'}
                                            </span>
                                            <span className="text-xs uppercase font-bold tracking-wider text-white/40">
                                                {insight.type}
                                            </span>
                                        </div>
                                        <p className="text-white font-medium text-sm leading-relaxed mb-2">
                                            {insight.message}
                                        </p>
                                        {insight.action && (
                                            <p className="text-xs text-white/60 italic">
                                                Tip: {insight.action}
                                            </p>
                                        )}
                                        {insight.xpBonus > 0 && (
                                            <div className="absolute top-4 right-4 text-xs font-bold text-brand-coral bg-brand-coral/10 px-2 py-1 rounded-full">
                                                +{insight.xpBonus} XP
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
