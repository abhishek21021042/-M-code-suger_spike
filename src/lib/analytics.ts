import { LogEntry } from './store';

export interface DailyStats {
    date: string; // "Mon", "Tue"... or ISO date
    dayName: string;
    xp: number;
    count: number;
}

export const getWeeklyStats = (logs: LogEntry[]): DailyStats[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const stats: DailyStats[] = [];

    // Initialize last 7 days (including today)
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dayName = days[d.getDay()];
        const dateStr = d.toISOString().split('T')[0];

        stats.push({
            date: dateStr,
            dayName: i === 0 ? 'Today' : dayName,
            xp: 0,
            count: 0
        });
    }

    // Aggregate logs
    logs.forEach(log => {
        const logDate = log.timestamp.split('T')[0];
        const stat = stats.find(s => s.date === logDate);
        if (stat) {
            stat.xp += log.xp;
            stat.count += 1;
        }
    });

    return stats;
};

export const getXPStats = (logs: LogEntry[]): DailyStats[] => {
    // Re-use aggregation but calculate cumulative XP if needed
    // For now, let's just show daily XP gain to see trends
    return getWeeklyStats(logs);
};
