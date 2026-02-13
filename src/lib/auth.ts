import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';

export const getDeviceId = () => {
    if (typeof window === 'undefined') return null;
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
};

export const syncUserToSupabase = async (data: any) => {
    const deviceId = getDeviceId();
    if (!deviceId) return;

    const { error } = await supabase
        .from('sugar_users')
        .upsert({
            device_id: deviceId,
            ...data,
            last_active: new Date().toISOString()
        }, { onConflict: 'device_id' });

    if (error) {
        console.error('Error syncing user:', error);
    }
};
