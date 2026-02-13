class SoundManager {
    private sounds: Record<string, HTMLAudioElement> = {};
    private muted: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            this.preloadSounds();
        }
    }

    private preloadSounds() {
        // Using concise base64 for MVP to avoid asset loading issues
        // Pop sound
        this.sounds['pop'] = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); // Placeholder Short Pop
        // Success sound
        this.sounds['success'] = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'); // Placeholder Simple Chime
    }

    play(soundName: 'pop' | 'success') {
        if (this.muted) return;
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.warn('Audio play failed', e));
        }
    }

    vibrate(pattern: number | number[] = 10) {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }
}

export const soundManager = new SoundManager();
