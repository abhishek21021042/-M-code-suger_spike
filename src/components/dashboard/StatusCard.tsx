'use client';

import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';

export default function StatusCard() {
    const { xp, level, logs } = useOnboardingStore();

    // --- XP Logic ---
    const nextLevelXP = level * 500;
    const xpProgress = Math.min(100, ((xp % 500) / 500) * 100);
    const xpToNext = nextLevelXP - xp;

    // --- Sugar Logic ---
    const today = new Date().toDateString();
    const todayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === today);
    const totalSugar = todayLogs.reduce((sum, log) => sum + (log.sugar || 0), 0);
    const DAILY_LIMIT = 40;
    const sugarProgress = Math.min(100, (totalSugar / DAILY_LIMIT) * 100);

    let sugarState: 'safe' | 'warning' | 'danger' = 'safe';
    if (totalSugar >= DAILY_LIMIT) sugarState = 'danger';
    else if (totalSugar >= DAILY_LIMIT * 0.8) sugarState = 'warning';

    const sugarColors = {
        safe: { text: 'text-sugar-low', gradient: 'from-sugar-low to-emerald-400', bg: 'bg-sugar-low' },
        warning: { text: 'text-sugar-mid', gradient: 'from-sugar-mid to-amber-400', bg: 'bg-sugar-mid' },
        danger: { text: 'text-sugar-high', gradient: 'from-sugar-high to-red-500', bg: 'bg-sugar-high' },
    };
    const sc = sugarColors[sugarState];

    return (
        <GlassCard className="p-5 relative overflow-hidden border-white/[0.08] flex flex-col gap-6">

            {/* --- Level Section --- */}
            <div>
                <div className="flex justify-between items-end mb-3 relative z-10">
                    <div>
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Current Level</div>
                        <div className="text-4xl font-black italic tracking-tight text-white flex items-baseline gap-1">
                            <span className="text-xl opacity-50 not-italic font-bold">LVL</span>
                            {level}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold text-white/50 mb-1">
                            <span className="text-white">{xp}</span> <span className="opacity-50">/ {nextLevelXP} XP</span>
                        </div>
                        <div className="text-[10px] font-bold text-brand-teal italic">
                            {xpToNext} XP to next
                        </div>
                    </div>
                </div>

                {/* Custom Styles for Modern Animations */}
                {/* Custom Styles for Modern Animations */}
                <style jsx>{`
                    @keyframes wave {
                        0% { transform: translateX(0) translateZ(0) scaleY(1); }
                        50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
                        100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
                    }
                     @keyframes float-bubble {
                        0% { transform: translateY(120%) scale(0.8) rotate(0deg); opacity: 0; }
                        20% { opacity: 0.6; }
                        100% { transform: translateY(-50%) scale(1.2) rotate(360deg); opacity: 0; }
                    }
                    @keyframes pulse-ring {
                        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
                        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
                        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
                    }
                `}</style>

                <div className="h-4 w-full bg-black/50 rounded-full relative z-10 border border-white/5 shadow-inner overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                    />

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress}%` }}
                        transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                        className="h-full relative rounded-full overflow-hidden"
                    >
                        {/* Energy Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal via-teal-400 to-white" />

                        {/* Moving Particles/Sparks */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                        {/* Leading Edge Glow */}
                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-white blur-md" />
                    </motion.div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* --- Sugar Section --- */}
            <div>
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Daily Sugar Intake</h3>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-3xl font-black ${sc.text} tabular-nums relative`}>
                                {Math.round(totalSugar)}
                                <span className={`absolute -inset-1 blur-xl opacity-20 ${sc.bg}`} />
                            </span>
                            <span className="text-sm font-bold text-white/40">/ {DAILY_LIMIT}g</span>
                        </div>
                    </div>

                    <div className={`px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] backdrop-blur-md shadow-lg`}>
                        <p className={`text-[9px] font-bold ${sc.text} uppercase tracking-wide`}>
                            {sugarState === 'safe' ? 'Healthy Zone' : sugarState === 'warning' ? 'Approaching Limit' : 'Limit Exceeded'}
                        </p>
                    </div>
                </div>

                <div className="h-5 w-full bg-black/60 rounded-full relative border border-white/10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Glass Reflection Top */}
                    <div className="absolute top-[2px] left-2 right-2 h-[2px] bg-white/10 rounded-full z-20 pointer-events-none" />

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sugarProgress}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-full relative rounded-full overflow-hidden ${sc.bg}`} // Use flat color for base to avoid gradient conflicts
                    >
                        {/* Liquid Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${sc.gradient} opacity-90`} />

                        {/* Wave SVG Animation */}
                        <div
                            className="absolute top-0 bottom-0 -left-full w-[200%] opacity-40 mix-blend-overlay"
                            style={{
                                background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23ffffff\' opacity=\'.5\'/%3E%3Cpath d=\'M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z\' fill=\'%23ffffff\' opacity=\'.5\'/%3E%3C/svg%3E") repeat-x',
                                backgroundSize: '50% 100%',
                                animation: 'wave 4s linear infinite'
                            }}
                        />

                        {/* Bubbles */}
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-white/40 rounded-full blur-[1px]"
                                style={{
                                    left: `${20 + i * 30}%`,
                                    bottom: '-20%',
                                    width: `${4 + Math.random() * 4}px`,
                                    height: `${4 + Math.random() * 4}px`,
                                    animation: `float-bubble ${2 + Math.random()}s infinite linear`,
                                    animationDelay: `${Math.random()}s`
                                }}
                            />
                        ))}

                        {/* Glare line */}
                        <div className="absolute top-[2px] left-[2px] right-[2px] h-[1px] bg-white/40 opacity-50" />
                    </motion.div>
                </div>

                <p className="mt-3 text-[10px] text-white/40 leading-relaxed font-medium">
                    {sugarState === 'safe'
                        ? "Great job! You're keeping your sugar intake well within healthy limits."
                        : sugarState === 'warning'
                            ? "Careful! You're getting close to the recommended daily maximum."
                            : "Whoa there! Try to stick to lower sugar options for the rest of the day."}
                </p>
            </div>

            {/* Background Gradient Blob */}
            <div className={`absolute -right-4 -bottom-10 w-32 h-32 rounded-full blur-[60px] opacity-20 ${sc.bg} pointer-events-none transition-colors duration-500`} />
            <div className="absolute -left-4 top-10 w-32 h-32 rounded-full blur-[60px] opacity-10 bg-brand-teal pointer-events-none" />

        </GlassCard>
    );
}
