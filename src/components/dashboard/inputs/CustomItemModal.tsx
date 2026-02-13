'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useOnboardingStore } from '@/lib/store';

export default function CustomItemModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState('');
    const [sugar, setSugar] = useState('');
    const { addLog, addCustomPreset } = useOnboardingStore();

    const handleSave = () => {
        if (!name || !sugar) return;

        const sugarVal = parseFloat(sugar);
        const preset = {
            emoji: '🍽️', // Default emoji for now, could add picker later
            name: name,
            xp: 10,
            sugar: sugarVal
        };

        // 1. Add to custom presets for future
        addCustomPreset(preset);

        // 2. Log it immediately
        addLog({
            ...preset,
            // ID and timestamp handled by store
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm"
            >
                <GlassCard className="p-6 relative overflow-hidden">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/40 hover:text-white"
                    >
                        <span className="material-icons">close</span>
                    </button>

                    <h3 className="text-xl font-bold mb-1">Add Custom Item</h3>
                    <p className="text-sm text-white/50 mb-6">Create a new item to log and save for later.</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-1.5 ml-1">
                                Item Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Homemade Cookie"
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/50 transition-colors"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-1.5 ml-1">
                                Sugar Content (g)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={sugar}
                                    onChange={(e) => setSugar(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-teal/50 transition-colors"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold pointer-events-none">
                                    grams
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={!name || !sugar}
                            className={`w-full py-3.5 rounded-xl font-bold text-bg-base mt-4 transition-all ${name && sugar
                                    ? 'bg-brand-teal shadow-lg shadow-brand-teal/20 hover:scale-[1.02] active:scale-95'
                                    : 'bg-white/10 text-white/20 cursor-not-allowed'
                                }`}
                        >
                            Save & Log
                        </button>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
