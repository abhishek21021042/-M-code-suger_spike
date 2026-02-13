'use client';

import { motion } from 'framer-motion';
import { DailyStats } from '@/lib/analytics';
import GlassCard from '@/components/ui/GlassCard';

interface SugarChartProps {
    data: DailyStats[];
}

export default function SugarChart({ data }: SugarChartProps) {
    const maxXP = Math.max(...data.map(d => d.xp), 50); // Minimum scale of 50

    return (
        <GlassCard className="p-4 border-white/5 bg-black/20">
            <h3 className="text-white/70 text-sm font-bold mb-4 flex items-center gap-2">
                <span className="material-icons text-brand-teal text-base">bar_chart</span>
                Weekly Sugar Impact
            </h3>

            <div className="flex items-end justify-between h-32 gap-2">
                {data.map((day, index) => {
                    const heightPercent = Math.min((day.xp / maxXP) * 100, 100);

                    return (
                        <div key={day.date} className="flex flex-col items-center gap-2 flex-1 group relative">
                            {/* Tooltip */}
                            <div className="absolute -top-8 bg-brand-teal text-bg-base text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {day.xp} XP
                            </div>

                            {/* Bar Track */}
                            <div className="w-2 md:w-3 h-full bg-white/5 rounded-full relative overflow-hidden flex items-end">
                                {/* Bar Fill */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercent}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1, type: 'spring' }}
                                    className={`w-full rounded-full ${day.dayName === 'Today' ? 'bg-gradient-to-t from-brand-coral to-brand-coral-light' : 'bg-gradient-to-t from-brand-teal to-brand-teal-light'}`}
                                />
                            </div>

                            {/* Label */}
                            <span className={`text-[10px] font-medium ${day.dayName === 'Today' ? 'text-white' : 'text-white/40'}`}>
                                {day.dayName.slice(0, 1)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
}
