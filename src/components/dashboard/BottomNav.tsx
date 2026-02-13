'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useOnboardingStore } from '@/lib/store';

export default function BottomNav() {
    const pathname = usePathname();
    const isOverlayActive = useOnboardingStore(state => state.isOverlayActive);

    const items = [
        { id: 'home', icon: 'home', label: 'Home', href: '/dashboard' },
        { id: 'stats', icon: 'bar_chart', label: 'Stats', href: '/dashboard/stats' },
        { id: 'tips', icon: 'lightbulb', label: 'Tips', href: '/dashboard/insights' },
        { id: 'me', icon: 'person', label: 'Me', href: '/dashboard/profile' },
    ];

    if (isOverlayActive) return null;

    return (
        <div className="fixed bottom-5 left-0 right-0 flex justify-center z-50 pointer-events-none px-6">
            <div
                className="pointer-events-auto flex items-center gap-0 p-1.5 rounded-[22px] backdrop-blur-2xl border border-white/[0.06]"
                style={{
                    background: 'rgba(13, 13, 20, 0.92)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
            >
                {items.map((item) => {
                    const active = item.href === '/dashboard'
                        ? pathname === '/dashboard'
                        : pathname === item.href || pathname.startsWith(item.href + '/');

                    return (
                        <Link href={item.href} key={item.id}>
                            <button
                                className={`
                                    relative px-5 py-2.5 rounded-2xl flex flex-col items-center gap-0.5 transition-all duration-300
                                    ${active ? 'text-brand-teal' : 'text-white/30 hover:text-white/50'}
                                `}
                            >
                                {active && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute inset-0 rounded-2xl border border-brand-teal/10"
                                        style={{ background: 'rgba(78, 205, 196, 0.08)' }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <motion.span
                                    className="material-icons text-xl relative z-10"
                                    animate={active ? { scale: 1.1 } : { scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {item.icon}
                                </motion.span>
                                {active && (
                                    <span className="text-[9px] font-bold relative z-10">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
