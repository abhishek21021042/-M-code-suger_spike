export const SUGAR_PRESETS = [
    { id: 'coffee', label: 'Coffee', emoji: '☕', sugarGrams: 10, type: 'beverage' },
    { id: 'soda', label: 'Soda', emoji: '🥤', sugarGrams: 39, type: 'beverage' },
    { id: 'juice', label: 'Juice', emoji: '🧃', sugarGrams: 24, type: 'beverage' },
    { id: 'cookie', label: 'Cookie', emoji: '🍪', sugarGrams: 14, type: 'snack' },
    { id: 'chocolate', label: 'Chocolate', emoji: '🍫', sugarGrams: 24, type: 'snack' },
    { id: 'ice-cream', label: 'Ice Cream', emoji: '🍦', sugarGrams: 21, type: 'dessert' },
    { id: 'cake', label: 'Cake', emoji: '🍰', sugarGrams: 26, type: 'dessert' },
    { id: 'candy', label: 'Candy', emoji: '🍬', sugarGrams: 12, type: 'snack' },
] as const

export const XP_CONFIG = {
    BASE_LOG: 10,
    ACTION_COMPLETED: 15,
    STREAK_BONUS_MULTIPLIER: 1.5,
    EARLY_LOG_BONUS: 5, // Before 6 PM
} as const

export const LEVEL_CONFIG = {
    BASE_XP: 100,
    XP_PER_LEVEL: 150,
} as const
