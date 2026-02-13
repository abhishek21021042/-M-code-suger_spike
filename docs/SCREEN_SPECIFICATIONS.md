# Screen Specifications for Beat the Sugar Spike
## Modern Design Guide — v2.0

**Version:** 2.0  
**Date:** February 12, 2026  
**Purpose:** Premium, gesture-driven, animation-rich UI specification  
**Design Language:** Glassmorphism · Micro-Interactions · Physics-Based Motion · Dark-Mode Ready

---

## Design System Overview

### Color Palette

```
─── Brand ───
Primary:       #FF6B6B → #FF3D71 (Coral gradient)
Secondary:     #4ECDC4 → #0ABAB5 (Teal gradient)
Accent:        #FFE66D → #FFC947 (Gold gradient)

─── Surface (Light) ───
Background:    #F0F4F8
Surface:       rgba(255, 255, 255, 0.72)   ← frosted glass
Elevated:      rgba(255, 255, 255, 0.90)
Card:          rgba(255, 255, 255, 0.60)   ← glassmorphism

─── Surface (Dark) ───
Background:    #0F172A
Surface:       rgba(30, 41, 59, 0.72)
Elevated:      rgba(30, 46, 67, 0.85)
Card:          rgba(30, 41, 59, 0.55)

─── Text ───
Primary:       #1A202C / Dark: #F1F5F9
Secondary:     #718096 / Dark: #94A3B8
Muted:         #A0AEC0 / Dark: #64748B

─── Semantic ───
Success:       #34D399
Warning:       #FBBF24
Error:         #F87171
Info:          #60A5FA
```

### Glassmorphism Tokens
```css
--glass-bg: rgba(255, 255, 255, 0.60);
--glass-border: 1px solid rgba(255, 255, 255, 0.18);
--glass-blur: backdrop-filter: blur(20px) saturate(180%);
--glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
--glass-radius: 24px;
```

### Typography
- Font: **Outfit** (Google Fonts) — geometric, modern
- Display: 40px Black, letter-spacing: -1.5px
- H1: 32px Bold, letter-spacing: -1px
- H2: 24px Semibold, letter-spacing: -0.5px
- Body: 16px Regular, line-height: 1.6
- Caption: 13px Medium, letter-spacing: 0.2px

### Spacing & Layout
- Base unit: 4px
- Safe area insets respected on all screens
- Container padding: 20px
- Card padding: 24px
- Component gaps: 16px
- Bottom sheet handle: 40px × 4px, centered, border-radius 2px

### Elevation System
| Level | Blur | Shadow | Use |
|-------|------|--------|-----|
| 0 | 0 | none | Flat surfaces |
| 1 | 8px | 0 4px 12px rgba(0,0,0,0.06) | Resting cards |
| 2 | 16px | 0 8px 24px rgba(0,0,0,0.10) | Elevated cards / selected state |
| 3 | 24px | 0 16px 48px rgba(0,0,0,0.14) | Modals / bottom sheets |

---

## Global Gesture & Interaction System

### Touch Gestures
| Gesture | Action | Feedback |
|---------|--------|----------|
| **Tap** | Primary action | Scale 0.96 → 1.0 (spring), subtle haptic |
| **Long Press** (300ms) | Context menu / reorder | Haptic (medium), scale 1.02, shadow lift |
| **Swipe Right** | Go back / dismiss | Parallax page slide, velocity-based |
| **Swipe Down** | Dismiss bottom sheet/modal | Spring-damped with overscroll rubberband |
| **Swipe Left on Card** | Quick delete / archive | Red reveal layer, icon slide-in |
| **Pull Down** | Refresh | Custom Lottie spinner, overscroll bounce |
| **Pinch** | Zoom charts / images | Smooth scale transform, bounded |
| **Two-finger rotate** | Rotate insight cards (easter egg) | 3D perspective tilt |

### Haptic Feedback Map
```
Light:    Button taps, slider moves, toggle flips
Medium:   Long press trigger, card drag start, deletion
Heavy:    Level up, badge unlock, streak milestone
Success:  Action completed, sugar logged
Warning:  Streak about to break
Error:    Failed validation, connection error
```

