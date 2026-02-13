'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import { soundManager } from '@/lib/sounds';
import GlassCard from '@/components/ui/GlassCard';
import { useState } from 'react';
import CustomItemModal from '@/components/dashboard/inputs/CustomItemModal';

// Preset Items
const PRESETS = [
    { id: 'coffee', emoji: '☕', name: 'Coffee', xp: 5, sugar: 2 },
    { id: 'soda', emoji: '🥤', name: 'Soda', xp: 2, sugar: 35 },
    { id: 'candy', emoji: '🍬', name: 'Candy', xp: 2, sugar: 25 },
    { id: 'cookie', emoji: '🍪', name: 'Cookie', xp: 5, sugar: 15 },
    { id: 'cake', emoji: '🍰', name: 'Cake', xp: 10, sugar: 30 },
    { id: 'icecream', emoji: '🍦', name: 'Ice Cream', xp: 8, sugar: 20 },
    { id: 'snack', emoji: '🍿', name: 'Snack', xp: 5, sugar: 5 },
    { id: 'energy', emoji: '⚡', name: 'Energy', xp: 2, sugar: 30 },
    { id: 'other', emoji: '➕', name: 'Other', xp: 5, sugar: 5 },
];

function getSugarColor(sugar: number) {
    if (sugar <= 10) return { bg: 'bg-sugar-low/15', text: 'text-sugar-low', dot: 'bg-sugar-low' };
    if (sugar <= 25) return { bg: 'bg-sugar-mid/15', text: 'text-sugar-mid', dot: 'bg-sugar-mid' };
    return { bg: 'bg-sugar-high/15', text: 'text-sugar-high', dot: 'bg-sugar-high' };
}

export default function QuickLogGrid() {
    const { proposeLog, customPresets } = useOnboardingStore();
    const [showCustomModal, setShowCustomModal] = useState(false);

    // Combine standard presets + custom presets + 'Other' button
    const allItems = [
        ...PRESETS,
        ...customPresets,
        { id: 'add-custom', emoji: '➕', name: 'Other', xp: 5, sugar: 0 }
    ];

    const handleLog = (item: any) => {
        soundManager.play('pop');
        soundManager.vibrate([10]);

        if (item.id === 'add-custom') {
            setShowCustomModal(true);
            return;
        }

        proposeLog({
            emoji: item.emoji,
            name: item.name,
            xp: item.xp,
            sugar: item.sugar,
        });
    };

    return (
        <div className="w-full">
            <AnimatePresence>
                {showCustomModal && <CustomItemModal onClose={() => setShowCustomModal(false)} />}
            </AnimatePresence>

            <h2 className="text-white/50 font-bold mb-3 text-[11px] uppercase tracking-[0.15em]">Quick Add</h2>
            <div className="grid grid-cols-3 gap-2.5">
                {allItems.map((item, index) => {
                    const sc = getSugarColor(item.sugar);
                    const isCustomBtn = item.id === 'add-custom';

                    return (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.03 }}
                            onClick={() => handleLog(item)}
                            className="relative group"
                        >
                            <GlassCard className={`
                                py-3.5 px-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-300
                                ${isCustomBtn
                                    ? 'border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05]'
                                    : 'border-white/[0.04] hover:border-brand-teal/20 hover:bg-white/[0.06]'}
                            `}>
                                {/* Sugar indicator dot (hide for Other btn) */}
                                {!isCustomBtn && (
                                    <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${sc.dot} opacity-70`} />
                                )}

                                <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {item.emoji}
                                </span>
                                <span className="text-[10px] font-bold text-white/80 leading-tight">{item.name}</span>
                                <span className={`text-[8px] font-semibold ${sc.text} ${sc.bg} px-1.5 py-0.5 rounded-full leading-none`}>
                                    {item.sugar}g
                                </span>
                            </GlassCard>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
