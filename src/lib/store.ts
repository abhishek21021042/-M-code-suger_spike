import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculateXP, generateInsight, Insight, RuleContext, Mission } from './rulesEngine';
import { syncUserToSupabase } from './auth';
import { syncLogToSupabase } from './db';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    criteria: string;
    bonusXP: number;
}

export const ALL_BADGES: Badge[] = [
    { id: 'first-log', name: 'First Step', description: 'Log your first sugar item to start your journey.', icon: 'auto_awesome', criteria: 'Log 1 item', bonusXP: 50 },
    { id: 'streak-3', name: 'Consistent', description: 'Maintain a 3-day metabolic tracking streak.', icon: 'local_fire_department', criteria: '3-day streak', bonusXP: 100 },
    { id: 'night-owl', name: 'Night Owl', description: 'Logged sugar late at night? Accountability is key.', icon: 'dark_mode', criteria: 'Log after 8 PM', bonusXP: 50 },
    { id: 'sugar-slayer', name: 'Sugar Slayer', description: 'Logged 10 sugar items. You are gaining awareness.', icon: 'security', criteria: 'Log 10 items', bonusXP: 150 },
    { id: 'early-bird', name: 'Early Bird', description: 'Log sugar before 9 AM to stay on track all day.', icon: 'wb_sunny', criteria: 'Log before 9 AM', bonusXP: 50 },
    { id: 'weekend-warrior', name: 'Weekend Warrior', description: 'Stayed consistent during the weekend.', icon: 'celebration', criteria: 'Log on Sat & Sun', bonusXP: 200 },
    { id: 'visionary', name: 'Visionary', description: 'Logged 5 items using AI Camera Vision.', icon: 'photo_camera', criteria: '5 Photo Logs', bonusXP: 100 },
    { id: 'voice-log', name: 'Voice Pilot', description: 'Logged 5 items using Voice Analysis.', icon: 'mic', criteria: '5 Voice Logs', bonusXP: 100 },
    { id: 'sugar-free-day', name: 'Pure Day', description: 'Logged 0.0g sugar for a full 24-hour cycle.', icon: 'verified', criteria: 'No sugar for 24h', bonusXP: 300 },
    { id: 'streak-14', name: 'Elite Slayer', description: 'Your discipline is legendary. 14 days and counting.', icon: 'workspace_premium', criteria: '14-day streak', bonusXP: 500 },
    { id: 'ninja', name: 'Sugar Ninja', description: 'Logged 3+ sugar-free items in a single day.', icon: 'visibility_off', criteria: '3 Sugar-Free Logs/Day', bonusXP: 250 },
    { id: 'marathoner', name: 'Marathoner', description: '50 items logged. You are a true data scientist of your own health.', icon: 'speed', criteria: '50 Total Logs', bonusXP: 400 },
    { id: 'photo-master', name: 'Art Collector', description: '15 items logged using AI Vision. You see what others miss.', icon: 'camera', criteria: '15 Photo Logs', bonusXP: 300 },
    { id: 'voice-master', name: 'Voice Oracle', description: '15 items logged using Voice Analysis. Commands respect.', icon: 'record_voice_over', criteria: '15 Voice Logs', bonusXP: 300 }
];

export interface LogEntry {
    id: string;
    emoji: string;
    name: string;
    xp: number;
    sugar?: number;
    timestamp: string; // ISO string
    source?: 'quick' | 'photo' | 'voice';
}

interface OnboardingState {
    // Onboarding Data
    age: number;
    height: number;
    weight: number;
    gender: string;

    // Dashboard Data
    streak: number;
    xp: number;
    level: number;
    logs: LogEntry[];

    // Auth State
    user: User | null;
    setUser: (user: User | null) => void;

    // Insight State
    pendingLog: (Omit<LogEntry, 'id' | 'timestamp'> & { calculatedXP: number }) | null;
    latestInsight: Insight | null;
    insightHistory: Insight[];
    showInsight: boolean;

    // Achievement System
    unlockedBadgeIds: string[];
    badges: Badge[];

    // Mission System
    activeMissions: Mission[];