### Spring Physics (Framer Motion defaults)
```
--spring-bouncy:   { type: "spring", stiffness: 400, damping: 25 }
--spring-gentle:   { type: "spring", stiffness: 200, damping: 20 }
--spring-snappy:   { type: "spring", stiffness: 600, damping: 30 }
--spring-wobbly:   { type: "spring", stiffness: 150, damping: 12 }
```

---

## Screen 1: Welcome Screen

### Layout
```
┌─────────────────────────────────┐
│  ·····   (ambient particles)    │
│                                 │
│        ┌──────────┐             │
│        │ ✦ Logo ✦ │             │  ← 96px, glow pulse
│        └──────────┘             │
│                                 │
│    Beat the Sugar Spike         │  ← Display 40px, gradient text
│                                 │
│    ✦ Track in 10 seconds        │
│    ✦ Real-time body insights    │  ← Staggered reveal
│    ✦ Gamified habit builder     │
│                                 │
│     ╔═══════════════════╗       │
│     ║   [3D Character]  ║       │  ← Lottie / Rive, responds to gyro
│     ╚═══════════════════╝       │
│                                 │
│   ┌─────────────────────────┐   │
│   │    Let's Go! 🚀         │   │  ← Morphing pill button
│   └─────────────────────────┘   │
│                                 │
│   No signup needed · 100% free  │  ← 13px, fade-in last
└─────────────────────────────────┘
```

### Visual Details
- **Background:** Animated mesh gradient (3 colour nodes morphing slowly)
  - Light: #F0F4F8 → #E6F0FF → #FFF0F0 (rotating, 20s loop)
  - Dark: #0F172A → #1E1B4B → #1A0F2E
- **Logo:** 96px, glowing ring animation, `box-shadow: 0 0 40px rgba(255,107,107,0.4)` pulsing
- **Title:** Gradient text `linear-gradient(135deg, #FF6B6B, #FF3D71, #FFE66D)` with shimmer sweep
- **Subtitle bullets:** Custom `✦` markers, each line fades up with 120ms stagger
- **Character:** Interactive Rive/Lottie — tilts toward device gyroscope or mouse position
- **Button:**
  - Pill shape: 300px × 60px, border-radius: 30px
  - Gradient: `linear-gradient(135deg, #FF6B6B, #FF3D71)`
  - Glow: `0 0 30px rgba(255,107,107,0.35)` (pulsing, 2s)
  - Text: 18px Semibold, white, with emoji
  - Idle: Subtle float animation (translateY ±4px, 3s ease-in-out loop)
  - Hover: Glow radius increases, scale 1.03
- **Ambient Particles:** Tiny floating dots (opacity 0.15-0.35), parallax on scroll/mouse

### Animations & Gestures
1. **Page Load Sequence** (orchestrated, 1200ms total):
   - `0ms` — Mesh gradient fades in (opacity 0→1, 600ms)
   - `200ms` — Logo scales from 0.5→1 with `spring-bouncy`, glow ring expands
   - `400ms` — Title clips in letter-by-letter (typewriter, 30ms/char)
   - `600ms` — Bullets slide up + fade (stagger 120ms, `spring-gentle`)
   - `800ms` — Character bounces in from bottom (`spring-wobbly`, +overshoot)
   - `1000ms` — Button morphs in from 0-width pill → full width (`spring-snappy`)
   - `1200ms` — Fine print fades in (300ms ease-out)

2. **Character Interaction:**
   - Follows device gyroscope (mobile) or mouse cursor (desktop)
   - Head tilt: ±8°, body sway: ±3°
   - Tap: Character waves or does a little dance (Lottie trigger)

3. **Button Press:**
   - `touchstart`: scale 0.95 (80ms, ease-out), glow dims
   - `touchend`: scale 1.0 → 1.06 → 1.0 (`spring-bouncy`), ripple from touch point
   - Haptic: `success`
   - Transition out: Page slides left with parallax (bg moves at 0.3x speed)

---

## Screen 2: Onboarding — Age Selection

### Layout
```
┌─────────────────────────────────┐
│  [← ]               ●●○○○      │  ← Dot progress + back button
│                                 │
│   How old are you? 🎂           │  ← H2, left-aligned
│                                 │
│            ┌────────┐           │
│            │   22   │           │  ← Glassmorphic bubble, 80px font
│            └────────┘           │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ▓▓▓▓▓▓▓▓●─────────────│    │  ← Custom track with glow thumb
│  │ 16              60      │    │
│  └─────────────────────────┘    │
│                                 │
│   Your BMI insights improve     │  ← 13px helper text
│   with accurate data            │
│                                 │
│                                 │
│   ┌─────────────────────────┐   │
│   │      Continue →         │   │  ← Primary pill, slides in
│   └─────────────────────────┘   │
│                                 │
│            Skip                 │  ← Ghost link, 14px
└─────────────────────────────────┘
```

