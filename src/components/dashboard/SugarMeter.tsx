'use client';

import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';

export default function SugarMeter() {
    const logs = useOnboardingStore((state) => state.logs);

    // Calculate total sugar for today
    const today = new Date().toDateString();
    const todayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === today);
    const totalSugar = todayLogs.reduce((sum, log) => sum + (log.sugar || 0), 0);

    const DAILY_LIMIT = 40; // Recommended daily sugar limit (g) for adults
    const progress = Math.min(100, (totalSugar / DAILY_LIMIT) * 100);

    // Determine color state
    let state: 'safe' | 'warning' | 'danger' = 'safe';
    if (totalSugar >= DAILY_LIMIT) state = 'danger';
    else if (totalSugar >= DAILY_LIMIT * 0.8) state = 'warning';

    const colors = {
        safe: { bg: 'bg-sugar-low', text: 'text-sugar-low', gradient: 'from-sugar-low to-emerald-400' },
        warning: { bg: 'bg-sugar-mid', text: 'text-sugar-mid', gradient: 'from-sugar-mid to-amber-400' },
        danger: { bg: 'bg-sugar-high', text: 'text-sugar-high', gradient: 'from-sugar-high to-red-500' },
    };

    const c = colors[state];

    return (
        <GlassCard className="p-4 relative overflow-hidden border-white/[0.08]">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-0.5">Daily Sugar Intake</h3>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-black ${c.text} tabular-nums`}>
                            {Math.round(totalSugar)}
                        </span>
                        <span className="text-sm font-bold text-white/40">/ {DAILY_LIMIT}g</span>
                    </div>
                </div>

                <div className={`px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] backdrop-blur-md`}>
                    <p className={`text-[10px] font-bold ${c.text} uppercase`}>
                        {state === 'safe' ? 'Healthy Zone' : state === 'warning' ? 'Approaching Limit' : 'Limit Exceeded'}
                    </p>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden relative border border-white/[0.05]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full relative rounded-full bg-gradient-to-r ${c.gradient}`}
                >
                    {/* Animated striped pattern */}
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                            backgroundSize: '1rem 1rem',
                            animation: 'progress-bar-stripes 1s linear infinite'
                        }}
                    />

                    {/* Glow effect at the tip */}
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[4px]" />
                </motion.div>
            </div>

            {/* Contextual Message */}
            <p className="mt-3 text-[10px] text-white/40 leading-relaxed font-medium">
                {state === 'safe'
                    ? "Great job! You're keeping your sugar intake well within healthy limits."
                    : state === 'warning'
                        ? "Careful! You're getting close to the recommended daily maximum."
                        : "Whoa there! Try to stick to lower sugar options for the rest of the day."}
            </p>

            {/* Background Gradient Blob */}
            <div className={`absolute -right-4 -bottom-10 w-24 h-24 rounded-full blur-[50px] opacity-20 ${c.bg} pointer-events-none`} />
        </GlassCard>
    );
}

// Add keyframes for striped animation to globals via style tag or global css if not present.
// For now, we'll assume standard Tailwind or add a small inline style for the animation if needed.
