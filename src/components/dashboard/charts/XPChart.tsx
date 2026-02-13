'use client';

import { motion } from 'framer-motion';
import { DailyStats } from '@/lib/analytics';
import GlassCard from '@/components/ui/GlassCard';

interface XPChartProps {
    data: DailyStats[];
}

// Helper to generate a smooth Catmull-Rom spline path
function getCatmullRomPath(data: DailyStats[], maxXP: number) {
    if (data.length === 0) return "";

    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d.xp / maxXP) * 100
    }));

    if (points.length < 2) return "";

    let d = `M${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return d;
}

export default function XPChart({ data }: XPChartProps) {
    const maxXP = Math.max(...data.map(d => d.xp), 50);
    const smoothPath = getCatmullRomPath(data, maxXP);

    return (
        <GlassCard className="p-5 border-white/5 bg-[#0f0f13]/80 relative overflow-hidden">
            {/* Subtle Background Grid */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '2rem 2rem' }}
            />

            <h3 className="text-white/80 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                <span className="material-icons text-brand-coral text-sm">trending_up</span>
                XP Growth
            </h3>

            <div className="h-48 w-full relative z-10">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        {/* Depth Gradient */}
                        <linearGradient id="depthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#FB923C" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
                        </linearGradient>

                        {/* Line Flow Gradient */}
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#F472B6" /> {/* Pink */}
                            <stop offset="50%" stopColor="#FB923C" /> {/* Orange */}
                            <stop offset="100%" stopColor="#F472B6" /> {/* Pink */}
                        </linearGradient>

                        {/* Glow Filter */}
                        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Fill Area */}
                    <motion.path
                        d={`${smoothPath} L100,100 L0,100 Z`}
                        fill="url(#depthGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    />

                    {/* Smooth Stroke */}
                    <motion.path
                        d={smoothPath}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#softGlow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />

                    {/* Interactive Points */}
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const y = 100 - (d.xp / maxXP) * 100;
                        return (
                            <g key={d.date} className="group">
                                {/* Touch Target */}
                                <circle cx={x} cy={y} r="8" fill="transparent" className="cursor-pointer" />

                                {/* Point */}
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r="3"
                                    fill="#1a1a1a"
                                    stroke="#FB923C"
                                    strokeWidth="2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.5 + i * 0.1 }}
                                    className="group-hover:r-5 group-hover:stroke-white transition-all duration-300"
                                />

                                {/* Floating Tooltip */}
                                <foreignObject x={x - 20} y={y - 45} width="80" height="40" className="overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl border border-white/20 whitespace-nowrap">
                                            {d.xp} XP
                                        </div>
                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white/20 mt-[-1px]"></div>
                                    </div>
                                </foreignObject>
                            </g>
                        );
                    })}
                </svg>

                {/* X-Axis */}
                <div className="flex justify-between mt-4 px-1">
                    {data.map((d) => (
                        <span key={d.date} className="text-[10px] font-bold text-white/20 uppercase tracking-wider">{d.dayName.slice(0, 3)}</span>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
