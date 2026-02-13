-- ============================================================
-- Sugar Spike Leaderboard — Seed Real Users
-- ============================================================
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This inserts competitive users into sugar_users for the leaderboard.
-- Each user is a device-only user (no auth account), identified by device_id.
-- ============================================================

INSERT INTO public.sugar_users (device_id, display_name, avatar, xp, streak, level, total_logs, badges_count, age, height, weight, gender, last_active)
VALUES
  ('bot-alpha-001',   'Metabolic-Alpha',  '🔥', 4250, 21, 9,   184, 12, 28, 175, 72, 'male',   NOW() - INTERVAL '2 hours'),
  ('bot-slayer-002',  'Sugar-Slayer-99',   '⚔️', 3800, 12, 8,   142,  9, 24, 168, 65, 'female', NOW() - INTERVAL '5 hours'),
  ('bot-vibe-003',    'Pure-Vibe',         '💎', 1200,  4, 3,    45,  3, 31, 180, 78, 'male',   NOW() - INTERVAL '1 day'),
  ('bot-hunter-004',  'Data-Hunter',       '🎯',  850,  2, 2,    22,  2, 22, 165, 58, 'female', NOW() - INTERVAL '3 hours'),
  ('bot-zen-005',     'ZenMaster',         '🧘', 2900,  8, 6,   110,  7, 35, 172, 70, 'male',   NOW() - INTERVAL '30 minutes'),
  ('bot-blaze-006',   'BlazeRunner',       '⚡', 3100, 15, 7,   128,  8, 27, 178, 75, 'male',   NOW() - INTERVAL '1 hour'),
  ('bot-luna-007',    'LunaFrost',         '🌙', 1800,  6, 4,    67,  5, 23, 162, 55, 'female', NOW() - INTERVAL '4 hours'),
  ('bot-titan-008',   'Titan-X',           '🏆', 5200, 30, 11,  220, 15, 29, 182, 85, 'male',   NOW() - INTERVAL '10 minutes'),
  ('bot-nova-009',    'NovaStar',          '✨', 2200,  9, 5,    88,  6, 26, 170, 62, 'female', NOW() - INTERVAL '6 hours'),
  ('bot-shadow-010',  'ShadowPulse',       '🖤', 1500,  5, 3,    55,  4, 33, 176, 80, 'male',   NOW() - INTERVAL '12 hours')
ON CONFLICT (device_id) DO UPDATE SET
  display_name  = EXCLUDED.display_name,
  avatar        = EXCLUDED.avatar,
  xp            = EXCLUDED.xp,
  streak        = EXCLUDED.streak,
  level         = EXCLUDED.level,
  total_logs    = EXCLUDED.total_logs,
  badges_count  = EXCLUDED.badges_count,
  last_active   = EXCLUDED.last_active;

-- Verify the data
SELECT display_name, avatar, xp, streak, total_logs, badges_count
FROM public.sugar_users
ORDER BY xp DESC;