### Visual Details
- **Progress Dots:** 5 dots, active = filled with brand gradient + glow, inactive = muted outline
- **Back Button:** Glassmorphic circle (40px), `← ` icon, blur backdrop
- **Age Bubble:**
  - Glassmorphic card: `backdrop-filter: blur(20px)`, `glass-border`
  - Number: 80px Black weight, gradient text (#FF6B6B → #FF3D71)
  - Morphs size slightly when value changes
- **Custom Slider:**
  - Track: 6px height, rounded, gradient fill (#4ECDC4 → #0ABAB5)
  - Unfilled: rgba(0,0,0,0.06)
  - Thumb: 36px circle, white, elevation-2 shadow, teal glow ring on drag
  - Tick marks every 5 years (subtle dashes)
- **Continue:** Same morphing pill button style

### Animations & Gestures
1. **Entry:** Entire screen slides in from right with parallax (content at 1x, bg at 0.5x), 350ms
2. **Slider Interaction:**
   - Thumb on `dragStart`: scale 1.0 → 1.3 (`spring-snappy`), glow ring appears
   - Age number: `AnimatePresence` counter — digits flip with spring physics
   - Haptic: `light` on each integer change
   - Thumb on `dragEnd`: scale 1.3 → 1.0 (`spring-gentle`)
3. **Swipe Gesture:** Swipe right anywhere = go back (velocity-based, min 100px/s)
4. **Continue Tap:** Current screen slides left, next screen slides in from right (shared layout animation)

---

## Screen 3: Onboarding — Height Selection

### Layout
```
┌─────────────────────────────────┐
│  [← ]             ●●●○○        │
│                                 │
│   What's your height? 📏        │
│                                 │
│   ┌──────┐ ┌──────────┐        │
│   │  cm  │ │  ft/in   │        │  ← Segmented control, morph bg
│   └──────┘ └──────────┘        │
│                                 │
│      ┌──────────────────┐       │
│  ──  │                  │  ──   │
│  ──  │    170 cm        │  ──   │  ← Scroll-wheel picker
│  ──  │                  │  ──   │     with parallax tick marks
│      └──────────────────┘       │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ▓▓▓▓▓▓▓▓▓▓▓●──────────│    │
│  │ 140 cm         220 cm   │    │
│  └─────────────────────────┘    │
│                                 │
│   ┌─────────────────────────┐   │
│   │      Continue →         │   │
│   └─────────────────────────┘   │
│            Skip                 │
└─────────────────────────────────┘
```

### Visual Details
- **Segmented Control:**
  - Glassmorphic container, 48px height
  - Active pill slides with spring physics (not instant snap)
  - Active: gradient fill, white text, glow shadow
  - Inactive: transparent, muted text
- **Scroll-Wheel Picker:**
  - Vertically scrollable list with snap-to-value
  - Center value: large + bold, flanking values smaller + faded
  - Tick marks on sides with parallax depth effect
  - Overscroll: rubber-band effect
- **Height Display:** 48px Bold inside the picker focus area, gradient text

### Animations & Gestures
- **Unit switch:** Active pill morphs position with `spring-bouncy`, number flip-transitions
- **Scroll picker:** Uses `useScroll` + `useTransform` for parallax tick marks
- **Haptic:** `light` on each cm/inch detent snap
- **3D Tilt:** Card has subtle `perspective(1000px) rotateX()` based on scroll position

---

## Screen 4: Onboarding — Weight Selection

### Layout
```
┌─────────────────────────────────┐
│  [← ]             ●●●●○        │
│                                 │
│   What's your weight? ⚖️        │
│                                 │
│   ┌──────┐ ┌──────────┐        │
│   │  kg  │ │   lbs    │        │
│   └──────┘ └──────────┘        │
│                                 │
│        ┌────────────┐           │
│        │            │           │
│        │    70 kg   │           │  ← Animated dial / radial picker
│        │    ●       │           │
│        └────────────┘           │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ▓▓▓▓▓▓▓▓▓▓●───────────│    │
│  │ 40 kg          150 kg   │    │
│  └─────────────────────────┘    │
│                                 │
│   ┌─────────────────────────┐   │
│   │      Continue →         │   │
│   └─────────────────────────┘   │
│            Skip                 │
└─────────────────────────────────┘
```

### Visual Details
- **Radial Picker:** Semi-circular dial with tick marks
  - Drag thumb around arc to select weight
  - Glassmorphic center display shows current value
  - Gradient arc fill matches progress
- **Weight Display:** 56px Bold, gradient text, spring-animated counter
- **Visual Feedback:** Dial has damped spring rotation, overshoots slightly on release

### Animations & Gestures
- **Dial Interaction:** Drag gesture with `useMotionValue` for rotation angle
- **Number:** Counts up/down with spring physics → no abrupt jumps
- **Haptic:** `light` on each kg/lb tick
- **Card Morph:** Weight card has subtle 3D perspective tilt following drag direction

---

## Screen 5: Onboarding — Gender Selection

### Layout
```
┌─────────────────────────────────┐
│  [← ]             ●●●●●        │
│                                 │
│   How do you identify? 🤝       │
│                                 │
│  ┌─────────────────────────┐    │
│  │  ┌───┐                  │    │
│  │  │ 👨 │  Male            │    │  ← Glassmorphic cards
│  │  └───┘                  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  ┌───┐                  │    │
│  │  │ 👩 │  Female          │    │
│  │  └───┘                  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  ┌───┐                  │    │
│  │  │ 🌈 │  Other           │    │
│  │  └───┘                  │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  ┌───┐                  │    │
│  │  │ 🙅 │  Prefer not say  │    │
│  │  └───┘                  │    │
│  └─────────────────────────┘    │
│                                 │
│   ┌─────────────────────────┐   │
│   │   Get Started! 🚀      │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Visual Details
- **Cards:**
  - Glassmorphic surfaces with `glass-blur`, `glass-border`
  - Height: 72px, border-radius: 20px
  - Icon: 32px emoji inside a soft circular background (48px)
  - Text: 18px Semibold
  - Unselected: muted glass
  - Selected: Gradient border glow (#4ECDC4 → #0ABAB5), elevated shadow, slight scale 1.02
  - Other cards: dim to opacity 0.5 when one is selected

### Animations & Gestures
- **Cards:** Stagger fade-up (100ms interval, `spring-gentle`)
- **Selection:**
  - Selected card: `layoutId` shared border animation (Framer Motion), scale 1.02
  - Gradient border glow fades in (200ms)
  - Unselected cards: opacity 1 → 0.5 (200ms)
  - Haptic: `medium`
- **Get Started Button:** Appears with `spring-bouncy` scale-in after selection
- **Transition Out:** All cards stagger-shrink, then page morphs into home screen

---

## Screen 6: Home Dashboard

### Layout
```
┌─────────────────────────────────┐
│  Hey, Alex! 👋        🔥 Day 3  │  ← Greeting + animated streak flame
│                                 │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│  │ 240 XP  ▓▓▓▓▓▓░░░ Lvl 2 │  │  ← XP progress bar (glassmorphic)
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  │
│                                 │
│  What did you have today?       │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  ☕  │ │  🥤  │ │  🍬  │    │  ← 3-column grid
│  │ Chai │ │ Cold │ │Sweet │    │     with 3D press effect
│  └──────┘ └──────┘ └──────┘    │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  🍪  │ │  🍰  │ │  🍦  │    │
│  │Biscu │ │ Cake │ │ Ice  │    │
│  └──────┘ └──────┘ └──────┘    │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  🍿  │ │  🥤  │ │  ➕  │    │
│  │Snack │ │Energy│ │Other │    │
│  └──────┘ └──────┘ └──────┘    │
│                                 │
│  Today's Timeline               │
│  ┌─────────────────────────┐    │
│  │ 9:30 AM  ☕ Chai · +10XP│    │  ← Swipeable timeline cards
│  │ 2:15 PM  🥤 Cold · +13XP  │    │
│  └─────────────────────────┘    │
│                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ [🏠Home] [📊Stats] [💡Tips] [👤Me] │  ← Floating bottom nav
└─────────────────────────────────┘
```

### Visual Details
- **Header:**
  - Greeting: 22px Semibold, #1A202C
  - Streak: Animated Lottie flame (grows with streak length), gradient glow behind
  - XP bar: Glassmorphic container, gradient fill, animated on load, "Level 2" capsule at end
- **Preset Grid:**
  - **3 columns** (100px × 100px cards), 12px gap
  - Glassmorphic cards with elevation-1
  - Icon: 40px emoji, centered
  - Label: 13px Medium, below icon
  - **3D Press:** On tap, card tilts toward touch point using `perspective(600px) rotateX() rotateY()`
  - Depresses ≈3px on z-axis with shadow reduction
  - Release: springs back with overshoot (`spring-wobbly`)
  - Glow: Gradient underlay flashes on press (200ms)
- **Today's Timeline:**
  - Glassmorphic card, vertical timeline with dot + line
  - Each event: swipe-left to delete (red reveal)
  - Tap to expand → shows insight + action taken
- **Bottom Nav:**
  - Floating bar: 64px height, glassmorphic, border-radius: 32px
  - 20px margin from edges, elevated (elevation-3)
  - Active icon: gradient fill + label glow + scale 1.1
  - Inactive: muted outline, opacity 0.5
  - Tap: icon springs up with `spring-snappy`

### Animations & Gestures
1. **Page Load:**
   - Header slides down (200ms, `spring-gentle`)
   - XP bar fills from 0% → current with spring (500ms)
   - Grid cards cascade in: top-left → bottom-right (stagger 40ms, `spring-bouncy`)
   - Timeline slides up from bottom (delay 400ms)
   - Bottom nav fades in (delay 500ms)
2. **Pull-to-Refresh:** Custom Lottie spinner (sugar cube dissolving), overscroll rubberband
3. **Grid Card Tap:**
   - 3D tilt + depress (80ms)
   - Haptic: `light`
   - Ripple effect from touch point
   - Navigate: card expands into quantity selector (shared element transition)
4. **Scroll Behavior:** Header collapses into compact mode (sticky, glassmorphic, 48px height)

---

## Screen 7: Post-Log Success

### Layout
```
┌─────────────────────────────────┐
│                                 │
│     ✨✨✨ (confetti burst) ✨✨✨    │  ← Full-screen Lottie
│                                 │
│           Logged! 🎉            │  ← Display 40px, scale-in
│                                 │
│          ╔═══════╗              │
│          ║ +10XP ║              │  ← Gold gradient, particle burst
│          ╚═══════╝              │
│                                 │
│  ┌─────────────────────────┐    │
│  │  🏆 First Log Badge!    │    │  ← Card with shimmer sweep
│  │     ★ Unlocked! ★       │    │     3D card flip reveal
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  💡 Insight              │    │
│  │  "Chai in morning is     │    │  ← Glassmorphic card
│  │  common! Track how       │    │
│  │  it affects energy."     │    │
│  │                          │    │
│  │  [👍 Helpful] [👎 Nah]  │    │  ← Pill buttons
│  │           [Learn →]      │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  🚶 10-min walk          │    │  ← Gradient action card
│  │  +15 XP bonus            │    │     swipe-up to expand
│  │  ┌──────────────────┐    │    │
│  │  │  ▶ Start Timer   │    │    │
│  │  └──────────────────┘    │    │
│  └─────────────────────────┘    │
│                                 │
│   ┌─────────────────────────┐   │
│   │        Done ✓           │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Visual Details
- **Confetti:** Full-screen Lottie burst — multi-color, 2.5s, plays once
- **XP Display:**
  - 56px Black weight, gradient text (#FFE66D → #FFC947 → #FF8C00)
  - Animated counter: 0 → final value (800ms, spring-decelerated)
  - Particle burst: tiny golden dots radiate outward (Framer Motion + stagger)
  - Subtle glow ring pulses behind number (2s loop)
- **Badge Card:**
  - **3D Flip Reveal:** Card flips from blank → badge (rotateY 0→180→360)
  - Shimmer sweep animation (diagonal light beam, 1.5s)
  - Gradient border (#FF6B6B → #FFE66D)
  - Badge icon: 56px, gold accent
- **Insight Card:**
  - Glassmorphic surface with teal gradient border-left (4px)
  - Feedback pills: Glassmorphic, scale on tap, fill on selection
- **Action Card:**
  - Gradient: `linear-gradient(135deg, #4ECDC4, #0ABAB5)`
  - Timer button: White glassmorphic, teal text, pulse glow
  - Swipeable: swipe up to expand full timer view

### Animations & Gestures
1. **Orchestrated Sequence** (1500ms total):
   - `0ms` — Confetti burst + screen shake (subtle, 4px, 300ms)
   - `200ms` — "Logged! 🎉" scales in with `spring-wobbly` (overshoot)
   - `400ms` — XP counter springs up from 0, particles burst
   - `700ms` — Badge card flips in from 3D rotation, shimmer sweeps across
   - `1000ms` — Insight card slides up from bottom (`spring-gentle`)
   - `1300ms` — Action card slides up from bottom (`spring-gentle`, stagger)
2. **Feedback Pills:** Tap → fill with gradient, scale 1.05, haptic `light`
3. **Timer Start:** Button morphs into circular countdown ring (shared layout)
4. **Done:** All cards stagger-shrink, page transitions out

---

## Animation Specifications

### Page Transitions
| Transition | Duration | Style |
|-----------|----------|-------|
| **Forward navigate** | 350ms | Slide left + parallax (bg 0.3x, content 1x) |
| **Back navigate** | 300ms | Slide right + parallax, velocity-aware |
| **Modal enter** | From bottom, spring-gentle, darken backdrop 0→0.5 |
| **Modal exit** | Swipe down to dismiss, velocity-based, spring snap |
| **Shared element** | `layoutId` animation, 400ms spring |
| **Tab switch** | Crossfade (200ms) + content stagger (100ms) |

### Micro-Interactions
| Interaction | Animation |
|------------|-----------|
| **Input focus** | Border glow (gradient) + label float up (spring) |
| **Error shake** | translateX: [0, -8, 8, -6, 6, -3, 3, 0] over 500ms |
| **Success pulse** | scale [1, 1.08, 1] with glow (600ms) |
| **Toggle switch** | Thumb slides with spring, track morphs color |
| **Skeleton loading** | Shimmer sweep (1.5s loop, 15° angle gradient) |
| **Number change** | Old digit exits up/fade, new enters from bottom/fade |
| **Progress fill** | Spring-based width animation with slight overshoot |
| **Card hover** | 3D tilt toward cursor (max ±5°) + shadow shift |

### Lottie / Rive Files Needed
1. **confetti_burst.json** — Multi-color celebration (2.5s)
2. **streak_flame.json** — Animated fire (loops), grows with streak level
3. **badge_unlock.json** — 3D card flip + shimmer + glow
4. **level_up.json** — Full-screen radial explosion + particles
5. **loading_sugar.json** — Sugar cube dissolving spinner
6. **character_idle.json** — Mascot idle breathing + blinking
7. **character_wave.json** — Mascot waving gesture (triggered on tap)
8. **pull_refresh.json** — Sugar cube unwrapping animation
9. **xp_particles.json** — Golden particle burst for XP awards

---

## Responsive Breakpoints

```
Mobile:    320px – 480px   (base design, single-column)
Large Mobile: 481px – 767px (wider cards, larger touch targets)
Tablet:    768px – 1023px  (2-panel layout where applicable)
Desktop:   1024px+         (centered max-width 480px, ambient bg art)
```

### Adaptive Features
- **Desktop:** Show ambient animated background behind centered app frame
- **Tablet:** Side-by-side panels for insight + action cards
- **Mobile:** Full-width, bottom-sheet modals
- **Reduced Motion:** Disable all springs/particles, use simple fades (200ms)
- **Dark Mode:** Automatic via `prefers-color-scheme`, manual toggle in settings

---

## Accessibility

- Touch targets: min 48×48px
- Color contrast: WCAG AA (4.5:1 text, 3:1 UI)
- `prefers-reduced-motion`: disables all physics animations, uses 200ms fades
- Screen reader: all interactive elements have `aria-label`
- Focus rings: visible 3px outline on keyboard navigation
- High contrast mode: solid backgrounds replace glassmorphism

---

*This specification is designed for implementation with **Framer Motion** (React), **Lottie/Rive** for character and celebration animations, and CSS custom properties for the glassmorphism system. All springs use Framer Motion's spring physics engine.*
