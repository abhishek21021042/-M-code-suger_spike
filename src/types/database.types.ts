export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            actions_completed: {
                Row: {
                    action_type: string
                    completed_at: string | null
                    duration_minutes: number | null
                    id: string
                    sugar_event_id: string | null
                    user_id: string | null
                    xp_earned: number | null
                }
                Insert: {
                    action_type: string
                    completed_at?: string | null
                    duration_minutes?: number | null
                    id?: string
                    sugar_event_id?: string | null
                    user_id?: string | null
                    xp_earned?: number | null
                }
                Update: {
                    action_type?: string
                    completed_at?: string | null
                    duration_minutes?: number | null
                    id?: string
                    sugar_event_id?: string | null
                    user_id?: string | null
                    xp_earned?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "actions_completed_sugar_event_id_fkey"
                        columns: ["sugar_event_id"]
                        isOneToOne: false
                        referencedRelation: "sugar_events"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "actions_completed_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_alltime"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "actions_completed_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_weekly"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "actions_completed_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            badges: {
                Row: {
                    created_at: string | null
                    description: string | null
                    icon_url: string | null
                    id: string
                    name: string
                    rarity: string | null
                    unlock_condition: Json
                    xp_reward: number | null
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    icon_url?: string | null
                    id?: string
                    name: string
                    rarity?: string | null
                    unlock_condition: Json
                    xp_reward?: number | null
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    icon_url?: string | null
                    id?: string
                    name?: string
                    rarity?: string | null
                    unlock_condition?: Json
                    xp_reward?: number | null
                }
                Relationships: []
            }
            health_data_snapshots: {
                Row: {
                    active_minutes: number | null
                    date: string
                    id: string
                    resting_hr: number | null
                    sleep_hours: number | null
                    source: string | null
                    steps: number | null
                    synced_at: string | null
                    user_id: string | null
                }
                Insert: {
                    active_minutes?: number | null
                    date: string
                    id?: string
                    resting_hr?: number | null
                    sleep_hours?: number | null
                    source?: string | null
                    steps?: number | null
                    synced_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    active_minutes?: number | null
                    date?: string
                    id?: string
                    resting_hr?: number | null
                    sleep_hours?: number | null
                    source?: string | null
                    steps?: number | null
                    synced_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "health_data_snapshots_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_alltime"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "health_data_snapshots_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_weekly"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "health_data_snapshots_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            sugar_events: {
                Row: {
                    action_completed: boolean | null
                    action_suggested: string | null
                    context: Json | null
                    created_at: string | null
                    id: string
                    insight_shown: string | null
                    item_name: string | null
                    item_type: string
                    quantity: number | null
                    sugar_grams: number | null
                    timestamp: string | null
                    user_id: string | null
                    xp_earned: number | null
                }
                Insert: {
                    action_completed?: boolean | null
                    action_suggested?: string | null
                    context?: Json | null
                    created_at?: string | null
                    id?: string
                    insight_shown?: string | null
                    item_name?: string | null
                    item_type: string
                    quantity?: number | null
                    sugar_grams?: number | null
                    timestamp?: string | null
                    user_id?: string | null
                    xp_earned?: number | null
                }
                Update: {
                    action_completed?: boolean | null
                    action_suggested?: string | null
                    context?: Json | null
                    created_at?: string | null
                    id?: string
                    insight_shown?: string | null
                    item_name?: string | null
                    item_type?: string
                    quantity?: number | null
                    sugar_grams?: number | null
                    timestamp?: string | null
                    user_id?: string | null
                    xp_earned?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "sugar_events_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_alltime"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "sugar_events_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_weekly"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "sugar_events_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            user_badges: {
                Row: {
                    badge_id: string | null
                    id: string
                    unlocked_at: string | null
                    user_id: string | null
                }
                Insert: {
                    badge_id?: string | null
                    id?: string
                    unlocked_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    badge_id?: string | null
                    id?: string
                    unlocked_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_badges_badge_id_fkey"
                        columns: ["badge_id"]
                        isOneToOne: false
                        referencedRelation: "badges"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "user_badges_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_alltime"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "user_badges_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "leaderboard_weekly"
                        referencedColumns: ["user_id"]
                    },
                    {
                        foreignKeyName: "user_badges_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    age: number | null
                    bmi: number | null
                    created_at: string | null
                    current_streak: number | null
                    device_id: string | null
                    freeze_uses: number | null
                    gender: string | null
                    height_cm: number | null
                    id: string
                    last_active_at: string | null
                    last_log_date: string | null
                    level: number | null
                    longest_streak: number | null
                    updated_at: string | null
                    weight_kg: number | null
                    xp_points: number | null
                }
                Insert: {
                    age?: number | null
                    bmi?: number | null
                    created_at?: string | null
                    current_streak?: number | null
                    device_id?: string | null
                    freeze_uses?: number | null
                    gender?: string | null
                    height_cm?: number | null
                    id: string
                    last_active_at?: string | null
                    last_log_date?: string | null
                    level?: number | null
                    longest_streak?: number | null
                    updated_at?: string | null
                    weight_kg?: number | null
                    xp_points?: number | null
                }
                Update: {
                    age?: number | null
                    bmi?: number | null
                    created_at?: string | null
                    current_streak?: number | null
                    device_id?: string | null
                    freeze_uses?: number | null
                    gender?: string | null
                    height_cm?: number | null
                    id?: string
                    last_active_at?: string | null
                    last_log_date?: string | null
                    level?: number | null
                    longest_streak?: number | null
                    updated_at?: string | null
                    weight_kg?: number | null
                    xp_points?: number | null
                }
                Relationships: []
            }
        }
        Views: {
            leaderboard_alltime: {
                Row: {
                    current_streak: number | null
                    level: number | null
                    longest_streak: number | null
                    rank: number | null
                    user_id: string | null
                    xp_points: number | null
                }
                Relationships: []
            }
            leaderboard_weekly: {
                Row: {
                    current_streak: number | null
                    level: number | null
                    rank: number | null
                    user_id: string | null
                    xp_points: number | null
                }
                Relationships: []
            }
        }
        Functions: {
            calculate_bmi: {
                Args: { height_cm: number; weight_kg: number }
                Returns: number
            }
            calculate_level: { Args: { xp: number }; Returns: number }
            refresh_leaderboards: { Args: never; Returns: undefined }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