    // Custom Presets
    customPresets: { id: string; emoji: string; name: string; xp: number; sugar: number }[];
    addCustomPreset: (preset: { emoji: string; name: string; xp: number; sugar: number }) => void;
    deleteCustomPreset: (id: string) => void;

    // UI State
    isOverlayActive: boolean;


    // Actions
    setAge: (age: number) => void;
    setHeight: (height: number) => void;
    setWeight: (weight: number) => void;
    setGender: (gender: string) => void;

    proposeLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
    commitLog: () => void;
    cancelLog: () => void;
    dismissInsight: () => void;
    deleteLog: (id: string) => void;
    unlockBadge: (badgeId: string) => void;
    completeMission: (missionId: string) => void;
    setOverlayActive: (isActive: boolean) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            age: 25,
            height: 170,
            weight: 70,
            gender: '',

            streak: 1, // Default cheat
            xp: 120,   // Default cheat
            level: 1,
            logs: [],

            user: null,
            setUser: (user: User | null) => set({ user }),

            latestInsight: null,
            pendingLog: null,
            insightHistory: [],
            showInsight: false,

            unlockedBadgeIds: [],
            badges: ALL_BADGES,

            activeMissions: [],

            isOverlayActive: false,
            setOverlayActive: (isActive: boolean) => set({ isOverlayActive: isActive }),

            customPresets: [],
            addCustomPreset: (preset: { emoji: string; name: string; xp: number; sugar: number }) => set((state: OnboardingState) => ({
                customPresets: [...state.customPresets, { ...preset, id: crypto.randomUUID() }]
            })),
            deleteCustomPreset: (id: string) => set((state: OnboardingState) => ({
                customPresets: state.customPresets.filter((p: { id: string; emoji: string; name: string; xp: number; sugar: number }) => p.id !== id)
            })),

            setAge: (age: number) => { set({ age }); syncUserToSupabase({ age }); },
            setHeight: (height: number) => { set({ height }); syncUserToSupabase({ height }); },
            setWeight: (weight: number) => { set({ weight }); syncUserToSupabase({ weight }); },
            setGender: (gender: string) => { set({ gender }); syncUserToSupabase({ gender }); },


            dismissInsight: () => set({ showInsight: false }),

            proposeLog: (entry) => set((state) => {
                const now = new Date();
                const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
                const recentLogsCount = state.logs.filter(l => new Date(l.timestamp) > twoHoursAgo).length;

                const context: RuleContext = {
                    timeOfDay: now.getHours(),
                    streak: state.streak,
                    sugarAmount: entry.sugar ?? 20,
                    recentLogsCount
                };

                const calculatedXP = calculateXP(entry.xp, context);
                const insight = generateInsight(entry.name, context);

                return {
                    pendingLog: { ...entry, calculatedXP },
                    latestInsight: insight,
                    showInsight: true
                };
            }),

