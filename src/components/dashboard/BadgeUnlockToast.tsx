'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function BadgeUnlockToast() {
    const { unlockedBadgeIds, badges } = useOnboardingStore();
    const [lastCount, setLastCount] = useState(unlockedBadgeIds.length);
    const [activeBadge, setActiveBadge] = useState<any>(null);

    useEffect(() => {
        if (unlockedBadgeIds.length > lastCount) {
            const newBadgeId = unlockedBadgeIds[unlockedBadgeIds.length - 1];
            const badge = badges.find(b => b.id === newBadgeId);
            if (badge) {
                // If a toast is already active, clear it first to reset animation
                setActiveBadge(null);

                // Use a small timeout to ensure the state change registers for the animation
                setTimeout(() => {
                    setActiveBadge(badge);
                    const timer = setTimeout(() => setActiveBadge(null), 5000); // 5 seconds is better
                }, 100);
            }
        }
        setLastCount(unlockedBadgeIds.length);
    }, [unlockedBadgeIds, badges]); // Removed lastCount from deps to prevent re-triggering loops

    return (
        <AnimatePresence>
            {activeBadge && (
                <motion.div
                    initial={{ y: -100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 20, opacity: 1, scale: 1 }}
                    exit={{ y: -100, opacity: 0, scale: 0.8 }}
                    className="fixed top-0 left-0 right-0 z-[110] flex justify-center pointer-events-none p-4"
                >
                    <GlassCard className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-4 bg-gradient-to-r from-brand-coral to-orange-500 border-white/20 shadow-[0_10px_30px_rgba(244,63,94,0.4)] relative overflow-hidden group">
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                <span className="material-icons text-white text-3xl">{activeBadge.icon}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Achievement Unlocked!</p>
                                <h4 className="text-white font-black text-lg leading-tight">{activeBadge.name}</h4>
                                <p className="text-white/80 text-[10px] italic">{activeBadge.description}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setActiveBadge(null)}
                            className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-black/20 transition-all z-10"
                        >
                            <span className="material-icons text-sm">close</span>
                        </button>

                        {/* Progress Bar for Auto-dismiss */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-white/30 z-20"
                        />
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
