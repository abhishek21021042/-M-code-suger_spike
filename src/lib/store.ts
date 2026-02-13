import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateXP, generateInsight, Insight, RuleContext } from './rulesEngine';
import { syncUserToSupabase } from './auth';
import { syncLogToSupabase } from './db';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    criteria: string;
}

export interface LogEntry {
    id: string;
    emoji: string;
    name: string;
    xp: number;
    sugar?: number;
    timestamp: string; // ISO string
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
    theme: 'dark' | 'light';

    // Insight State
    latestInsight: Insight | null;
    insightHistory: Insight[];
    showInsight: boolean;

    // Achievement System
    unlockedBadgeIds: string[];
    badges: Badge[];

    // Custom Presets
    customPresets: { id: string; emoji: string; name: string; xp: number; sugar: number }[];
    addCustomPreset: (preset: { emoji: string; name: string; xp: number; sugar: number }) => void;
    deleteCustomPreset: (id: string) => void;

    // Action Tracking
    pendingActionId: string | null;
    actionCompletionHistory: { id: string; completedAt: string }[];

    // UI State
    isOverlayActive: boolean;


    // Actions
    setAge: (age: number) => void;
    setHeight: (height: number) => void;
    setWeight: (weight: number) => void;
    setGender: (gender: string) => void;

    toggleTheme: () => void;
    addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
    dismissInsight: () => void;
    deleteLog: (id: string) => void;
    unlockBadge: (badgeId: string) => void;
    completeAction: (actionId: string) => void;
    setOverlayActive: (isActive: boolean) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            age: 25,
            height: 170,
            weight: 70,
            gender: '',

            streak: 1, // Default cheat
            xp: 120,   // Default cheat
            level: 1,
            logs: [],
            theme: 'dark',
            latestInsight: null,
            insightHistory: [],
            showInsight: false,

            unlockedBadgeIds: [],
            badges: [
                { id: 'first-log', name: 'First Step', description: 'Log your first sugar item', icon: 'auto_awesome', criteria: 'Log 1 item' },
                { id: 'streak-3', name: 'Consistent', description: 'Reach a 3-day streak', icon: 'local_fire_department', criteria: '3-day streak' },
                { id: 'night-owl', name: 'Night Owl', description: 'Log sugar after 8 PM', icon: 'dark_mode', criteria: 'Log after 8 PM' },
                { id: 'sugar-slayer', name: 'Sugar Slayer', description: 'Log 10 items total', icon: 'security', criteria: 'Log 10 items' },
                { id: 'early-bird', name: 'Early Bird', description: 'Log sugar before 9 AM', icon: 'wb_sunny', criteria: 'Log before 9 AM' }
            ],

            pendingActionId: null,
            actionCompletionHistory: [],

            isOverlayActive: false,
            setOverlayActive: (isActive) => set({ isOverlayActive: isActive }),

            customPresets: [],
            addCustomPreset: (preset) => set((state) => ({
                customPresets: [...state.customPresets, { ...preset, id: crypto.randomUUID() }]
            })),
            deleteCustomPreset: (id) => set((state) => ({
                customPresets: state.customPresets.filter(p => p.id !== id)
            })),

            setAge: (age) => { set({ age }); syncUserToSupabase({ age }); },
            setHeight: (height) => { set({ height }); syncUserToSupabase({ height }); },
            setWeight: (weight) => { set({ weight }); syncUserToSupabase({ weight }); },
            setGender: (gender) => { set({ gender }); syncUserToSupabase({ gender }); },

            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),

            dismissInsight: () => set({ showInsight: false }),

            addLog: (entry) => set((state) => {
                const now = new Date();

                // Calculate logs in last 2 hours for stacking rule
                const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
                const recentLogsCount = state.logs.filter(l => new Date(l.timestamp) > twoHoursAgo).length;

                const context: RuleContext = {
                    timeOfDay: now.getHours(),
                    streak: state.streak,
                    sugarAmount: entry.sugar ?? 20, // Use provided sugar amount or fallback
                    recentLogsCount
                };

                // 1. Calculate XP with bonuses
                const calculatedXP = calculateXP(entry.xp, context); // entry.xp is base

                // 2. Generate Insight
                const insight = generateInsight(entry.name, context);

                const newLog = {
                    ...entry,
                    id: crypto.randomUUID(),
                    timestamp: now.toISOString(),
                    xp: calculatedXP,
                };

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
                const totalLogs = state.logs.length + 1;

                // 1. First Log
                if (!newUnlockedIds.includes('first-log')) {
                    newUnlockedIds.push('first-log');
                }

                // 2. Night Owl (After 8 PM)
                if (now.getHours() >= 20 && !newUnlockedIds.includes('night-owl')) {
                    newUnlockedIds.push('night-owl');
                }

                // 3. Early Bird (Before 9 AM)
                if (now.getHours() < 9 && !newUnlockedIds.includes('early-bird')) {
                    newUnlockedIds.push('early-bird');
                }

                // 4. Sugar Slayer (10 total logs)
                if (totalLogs >= 10 && !newUnlockedIds.includes('sugar-slayer')) {
                    newUnlockedIds.push('sugar-slayer');
                }

                const newXP = state.xp + calculatedXP + insight.xpBonus;
                const nextLevelXP = 500;
                const newLevel = Math.floor(newXP / nextLevelXP) + 1;

                return {
                    logs: [newLog, ...state.logs],
                    xp: newXP,
                    level: newLevel,
                    latestInsight: insight,
                    insightHistory: [insight, ...state.insightHistory],
                    showInsight: true,
                    unlockedBadgeIds: newUnlockedIds,
                    pendingActionId: insight.action ? `action-${Date.now()}` : null
                };
            }),

            unlockBadge: (badgeId) => set((state) => ({
                unlockedBadgeIds: state.unlockedBadgeIds.includes(badgeId)
                    ? state.unlockedBadgeIds
                    : [...state.unlockedBadgeIds, badgeId]
            })),

            completeAction: (actionId) => set((state) => {
                const newXP = state.xp + 25;
                const nextLevelXP = 500;
                const newLevel = Math.floor(newXP / nextLevelXP) + 1;

                return {
                    xp: newXP,
                    level: newLevel,
                    pendingActionId: null,
                    actionCompletionHistory: [...state.actionCompletionHistory, { id: actionId, completedAt: new Date().toISOString() }]
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
        }
    )
);
