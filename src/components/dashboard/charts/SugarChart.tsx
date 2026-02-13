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
        <GlassCard className="p-5 border-white/5 bg-black/20 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '1rem 1rem' }}
            />

            <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                <span className="material-icons text-brand-teal text-sm">bar_chart</span>
                Weekly Sugar Impact
            </h3>

            <div className="flex items-end justify-between h-36 gap-3 relative z-10 px-2">
                {data.map((day, index) => {
                    const heightPercent = Math.min((day.xp / maxXP) * 100, 100);
                    const isToday = day.dayName === 'Today';

                    return (
                        <div key={day.date} className="flex flex-col items-center gap-3 flex-1 group relative">
                            {/* Floating Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 shadow-xl border border-white/10 whitespace-nowrap z-20 pointer-events-none">
                                <span className="text-brand-teal mr-1">{day.xp}g</span> Sugar
                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-r border-b border-white/10"></div>
                            </div>

                            {/* Bar Container */}
                            <div className="w-full h-full relative flex items-end justify-center">
                                {/* Bar Track */}
                                <div className="absolute inset-0 bg-white/[0.03] rounded-t-lg mx-auto w-2 sm:w-3" />

                                {/* Active Bar */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercent}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', damping: 20 }}
                                    className={`w-2 sm:w-3 rounded-t-lg relative ${isToday ? 'bg-gradient-to-t from-brand-coral via-coral-400 to-white' : 'bg-gradient-to-t from-brand-teal via-teal-400 to-white'}`}
                                >
                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 blur-md opacity-40 ${isToday ? 'bg-brand-coral' : 'bg-brand-teal'}`} />

                                    {/* Top Cap Highlight */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white opacity-50" />
                                </motion.div>
                            </div>

                            {/* Label */}
                            <span className={`text-[10px] font-bold tracking-wider ${isToday ? 'text-white scale-110' : 'text-white/30'}`}>
                                {day.dayName.slice(0, 1)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
}
