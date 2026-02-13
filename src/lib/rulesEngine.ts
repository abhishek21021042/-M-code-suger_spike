export interface RuleContext {
    timeOfDay: number; // 0-23
    streak: number;
    sugarAmount?: number; // approx grams
    recentLogsCount?: number; // logs in last 2 hours
}

export interface Mission {
    id: string;
    title: string;
    description: string;
    xp: number;
    type: 'physical' | 'hydration' | 'nutritional';
    icon: string;
}

export interface Insight {
    type: 'warning' | 'info' | 'success';
    message: string;
    reason: string;
    action: string;
    explanation: string;
    xpBonus: number;
    mission?: Mission;
}

export const calculateXP = (baseXP: number, context: RuleContext): number => {
    let total = baseXP;

    // Time-based bonuses
    if (context.timeOfDay < 10) {
        total += 5; // Morning logging bonus
    } else if (context.timeOfDay < 18) {
        total += 3; // Before 6 PM bonus
    }

    // Streak multiplier (simplified)
    if (context.streak > 3) total += 2;
    if (context.streak > 7) total += 5;

    return total;
};

export const generateInsight = (itemName: string, context: RuleContext): Insight => {
    const hour = context.timeOfDay;

    // 0. Stacking Rule (Multiple logs in short time)
    if (context.recentLogsCount && context.recentLogsCount >= 2) {
        return {
            type: 'warning',
            message: "Sugar stacking!",
            reason: "Multiple sugar sources in a short window create a massive insulin spike.",
            explanation: "Insulin sensitivity drops when the pancreas is forced to work continuously without a break. Stacking leads to fat storage and energy crashes.",
            action: "Skip the next sweet treat for 4 hours.",
            xpBonus: 15,
            mission: {
                id: `mission-stack-${Date.now()}`,
                title: "Run 1km",
                description: "Burn off that stacked glucose with a quick run.",
                xp: 25,
                type: 'physical',
                icon: 'directions_run'
            }
        };
    }

    // 1. Late Night Sugar (After 8 PM)
    if (hour >= 20) {
        return {
            type: 'warning',
            message: `Late night ${itemName}?`,
            reason: "Sugar before bed can reduce sleep quality.",
            explanation: "Digesting simple sugars at night raises your core body temperature and inhibits the release of Growth Hormone, which is essential for overnight repair.",
            action: "Drink water to dilute the spike.",
            xpBonus: 5,
            mission: {
                id: `mission-night-${Date.now()}`,
                title: "Hydration Hero",
                description: "Drink 500ml water to help your body process the sugar.",
                xp: 15,
                type: 'hydration',
                icon: 'water_drop'
            }
        };
    }

    // 2. Afternoon Slump (2 PM - 4 PM)
    if (hour >= 14 && hour <= 16) {
        return {
            type: 'info',
            message: "Afternoon energy dip?",
            reason: "Your body might be craving quick energy.",
            explanation: "The afternoon glycemic crash is often mistaken for hunger. Simple sugars give a 20-min buzz followed by a deeper fatigue.",
            action: "Take a 10-min walk to burn it off.",
            xpBonus: 10,
            mission: {
                id: `mission-walk-${Date.now()}`,
                title: "Brisk Walk",
                description: "Defeat the afternoon slump with a 10-min brisk walk.",
                xp: 20,
                type: 'physical',
                icon: 'directions_walk'
            }
        };
    }

    // 3. Morning (Before 10 AM)
    if (hour < 10) {
        return {
            type: 'info',
            message: "Starting the day with sugar?",
            reason: "High glucose in the morning can trigger cravings all day.",
            explanation: "Spiking your insulin early sets a 'metabolic tone' for the day. It suppresses fat-burning and often triggers a 'rollercoaster' of hunger by lunchtime.",
            action: "Add protein (like eggs or nuts) next time.",
            xpBonus: 5
        };
    }

    // Default
    return {
        type: 'success',
        message: "Logged!",
        reason: "Tracking is the first step to control.",
        explanation: "By simply recording what you eat, you increase 'nutritional mindfulness', which is shown to naturally reduce calorie intake by 15%.",
        action: "Keep that streak alive!",
        xpBonus: 0
    };
};
