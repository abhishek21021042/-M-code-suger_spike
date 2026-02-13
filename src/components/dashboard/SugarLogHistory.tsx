'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore, LogEntry } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import { format, isSameDay, parseISO } from 'date-fns';

export default function SugarLogHistory() {
    const logs = useOnboardingStore((state) => state.logs);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateInputRef = React.useRef<HTMLInputElement>(null);

    const filteredLogs = useMemo(() => {
        return logs.filter(log => isSameDay(parseISO(log.timestamp), selectedDate))
            .sort((a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime());
    }, [logs, selectedDate]);

    const handleCalendarClick = () => {
        if (dateInputRef.current) {
            try {
                // Modern browsers support showPicker()
                // @ts-ignore
                if (dateInputRef.current.showPicker) {
                    // @ts-ignore
                    dateInputRef.current.showPicker();
                } else {
                    dateInputRef.current.focus();
                    dateInputRef.current.click();
                }
            } catch (err) {
                // Fallback for older browsers
                dateInputRef.current.click();
            }
        }
    };

    return (
        <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden group">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-white font-black text-xl italic uppercase tracking-tight flex items-center gap-2">
                        Sugar Log
                    </h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                        Review your daily intake
                    </p>
                </div>

                {/* Date Picker Trigger (Styled like the sketch) */}
                <div
                    onClick={handleCalendarClick}
                    className="relative cursor-pointer active:scale-95 transition-transform"
                >
                    <input
                        ref={dateInputRef}
                        type="date"
                        value={format(selectedDate, 'yyyy-MM-dd')}
                        onChange={(e) => {
                            if (e.target.value) {
                                setSelectedDate(parseISO(e.target.value));
                            }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                    />
                    <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex flex-col items-center gap-1 relative z-10 hover:bg-white/10 transition-colors">
                        {/* Spiral binder dots */}
                        <div className="flex gap-1 -mt-3.5 mb-1.5">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-brand-coral uppercase leading-none">
                            {format(selectedDate, 'MMM')}
                        </span>
                        <span className="text-sm font-black text-white leading-none">
                            {format(selectedDate, 'dd')}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center gap-3 group/item transition-all duration-300"
                            >
                                {/* Status dot from sketch */}
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-coral/60 group-hover/item:scale-150 transition-transform shadow-[0_0_8px_rgba(255,83,83,0.4)]" />

                                <div className="flex-1 flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-3 rounded-2xl group-hover/item:bg-white/5 transition-colors">
                                    <div className="text-2xl filter drop-shadow-md group-hover/item:scale-110 transition-transform">
                                        {log.emoji}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-bold text-sm truncate uppercase tracking-tight italic">
                                            {log.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] font-bold text-white/30 uppercase">
                                                {format(parseISO(log.timestamp), 'h:mm a')}
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-white/10" />
                                            <span className="text-[9px] font-black text-brand-teal uppercase">
                                                {log.sugar || 0}g sugar
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-brand-coral/10 px-2 py-1 rounded-lg border border-brand-coral/20">
                                        <span className="text-[10px] font-black text-brand-coral">+{log.xp} XP</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <span className="material-icons text-white/10 text-4xl mb-2">history</span>
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
                                No logs for this date
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Decor */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
                <span className="material-icons text-8xl">receipt_long</span>
            </div>
        </GlassCard>
    );
}