            commitLog: () => set((state) => {
                if (!state.pendingLog || !state.latestInsight) return state;

                const now = new Date();
                const newLog: LogEntry = {
                    emoji: state.pendingLog.emoji,
                    name: state.pendingLog.name,
                    xp: state.pendingLog.calculatedXP,
                    sugar: state.pendingLog.sugar,
                    source: state.pendingLog.source || 'quick',
                    id: crypto.randomUUID(),
                    timestamp: now.toISOString(),
                };

                const insight = state.latestInsight;
                const calculatedXP = state.pendingLog.calculatedXP;

                // Sync Log
                syncLogToSupabase(newLog);
                // Sync User Stats
                syncUserToSupabase({
                    xp: state.xp + calculatedXP + insight.xpBonus,
                    streak: state.streak,
                    last_active: now.toISOString()
                });

                // --- Achievement Logic ---
                const newUnlockedIds = [...state.unlockedBadgeIds];
                const totalLogs = [newLog, ...state.logs];
                const totalLogsCount = totalLogs.length;

                // Helper to grant badge and add XP
                let bonusXPGained = 0;
                const grantBadge = (id: string) => {
                    if (!newUnlockedIds.includes(id)) {
                        newUnlockedIds.push(id);
                        const badge = state.badges.find(b => b.id === id);
                        if (badge) bonusXPGained += badge.bonusXP;
                    }
                };

                // 1. First Log
                grantBadge('first-log');

                // 2. Streak Based
                if (state.streak >= 3) grantBadge('streak-3');
                if (state.streak >= 14) grantBadge('streak-14');

                // 3. Time Based
                if (now.getHours() >= 20) grantBadge('night-owl');
                if (now.getHours() < 9) grantBadge('early-bird');

                // 4. Quantity Based
                if (totalLogsCount >= 10) grantBadge('sugar-slayer');
                if (totalLogsCount >= 50) grantBadge('marathoner');

                // 5. Source Based
                const photoLogs = totalLogs.filter(l => l.source === 'photo').length;
                const voiceLogs = totalLogs.filter(l => l.source === 'voice').length;
                if (photoLogs >= 5) grantBadge('visionary');
                if (photoLogs >= 15) grantBadge('photo-master');
                if (voiceLogs >= 5) grantBadge('voice-log');
                if (voiceLogs >= 15) grantBadge('voice-master');

                // 6. Weekend Warrior
                const hasSat = totalLogs.some(l => new Date(l.timestamp).getDay() === 6);
                const hasSun = totalLogs.some(l => new Date(l.timestamp).getDay() === 0);
                if (hasSat && hasSun) grantBadge('weekend-warrior');

                // 7. Sugar Free Day
                const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const recentSugarLogs = totalLogs.filter(l => new Date(l.timestamp) > last24h && (l.sugar || 0) > 0);
                if (recentSugarLogs.length === 0 && totalLogs.some(l => new Date(l.timestamp) > last24h)) {
                    grantBadge('sugar-free-day');
                }

                // 8. Sugar Ninja (3 sugar-free logs in CURRENT day)
                const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const todaysFreeLogs = totalLogs.filter(l => new Date(l.timestamp) >= startOfToday && (l.sugar || 0) === 0).length;
                if (todaysFreeLogs >= 3) grantBadge('ninja');

                const totalXPGained = calculatedXP + insight.xpBonus + bonusXPGained;
                const newXP = state.xp + totalXPGained;
                const nextLevelXP = 500;
                const newLevel = Math.floor(newXP / nextLevelXP) + 1;

                const newMissions = [...state.activeMissions];
                if (insight.mission) {
                    newMissions.push(insight.mission);
                }

                return {
                    logs: totalLogs,
                    xp: newXP,
                    level: newLevel,
                    insightHistory: [insight, ...state.insightHistory],
                    unlockedBadgeIds: newUnlockedIds,
                    activeMissions: newMissions,
                    pendingLog: null,
                    showInsight: false
                };
            }),

            cancelLog: () => set({
                pendingLog: null,
                latestInsight: null,
                showInsight: false
            }),

            unlockBadge: (badgeId) => set((state) => ({
                unlockedBadgeIds: state.unlockedBadgeIds.includes(badgeId)
                    ? state.unlockedBadgeIds
                    : [...state.unlockedBadgeIds, badgeId]
            })),

            completeMission: (missionId) => set((state) => {
                const mission = state.activeMissions.find(m => m.id === missionId);
                if (!mission) return state;

                const newXP = state.xp + mission.xp;
                const nextLevelXP = 500;
                const newLevel = Math.floor(newXP / nextLevelXP) + 1;

                return {
                    xp: newXP,
                    level: newLevel,
                    activeMissions: state.activeMissions.filter(m => m.id !== missionId)
                };
            }),

            deleteLog: (id) => set((state) => ({
                logs: state.logs.filter(l => l.id !== id)
            })),

            reset: () => set({
                age: 25, height: 170, weight: 70, gender: '',
                streak: 1, xp: 0, level: 1, logs: []
            }),
        }),
        {
            name: 'onboarding-storage',
            partialize: (state: OnboardingState) => {
                const { user, ...rest } = state;
                return rest;
            },
            onRehydrateStorage: () => (state: OnboardingState | undefined) => {
                if (state) {
                    // Force update badge definitions if they changed
                    state.badges = ALL_BADGES;
                }
            }
        }
    )
);
