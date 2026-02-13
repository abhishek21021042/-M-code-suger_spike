import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
    return (
        <div
            className={`backdrop-blur-xl border border-[var(--glass-border)] bg-[var(--glass-surface)] shadow-[var(--shadow-neu-flat)] rounded-3xl ${className}`}
        >
            {children}
        </div>
    );
}
