'use client';

import React from 'react';

import { useOnboardingStore } from '@/lib/store';
import { getWeeklyStats } from '@/lib/analytics';
import Header from '@/components/dashboard/Header';
import QuickLogGrid from '@/components/dashboard/QuickLogGrid';
import Timeline from '@/components/dashboard/Timeline';
import Mascot from '@/components/dashboard/Mascot';
import SugarMeter from '@/components/dashboard/SugarMeter';

export default function Dashboard() {
    const logs = useOnboardingStore((state) => state.logs);
    const weeklyStats = getWeeklyStats(logs);

    return (
        <>
            <Header />

            <div className="mt-5 mb-5 space-y-5">
                <SugarMeter />
                <Mascot />
            </div>

            <div className="flex-1 flex flex-col gap-6 min-h-0">
                <QuickLogGrid />
                <Timeline />
            </div>
        </>
    );
}
