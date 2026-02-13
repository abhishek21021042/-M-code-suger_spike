'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyStats } from '@/lib/analytics';
import GlassCard from '@/components/ui/GlassCard';

interface SugarTrendChartProps {
    data: DailyStats[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">{label}</p>
                <p className="text-xl font-black text-white">
                    {payload[0].value}
                    <span className="text-[10px] ml-1 text-brand-teal uppercase">grams</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function SugarTrendChart({ data }: SugarTrendChartProps) {
    // Transform data for Recharts if necessary
    // Recharts expects an array of objects
    const chartData = data.map(day => ({
        name: day.dayName,
        sugar: day.xp, // Using xp as sugar intake for now based on SugarChart.tsx
    }));

    return (
        <GlassCard className="p-0 border-white/5 bg-black/20 relative overflow-hidden h-64">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '2rem 2rem' }}
            />

            <div className="p-5 flex justify-between items-center relative z-10">
                <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="material-icons text-brand-coral text-sm">show_chart</span>
                    Sugar Consumption Trend
                </h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-brand-coral" />
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-tight">Intake</span>
                    </div>
                </div>
            </div>

            <div className="h-40 w-full px-2 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="sugar"
                            stroke="#FF6B6B"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSugar)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </GlassCard>
    );
}
