'use client';

import { useOnboardingStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useOnboardingStore((state) => state.theme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const currentTheme = theme || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [theme, mounted]);

    // Prevent hydration mismatch by rendering nothing until mounted, 
    // OR just render children and accept flash?
    // Better: Render children, effect applies theme. Background might flash.
    // To avoid flash, we need script injection, but for MVP, effect is fine.

    return <>{children}</>;
}
