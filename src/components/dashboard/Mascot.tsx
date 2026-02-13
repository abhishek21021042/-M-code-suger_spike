'use client';

import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';

export default function Mascot() {
    const { logs, streak } = useOnboardingStore();

    const today = new Date().toDateString();
    const todayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === today).length;

    let status: 'happy' | 'neutral' | 'concerned' | 'fire' = 'neutral';
    if (streak >= 3) status = 'fire';
    else if (todayLogs === 0) status = 'neutral';
    else if (todayLogs < 3) status = 'happy';
    else status = 'concerned';

    const variants = {
        happy: { emoji: '😊', gradient: 'from-green-500/10 to-emerald-500/5', border: 'border-green-500/15', dot: 'bg-green-400' },
        neutral: { emoji: '😶', gradient: 'from-white/5 to-white/[0.02]', border: 'border-white/[0.06]', dot: 'bg-white/30' },
        concerned: { emoji: '🤨', gradient: 'from-brand-coral/10 to-rose-500/5', border: 'border-brand-coral/15', dot: 'bg-brand-coral' },
        fire: { emoji: '🔥', gradient: 'from-orange-500/10 to-amber-500/5', border: 'border-orange-500/15', dot: 'bg-orange-400' },
    };

    const v = variants[status];

    const messages = {
        fire: { title: "You're on fire!", sub: 'Keep that streak alive for bonus XP.' },
        happy: { title: 'Taming the spike!', sub: 'Your body thanks you for the moderation.' },
        concerned: { title: 'Watch the sugar!', sub: 'Maybe stick to water for a while?' },
        neutral: { title: 'Ready to log?', sub: 'Start your day with a healthy log.' },
    };

    return (
        <GlassCard className={`p-4 flex items-center gap-3.5 overflow-hidden relative bg-gradient-to-r ${v.gradient} ${v.border}`}>
            {/* Floating Emoji */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex-shrink-0"
            >
                <div className="text-4xl w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]">
                    {v.emoji}
                </div>
            </motion.div>

            {/* Message */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${v.dot} animate-pulse`} />
                    <h4 className="text-white font-bold text-sm truncate">{messages[status].title}</h4>
                </div>
                <p className="text-white/35 text-[10px] leading-relaxed">{messages[status].sub}</p>
            </div>

            {/* XP Multiplier */}
            <div className="flex-shrink-0 bg-brand-teal/10 px-2.5 py-1.5 rounded-xl border border-brand-teal/20">
                <p className="text-[10px] font-black text-brand-teal">×1.2</p>
            </div>
        </GlassCard>
    );
}
