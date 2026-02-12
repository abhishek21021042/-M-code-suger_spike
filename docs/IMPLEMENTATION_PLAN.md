# Implementation Plan: Beat the Sugar Spike
## Web App with Supabase Backend

**Version:** 1.0  
**Date:** February 12, 2026  
**Tech Stack:** Next.js 14 + Supabase + PWA  
**Timeline:** 8 weeks (hackathon-ready MVP in 3 weeks)

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Setup](#project-setup)
4. [Database Schema (Supabase)](#database-schema-supabase)
5. [Development Phases](#development-phases)
6. [Detailed Task Breakdown](#detailed-task-breakdown)
7. [Deployment Strategy](#deployment-strategy)
8. [Testing & QA](#testing--qa)
9. [Monitoring & Analytics](#monitoring--analytics)

---

## Overview

### Project Goals
Build a Progressive Web App (PWA) that helps users track and reduce sugar consumption through:
- ⚡ **Frictionless Logging:** <10 seconds per entry
- 🎮 **Gamification:** Streaks, XP, badges, leaderboards
- 🧠 **Smart Insights:** Context-aware recommendations
- 🚀 **Signup-Free:** Anonymous start with optional account upgrade
- 📱 **Mobile-First:** Responsive design, installable PWA

### Why Web App + Supabase?
- **Faster Development:** No app store approval needed
- **Cross-Platform:** Works on iOS, Android, Desktop
- **Instant Updates:** No app updates required
- **Lower Cost:** Supabase free tier for MVP
- **Built-in Features:** Auth, database, storage, edge functions
- **Real-time:** WebSocket support out of the box

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Animations:** Framer Motion + Lottie
- **PWA:** next-pwa
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend (Supabase)
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth (Anonymous, OAuth)
- **Storage:** Supabase Storage (for images)
- **Edge Functions:** Deno (for ML insights)
- **Real-time:** Supabase Realtime (for leaderboard)
- **Cron Jobs:** Supabase pg_cron (for streak checks)

### Additional Services
- **Hosting:** Vercel (Frontend)
- **Analytics:** Vercel Analytics + Supabase Analytics
- **Error Tracking:** Sentry
- **Monitoring:** Supabase Dashboard
- **Push Notifications:** Web Push API
- **Health Data:** Web APIs (not available, use manual input)

---

## Project Setup

### Phase 0: Initial Setup (Day 1)

#### Step 1: Create Supabase Project
```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Save credentials:
#    - Project URL
#    - Anon/Public Key
#    - Service Role Key (keep secret!)
```

#### Step 2: Initialize Next.js Project
```bash
# Create Next.js app
npx create-next-app@latest sugar-spike-app --typescript --tailwind --app

cd sugar-spike-app

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zustand framer-motion lottie-react
npm install react-hook-form zod @hookform/resolvers
npm install recharts lucide-react date-fns
npm install next-pwa
npm install @radix-ui/react-slot @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom
```

#### Step 3: Environment Setup
```bash
# Create .env.local file
touch .env.local
```

**`.env.local`:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_MIXPANEL_TOKEN=your-token
```

#### Step 4: Project Structure
```
sugar-spike-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/
│   │   ├── home/
│   │   ├── history/
│   │   ├── insights/
│   │   └── profile/
│   ├── onboarding/
│   ├── api/
│   │   ├── sugar-events/
│   │   ├── insights/
│   │   └── gamification/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── features/        # Feature-specific components
│   ├── layouts/         # Layout components
│   └── shared/          # Shared components
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stores/          # Zustand stores
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   └── constants/       # Constants and configs
├── public/
│   ├── icons/
│   ├── lottie/
│   └── manifest.json
├── supabase/
│   ├── migrations/
│   ├── functions/       # Edge functions
│   └── seed.sql
├── types/
│   └── database.types.ts
└── package.json
```

---

## Database Schema (Supabase)

### Migration 1: Core Tables

Create file: `supabase/migrations/001_initial_schema.sql`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Table: users (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  device_id VARCHAR(255) UNIQUE,
  age INTEGER,
  height_cm DECIMAL(5,2),
  weight_kg DECIMAL(5,2),
  bmi DECIMAL(4,2),
  gender VARCHAR(50),
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_log_date DATE,
  freeze_uses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Table: sugar_events
-- =============================================
CREATE TABLE public.sugar_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  item_type VARCHAR(50) NOT NULL,
  item_name VARCHAR(255),
  quantity DECIMAL(5,2) DEFAULT 1,
  sugar_grams DECIMAL(6,2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  context JSONB,
  insight_shown TEXT,
  action_suggested VARCHAR(50),
  action_completed BOOLEAN DEFAULT FALSE,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Table: health_data_snapshots
-- =============================================
CREATE TABLE public.health_data_snapshots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  steps INTEGER DEFAULT 0,
  sleep_hours DECIMAL(4,2),
  resting_hr INTEGER,
  active_minutes INTEGER DEFAULT 0,
  source VARCHAR(50) DEFAULT 'manual',
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- =============================================
-- Table: badges
-- =============================================
CREATE TABLE public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_url VARCHAR(255),
  unlock_condition JSONB NOT NULL,
  rarity VARCHAR(20) DEFAULT 'common',
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- Table: user_badges
-- =============================================
CREATE TABLE public.user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- =============================================
-- Table: actions_completed
-- =============================================
CREATE TABLE public.actions_completed (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sugar_event_id UUID REFERENCES public.sugar_events(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_minutes INTEGER,
  xp_earned INTEGER DEFAULT 0
);

-- =============================================
-- Indexes for Performance
-- =============================================
CREATE INDEX idx_sugar_events_user_id ON public.sugar_events(user_id);
CREATE INDEX idx_sugar_events_timestamp ON public.sugar_events(timestamp);
CREATE INDEX idx_sugar_events_item_type ON public.sugar_events(item_type);
CREATE INDEX idx_health_snapshots_user_date ON public.health_data_snapshots(user_id, date);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_actions_completed_user_id ON public.actions_completed(user_id);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sugar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_data_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actions_completed ENABLE ROW LEVEL SECURITY;

-- Users: Can only read/update their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Sugar Events: Users can only manage their own events
CREATE POLICY "Users can view own sugar events" ON public.sugar_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sugar events" ON public.sugar_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sugar events" ON public.sugar_events
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sugar events" ON public.sugar_events
  FOR DELETE USING (auth.uid() = user_id);

-- Health Data: Users can only manage their own data
CREATE POLICY "Users can view own health data" ON public.health_data_snapshots
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health data" ON public.health_data_snapshots
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health data" ON public.health_data_snapshots
  FOR UPDATE USING (auth.uid() = user_id);

-- User Badges: Users can view own badges
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

-- Badges: Public read access
CREATE POLICY "Anyone can view badges" ON public.badges
  FOR SELECT USING (true);

-- Actions: Users can only manage their own actions
CREATE POLICY "Users can view own actions" ON public.actions_completed
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own actions" ON public.actions_completed
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Functions
-- =============================================

-- Function: Calculate BMI
CREATE OR REPLACE FUNCTION calculate_bmi(height_cm DECIMAL, weight_kg DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND((weight_kg / ((height_cm / 100) * (height_cm / 100)))::DECIMAL, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function: Calculate Level from XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Formula: Level = floor((xp - 100) / 150) + 2 for xp > 100, else 1
  IF xp < 100 THEN
    RETURN 1;
  ELSE
    RETURN FLOOR((xp - 100) / 150.0) + 2;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function: Update user's updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at on users table
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Seed Data: Initial Badges
-- =============================================
INSERT INTO public.badges (name, description, icon_url, unlock_condition, rarity, xp_reward) VALUES
  ('First Step', 'Log your first sugar event', '/badges/first-step.png', '{"type": "sugar_events", "count": 1}', 'common', 10),
  ('Day 3 Streak', 'Maintain a 3-day logging streak', '/badges/streak-3.png', '{"type": "streak", "days": 3}', 'common', 50),
  ('Week Warrior', 'Maintain a 7-day logging streak', '/badges/streak-7.png', '{"type": "streak", "days": 7}', 'rare', 100),
  ('Month Master', 'Maintain a 30-day logging streak', '/badges/streak-30.png', '{"type": "streak", "days": 30}', 'epic', 500),
  ('Century Club', 'Log 100 sugar events', '/badges/century.png', '{"type": "sugar_events", "count": 100}', 'rare', 200),
  ('Hydration Hero', 'Complete 5 water actions', '/badges/hydration.png', '{"type": "action", "action_type": "water", "count": 5}', 'common', 25),
  ('Walker', 'Complete 3 walking actions', '/badges/walker.png', '{"type": "action", "action_type": "walk", "count": 3}', 'common', 30),
  ('Action Hero', 'Complete 25 corrective actions', '/badges/action-hero.png', '{"type": "actions_completed", "count": 25}', 'rare', 150),
  ('Sugar Master', 'Maintain a 100-day streak', '/badges/sugar-master.png', '{"type": "streak", "days": 100}', 'legendary', 1000);
```

### Migration 2: Materialized View for Leaderboard

Create file: `supabase/migrations/002_leaderboard_view.sql`

```sql
-- =============================================
-- Materialized View: Weekly Leaderboard
-- =============================================
CREATE MATERIALIZED VIEW public.leaderboard_weekly AS
SELECT 
  u.id as user_id,
  u.xp_points,
  u.current_streak,
  u.level,
  ROW_NUMBER() OVER (ORDER BY u.xp_points DESC, u.current_streak DESC) as rank
FROM public.users u
WHERE u.created_at >= NOW() - INTERVAL '7 days'
ORDER BY u.xp_points DESC
LIMIT 100;

-- Create index on materialized view
CREATE INDEX idx_leaderboard_weekly_rank ON public.leaderboard_weekly(rank);

-- =============================================
-- Materialized View: All-Time Leaderboard
-- =============================================
CREATE MATERIALIZED VIEW public.leaderboard_alltime AS
SELECT 
  u.id as user_id,
  u.xp_points,
  u.current_streak,
  u.longest_streak,
  u.level,
  ROW_NUMBER() OVER (ORDER BY u.xp_points DESC, u.longest_streak DESC) as rank
FROM public.users u
ORDER BY u.xp_points DESC
LIMIT 100;

-- Create index on materialized view
CREATE INDEX idx_leaderboard_alltime_rank ON public.leaderboard_alltime(rank);

-- =============================================
-- Function: Refresh Leaderboards
-- =============================================
CREATE OR REPLACE FUNCTION refresh_leaderboards()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard_weekly;
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard_alltime;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- Schedule: Refresh leaderboards daily at midnight
-- (Requires pg_cron extension - enable in Supabase dashboard)
-- =============================================
-- SELECT cron.schedule('refresh-leaderboards', '0 0 * * *', 'SELECT refresh_leaderboards();');
```

---

## Development Phases

### **Phase 1: MVP Foundation (Week 1 - Days 1-7)**
**Goal:** Setup project, implement core anonymous user flow, basic logging

**Deliverables:**
- ✅ Project setup complete
- ✅ Supabase database configured
- ✅ Anonymous authentication working
- ✅ Onboarding flow (5 screens)
- ✅ Home screen with preset buttons
- ✅ Basic sugar event logging
- ✅ Local storage for offline support

---

### **Phase 2: Gamification & Insights (Week 2 - Days 8-14)**
**Goal:** Implement XP system, streaks, insights generation

**Deliverables:**
- ✅ XP and level system
- ✅ Streak tracking (daily checks)
- ✅ Badge unlocking logic
- ✅ Rule-based insight generation
- ✅ Action suggestions
- ✅ Success animations (Lottie)
- ✅ PWA configuration (installable)

---

### **Phase 3: Authentication & Sync (Week 3 - Days 15-21)**
**Goal:** Optional signup, cloud sync, history view

**Deliverables:**
- ✅ Email/Google/Apple authentication
- ✅ Anonymous → Authenticated migration
- ✅ Cloud data sync
- ✅ History screen (calendar view)
- ✅ Profile screen
- ✅ Settings management

**🎯 HACKATHON SUBMISSION READY**

---

### **Phase 4: Advanced Features (Week 4-5)**
**Goal:** Analytics, leaderboard, advanced gamification

**Deliverables:**
- ✅ Weekly insights & charts
- ✅ Leaderboard (friends & global)
- ✅ More badges (20+ total)
- ✅ Streak freeze mechanic
- ✅ Variable rewards system
- ✅ Social sharing

---

### **Phase 5: ML & Bonus (Week 6-7)**
**Goal:** ML insights, photo logging, voice input

**Deliverables:**
- ✅ ML model training (Python)
- ✅ Edge function for ML inference
- ✅ Photo upload & recognition (optional)
- ✅ Voice logging (Web Speech API)
- ✅ Explainability UI

---

### **Phase 6: Polish & Launch (Week 8)**
**Goal:** Testing, optimization, deployment

**Deliverables:**
- ✅ End-to-end testing
- ✅ Performance optimization
- ✅ SEO optimization
- ✅ Analytics integration
- ✅ Production deployment
- ✅ Documentation

---

## Detailed Task Breakdown

### Week 1: Foundation (Days 1-7)

#### Day 1: Setup & Configuration
- [x] Create Supabase project
- [x] Initialize Next.js project
- [x] Install all dependencies
- [x] Configure environment variables
- [x] Setup Tailwind CSS + shadcn/ui
- [x] Create project folder structure
- [x] Initialize Git repository

#### Day 2: Database & Auth
- [x] Run initial migration (001_initial_schema.sql)
- [x] Configure Supabase Auth settings
- [x] Enable anonymous sign-in in Supabase dashboard
- [x] Create Supabase client utilities (client.ts, server.ts)
- [x] Setup Supabase middleware for auth
- [x] Test anonymous authentication flow

#### Day 3: Onboarding Flow
- [x] Create `/onboarding` route structure
- [x] Build 5 onboarding screens:
  - Welcome screen
  - Age selection (slider)
  - Height selection (slider + metric/imperial toggle)
  - Weight selection (slider)
  - Gender selection (card layout)
- [x] Implement progress indicator
- [x] Add smooth transitions (Framer Motion)
- [x] Create Zustand store for onboarding data
- [x] Save data to Supabase on completion

#### Day 4: Home Screen & Logging
- [x] Create `/home` route
- [x] Design home screen layout:
  - Header (greeting, streak, XP)
  - Quick log preset buttons (8 presets)
  - Today's summary
  - Bottom navigation
- [x] Implement preset button UI
- [x] Create sugar event logging form
- [x] Connect to Supabase (insert sugar_events)
- [x] Add haptic feedback (Web Vibration API)

#### Day 5: Offline Support & PWA
- [x] Configure next-pwa
- [x] Create manifest.json
- [x] Add app icons (multiple sizes)
- [x] Setup service worker
- [x] Implement offline queue for logs
- [x] Test PWA installation (mobile & desktop)
- [x] Add "Add to Home Screen" prompt

#### Day 6: UI Components & Animations
- [x] Install Lottie animations
- [x] Create success animation component
- [x] Build reusable UI components:
  - Button, Card, Badge, Progress Bar
  - Toast notifications
  - Modal/Dialog
- [x] Implement confetti effect for logging
- [x] Add micro-interactions (hover, tap effects)

#### Day 7: Testing & Bug Fixes
- [x] Test anonymous user creation
- [x] Test onboarding flow end-to-end
- [x] Test sugar event logging
- [x] Test offline functionality
- [x] Fix any bugs found
- [x] Code review and refactoring

**Week 1 Checkpoint:** Anonymous users can complete onboarding and log sugar events.

---

### Week 2: Gamification & Insights (Days 8-14)

#### Day 8: XP & Level System
- [x] Create XP calculation logic
- [x] Implement level progression formula
- [x] Build XP display component (animated counter)
- [x] Create level-up animation
- [x] Store XP in Supabase (users table)
- [x] Add XP for sugar logging (+10 base)

#### Day 9: Streak System
- [x] Implement streak calculation logic
- [x] Create cron job (Supabase Edge Function) for daily streak checks
- [x] Build streak display component (🔥 flames)
- [x] Add streak milestone rewards (Day 3, 7, 30)
- [x] Implement streak freeze mechanic
- [x] Test timezone handling

#### Day 10: Badge System
- [x] Create badge unlock logic
- [x] Implement badge checking after each action
- [x] Build badge showcase UI (grid layout)
- [x] Create badge unlock animation
- [x] Add locked badge states (grayed out)
- [x] Show unlock conditions on hover

#### Day 11: Insight Generation Engine
- [x] Create Edge Function: `generate-insight`
- [x] Implement rule-based decision tree:
  - Low sleep + high sugar → crash warning
  - High activity → mitigates impact
  - Late-night sugar → sleep warning
  - Multiple events → pattern warning
- [x] Fetch health data (if available)
- [x] Generate personalized insight text
- [x] Display insight on post-log screen

#### Day 12: Action Suggestions
- [x] Create action recommendation logic
- [x] Implement action types:
  - Walk (10 min timer)
  - Drink water
  - Protein snack swap
  - Delay next sugar
- [x] Build action card UI
- [x] Create timer component for actions
- [x] Track action completion
- [x] Award bonus XP for completed actions

#### Day 13: Feedback & Rewards
- [x] Implement variable reward system (80% standard, 20% bonus)
- [x] Create "2x XP Hour" random event
- [x] Build reward notification component
- [x] Add sound effects (optional, toggle in settings)
- [x] Implement time-based bonuses (before 6 PM bonus)
- [x] Test reward distribution

#### Day 14: Polish & Testing
- [x] Refactor code for maintainability
- [x] Add loading states
- [x] Improve error handling
- [x] Test all gamification features
- [x] Performance optimization
- [x] Mobile responsiveness check

**Week 2 Checkpoint:** Full gamification system working with insights and actions.

---

### Week 3: Authentication & Sync (Days 15-21)

#### Day 15: Authentication Setup
- [x] Configure Supabase Auth providers:
  - Google OAuth
  - Apple OAuth (if possible)
  - Email/Password
  - Magic Link (passwordless)
- [x] Create signup flow UI
- [x] Create login flow UI
- [x] Implement auth state management (Zustand)

#### Day 16: Anonymous Migration
- [x] Create migration logic (anonymous → authenticated)
- [x] Preserve all data (streak, XP, badges, events)
- [x] Implement atomic transaction for migration
- [x] Build migration UI flow
- [x] Test data preservation
- [x] Handle edge cases (network failures)

#### Day 17: Cloud Sync
- [x] Implement sync logic for offline data
- [x] Create conflict resolution strategy (last-write-wins)
- [x] Build sync status indicator
- [x] Test sync across devices
- [x] Add manual sync trigger
- [x] Optimize sync performance

#### Day 18: History Screen
- [x] Create `/history` route
- [x] Build calendar view component
- [x] Implement date range filtering (Today, Week, Month)
- [x] Display sugar events chronologically
- [x] Show insights and actions for each event
- [x] Add edit/delete functionality
- [x] Calculate and display weekly stats

#### Day 19: Profile & Settings
- [x] Create `/profile` route
- [x] Build profile UI:
  - User info (avatar, name, email)
  - Level & XP progress bar
  - Badge showcase
  - Stats summary
- [x] Implement settings:
  - Notifications toggle
  - Sound effects toggle
  - Units (metric/imperial)
  - Theme (light/dark)
  - Account management (sign out, delete)

#### Day 20: Signup Prompts
- [x] Implement signup trigger logic:
  - After 5+ sugar events logged
  - After Day 3 streak milestone
  - When accessing premium features
- [x] Create gentle prompt UI (modal)
- [x] Show signup benefits clearly
- [x] Add "Maybe Later" option (always dismissible)
- [x] Track conversion rates (analytics)

#### Day 21: Final Testing
- [x] End-to-end testing (anonymous → signup → sync)
- [x] Test on multiple devices
- [x] Test offline → online sync
- [x] Bug fixes
- [x] Code cleanup
- [x] Prepare for hackathon submission

**Week 3 Checkpoint:** 🎯 **HACKATHON READY** - Full-featured MVP with auth and sync.

---

### Week 4-5: Advanced Features (Days 22-35)

#### Days 22-23: Analytics & Insights
- [ ] Create `/insights` route
- [ ] Build weekly report card
- [ ] Implement charts (Recharts):
  - Bar chart: Daily sugar events
  - Line chart: Sugar trend over time
  - Pie chart: Sugar by type
- [ ] Pattern identification logic
- [ ] Personalized recommendations
- [ ] Export data feature (CSV/JSON)

#### Days 24-25: Leaderboard
- [ ] Run migration 002_leaderboard_view.sql
- [ ] Create `/leaderboard` route
- [ ] Build leaderboard UI (tabs: Weekly, All-Time)
- [ ] Implement friend system (add/remove friends)
- [ ] Setup Supabase Realtime for live updates
- [ ] Add privacy controls (opt-out option)
- [ ] Test leaderboard performance

#### Days 26-28: Enhanced Gamification
- [ ] Create 10+ additional badges
- [ ] Implement variable reward loot boxes
- [ ] Build level-up celebration animations
- [ ] Add achievement notifications
- [ ] Create badge rarity system
- [ ] Implement XP multiplier events
- [ ] Social sharing (share achievements on Twitter/Instagram)

#### Days 29-30: Health Data Integration
- [ ] Research Web APIs for health data (limited on web)
- [ ] Implement manual health data input:
  - Daily steps (manual input with quick presets)
  - Sleep hours (time picker)
  - Water intake tracker
- [ ] Create health data entry UI
- [ ] Store in health_data_snapshots table
- [ ] Use data for better insights

#### Days 31-35: Polish & Optimization
- [ ] Performance audits (Lighthouse)
- [ ] Code splitting and lazy loading
- [ ] Image optimization
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] SEO optimization (meta tags, OG images)
- [ ] Error boundary implementation
- [ ] Loading skeleton screens

---

### Week 6-7: ML & Bonus Features (Days 36-49)

#### Days 36-40: Machine Learning
- [ ] Collect user data for training
- [ ] Train ML model (Python + scikit-learn):
  - Features: age, BMI, steps, sleep, time, sugar
  - Target: Action completion likelihood
- [ ] Export model (ONNX or TensorFlow.js)
- [ ] Create Supabase Edge Function for inference
- [ ] Deploy ML model to edge
- [ ] Test ML predictions
- [ ] Implement fallback to rule-based system

#### Days 41-42: Photo Logging
- [ ] Implement camera/file upload
- [ ] Store images in Supabase Storage
- [ ] Integrate image recognition API (optional):
  - Google Cloud Vision
  - Clarifai
  - Custom TensorFlow.js model
- [ ] Extract food items from image
- [ ] Estimate sugar content
- [ ] Manual override option

#### Days 43-44: Voice Logging
- [ ] Implement Web Speech API
- [ ] Create voice input UI (microphone button)
- [ ] Parse voice commands:
  - "I had chai"
  - "2 cold drinks"
  - "Log ice cream"
- [ ] Natural language processing (simple regex)
- [ ] Confirm before logging
- [ ] Add to preset if common

#### Days 45-46: Explainability
- [ ] Add "Why this suggestion?" section
- [ ] Show data points used for insight
- [ ] Educational micro-content
- [ ] Link to scientific sources
- [ ] Create tooltip explanations
- [ ] User feedback (thumbs up/down)

#### Days 47-49: Bonus Features
- [ ] Weekly email reports (Supabase Edge Function + SendGrid)
- [ ] Push notifications (Web Push API)
- [ ] Dark mode support
- [ ] Multiple language support (i18n)
- [ ] Referral system
- [ ] Premium tier (Stripe integration)

---

### Week 8: Launch Preparation (Days 50-56)

#### Days 50-51: Testing
- [ ] E2E testing (Playwright/Cypress)
- [ ] Unit tests (Jest + React Testing Library)
- [ ] Integration tests
- [ ] Cross-browser testing
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Performance testing
- [ ] Security audit

#### Days 52-53: Deployment
- [ ] Setup Vercel project
- [ ] Configure environment variables
- [ ] Setup custom domain
- [ ] Deploy to production
- [ ] Setup Sentry for error tracking
- [ ] Configure analytics (Vercel Analytics, Mixpanel)
- [ ] Setup monitoring alerts

#### Days 54-55: Documentation
- [ ] Write README.md
- [ ] Create API documentation
- [ ] User guide / Help center
- [ ] Developer documentation
- [ ] Database schema documentation
- [ ] Deployment guide

#### Day 56: Launch
- [ ] Final QA checklist
- [ ] Soft launch (beta users)
- [ ] Monitor errors and performance
- [ ] Collect initial feedback
- [ ] Fix critical bugs
- [ ] Public launch 🚀

---

## Deployment Strategy

### Vercel Deployment

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Deploy to production
vercel --prod
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://beatthesugarspike.com"
  }
}
```

### Supabase Configuration

**Enable Extensions:**
- Go to Database → Extensions
- Enable: `uuid-ossp`, `pg_cron`, `pg_stat_statements`

**Configure Auth:**
- Go to Authentication → Providers
- Enable: Anonymous, Google, Email
- Configure OAuth redirect URLs
- Set session timeout (7 days recommended)

**Set up Cron Jobs:**
```sql
-- Refresh leaderboards daily at midnight UTC
SELECT cron.schedule('refresh-leaderboards', '0 0 * * *', $$
  SELECT refresh_leaderboards();
$$);

-- Check and reset streaks daily at 2 AM UTC
SELECT cron.schedule('check-streaks', '0 2 * * *', $$
  UPDATE users
  SET current_streak = 0
  WHERE last_log_date < CURRENT_DATE - INTERVAL '1 day'
  AND current_streak > 0;
$$);
```

---

## Testing & QA

### Testing Checklist

**Functional Testing:**
- [ ] Anonymous user creation works
- [ ] Onboarding flow completes successfully
- [ ] Sugar event logging (<10 seconds)
- [ ] Offline logging queues correctly
- [ ] Sync works after going online
- [ ] XP and levels calculate correctly
- [ ] Streaks increment properly
- [ ] Badges unlock when conditions met
- [ ] Insights generate appropriately
- [ ] Actions track completion
- [ ] Signup flow works (all providers)
- [ ] Anonymous → Authenticated migration preserves data
- [ ] Leaderboard updates in real-time

**Performance Testing:**
- [ ] Page load time <2 seconds
- [ ] Time to interactive <3 seconds
- [ ] Lighthouse score >90
- [ ] No memory leaks
- [ ] Smooth animations (60fps)
- [ ] Efficient database queries

**Security Testing:**
- [ ] RLS policies working correctly
- [ ] No data leaks between users
- [ ] XSS protection
- [ ] CSRF protection
- [ ] API rate limiting
- [ ] Environment variables not exposed

**Accessibility Testing:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥44px
- [ ] Focus indicators visible

**Browser/Device Testing:**
- [ ] Chrome (desktop + mobile)
- [ ] Safari (iOS + macOS)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet
- [ ] PWA installation on iOS
- [ ] PWA installation on Android

---

## Monitoring & Analytics

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs

npx @sentry/wizard@latest -i nextjs
```

### Analytics (Mixpanel)
```typescript
// Track events
mixpanel.track('Sugar Event Logged', {
  item_type: 'chai',
  quantity: 1,
  xp_earned: 10
});

mixpanel.track('Streak Milestone', {
  days: 7,
  xp_earned: 100
});
```

### Metrics to Track
- Daily/Weekly/Monthly Active Users
- Retention (D1, D7, D30)
- Sugar events logged per user
- Average session duration
- Signup conversion rate (anonymous → authenticated)
- Streak completion rates
- Badge unlock rates
- Action completion rates
- Leaderboard engagement
- Performance metrics (Core Web Vitals)

---

## Next Steps

1. **Start with Phase 1** (Week 1) - Focus on getting the core flow working
2. **Deploy early, deploy often** - Use Vercel preview deployments
3. **Gather feedback** - Test with real users starting Week 2
4. **Iterate based on data** - Use analytics to guide feature prioritization
5. **Prepare for hackathon** - Week 3 deadline for MVP submission

---

**Ready to build!** 🚀

Let me know which phase you want to start with, and I can provide detailed implementation code for specific features!

*Document End*

*Last Updated: February 12, 2026*
