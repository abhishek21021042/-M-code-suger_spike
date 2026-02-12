# Product Requirements Document (PRD)
## Beat the Sugar Spike

**Version:** 1.0  
**Date:** February 12, 2026  
**Product Type:** Progressive Web App (PWA)  
**Target Platform:** Web (Mobile-First, Responsive, Installable)  
**Document Owner:** Product Team  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Mission](#2-product-vision--mission)
3. [Market Analysis & Problem Statement](#3-market-analysis--problem-statement)
4. [Target Users & Personas](#4-target-users--personas)
5. [Product Goals & Success Metrics](#5-product-goals--success-metrics)
6. [Feature Requirements](#6-feature-requirements)
7. [User Experience & Flow](#7-user-experience--flow)
8. [Technical Architecture](#8-technical-architecture)
9. [Data Model & Schema](#9-data-model--schema)
10. [UI/UX Design Guidelines](#10-uiux-design-guidelines)
11. [Gamification System](#11-gamification-system)
12. [ML & Personalization Engine](#12-ml--personalization-engine)
13. [Implementation Roadmap](#13-implementation-roadmap)
14. [Risk Assessment & Mitigation](#14-risk-assessment--mitigation)
15. [Appendices](#15-appendices)

---

## 1. Executive Summary

### 1.1 Product Overview
**Beat the Sugar Spike** is a Progressive Web App (PWA) designed to help young adults (ages 16-32) reduce sugar consumption through real-time, context-aware nudges and gamified habit formation. The web app eliminates traditional barriers to health tracking by requiring zero signup, using frictionless logging (under 10 seconds), and providing immediate personalized feedback. Built as a PWA, it works seamlessly across all devices (mobile, tablet, desktop) and can be installed like a native app.

### 1.2 Core Value Proposition
- **For Users:** "Track your sugar intake in seconds, understand its impact on your body right now, and get instant tips to make healthier choices—all without creating an account."
- **Key Differentiator:** Signup-free experience with ML-driven personalization that makes health tracking feel like a rewarding daily game, not a chore.

### 1.3 Primary Objectives
1. Enable users to log sugar events in under 10 seconds
2. Provide context-aware, real-time health insights using passive data (steps, sleep, heart rate)
3. Drive daily engagement through psychological principles (streaks, variable rewards, instant gratification)
4. Reduce sugar consumption by 20-30% within the first 30 days of use

---

## 2. Product Vision & Mission

### 2.1 Vision Statement
*"Empower millions to make healthier choices by transforming sugar awareness from an afterthought into an engaging daily ritual."*

### 2.2 Mission Statement
Create the world's most frictionless health tracking experience that helps users understand and reduce sugar consumption through real-time feedback, personalization, and delightful gamification.

### 2.3 Core Principles
1. **Frictionless First:** Every interaction should take less than 10 seconds
2. **Value Before Commitment:** Deliver value before asking for signup
3. **Privacy-Respecting:** Use minimum data, store locally when possible
4. **Science-Backed:** Use proven psychological principles for behavior change
5. **Delightful:** Every action should feel rewarding and fun

---

## 3. Market Analysis & Problem Statement

### 3.1 Problem Description
**Current State:**
- 78% of young adults (16-32) consume at least one sugary item daily
- 89% rarely check nutrition labels
- 65% don't monitor how sugar affects their health
- Existing health apps have high friction (complex food logging, forced signups, long-term focus only)

**Pain Points:**
1. **Too Much Friction:** Logging food takes 2-5 minutes in existing apps
2. **No Immediate Feedback:** Users don't see real-time impact of their choices
3. **Forced Commitment:** Apps require signup before delivering value
4. **Generic Advice:** One-size-fits-all recommendations that don't account for context
5. **Boring UX:** Health apps feel clinical, not engaging

### 3.2 Market Opportunity
- **TAM (Total Addressable Market):** 500M+ smartphone users aged 16-32 globally
- **SAM (Serviceable Available Market):** 150M+ health-conscious millennials and Gen Z
- **SOM (Serviceable Obtainable Market):** 5M users in Year 1 (India focus initially)

### 3.3 Competitive Analysis

| Competitor | Strengths | Weaknesses | Our Advantage |
|------------|-----------|------------|---------------|
| MyFitnessPal | Large food database | Complex logging (3-5 min), forced signup | 10-second logging, no signup |
| Yazio | Good UI | Generic advice, no real-time insights | Context-aware ML personalization |
| HealthifyMe | India-focused | Heavy calorie focus, not sugar-specific | Sugar-focused, immediate feedback |
| Duolingo Health | Great gamification | Not launched yet | First-mover in gamified sugar tracking |

**Key Insight:** No existing app combines signup-free onboarding + <10s logging + real-time ML insights + Duolingo-level gamification for sugar tracking.

---

## 4. Target Users & Personas

### 4.1 Primary Persona: "Mindful Mayank"
- **Age:** 22
- **Occupation:** College student / Young professional
- **Tech Savviness:** High (uses 10+ apps daily)
- **Health Awareness:** Medium (wants to be healthy but doesn't track actively)
- **Pain Points:**
  - Drinks 2-3 chai/cold drinks daily without thinking
  - Feels low energy in afternoons
  - Tried health apps but found them too complex
- **Goals:**
  - Reduce sugar to improve energy and sleep
  - Track without effort
  - See results quickly
- **Motivations:**
  - Instant gratification, gamification, social validation

### 4.2 Secondary Persona: "Health-Conscious Riya"
- **Age:** 27
- **Occupation:** Marketing professional
- **Tech Savviness:** High
- **Health Awareness:** High (already tracks fitness, reads health blogs)
- **Pain Points:**
  - Existing apps don't show immediate impact of sugar
  - Wants context-aware advice (e.g., "you had poor sleep + sugar = crash")
- **Goals:**
  - Optimize health metrics
  - Get personalized insights
  - Maintain streaks and compete with friends
- **Motivations:**
  - Data-driven self-improvement, achievement

### 4.3 Tertiary Persona: "Casual Arjun"
- **Age:** 19
- **Occupation:** High school / early college
- **Tech Savviness:** High (gaming, social media)
- **Health Awareness:** Low (doesn't think about health much)
- **Pain Points:**
  - Consumes packaged snacks and cold drinks frequently
  - Parents concerned about his habits
- **Goals:**
  - Make parents happy without much effort
  - Fun experience (not another lecture)
- **Motivations:**
  - Gaming elements, rewards, minimal effort

---

## 5. Product Goals & Success Metrics

### 5.1 Primary Goals (3 Months)
1. **Acquisition:** 100,000 downloads
2. **Activation:** 70% complete onboarding
3. **Engagement:** 50% daily active users (DAU)
4. **Retention:** 40% 30-day retention
5. **Behavior Change:** 25% reduction in sugar events logged per user

### 5.2 Key Performance Indicators (KPIs)

#### User Acquisition
- App installs/week
- Sign-up conversion rate (anonymous → authenticated)
- Viral coefficient (K-factor)

#### Engagement
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Average session duration
- Sugar events logged per day
- Actions completed (walks, water intake, etc.)

#### Retention
- Day 1, Day 7, Day 30 retention rates
- Streak completion rate (3-day, 7-day, 30-day)
- Churn rate by cohort

#### Health Impact
- Average sugar events per week (Week 1 vs Week 4)
- % users who reduced sugar by 20%+
- Action completion rate (% who followed corrective suggestions)

#### Product Quality
- Time to log sugar event (target: <10 seconds)
- App crash rate (<0.1%)
- Average rating in app stores (target: 4.5+)

### 5.3 Success Criteria (MVP Launch)
- ✅ 80% of users can log sugar in under 10 seconds
- ✅ 60% of users return for Day 2
- ✅ 40% of users maintain 3-day streak
- ✅ 4.2+ average app rating
- ✅ Context-aware insights work for 90%+ of use cases

---

## 6. Feature Requirements

### 6.1 Mandatory Features (MVP)

#### 6.1.1 Fast, Frictionless Sugar Event Capture
**Priority:** P0 (Blocker)  
**User Story:** *"As a user, I want to log my sugar intake in under 10 seconds so that tracking doesn't disrupt my day."*

**Requirements:**
- ✅ **One-Tap Presets:** 
  - Quick-access buttons for common items: Chai, Cold Drink, Sweets, Packaged Snack, Biscuits, Cake, Ice Cream, Energy Drink
  - Each preset has a fixed sugar amount (customizable later)
  - Visual icons for each category
- ✅ **Quantity Selection:**
  - Simple stepper (+/-) or slider for quantity (e.g., 1 cup, 2 cups)
  - Default quantity: 1
- ✅ **Time Stamp:**
  - Auto-capture current time
  - Allow manual adjustment (last 24 hours)
- ✅ **Confirmation Animation:**
  - Success animation (confetti, check mark)
  - Haptic feedback
  - Sound effect (optional, user-controlled)

**Technical Specs:**
- Response time: <200ms from tap to confirmation
- Offline support: Queue logs locally, sync when online
- Maximum steps: 2 taps (select item → confirm)

**Acceptance Criteria:**
- 90% of test users log an event in <10 seconds
- Offline logging works without errors
- Animations are smooth (60fps)

---

#### 6.1.2 Signup-Free, Gamified Onboarding
**Priority:** P0 (Blocker)  
**User Story:** *"As a new user, I want to start using the app immediately without creating an account so that I can experience value before committing."*

**Requirements:**
- ✅ **Anonymous User ID:**
  - Generate device-based UUID on first launch
  - Store in local storage (IndexedDB for web, SecureStore for native)
  - No email, phone, or social login required initially
  
- ✅ **Minimal Data Collection:**
  - Age (DOB picker or age slider)
  - Height (cm/feet selector with slider)
  - Weight (kg/lbs with slider)
  - Gender (Male/Female/Other/Prefer not to say)
  - **BMI:** Calculated automatically, never asked or explicitly shown
  
- ✅ **Gamified Flow:**
  - One question per screen
  - Progress indicator: "2 of 5 completed"
  - Playful visuals (illustrations, gradients)
  - Smooth transitions between screens
  - Motivational copy: "Almost there! 🎉"
  
- ✅ **Onboarding Screens:**
  1. Welcome screen (value proposition + "Let's go" CTA)
  2. Age selection (slider from 16-60)
  3. Height selection (visual ruler animation)
  4. Weight selection (slider with visual feedback)
  5. Gender selection (card selection)
  6. Health data permissions (optional, can be skipped)
  7. Success screen ("You're all set! 🚀")

**Technical Specs:**
- Total onboarding time: <60 seconds
- Ability to skip and resume later
- Data stored locally until user signs up

**Acceptance Criteria:**
- 70%+ users complete onboarding
- Average completion time <45 seconds
- All data validation works without errors

---

#### 6.1.3 Passive Health Data Sync
**Priority:** P1 (Important - Web limitations apply)  
**User Story:** *"As a user, I want the app to understand my activity level and sleep quality so that I get personalized insights."*

**Requirements:**
- ✅ **Manual Input (Primary Method):**
  - Quick daily check-in: "How many steps today?" with presets (0-2K, 2K-5K, 5K-10K, 10K+)
  - Sleep hours: Simple hour picker (0-12 hours)
  - Optional: Water intake tracker
  - Takes <30 seconds to input
  
- ✅ **Data Points to Track:**
  - **Step Count:** Manual input or wearable OAuth
  - **Sleep Duration:** Manual input (hours slept last night)
  - **Water Intake:** Manual tracking (glasses per day)
  - **Active Minutes:** Derived from steps (optional)
  
- ✅ **Optional OAuth Integrations (Future):**
  - **Fitbit:** OAuth API for automatic sync
  - **Garmin:** OAuth API for automatic sync
  - **Google Fit:** Web OAuth (limited data access)
  - **Note:** Web browsers don't have direct access to HealthKit/Google Fit like native apps
  
- ✅ **Privacy Rules:**
  - Data stored locally in IndexedDB + Supabase
  - Data used only for personalization, never sold
  - Users can delete data anytime
  - Raw data never shared with third parties

**Technical Specs:**
- Manual input UI: Daily prompt (can be skipped)
- Auto-save to Supabase on input
- Offline support: Queue inputs locally
- OAuth sync (future): Once daily

**Acceptance Criteria:**
- Manual input takes <30 seconds
- 70%+ of users provide health data (even if manual)
- Data sync works reliably (online/offline)
- **Note:** Web apps have limited access to device sensors compared to native apps

---

#### 6.1.4 Daily Ritual & Habit Formation
**Priority:** P0 (Blocker)  
**User Story:** *"As a user, I want to feel motivated to log my sugar intake every day so that I build a lasting healthy habit."*

**Requirements:**
- ✅ **Daily Streak System:**
  - Track consecutive days of logging
  - Milestone rewards: Day 1, Day 3, Day 7, Day 14, Day 30
  - Visual streak counter on home screen
  - Flame icon 🔥 that grows with streak length
  
- ✅ **Streak Protection:**
  - "Freeze" power-up: Protect streak for 1 missed day (earned at Day 7)
  - Warning notification if user hasn't logged by 8 PM
  
- ✅ **Daily Goal:**
  - Simple goal: "Log at least one sugar event today"
  - Progress bar showing completion
  
- ✅ **Motivational Messaging:**
  - Copy that creates FOMO: "Log today to protect your 7-day streak! 🔥"
  - Friendly, not preachy: "Quick! What did you have today?"
  - Celebration for milestone streaks: "🎉 7 days! You're unstoppable!"

**Technical Specs:**
- Streak calculation: Server-side to prevent manipulation
- Timezone handling: Use user's local timezone
- Notifications: Push for streak reminders (optional)

**Acceptance Criteria:**
- 50%+ users maintain 3-day streak
- 30%+ users reach 7-day streak
- Streak UI updates in real-time

---

#### 6.1.5 Immediate Feedback & Rewards
**Priority:** P0 (Blocker)  
**User Story:** *"As a user, I want to feel instantly rewarded after every action so that logging feels satisfying and fun."*

**Requirements:**
- ✅ **After Every Sugar Log:**
  1. **Visual Animation:** Confetti, particle effects, or lottie animation
  2. **Haptic Feedback:** Light haptic pulse (iOS/Android)
  3. **Sound Effect:** Subtle "success" sound (optional, toggle in settings)
  4. **Reward Display:** "+10 XP" or badge unlock notification
  
- ✅ **Variable Reward System:**
  - Not every log gives the same reward
  - Random bonuses: "2x XP Hour!" or "Surprise bonus: +50 XP!"
  - Loot box mechanic: Occasional mystery rewards
  - Creates curiosity: "What will I get today?"
  
- ✅ **Reward Types:**
  - **XP Points:** Standard reward for all actions
  - **Badges:** For achievements (first log, 10 logs, healthy swap, etc.)
  - **Level Ups:** Every 500 XP → Level Up with visual fanfare
  - **Surprise Rewards:** Discount codes, fun facts, personalized tips

**Technical Specs:**
- Animation library: Lottie or Rive for lightweight animations
- Sound files: <50KB each, compressed
- Reward calculation: Real-time, no lag

**Acceptance Criteria:**
- Feedback appears within 300ms of action
- Animations run at 60fps on mid-range devices
- Variable rewards distributed correctly (80% standard, 20% bonus)

---

#### 6.1.6 Gamified Scoring System
**Priority:** P0 (Blocker)  
**User Story:** *"As a user, I want to earn points for healthy behaviors so that I feel motivated to make better choices."*

**Requirements:**
- ✅ **Dynamic Point System:**
  - **Base Actions:**
    - Log sugar event: +10 XP
    - Complete corrective action (walk): +15 XP
    - Drink water after sugar: +5 XP
    - Choose healthier alternative: +20 XP
  - **Time-Based Bonuses:**
    - Log before 6 PM: +3 XP (encourages not eating sugar late)
    - Complete action within 30 mins: +7 XP
    - Morning activity: +5 XP
  - **Streak Bonuses:**
    - 3-day streak: +50 XP
    - 7-day streak: +100 XP
    - 30-day streak: +500 XP
  
- ✅ **Leaderboard (Optional Signup Required):**
  - Weekly leaderboard among friends
  - Anonymous global ranking
  - Categories: Most improved, Longest streak, Healthiest swaps

**Technical Specs:**
- Point calculation: Server-side to prevent cheating
- Real-time updates via WebSocket
- Cache leaderboard data for offline viewing

**Acceptance Criteria:**
- Points awarded correctly for all actions
- Leaderboard updates within 5 seconds
- No duplicate point awards for same action

---

### 6.2 Optional Features (Enhanced Experience Post-Signup)

#### 6.2.1 Optional Signup for Enhanced Experience
**Priority:** P1 (Important)  
**User Story:** *"As an engaged user, I want to sign up to unlock advanced features and sync my data across devices."*

**Requirements:**
- ✅ **When to Ask:**
  - Only after user has logged 5+ sugar events
  - After user completes first streak milestone (Day 3)
  - When user tries to access premium feature
  - **Never** force signup—always skippable
  
- ✅ **Value Proposition:**
  - "Want your data on all devices? Sign up to unlock:"
  - Cloud sync across devices
  - Advanced insights and trends
  - Leaderboard access
  - Personalized weekly reports
  - Early access to new features
  
- ✅ **Signup Methods:**
  - Email + Password (passwordless OTP option)
  - Google Sign-In
  - Apple Sign-In
  - Phone number (SMS OTP)
  
- ✅ **Data Migration:**
  - Seamlessly transfer anonymous data to authenticated account
  - Preserve streak, XP, badges
  - One-click migration

**Technical Specs:**
- OAuth 2.0 for social logins
- JWT for session management
- Data migration: Atomic transaction to prevent data loss

**Acceptance Criteria:**
- 30%+ anonymous users convert to signed-up within 7 days
- Zero data loss during migration
- Signup flow completes in <60 seconds

---

#### 6.2.2 Context-Aware Insight Generation (ML-Based)
**Priority:** P0 (Blocker for differentiation)  
**User Story:** *"As a user, I want to understand how my sugar intake affects my body right now based on my current activity and sleep."*

**Requirements:**
- ✅ **Input Data for ML Model:**
  - **User Profile:** Age, BMI, gender
  - **Passive Data:** Steps today, sleep duration last night, heart rate
  - **Context:** Time of day, day of week
  - **Sugar Event:** Type, quantity, timing
  - **Historical Pattern:** User's typical sugar intake
  
- ✅ **Insight Characteristics:**
  - **Simple Language:** 8th-grade reading level
  - **Cause → Effect Format:** "Because X, Y might happen"
  - **Non-Medical:** Never diagnose or use medical terms
  - **Personalized:** Different insight for same event based on context
  
- ✅ **Example Insights:**
  - *"You had poor sleep (4 hrs) and just consumed sugar. This might cause an energy crash soon."*
  - *"You've walked 8,000 steps today. This sugar won't impact you as much since you're active."*
  - *"Having sugar after 6 PM often leads to restless sleep for people your age."*
  - *"You've had 3 sugary items today—more than your usual 1. Your energy might be unstable."*

**ML Model Approach:**
- **Phase 1 (MVP):** Rule-based decision tree
  - If sleep < 6 hours AND sugar > 25g → "Energy crash likely"
  - If steps > 8000 AND sugar event → "Active lifestyle mitigates impact"
  - If time > 18:00 AND sugar event → "May affect sleep quality"
  
- **Phase 2 (Post-Launch):** Lightweight ML model
  - Train on user cohorts (age, BMI, activity level)
  - Use TensorFlow Lite / Core ML for on-device inference
  - Features: Age, BMI, steps, sleep, time, sugar amount
  - Target: Predict short-term impact (energy, sleep, cravings)

**Technical Specs:**
- Response time: <500ms for insight generation
- Offline support: Cache common insights locally
- Model size: <5MB for on-device ML

**Acceptance Criteria:**
- Insights are relevant for 90%+ of users (measured via feedback thumbs up/down)
- No repetitive or generic insights
- Insights update in real-time as context changes

---

#### 6.2.3 Personalized Corrective Action Suggestion
**Priority:** P0 (Blocker)  
**User Story:** *"As a user, I want immediate, actionable advice after logging sugar so that I can offset its negative effects right now."*

**Requirements:**
- ✅ **Action Selection Logic:**
  - Based on: Age, activity level (steps), time of day, sugar amount
  - **Only ONE primary action** suggested (avoid choice paralysis)
  - Action must be achievable immediately (within 30 minutes)
  
- ✅ **Action Types:**
  - **10-Minute Walk:** If user is sedentary (<3000 steps) and consumed >20g sugar
  - **Drink 500ml Water:** If time is after meal, sugar is high-glycemic (cold drink, candy)
  - **Protein Snack Swap:** If user frequently snacks, suggest alternatives (nuts, yogurt)
  - **5-Minute Breathing Exercise:** If consumed sugar due to stress (evening snacking)
  - **Delay Next Sugar:** Suggest waiting 3 hours before next sugary item
  
- ✅ **Action Decision Tree:**
  ```
  IF sugar_amount > 25g AND steps < 3000:
    → Suggest: "Take a 10-minute walk to balance your blood sugar"
  ELIF sugar_amount > 25g AND steps > 5000:
    → Suggest: "Drink a glass of water to slow sugar absorption"
  ELIF time > 18:00:
    → Suggest: "Try herbal tea instead next time for better sleep"
  ELSE:
    → Suggest: "Great job logging! Try a protein snack if you feel hungry later"
  ```
  
- ✅ **Action Tracking:**
  - User can mark action as "Done" → Earn bonus XP
  - Timer: Show countdown ("Complete within 30 min for +7 XP bonus")
  - Proof options: Step count auto-verified, water intake self-reported

**Technical Specs:**
- Action suggestion: Real-time, no server delay
- Action tracking: Persist in local DB, sync when online
- Notifications: Remind after 15 mins if action not completed

**Acceptance Criteria:**
- 60%+ of users complete at least one suggested action
- Actions are contextually appropriate (no walking suggestion at 11 PM)
- Completion tracking works accurately

---

### 6.3 Bonus Features (Extra Points)

#### 6.3.1 Photo-Based Logging
**Priority:** P2 (Nice to have)  
**User Story:** *"As a user, I want to snap a photo of my food and have the app automatically detect sugar content."*

**Requirements:**
- Image recognition using pre-trained model (MobileNet, ResNet)
- Identify common Indian/Asian foods: Gulab jamun, Jalebi, Packaged snacks
- Confidence score: Only suggest if >70% confident
- Fallback: Manual selection if detection fails

**Technical Specs:**
- Model: TensorFlow Lite, <10MB
- Inference time: <2 seconds
- Works offline

---

#### 6.3.2 Voice-Based Logging
**Priority:** P2 (Nice to have)  
**User Story:** *"As a user, I want to say 'I had chai' and have the app log it automatically."*

**Requirements:**
- Voice input: Web Speech API / React Native Voice
- Natural language processing: "I had 2 cups of chai" → Log 2x chai
- Supported languages: English, Hindi (Hinglish)

**Technical Specs:**
- Wake word: "Hey Sugar" or tap-to-speak
- Response time: <3 seconds
- Accuracy: >85% for common phrases

---

#### 6.3.3 Explainability of Suggestions
**Priority:** P1 (Important for trust)  
**User Story:** *"As a user, I want to understand WHY the app suggested a specific action so that I trust the recommendations."*

**Requirements:**
- Show reasoning: "We suggested a walk because you have low step count today and sugar can cause an energy dip"
- Expandable "Learn More" section
- Educational micro-content: "Did you know? Walking for 10 mins can reduce blood sugar spike by up to 30%"

---

## 7. User Experience & Flow

### 7.1 Core User Journeys

#### Journey 1: First-Time User (Day 1)
```
1. Download app / Open PWA
   ↓
2. Welcome screen: "Beat the Sugar Spike in 10 seconds" [Start]
   ↓
3. Onboarding (gamified, 5 screens):
   - Age selection
   - Height selection
   - Weight selection
   - Gender selection
   - Health permissions (skippable)
   ↓
4. Home screen appears:
   - "Log your first sugar today!"
   - Quick-access preset buttons
   ↓
5. User taps "Chai" preset
   ↓
6. Quantity selector: [1 cup] (default)
   ↓
7. Tap "Log"
   ↓
8. ✨ Success animation + "+10 XP" + First log badge unlocked
   ↓
9. Insight appears: "Chai in the morning is common! Track how it affects your energy."
   ↓
10. Action suggestion: "Try reducing to 1 tsp sugar next time for a healthier start"
   ↓
11. User marks "Remind me tomorrow"
   ↓
12. Returns to home: Streak counter shows "Day 1 🔥"
```

**Total Time:** 90 seconds (30s onboarding + 8s logging + 30s reading insight + 22s interaction)

---

#### Journey 2: Returning User (Day 3)
```
1. Open app (push notification: "🔥 Protect your 3-day streak!")
   ↓
2. Home screen shows:
   - Streak: "Day 3 🔥🔥🔥"
   - XP: "240 XP • Level 2"
   - Quick log buttons
   ↓
3. User taps "Cold Drink" preset
   ↓
4. Quantity selector appears
   ↓
5. Tap "Log"
   ↓
6. ✨ Animation + "2x XP Hour! +20 XP" (variable reward)
   ↓
7. Context-aware insight:
   "You walked only 1,200 steps today and had a cold drink. This might cause an energy dip."
   ↓
8. Action suggestion:
   "Take a 10-minute walk now to balance your blood sugar (+15 XP)"
   [Start Walk Timer]
   ↓
9. User taps "Start Walk Timer"
   ↓
10. Timer counts down: "9:32 remaining"
   ↓
11. After 10 minutes, step count auto-increments
   ↓
12. ✨ "Action completed! +15 XP + 7 XP bonus (completed within 30 min)"
   ↓
13. Unlocks "Active Warrior" badge
   ↓
14. Prompt: "You're doing great! Sign up to save your progress across devices?"
    [Maybe Later] [Sign Up]
   ↓
15. User taps "Maybe Later"
   ↓
16. Returns to home with updated XP and streak
```

**Total Time:** 4 minutes (7s logging + 30s reading + 10 min walk + rest is engagement)

---

#### Journey 3: Signup Conversion (Day 7)
```
1. User completes 7-day streak
   ↓
2. Big celebration animation: "🎉 7 Days! You're unstoppable!"
   ↓
3. Unlocks "Week Warrior" badge + 100 XP bonus
   ↓
4. Gentle prompt appears:
   "Want to keep this progress forever? Sign up to backup your data"
   - Show benefits: Cloud sync, leaderboard, weekly reports
   [Sign Up] [Not Now]
   ↓
5. User taps "Sign Up"
   ↓
6. Signup screen with options:
   [Continue with Google]
   [Continue with Apple]
   [Continue with Email]
   ↓
7. User selects Google → OAuth flow
   ↓
8. Success: "Your data is now safe! ✅"
   ↓
9. Data migration happens in background (preserves streak, XP, badges)
   ↓
10. New features unlock:
    - Weekly insights report
    - Leaderboard access
    - Personalized goal setting
   ↓
11. Returns to home (now signed in)
```

**Conversion Rate Goal:** 30% of Day-7 users sign up

---

### 7.2 Screen-by-Screen Breakdown

#### Screen 1: Welcome / Splash
- **Purpose:** First impression, set expectations
- **Elements:**
  - App logo + tagline: "Beat the Sugar Spike in 10 seconds"
  - Illustration: Energetic character (avatar mascot)
  - CTA: "Let's Go!" button (primary, large)
  - Fine print: "No signup needed • Start in seconds"
- **Animations:** Fade-in logo, subtle pulse on CTA

#### Screen 2-6: Onboarding (Gamified)
- **Purpose:** Collect minimum data, feel like a game
- **Common Elements:**
  - Progress bar: "3 of 5"
  - Back button (top-left)
  - Skip button (text link, non-prominent)
- **Individual Screens:**
  - **Age:** Slider (16-60), large display
  - **Height:** Visual ruler with slider, metric/imperial toggle
  - **Weight:** Slider with visual scale metaphor
  - **Gender:** Card selection with inclusive options
  - **Permissions:** Friendly explanation, visual icons for health data
- **Animations:** Smooth screen transitions (slide), progress bar fills

#### Screen 7: Home (Main Dashboard)
- **Purpose:** Central hub for all actions
- **Layout (Top to Bottom):**
  1. **Header:**
     - Greeting: "Hey, Mayank! 👋"
     - Streak indicator: "Day 3 🔥"
     - XP & Level: "240 XP • Level 2"
  2. **Quick Log Section:**
     - Title: "What did you have today?"
     - Preset buttons (2x4 grid):
       [Chai ☕] [Cold Drink 🥤]
       [Sweets 🍬] [Biscuits 🍪]
       [Cake 🍰] [Ice Cream 🍦]
       [Packaged Snack 🍿] [Other ➕]
  3. **Today's Summary:**
     - "2 sugar events today"
     - Visual timeline with logged items
  4. **Action Card (if pending):**
     - "Complete your walk: 5 min remaining ⏱️"
     - Progress bar
  5. **Bottom Nav:**
     - [Home 🏠] [History 📊] [Insights 💡] [Profile 👤]
- **Animations:** Floating action button (log sugar), card entrance

#### Screen 8: Insight & Action (Post-Log)
- **Purpose:** Show personalized feedback immediately after logging
- **Layout:**
  1. **Success Feedback:**
     - Lottie animation (confetti, checkmark)
     - "+10 XP" in large, bold text
     - Badge unlock (if applicable): "First Log! 🏆"
  2. **Context-Aware Insight Card:**
     - Icon representing context (sleep, activity, time)
     - Insight text: "You had poor sleep (4 hrs) and just consumed sugar..."
     - "Why this matters" expandable section
     - Thumbs up/down for feedback
  3. **Action Suggestion Card:**
     - Bold headline: "Take a 10-minute walk"
     - Reasoning: "This will help balance your blood sugar"
     - Timer button: [Start 10-min Walk]
     - Skip option: "I'll do it later"
  4. **CTA:**
     - [Done] button to return to home
- **Animations:** Sequential reveal (success → insight → action)

#### Screen 9: History
- **Purpose:** Show user's past sugar events and patterns
- **Layout:**
  - **Filter tabs:** [Today] [Week] [Month]
  - **Calendar view:** Dots on dates with events
  - **List view:** Chronological log entries
    - "9:30 AM • Chai (1 cup) • +10 XP"
    - Show insight and action taken
  - **Stats Summary:**
    - Total events this week
    - Most common items
    - Average daily sugar intake
- **Animations:** Smooth transitions between tabs

#### Screen 10: Insights / Analytics
- **Purpose:** Show trends, patterns, and personalized reports
- **Layout (For Signed-Up Users):**
  1. **Weekly Report Card:**
     - "Your week in sugar"
     - Visual chart: Bar graph of daily sugar events
     - Comparison: "20% better than last week! 📈"
  2. **Patterns Identified:**
     - "You consume most sugar between 4-6 PM"
     - "Sugar intake correlates with low sleep"
  3. **Recommendations:**
     - "Try a protein snack instead during 4 PM cravings"
- **Animations:** Charts animate on load (draw-in effect)

#### Screen 11: Profile
- **Purpose:** User settings, achievements, and account management
- **Layout:**
  1. **User Info:**
     - Avatar (can customize later)
     - Name/Email (if signed up)
     - Level & XP progress bar
  2. **Achievements:**
     - Badge showcase (grid of earned badges)
     - Locked badges (grayed out with unlock conditions)
  3. **Settings:**
     - Notifications toggle
     - Sound effects toggle
     - Health data permissions
     - Units (metric/imperial)
     - [Sign Up] button (if anonymous)
     - [Sign Out] button (if signed in)
  4. **Stats:**
     - Total sugar events logged
     - Longest streak
     - Total XP earned
     - Leaderboard rank (if signed up)

---

## 8. Technical Architecture

### 8.1 Technology Stack

#### Frontend (Web App / PWA)
- **Framework:** Next.js 14 (App Router) with TypeScript
- **State Management:** Zustand (lightweight, performant)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Animations:** Framer Motion + Lottie (lottie-react)
- **PWA:** next-pwa for installable web app
- **Forms:** React Hook Form with Zod validation
- **HTTP Client:** Supabase client (built-in)
- **Local Storage:** IndexedDB (via Dexie.js) + localStorage
- **Health Data:**
  - Manual input (Web APIs have limited health access)
  - Optional: Fitbit/Garmin OAuth integration
- **Voice:** Web Speech API (browser native)
- **Camera:** Web Camera API (for photo logging)
- **Charts:** Recharts
- **Icons:** Lucide React

#### Backend (Supabase)
- **Database:** PostgreSQL (Supabase managed)
- **Authentication:** Supabase Auth
  - Anonymous sign-in (device-based)
  - OAuth 2.0: Google, Apple, GitHub
  - Email/Password + Magic Links
  - JWT tokens (managed by Supabase)
- **API:** Auto-generated REST & GraphQL APIs (PostgREST)
- **File Storage:** Supabase Storage (S3-compatible)
- **Edge Functions:** Deno runtime (for ML inference, cron jobs)
- **Real-time:** Supabase Realtime (PostgreSQL CDC for live updates)
- **Row Level Security:** Built-in RLS policies for data security
- **Cron Jobs:** pg_cron extension for scheduled tasks

#### Machine Learning
- **Insight Engine (Phase 1):** Rule-based decision tree (Supabase Edge Function)
- **ML Model (Phase 2):**
  - Training: Python + scikit-learn or TensorFlow
  - Deployment: Supabase Edge Function (Deno runtime) or TensorFlow.js
  - Features: Age, BMI, steps, sleep, time, sugar amount
  - Model size: <5MB
  - Inference: Edge function (server-side) or TensorFlow.js (client-side)
- **NLP (for voice):** Web Speech API (built-in) + simple regex parsing

#### Infrastructure & DevOps
- **Hosting:**
  - Frontend: Vercel (Next.js optimized, global CDN)
  - Backend: Supabase (managed PostgreSQL, auto-scaling)
- **CDN:** Vercel Edge Network + Supabase CDN
- **Monitoring:** 
  - Sentry (error tracking)
  - Supabase Dashboard (database metrics)
  - Vercel Analytics (Web Vitals)
- **Analytics:** Mixpanel or PostHog (user behavior)
- **CI/CD:** GitHub Actions + Vercel auto-deploy
- **Version Control:** Git + GitHub

#### Third-Party Services
- **Push Notifications:** Web Push API (browser native) + OneSignal
- **Email:** Supabase Edge Functions + Resend or SendGrid
- **SMS:** Twilio (optional)
- **Payment (Future):** Stripe
- **A/B Testing:** PostHog or Vercel Edge Config

---

### 8.2 System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (PWA)                        │
├──────────────────────────────────────────────────────────────┤
│  Next.js 14 App (Browser - Mobile/Desktop/Tablet)          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   UI Layer   │  │ State Mgmt   │  │ Local Storage│      │
│  │  (React)     │  │  (Zustand)   │  │  (IndexedDB) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Service Worker│  │  TensorFlow.js│  │  Animations  │      │
│  │   (Offline)  │  │  (ML Client) │  │ (Framer/Lottie)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTPS / WebSocket (Supabase Client)
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                  SUPABASE BACKEND (Managed)                  │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │              PostgREST API Gateway                   │   │
│  │  - Auto-generated REST & GraphQL APIs               │   │
│  │  - Row Level Security (RLS)                         │   │
│  │  - JWT Authentication                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Supabase    │  │  Supabase    │  │   Supabase   │      │
│  │   Auth       │  │  Realtime    │  │   Storage    │      │
│  │(Anonymous,   │  │(WebSocket)   │  │(S3-compatible)│     │
│  │OAuth, Email) │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────┐                   │
│  │     Supabase Edge Functions (Deno)  │                   │
│  │  - Insight Generation (ML/Rules)    │                   │
│  │  - Cron Jobs (Streak checks)        │                   │
│  │  - Email Notifications              │                   │
│  └──────────────────────────────────────┘                   │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER (PostgreSQL)                │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │  pg_cron     │  │  Extensions  │      │
│  │  (Supabase)  │  │(Scheduled    │  │(uuid, pgvector)│     │
│  │              │  │  Tasks)      │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

### 8.3 Data Flow

#### Flow 1: Log Sugar Event
```
User taps "Chai" button
  ↓
App creates event object
  {
    user_id: uuid,
    item_type: "chai",
    quantity: 1,
    timestamp: ISO string,
    sugar_grams: 15
  }
  ↓
Save to local DB (AsyncStorage)
  ↓
API call: POST /api/sugar-events
  ↓
Server validates data
  ↓
Save to PostgreSQL
  ↓
Trigger insight generation:
  - Fetch user profile (age, BMI)
  - Get today's health data (steps, sleep)
  - Run decision tree logic
  - Generate insight text
  ↓
Calculate XP reward:
  - Base: +10 XP
  - Time bonus: +3 XP (if before 6 PM)
  - Variable bonus: Random 20% chance +10 XP
  ↓
Update user XP in DB
  ↓
Check for level up / badge unlock
  ↓
Return response to app:
  {
    success: true,
    xp_earned: 13,
    insight: "You walked only 1,200 steps...",
    action: {
      type: "walk",
      duration: 10,
      reason: "Low activity + sugar"
    },
    badges_unlocked: []
  }
  ↓
App displays success animation + insight
```

---

## 9. Data Model & Schema

### 9.1 Database Tables

#### Table: `users`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `device_id` | VARCHAR(255) | Anonymous device identifier |
| `email` | VARCHAR(255) | Optional, null for anonymous |
| `auth_provider` | ENUM | 'anonymous', 'google', 'apple', 'email' |
| `age` | INT | User's age |
| `height_cm` | DECIMAL | Height in centimeters |
| `weight_kg` | DECIMAL | Weight in kilograms |
| `bmi` | DECIMAL | Calculated BMI |
| `gender` | ENUM | 'male', 'female', 'other', 'prefer_not_to_say' |
| `xp_points` | INT | Total XP earned |
| `level` | INT | Current level (calculated from XP) |
| `current_streak` | INT | Current consecutive days |
| `longest_streak` | INT | Longest streak achieved |
| `freeze_uses` | INT | Number of streak freezes available |
| `created_at` | TIMESTAMP | Account creation date |
| `updated_at` | TIMESTAMP | Last update date |
| `last_active_at` | TIMESTAMP | Last app open |

**Indexes:**
- `device_id` (unique)
- `email` (unique, sparse)
- `xp_points` (for leaderboard)

---

#### Table: `sugar_events`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `item_type` | VARCHAR(50) | 'chai', 'cold_drink', 'sweets', etc. |
| `item_name` | VARCHAR(255) | Custom name (if "Other") |
| `quantity` | DECIMAL | Number of servings |
| `sugar_grams` | DECIMAL | Estimated sugar content |
| `timestamp` | TIMESTAMP | When event occurred |
| `context` | JSONB | {steps, sleep, time_of_day, day_of_week} |
| `insight_shown` | TEXT | Generated insight |
| `action_suggested` | VARCHAR(50) | 'walk', 'water', 'protein_snack', etc. |
| `action_completed` | BOOLEAN | Did user complete the action? |
| `xp_earned` | INT | XP awarded for this event |
| `created_at` | TIMESTAMP | Log creation time |

**Indexes:**
- `user_id` (for user query)
- `timestamp` (for date range queries)
- `item_type` (for analytics)

---

#### Table: `health_data_snapshots`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `date` | DATE | Snapshot date |
| `steps` | INT | Daily step count |
| `sleep_hours` | DECIMAL | Sleep duration |
| `resting_hr` | INT | Resting heart rate (optional) |
| `active_minutes` | INT | Moderate/vigorous activity |
| `source` | VARCHAR(50) | 'healthkit', 'google_fit', 'manual' |
| `synced_at` | TIMESTAMP | Last sync time |

**Indexes:**
- `user_id, date` (composite, unique)
- `date` (for aggregations)

---

#### Table: `badges`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | VARCHAR(100) | "First Log", "Week Warrior", etc. |
| `description` | TEXT | Badge description |
| `icon_url` | VARCHAR(255) | Badge icon URL |
| `unlock_condition` | JSONB | {type: 'streak', value: 7} |
| `rarity` | ENUM | 'common', 'rare', 'epic', 'legendary' |
| `xp_reward` | INT | Bonus XP on unlock |

---

#### Table: `user_badges`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `badge_id` | UUID | Foreign key → badges.id |
| `unlocked_at` | TIMESTAMP | When earned |

**Indexes:**
- `user_id, badge_id` (composite, unique)

---

#### Table: `actions_completed`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key → users.id |
| `sugar_event_id` | UUID | Foreign key → sugar_events.id |
| `action_type` | VARCHAR(50) | 'walk', 'water', etc. |
| `completed_at` | TIMESTAMP | Completion time |
| `duration_minutes` | INT | For timed actions |
| `xp_earned` | INT | XP for completion |

---

#### Table: `leaderboard` (Materialized View)
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | UUID | User ID |
| `rank` | INT | Global rank |
| `xp_points` | INT | Total XP |
| `current_streak` | INT | Current streak |
| `period` | VARCHAR(20) | 'weekly', 'all_time' |

**Refresh:** Daily at midnight

---

### 9.2 API Endpoints

#### Authentication
```
POST   /api/auth/anonymous          # Create anonymous session
POST   /api/auth/signup              # Signup (convert anonymous → authenticated)
POST   /api/auth/login               # Login
POST   /api/auth/logout              # Logout
POST   /api/auth/refresh             # Refresh JWT token
```

#### User Management
```
GET    /api/users/me                 # Get current user profile
PATCH  /api/users/me                 # Update profile
POST   /api/users/migrate            # Migrate anonymous → authenticated
```

#### Sugar Events
```
POST   /api/sugar-events             # Log new sugar event
GET    /api/sugar-events             # Get user's events (paginated)
GET    /api/sugar-events/:id         # Get single event
DELETE /api/sugar-events/:id         # Delete event
GET    /api/sugar-events/stats       # Get aggregated stats
```

#### Health Data
```
POST   /api/health/sync              # Sync health data from device
GET    /api/health/latest            # Get latest health snapshot
```

#### Gamification
```
GET    /api/gamification/xp          # Get user's XP details
GET    /api/gamification/badges      # Get earned badges
GET    /api/gamification/leaderboard # Get leaderboard (requires auth)
POST   /api/gamification/streak      # Update streak
```

#### Insights & Actions
```
POST   /api/insights/generate        # Generate insight for event
POST   /api/actions/complete         # Mark action as completed
GET    /api/actions/pending          # Get pending actions
```

---

## 10. UI/UX Design Guidelines

### 10.1 Design System

#### Color Palette
**Primary Colors:**
- **Brand Primary:** `#FF6B6B` (Energetic coral-red)
- **Brand Secondary:** `#4ECDC4` (Fresh teal)
- **Accent:** `#FFE66D` (Warm yellow)

**Neutral Colors:**
- **Background:** `#F7F9FC` (Light gray-blue)
- **Surface:** `#FFFFFF` (White)
- **Text Primary:** `#2D3748` (Dark gray)
- **Text Secondary:** `#718096` (Medium gray)

**Semantic Colors:**
- **Success:** `#48BB78` (Green)
- **Warning:** `#ECC94B` (Yellow)
- **Error:** `#F56565` (Red)
- **Info:** `#4299E1` (Blue)

**Gradient:**
- **Streak Fire:** `linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)`
- **Level Up:** `linear-gradient(135deg, #4ECDC4 0%, #556270 100%)`

#### Typography
- **Font Family:** Inter (primary), SF Pro (iOS native), Roboto (Android native)
- **Headings:**
  - H1: 32px, Bold
  - H2: 24px, Semibold
  - H3: 20px, Medium
- **Body:**
  - Large: 18px, Regular
  - Medium: 16px, Regular
  - Small: 14px, Regular
- **CTA Buttons:** 16px, Semibold

#### Spacing
- **Base Unit:** 4px
- **Common Spacings:** 8px, 12px, 16px, 24px, 32px, 48px
- **Container Padding:** 16px (mobile), 24px (tablet)

#### Border Radius
- **Small:** 8px (buttons, inputs)
- **Medium:** 12px (cards)
- **Large:** 16px (modals, sheets)
- **Circular:** 50% (avatars, badges)

#### Shadows
- **Light:** `0 2px 4px rgba(0,0,0,0.05)`
- **Medium:** `0 4px 12px rgba(0,0,0,0.08)`
- **Strong:** `0 8px 24px rgba(0,0,0,0.12)`

---

### 10.2 Animation Guidelines

#### Transition Timing
- **Fast:** 150ms (micro-interactions, hovers)
- **Normal:** 300ms (screen transitions, card reveals)
- **Slow:** 500ms (celebration animations, level ups)

#### Easing Functions
- **Standard:** `cubic-bezier(0.4, 0.0, 0.2, 1)` (Material Design standard)
- **Decelerate:** `cubic-bezier(0.0, 0.0, 0.2, 1)` (exiting animations)
- **Accelerate:** `cubic-bezier(0.4, 0.0, 1, 1)` (entering animations)
- **Spring:** Use for delightful bounces (card entrances, button presses)

#### Key Animations
1. **Log Success:** Confetti + scale-up XP text (500ms)
2. **Badge Unlock:** Slide up + shimmer effect (800ms)
3. **Streak Increment:** Flame grows + pulse (300ms)
4. **Level Up:** Full-screen explosion + sound (1200ms)
5. **Button Press:** Scale down 0.95 + haptic (150ms)

---

### 10.3 Accessibility

#### WCAG 2.1 Compliance (Level AA)
- **Color Contrast:** Minimum 4.5:1 for text, 3:1 for UI components
- **Touch Targets:** Minimum 44x44px for all interactive elements
- **Screen Reader Support:** Semantic HTML/ native components, proper labels
- **Keyboard Navigation:** Full keyboard support (web version)
- **Motion Reduction:** Respect `prefers-reduced-motion` setting

#### Inclusive Design
- **Gender Options:** Male, Female, Other, Prefer not to say
- **Language Support:** English (MVP), Hindi (Phase 2)
- **Offline Support:** Full functionality without internet
- **Low-Data Mode:** Option to disable animations

---

## 11. Gamification System

### 11.1 XP & Leveling System

#### XP Earning Opportunities
| Action | Base XP | Bonus Conditions | Max XP |
|--------|---------|------------------|--------|
| Log sugar event | +10 | Time bonus (+3 before 6 PM) | +13 |
| Complete walk action | +15 | Within 30 min (+7) | +22 |
| Drink water | +5 | - | +5 |
| Choose healthier swap | +20 | - | +20 |
| 3-day streak milestone | +50 | - | +50 |
| 7-day streak milestone | +100 | - | +100 |
| 30-day streak milestone | +500 | - | +500 |
| Invite friend (sign up) | +75 | - | +75 |
| Complete weekly goal | +150 | - | +150 |

#### Level Progression
```
Level 1: 0 - 100 XP
Level 2: 100 - 250 XP
Level 3: 250 - 500 XP
Level 4: 500 - 850 XP
Level 5: 850 - 1,300 XP
...
Formula: XP_required = 100 + (level - 1) * 150
```

**Level Benefits:**
- **Level 5:** Unlock custom presets
- **Level 10:** Unlock advanced insights
- **Level 20:** Unlock personalized coaching
- **Level 50:** Exclusive "Sugar Master" badge

---

### 11.2 Badge System

#### Badge Categories

**Beginner Badges (Common):**
- 🏅 **First Step:** Log your first sugar event
- 🔥 **Day 3 Streak:** Maintain a 3-day streak
- 💧 **Hydration Hero:** Drink water 5 times
- 🚶 **Walker:** Complete 3 walking actions

**Intermediate Badges (Rare):**
- 🏆 **Week Warrior:** Maintain a 7-day streak
- 🥇 **Century Club:** Log 100 sugar events
- 🌟 **Perfect Week:** Have <5 sugar events in a week
- 💪 **Action Hero:** Complete 25 corrective actions

**Advanced Badges (Epic):**
- 🔥 **Month Master:** Maintain a 30-day streak
- 📉 **Sugar Reducer:** Reduce weekly sugar by 50%
- 🎯 **Precision Logger:** Log every day for 2 weeks
- 🧠 **Context King:** Get 50 personalized insights

**Legendary Badges:**
- 👑 **Sugar Master:** 100-day streak
- 🏅 **Top 100:** Reach top 100 on leaderboard
- 💎 **Transformation:** Reduce sugar by 80% over 3 months

---

### 11.3 Streak System

#### Streak Mechanics
- **Definition:** Consecutive days with at least 1 logged sugar event
- **Timezone:** Uses user's local timezone
- **Grace Period:** Logs made before 2 AM count for previous day
- **Streak Freeze:** Earned at Day 7, protects against 1 missed day

#### Visual Design
- **Days 1-2:** Single flame emoji 🔥
- **Days 3-6:** Double flames 🔥🔥
- **Days 7-13:** Triple flames 🔥🔥🔥
- **Days 14-29:** Fire + star 🔥⭐
- **Days 30+:** Trophy + fire 🏆🔥

#### Streak Reminders
- **8 PM:** Gentle reminder if not logged yet
- **10 PM:** Urgent reminder "Don't break your 7-day streak!"
- **Never annoy:** Max 2 notifications per day

---

### 11.4 Leaderboard (Authenticated Users Only)

#### Categories
1. **Weekly XP:** Reset every Monday
2. **All-Time XP:** Cumulative
3. **Longest Streak:** Current active streaks
4. **Most Improved:** Biggest reduction in sugar events (month over month)

#### Privacy
- **Anonymous Ranking:** Users see rank without revealing identity
- **Friends Only:** Option to compete only with friends
- **Opt-Out:** Can hide from leaderboard entirely

---

## 12. ML & Personalization Engine

### 12.1 Insight Generation Engine

#### Phase 1: Rule-Based Decision Tree (MVP)

**Input Features:**
- `age` (int)
- `bmi` (float)
- `steps_today` (int)
- `sleep_hours_last_night` (float)
- `time_of_day` (hour, 0-23)
- `sugar_amount_grams` (float)
- `sugar_events_today` (int)

**Decision Logic:**
```python
def generate_insight(age, bmi, steps, sleep, time, sugar_grams, events_today):
    # Rule 1: Low sleep + high sugar
    if sleep < 6 and sugar_grams > 20:
        return "You had poor sleep and just consumed sugar. Energy crash likely soon."
    
    # Rule 2: High activity mitigates
    elif steps > 8000:
        return "You've walked over 8,000 steps today! Your active lifestyle helps offset this."
    
    # Rule 3: Late-night sugar
    elif time >= 18:
        return "Having sugar after 6 PM often disrupts sleep quality for people your age."
    
    # Rule 4: Multiple events today
    elif events_today > 2:
        return f"This is your {events_today}rd sugar event today—more than your usual. Watch for energy swings."
    
    # Rule 5: High sugar amount
    elif sugar_grams > 30:
        return "That's a lot of sugar in one sitting! Consider splitting it next time."
    
    # Default
    else:
        return "Great job logging! Keep tracking to see your patterns."
```

#### Phase 2: ML Model (Post-Launch)

**Model Type:** Lightweight Random Forest or Gradient Boosting
**Target Variable:** Predict user response to corrective actions (completion rate)
**Training Data:** User behavior logs (events, actions, completions)

**Features (Expanded):**
- All Phase 1 features
- `day_of_week` (categorical)
- `usual_sugar_intake` (rolling average)
- `action_completion_history` (% completed in past)
- `time_since_last_event` (minutes)

**Deployment:**
- Convert model to TensorFlow Lite (<5MB)
- On-device inference (no server call needed)
- Fallback to Phase 1 rules if model unavailable

---

### 12.2 Action Recommendation Engine

#### Action Selection Logic
```python
def recommend_action(age, steps, time, sugar_grams, sleep):
    # High-priority: Sedentary + high sugar
    if steps < 3000 and sugar_grams > 20:
        return {
            'type': 'walk',
            'duration': 10,
            'reason': 'Low activity + sugar can cause energy dip'
        }
    
    # Medium-priority: High sugar, but active
    elif sugar_grams > 25 and steps > 5000:
        return {
            'type': 'water',
            'amount': 500,
            'reason': 'Water helps slow sugar absorption'
        }
    
    # Late-night suggestion
    elif time >= 18:
        return {
            'type': 'herbal_tea',
            'reason': 'Better for sleep than more sugar later'
        }
    
    # Encourage delay
    else:
        return {
            'type': 'delay_next',
            'duration': 180,  # 3 hours
            'reason': 'Give your body time to process this sugar'
        }
```

---

## 13. Implementation Roadmap

### 13.1 Phase 1: MVP (Weeks 1-3)

**Week 1: Foundation**
- ✅ Setup project (React Native + Expo)
- ✅ Design system & UI components
- ✅ Anonymous user creation (device ID)
- ✅ Gamified onboarding (5 screens)
- ✅ Local storage setup (AsyncStorage)

**Week 2: Core Features**
- ✅ Home screen with preset buttons
- ✅ Sugar event logging (one-tap)
- ✅ Success animations (Lottie)
- ✅ XP system & streak tracking
- ✅ Rule-based insight generation
- ✅ Action suggestions

**Week 3: Backend & Polish**
- ✅ API server (Node.js + Express)
- ✅ PostgreSQL schema & migrations
- ✅ API endpoints (auth, events, gamification)
- ✅ Offline support & sync
- ✅ Push notifications (FCM)
- ✅ Testing & bug fixes

**Deliverables:**
- Functional MVP with mandatory features
- Deployed to TestFlight (iOS) & Google Play Internal Testing (Android)

---

### 13.2 Phase 2: Enhanced Experience (Weeks 4-6)

**Week 4: Signup & Cloud Sync**
- ✅ Email/Google/Apple authentication
- ✅ Data migration (anonymous → authenticated)
- ✅ Cloud sync across devices
- ✅ Profile management

**Week 5: Advanced Features**
- ✅ History view with calendar
- ✅ Weekly insights & analytics
- ✅ Leaderboard (friends & global)
- ✅ Badge showcase
- ✅ Health data sync (HealthKit / Google Fit)

**Week 6: Gamification++**
- ✅ More badges (20+ total)
- ✅ Streak freeze mechanic
- ✅ Variable reward system (loot boxes)
- ✅ Level-up celebrations
- ✅ Social sharing

**Deliverables:**
- Full-featured app ready for public beta
- Onboarding funnel optimized (A/B tested)

---

### 13.3 Phase 3: ML & Bonus Features (Weeks 7-8)

**Week 7: Machine Learning**
- ✅ Train ML model on user data
- ✅ Deploy TensorFlow Lite model
- ✅ On-device inference
- ✅ Explainability UI

**Week 8: Bonus**
- ✅ Photo-based logging (optional)
- ✅ Voice logging (optional)
- ✅ Premium features (weekly reports, coaching)
- ✅ Referral system

**Deliverables:**
- Production-ready app
- App Store & Play Store submission

---

## 14. Risk Assessment & Mitigation

### 14.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Health data permissions denied | High | Medium | Fallback to manual input + explain value clearly |
| App performance on low-end devices | Medium | Medium | Optimize animations, lazy load, use native modules |
| Offline sync conflicts | Medium | Low | Last-write-wins + conflict resolution UI |
| ML model size too large | Low | Low | Use quantization, prune model, fallback to rules |
| API downtime | High | Low | Offline-first architecture, cache aggressively |

---

### 14.2 Product Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user retention | High | Medium | Focus on habit loops, daily streaks, variable rewards |
| Users don't sign up | Medium | Medium | Deliver value first, gentle prompts, clear benefits |
| Generic insights not helpful | High | Low | Continuous testing, user feedback loops |
| Privacy concerns | High | Low | Transparent privacy policy, data minimization |
| Competition from existing apps | Medium | High | Differentiate with signup-free + <10s logging |

---

### 14.3 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Monetization unclear | Medium | Medium | Focus on user growth first, freemium model later |
| Regulatory compliance (health data) | High | Low | HIPAA compliance (US), GDPR (EU), consult legal |
| Scalability costs | Medium | Low | Use serverless, optimize DB queries, cache heavily |

---

## 15. Appendices

### 15.1 Glossary

- **XP (Experience Points):** Points earned for completing actions
- **Streak:** Consecutive days of logging sugar events
- **Preset:** Quick-access button for common sugar items
- **Insight:** Personalized message explaining sugar's impact
- **Action:** Suggested corrective behavior (walk, water, etc.)
- **Badge:** Achievement unlocked for milestones
- **Freeze:** Power-up to protect streak from breaking

---

### 15.2 References

1. **Behavioral Psychology:**
   - Hooked: How to Build Habit-Forming Products (Nir Eyal)
   - Atomic Habits (James Clear)
   - BJ Fogg's Behavior Model

2. **Health & Nutrition:**
   - WHO Guidelines on Sugar Intake
   - CDC Diabetes Prevention Program
   - NIH Studies on Sugar and Health

3. **Gamification:**
   - Duolingo's Gamification Strategy
   - Superhuman's Retention Playbook
   - Variable Reward Schedules (B.F. Skinner)

4. **Design:**
   - Material Design 3
   - Human Interface Guidelines (iOS)
   - Inclusive Design Principles (Microsoft)

---

### 15.3 Competitive Feature Matrix

| Feature | Beat the Sugar Spike | MyFitnessPal | Yazio | HealthifyMe |
|---------|----------------------|--------------|-------|-------------|
| Signup-free start | ✅ Yes | ❌ No | ❌ No | ❌ No |
| <10s logging | ✅ Yes | ❌ No (3-5min) | ❌ No | ❌ No |
| Real-time insights | ✅ ML-powered | ❌ Generic | ⚠️ Limited | ⚠️ Limited |
| Gamification | ✅ Duolingo-level | ❌ Minimal | ⚠️ Basic | ⚠️ Basic |
| Passive health sync | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Sugar-specific focus | ✅ Yes | ❌ Calorie-focused | ❌ General | ❌ General |
| Streaks | ✅ Advanced | ⚠️ Basic | ⚠️ Basic | ⚠️ Basic |
| Variable rewards | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Action suggestions | ✅ Context-aware | ❌ Generic | ❌ Generic | ⚠️ Limited |
| Explainability | ✅ Yes | ❌ No | ❌ No | ❌ No |

---

### 15.4 Success Stories (Projected)

**User Story 1: Mayank (22, Student)**
> "I used to drink 3 cold drinks a day without thinking. After using Beat the Sugar Spike for 2 weeks, I realized my afternoon crashes were from sugar. The app's walk suggestions actually helped! Now I'm down to 1 drink per day and feel more energetic. The streak system is addictive—I don't want to break my 14-day run!"

**User Story 2: Riya (27, Professional)**
> "I loved that I could start without signing up. The insights are spot-on—it knew I had poor sleep and warned me about the crash. The data-driven approach feels scientific, not preachy. I'm now on Level 12 and have reduced my sugar by 40% in a month!"

**User Story 3: Arjun (19, College Student)**
> "My mom was worried about my junk food habit. This app makes it fun—I'm competing with friends on the leaderboard. The badges are cool, and I actually started walking more to earn XP. Lost 3kg without even trying!"

---

### 15.5 Future Enhancements (Post-MVP)

1. **Social Features:**
   - Friend challenges (who can reduce most sugar in a week)
   - Team competitions
   - Share achievements on social media

2. **Premium Features (Monetization):**
   - Personalized meal plans
   - 1-on-1 coaching
   - Advanced analytics (export data)
   - Custom goals beyond sugar tracking

3. **Integrations:**
   - Food delivery apps (suggest healthier alternatives)
   - Fitness apps (Nike Run Club, Strava)
   - Wearables (Apple Watch complication, Fitbit app)

4. **AI Enhancements:**
   - Predictive notifications ("You usually crave sugar at 4 PM—have a protein snack ready!")
   - Computer vision for automatic food recognition
   - Voice assistant integration ("Hey Siri, log my chai")

5. **Health Partnerships:**
   - Partner with diabetes prevention programs
   - Corporate wellness programs
   - Insurance integrations (rewards for healthy behavior)

---

## Conclusion

**Beat the Sugar Spike** is positioned to become the **Duolingo of health tracking**—making sugar awareness frictionless, fun, and scientifically backed. By eliminating signup barriers, providing instant gratification, and using context-aware ML insights, we solve the core problem: people want to be healthier, but existing apps are too complex.

**Key Differentiators:**
1. ⚡ **Fastest logging:** <10 seconds vs 3-5 minutes (competitors)
2. 🎮 **Gamification:** Duolingo-level engagement loops
3. 🧠 **Smart insights:** Context-aware ML, not generic advice
4. 🚀 **Signup-free:** Value first, commitment later

**Success Metrics Recap:**
- **100K downloads** in 3 months
- **50% DAU** (daily active users)
- **40% D30 retention**
- **25% sugar reduction** per user

This PRD provides the complete blueprint for building a category-defining health app. Let's beat the sugar spike! 🚀

---

**Document End**

*For questions or clarifications, contact: Product Team*  
*Last Updated: February 12, 2026*
