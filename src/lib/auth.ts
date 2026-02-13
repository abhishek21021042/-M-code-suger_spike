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
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!deviceId && !userId) return;

    const { error } = await supabase
        .from('sugar_users')
        .upsert({
            device_id: deviceId,
            user_id: userId,
            ...data,
            last_active: new Date().toISOString()
        }, { onConflict: 'device_id' });

    if (error) {
        console.error('Error syncing user:', error);
    }
};

export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (!error && data.user) {
        // Link current guest data to new user
        await syncUserToSupabase({ user_id: data.user.id });
    }

    return { data, error };
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};
