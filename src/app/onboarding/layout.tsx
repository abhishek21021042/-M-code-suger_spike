'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen w-full bg-bg-base text-white overflow-hidden relative font-sans">
            {/* Background ambient glow - Static for performance, or subtle pulse */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand-coral/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-brand-teal/5 rounded-full blur-[120px] pointer-events-none" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom easing
                    className="w-full h-full min-h-screen"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
