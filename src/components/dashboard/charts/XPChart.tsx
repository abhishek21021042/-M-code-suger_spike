'use client';

import { motion } from 'framer-motion';
import { DailyStats } from '@/lib/analytics';
import GlassCard from '@/components/ui/GlassCard';

interface XPChartProps {
    data: DailyStats[];
}

export default function XPChart({ data }: XPChartProps) {
    const maxXP = Math.max(...data.map(d => d.xp), 50);

    // Create SVG path for the line
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (d.xp / maxXP) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <GlassCard className="p-4 border-white/5 bg-black/20">
            <h3 className="text-white/70 text-sm font-bold mb-4 flex items-center gap-2">
                <span className="material-icons text-brand-coral text-base">trending_up</span>
                XP Growth
            </h3>

            <div className="h-32 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <motion.path
                        d={`M0,100 ${points.split(' ').map(p => `L${p}`).join(' ')} L100,100 Z`}
                        fill="url(#xpGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Line Stroke */}
                    <motion.polyline
                        fill="none"
                        stroke="#FB923C"
                        strokeWidth="3"
                        points={points}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Points */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const y = 100 - (d.xp / maxXP) * 100;
                        return (
                            <motion.circle
                                key={d.date}
                                cx={x}
                                cy={y}
                                r="4" // Radius relative to viewBox might be huge if not careful. 
                                // SVG viewBox 0 0 100 100 means r=4 is 4% of width. That's fine.
                                fill="#fff"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + i * 0.1 }}
                            />
                        );
                    })}
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between mt-2 px-1">
                    {data.map((d) => (
                        <span key={d.date} className="text-[9px] text-white/40">{d.dayName.slice(0, 1)}</span>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
