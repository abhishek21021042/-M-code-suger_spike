'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useOnboardingStore } from '@/lib/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useOnboardingStore((state) => state.setUser);

    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setUser]);

    return <>{children}</>;
}
