'use client';

import { useOnboardingStore, Badge, ALL_BADGES } from '@/lib/store';
import GlassCard from '@/components/ui/GlassCard';
import Header from '@/components/dashboard/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { signUp, signIn, signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

function ProfileCard() {
    const { xp, level, streak, logs, age, height, weight, user, unlockedBadgeIds } = useOnboardingStore();
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const totalSugarLogs = logs.length;
    const currentLevel = Math.floor(xp / 500) + 1;
    const xpProgress = (xp % 500) / 500 * 100;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { error } = isLogin ? await signIn(email, password) : await signUp(email, password);
            if (error) throw error;
            setShowForm(false);
            setEmail('');
            setPassword('');
        } catch (err: any) {
            setError(err.message || 'Auth failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard className="relative overflow-hidden border-white/[0.08] bg-[#111]/80">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-brand-teal/15 blur-[60px] pointer-events-none" />

            {/* Top: Profile Identity */}
            <div className="relative p-5 pb-4 flex items-center gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-coral/10 flex items-center justify-center text-3xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        👤
                    </div>
                    <div className="absolute -bottom-1.5 -right-1.5 bg-brand-teal text-[#0a0a0a] text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase shadow-md">
                        Lv.{currentLevel}
                    </div>
                </div>

                {/* Name + XP bar */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-black text-white uppercase italic tracking-tight truncate leading-tight">
                        {user?.email?.split('@')[0] || "Metabolic Warrior"}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="material-icons text-[10px] text-brand-teal">verified</span>
                        <p className="text-[9px] font-black text-brand-teal/70 uppercase tracking-[0.15em]">Vanguard</p>
                    </div>
                    {/* Mini XP Bar */}
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${xpProgress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-brand-teal to-brand-teal/60 rounded-full shadow-[0_0_8px_rgba(78,205,196,0.4)]"
                            />
                        </div>
                        <span className="text-[8px] font-black text-white/25 uppercase">{xp} XP</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Stats Strip — 4 inline chips */}
            <div className="p-4 grid grid-cols-4 gap-2">
                {[
                    { icon: "local_fire_department", value: streak, label: "Streak", color: "text-brand-coral" },
                    { icon: "analytics", value: totalSugarLogs, label: "Logs", color: "text-brand-teal" },
                    { icon: "stars", value: unlockedBadgeIds.length, label: "Badges", color: "text-brand-gold" },
                    { icon: "bolt", value: `${xp}`, label: "XP", color: "text-purple-400" },
                ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className={`material-icons text-sm ${stat.color}`}>{stat.icon}</span>
                        <p className="text-sm font-black text-white leading-none">{stat.value}</p>
                        <p className="text-[7px] font-black text-white/20 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Physical — single sleek row */}
            <div className="px-5 py-3 flex items-center justify-between">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Bio</p>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-white/60">{age}<span className="text-[8px] text-white/20 ml-0.5">yrs</span></span>
                    <span className="text-white/10">·</span>
                    <span className="text-xs font-black text-white/60">{height}<span className="text-[8px] text-white/20 ml-0.5">cm</span></span>
                    <span className="text-white/10">·</span>
                    <span className="text-xs font-black text-white/60">{weight}<span className="text-[8px] text-white/20 ml-0.5">kg</span></span>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Account Footer */}
            <div className="px-5 py-3">
                {user ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="material-icons text-xs text-brand-teal/50">cloud_done</span>
                            <p className="text-[10px] font-bold text-white/40 truncate">{user.email}</p>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="text-[9px] font-black text-brand-coral/60 uppercase hover:text-brand-coral transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : !showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all active:scale-[0.98]"
                    >
                        <span className="material-icons text-sm text-brand-coral/60">cloud_upload</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Save Progress</span>
                    </button>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        onSubmit={handleAuth}
                        className="space-y-2 overflow-hidden"
                    >
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-brand-teal/40 transition-colors" placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-brand-teal/40 transition-colors" placeholder="Password" required />
                        {error && <p className="text-[8px] text-brand-coral font-bold">{error}</p>}
                        <button disabled={loading} type="submit" className="w-full bg-brand-teal text-[#0a0a0a] font-black uppercase py-2.5 rounded-lg text-[10px] tracking-widest">
                            {loading ? '...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                        <button type="button" onClick={() => setIsLogin(!isLogin)}
                            className="w-full text-[8px] text-white/25 font-bold uppercase py-0.5">
                            {isLogin ? "Need account? Sign up" : "Have account? Sign in"}
                        </button>
                    </motion.form>
                )}
            </div>
        </GlassCard>
    );
}

export default function ProfilePage() {
    const { xp, level, badges, unlockedBadgeIds, age, height, weight, logs, streak, user } = useOnboardingStore();
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
    const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null);
    const [activeBadgeTip, setActiveBadgeTip] = useState<string | null>(null);
    const [competitors, setCompetitors] = useState<any[]>([]);

    const nextLevelXP = 500;
    const totalSugarLogs = logs.length;

    const getRankTitle = (xpVal: number) => {
        if (xpVal >= 5000) return "Apex Predator";
        if (xpVal >= 3000) return "High Guardian";
        if (xpVal >= 2000) return "Elite Slayer";
        if (xpVal >= 1000) return "Pathfinder";
        if (xpVal >= 500) return "Vanguard";
        return "Novice";
    };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data, error } = await supabase
                .from('sugar_users')
                .select('display_name, avatar, xp, streak, total_logs, badges_count, device_id')
                .order('xp', { ascending: false })
                .limit(10);

            if (error || !data) return;

            const currentDeviceId = typeof window !== 'undefined' ? localStorage.getItem('device_id') : null;

            const mapped = data
                .filter(u => u.device_id !== currentDeviceId) // exclude self from DB list
                .map(u => ({
                    name: u.display_name || 'Anonymous',
                    xp: u.xp || 0,
                    logs: u.total_logs || 0,
                    streak: u.streak || 0,
                    badges: u.badges_count || 0,
                    isSelf: false,
                    avatar: u.avatar || '👤',
                    rankTitle: getRankTitle(u.xp || 0),
                    topBadges: [] as string[],
                }));

            // Insert current user
            const selfEntry = {
                name: user?.email?.split('@')[0] || "You",
                xp,
                logs: totalSugarLogs,
                streak,
                badges: unlockedBadgeIds.length,
                isSelf: true,
                avatar: '👤',
                rankTitle: getRankTitle(xp),
                topBadges: unlockedBadgeIds.slice(0, 5),
            };

            // Combine and rank all users
            const ranked = [...mapped, selfEntry]
                .sort((a, b) => (b.xp || 0) - (a.xp || 0))
                .map((item, idx) => ({
                    ...item,
                    rank: idx + 1
                }));

            setCompetitors(ranked);
        };

        fetchLeaderboard();
    }, [xp, streak, totalSugarLogs, unlockedBadgeIds, user]);

    return (
        <>
            <Header hideXPBar={true} />

            <div className="mt-8 space-y-6 pb-24">
                {/* Unified Profile Card */}
                <ProfileCard />

                {/* Global Leaderboard */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-white/80 font-black text-lg uppercase tracking-tight italic">Global Elite</h3>
                        <div className="flex items-center gap-1 bg-brand-teal/10 px-2 py-1 rounded-full border border-brand-teal/20">
                            <span className="material-icons text-[10px] text-brand-teal">public</span>
                            <span className="text-[8px] font-black text-brand-teal uppercase tracking-widest">Live</span>
                        </div>
                    </div>

                    <GlassCard className="overflow-hidden border-white/5 bg-black/40">
                        {/* Scrollable leaderboard list */}
                        <div className="max-h-[236px] overflow-y-auto p-2 space-y-1">
                            {competitors.filter(c => !c.isSelf).map((competitor) => (
                                <motion.div
                                    key={competitor.name}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCompetitor(competitor)}
                                    className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 text-center">
                                            <span className={`text-[10px] font-black ${competitor.rank === 1 ? 'text-brand-gold' : competitor.rank === 2 ? 'text-white/60' : competitor.rank === 3 ? 'text-brand-coral/60' : 'text-white/20'}`}>
                                                #{competitor.rank || '?'}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm border border-white/10">
                                            {competitor.avatar}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-tight text-white/70">{competitor.name}</p>
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{competitor.rankTitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-brand-teal tracking-tighter">{competitor.xp?.toLocaleString() || '0'}</p>
                                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">XP</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pinned User Rank Card — always visible below scroll */}
                        {(() => {
                            const selfData = competitors.find(c => c.isSelf);
                            if (!selfData) return null;
                            return (
                                <div className="sticky bottom-0 border-t border-brand-teal/20 bg-brand-teal/[0.06] backdrop-blur-sm p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center text-sm border border-brand-teal/30 font-black text-brand-teal shadow-[0_0_15px_rgba(78,205,196,0.1)]">
                                            #{selfData.rank || '?'}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm border border-white/10">
                                            👤
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-tight text-white">
                                                {selfData.name}
                                                <span className="ml-2 text-[7px] bg-brand-teal text-[#0a0a0a] px-1.5 py-0.5 rounded font-black">YOU</span>
                                            </p>
                                            <p className="text-[9px] font-bold text-brand-teal/50 uppercase tracking-widest">{selfData.rankTitle}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-brand-teal tracking-tighter">{selfData.xp?.toLocaleString() || '0'}</p>
                                        <p className="text-[7px] font-black text-white/20 uppercase tracking-widest">Your XP</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </GlassCard>
                </div>

                {/* Member Profile Modal */}
                <AnimatePresence>
                    {selectedCompetitor && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCompetitor(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="w-full max-w-sm relative z-[210]"
                            >
                                <GlassCard className="p-8 flex flex-col items-center gap-6 border-brand-teal/30 shadow-[0_0_50px_rgba(78,205,196,0.2)] bg-[#1a1a1a]">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl border-2 border-brand-teal shadow-[0_0_30px_rgba(78,205,196,0.2)]">
                                            {selectedCompetitor.avatar}
                                        </div>
                                        <div className="absolute -bottom-2 right-0 bg-brand-teal text-bg-base text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                            Lvl {Math.floor(selectedCompetitor.xp / 500) + 1}
                                        </div>
                                    </div>

                                    <div className="text-center space-y-1">
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                                            {selectedCompetitor.name}
                                        </h3>
                                        <p className="text-brand-teal text-[10px] font-black uppercase tracking-[0.2em]">{selectedCompetitor.rankTitle}</p>
                                    </div>

                                    <div className="w-full grid grid-cols-3 gap-2">
                                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                            <p className="text-lg font-black text-white">{selectedCompetitor.logs}</p>
                                            <p className="text-[8px] font-black text-white/30 uppercase">Logs</p>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                            <p className="text-lg font-black text-brand-coral">{selectedCompetitor.streak}d</p>
                                            <p className="text-[8px] font-black text-white/30 uppercase">Streak</p>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                            <p className="text-lg font-black text-brand-teal">{selectedCompetitor.badges}</p>
                                            <p className="text-[8px] font-black text-white/30 uppercase">Badges</p>
                                        </div>
                                    </div>

                                    {/* Top Badges Row */}
                                    <div className="w-full space-y-3">
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-center">Top Achievements</p>
                                        <div className="flex justify-center gap-3">
                                            {selectedCompetitor.topBadges.length > 0 ? (
                                                selectedCompetitor.topBadges.map((badgeId: string) => {
                                                    const badge = ALL_BADGES.find(b => b.id === badgeId);
                                                    if (!badge) return null;
                                                    return (
                                                        <div key={badgeId} className="relative group">
                                                            <motion.div
                                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setActiveBadgeTip(activeBadgeTip === badgeId ? null : badgeId);
                                                                }}
                                                                className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${activeBadgeTip === badgeId ? 'bg-brand-teal text-bg-base shadow-[0_0_15px_rgba(78,205,196,0.4)]' : 'bg-white/5 text-white/60 hover:text-brand-teal hover:bg-white/10'}`}
                                                            >
                                                                <span className="material-icons text-xl">{badge.icon}</span>
                                                            </motion.div>

                                                            <AnimatePresence>
                                                                {activeBadgeTip === badgeId && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 p-3 rounded-xl bg-brand-teal text-[#1a1a1a] z-[220] shadow-2xl pointer-events-none"
                                                                    >
                                                                        <p className="text-[9px] font-black uppercase tracking-tighter mb-1 border-b border-black/10 pb-1">{badge.name}</p>
                                                                        <p className="text-[8px] font-bold leading-tight opacity-80">{badge.criteria}</p>
                                                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-brand-teal" />
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-[10px] text-white/20 italic">No achievements yet</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full p-4 rounded-2xl bg-brand-teal/5 border border-brand-teal/10">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[10px] font-black text-white/40 uppercase">Metabolic Power</p>
                                            <p className="text-[10px] font-black text-brand-teal uppercase">{selectedCompetitor.xp.toLocaleString()} XP</p>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-brand-teal shadow-[0_0_10px_rgba(78,205,196,0.5)]"
                                                style={{ width: `${(selectedCompetitor.xp % 500) / 500 * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedCompetitor(null)}
                                        className="w-full py-4 rounded-xl bg-brand-teal text-bg-base font-black uppercase tracking-widest active:scale-95 transition-transform"
                                    >
                                        Close Profile
                                    </button>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Badge Showcase */}
                <div>
                    <h3 className="text-white/80 font-black text-lg mb-4 px-2 uppercase tracking-tight italic">Achievement Vault</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {badges.map((badge: Badge) => {
                            const isUnlocked = unlockedBadgeIds.includes(badge.id);
                            return (
                                <motion.div
                                    key={badge.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedBadge(badge)}
                                    className="relative cursor-pointer"
                                >
                                    <GlassCard className={`p-3 flex flex-col items-center gap-1.5 aspect-square justify-center border-white/5 transition-all duration-500 ${isUnlocked ? 'bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 border-brand-teal/30 shadow-[0_0_20px_rgba(78,205,196,0.1)]' : 'bg-black/40 grayscale opacity-30 shadow-inner'}`}>
                                        <span className={`material-icons text-2xl ${isUnlocked ? 'text-brand-teal' : 'text-white/40'}`}>
                                            {badge.icon}
                                        </span>
                                        {!isUnlocked && (
                                            <div className="absolute top-1 right-1">
                                                <span className="material-icons text-[10px] text-white/20">lock</span>
                                            </div>
                                        )}
                                        <p className="text-[7px] font-black text-center leading-tight uppercase tracking-tighter text-white/60">
                                            {badge.name}
                                        </p>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Achievement Detail Modal */}
                <AnimatePresence>
                    {selectedBadge && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedBadge(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="w-full max-w-sm relative z-[210]"
                            >
                                <GlassCard className="p-8 flex flex-col items-center gap-6 border-brand-teal/30 shadow-[0_0_50px_rgba(78,205,196,0.2)] bg-[#1a1a1a]">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 ${unlockedBadgeIds.includes(selectedBadge.id) ? 'bg-brand-teal/20 text-brand-teal shadow-[0_0_30px_rgba(78,205,196,0.2)]' : 'bg-white/5 text-white/20'}`}>
                                        <span className="material-icons text-5xl">
                                            {unlockedBadgeIds.includes(selectedBadge.id) ? selectedBadge.icon : 'lock'}
                                        </span>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                                            {selectedBadge.name}
                                        </h3>
                                        <div className="inline-flex items-center gap-2 bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
                                            <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em]">+{selectedBadge.bonusXP} XP REWARD</span>
                                        </div>
                                    </div>

                                    <div className="w-full space-y-4">
                                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1.5 text-center">How to Obtain</p>
                                            <p className="text-sm text-white/80 text-center font-bold">
                                                {selectedBadge.criteria}
                                            </p>
                                        </div>

                                        <p className="text-xs text-white/40 text-center leading-relaxed italic px-4">
                                            {selectedBadge.description}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedBadge(null)}
                                        className="w-full py-4 rounded-xl bg-brand-teal text-[#1a1a1a] font-black uppercase tracking-widest active:scale-95 transition-transform"
                                    >
                                        Got it
                                    </button>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
