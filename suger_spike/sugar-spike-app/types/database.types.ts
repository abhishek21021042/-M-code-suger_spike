// Placeholder - will be auto-generated from Supabase schema
// Run: npx supabase gen types typescript --project-id yufecqihhmolocpoxfet > types/database.types.ts

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    device_id: string | null
                    age: number | null
                    height_cm: number | null
                    weight_kg: number | null
                    bmi: number | null
                    gender: string | null
                    xp_points: number
                    level: number
                    current_streak: number
                    longest_streak: number
                    last_log_date: string | null
                    freeze_uses: number
                    created_at: string
                    updated_at: string
                    last_active_at: string
                }
                Insert: {
                    id: string
                    device_id?: string | null
                    age?: number | null
                    height_cm?: number | null
                    weight_kg?: number | null
                    bmi?: number | null
                    gender?: string | null
                    xp_points?: number
                    level?: number
                    current_streak?: number
                    longest_streak?: number
                    last_log_date?: string | null
                    freeze_uses?: number
                    created_at?: string
                    updated_at?: string
                    last_active_at?: string
                }
                Update: {
                    id?: string
                    device_id?: string | null
                    age?: number | null
                    height_cm?: number | null
                    weight_kg?: number | null
                    bmi?: number | null
                    gender?: string | null
                    xp_points?: number
                    level?: number
                    current_streak?: number
                    longest_streak?: number
                    last_log_date?: string | null
                    freeze_uses?: number
                    created_at?: string
                    updated_at?: string
                    last_active_at?: string
                }
            }
            sugar_events: {
                Row: {
                    id: string
                    user_id: string
                    item_type: string
                    item_name: string | null
                    quantity: number
                    sugar_grams: number | null
                    timestamp: string
                    context: Json | null
                    insight_shown: string | null
                    action_suggested: string | null
                    action_completed: boolean
                    xp_earned: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    item_type: string
                    item_name?: string | null
                    quantity?: number
                    sugar_grams?: number | null
                    timestamp?: string
                    context?: Json | null
                    insight_shown?: string | null
                    action_suggested?: string | null
                    action_completed?: boolean
                    xp_earned?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    item_type?: string
                    item_name?: string | null
                    quantity?: number
                    sugar_grams?: number | null
                    timestamp?: string
                    context?: Json | null
                    insight_shown?: string | null
                    action_suggested?: string | null
                    action_completed?: boolean
                    xp_earned?: number
                    created_at?: string
                }
            }
            badges: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    icon_url: string | null
                    unlock_condition: Json
                    rarity: string
                    xp_reward: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    icon_url?: string | null
                    unlock_condition: Json
                    rarity?: string
                    xp_reward?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    icon_url?: string | null
                    unlock_condition?: Json
                    rarity?: string
                    xp_reward?: number
                    created_at?: string
                }
            }
            user_badges: {
                Row: {
                    id: string
                    user_id: string
                    badge_id: string
                    unlocked_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    badge_id: string
                    unlocked_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    badge_id?: string
                    unlocked_at?: string
                }
            }
            health_data_snapshots: {
                Row: {
                    id: string
                    user_id: string
                    date: string
                    steps: number
                    sleep_hours: number | null
                    resting_hr: number | null
                    active_minutes: number
                    source: string
                    synced_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    date: string
                    steps?: number
                    sleep_hours?: number | null
                    resting_hr?: number | null
                    active_minutes?: number
                    source?: string
                    synced_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    date?: string
                    steps?: number
                    sleep_hours?: number | null
                    resting_hr?: number | null
                    active_minutes?: number
                    source?: string
                    synced_at?: string
                }
            }
            actions_completed: {
                Row: {
                    id: string
                    user_id: string
                    sugar_event_id: string | null
                    action_type: string
                    completed_at: string
                    duration_minutes: number | null
                    xp_earned: number
                }
                Insert: {
                    id?: string
                    user_id: string
                    sugar_event_id?: string | null
                    action_type: string
                    completed_at?: string
                    duration_minutes?: number | null
                    xp_earned?: number
                }
                Update: {
                    id?: string
                    user_id?: string
                    sugar_event_id?: string | null
                    action_type?: string
                    completed_at?: string
                    duration_minutes?: number | null
                    xp_earned?: number
                }
            }
        }
    }
}
