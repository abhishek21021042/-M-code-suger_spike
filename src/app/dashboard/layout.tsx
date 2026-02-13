import BottomNav from '@/components/dashboard/BottomNav';
import InsightCard from '@/components/dashboard/InsightCard';
import LevelUpOverlay from '@/components/dashboard/LevelUpOverlay';
import BadgeUnlockToast from '@/components/dashboard/BadgeUnlockToast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-bg-base text-white relative overflow-hidden flex flex-col font-sans">
            <InsightCard />
            <LevelUpOverlay />
            <BadgeUnlockToast />

            {/* Animated Ambient Glow Blobs */}
            <div
                className="absolute top-[-15%] left-[-15%] w-[55%] h-[55%] bg-brand-coral/[0.04] rounded-full blur-[140px] pointer-events-none"
                style={{ animation: 'blobDrift 20s ease-in-out infinite' }}
            />
            <div
                className="absolute bottom-[5%] right-[-15%] w-[55%] h-[55%] bg-brand-teal/[0.04] rounded-full blur-[140px] pointer-events-none"
                style={{ animation: 'blobDrift 25s ease-in-out infinite reverse' }}
            />
            <div
                className="absolute top-[40%] left-[50%] w-[30%] h-[30%] bg-brand-gold/[0.02] rounded-full blur-[100px] pointer-events-none"
                style={{ animation: 'blobDrift 30s ease-in-out infinite 5s' }}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col px-5 pt-6 pb-28 z-10 h-full overflow-y-auto scrollbar-hide">
                {children}
            </main>

            <BottomNav />
        </div>
    );
}
