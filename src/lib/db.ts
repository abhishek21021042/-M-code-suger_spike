import { supabase } from './supabase';
import { getDeviceId } from './auth';

export const syncLogToSupabase = async (logEntry: any) => {
    const deviceId = getDeviceId();
    if (!deviceId) return;

    // Ensure user exists first (best effort)
    // In a real app, rely on store to sync user first, or use a stored procedure.
    // Here we assume syncUserToSupabase is called reasonably often.

    const { error } = await supabase
        .from('sugar_logs')
        .insert({
            user_device_id: deviceId,
            name: logEntry.name,
            emoji: logEntry.emoji,
            xp: logEntry.xp,
            timestamp: logEntry.timestamp
        });

    if (error) {
        console.error('Error syncing log:', error);
    }
};
