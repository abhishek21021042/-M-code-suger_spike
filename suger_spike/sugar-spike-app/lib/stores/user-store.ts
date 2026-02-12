import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
    id: string | null
    age: number | null
    heightCm: number | null
    weightKg: number | null
    bmi: number | null
    gender: string | null
    xpPoints: number
    level: number
    currentStreak: number
    longestStreak: number
    lastLogDate: string | null
}

interface UserStore {
    profile: UserProfile
    isOnboarded: boolean
    setProfile: (profile: Partial<UserProfile>) => void
    setOnboarded: (value: boolean) => void
    addXp: (amount: number) => void
    resetProfile: () => void
}

const defaultProfile: UserProfile = {
    id: null,
    age: null,
    heightCm: null,
    weightKg: null,
    bmi: null,
    gender: null,
    xpPoints: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastLogDate: null,
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            profile: defaultProfile,
            isOnboarded: false,
            setProfile: (updates) =>
                set((state) => ({
                    profile: { ...state.profile, ...updates },
                })),
            setOnboarded: (value) => set({ isOnboarded: value }),
            addXp: (amount) =>
                set((state) => {
                    const newXp = state.profile.xpPoints + amount
                    const newLevel = newXp < 100 ? 1 : Math.floor((newXp - 100) / 150) + 2
                    return {
                        profile: {
                            ...state.profile,
                            xpPoints: newXp,
                            level: newLevel,
                        },
                    }
                }),
            resetProfile: () => set({ profile: defaultProfile, isOnboarded: false }),
        }),
        {
            name: 'sugar-spike-user',
        }
    )
)
