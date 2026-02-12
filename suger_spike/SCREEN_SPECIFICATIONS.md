# Screen Specifications for Beat the Sugar Spike
## Detailed Design Guide for Generative AI

**Version:** 1.0  
**Date:** February 12, 2026  
**Purpose:** Complete visual specification for UI generation  
**Design System:** Modern, gradient-rich, mobile-first

---

## Design System Overview

### Color Palette
```
Primary: #FF6B6B (Coral Red)
Secondary: #4ECDC4 (Teal)
Accent: #FFE66D (Warm Yellow)
Background: #F7F9FC (Light Blue-Gray)
Surface: #FFFFFF
Text Primary: #2D3748
Text Secondary: #718096
Success: #48BB78
Warning: #ECC94B
Error: #F56565
```

### Typography
- Font: Inter (Google Fonts)
- H1: 32px Bold
- H2: 24px Semibold
- Body: 16px Regular
- Small: 14px Regular

### Spacing
- Base unit: 4px
- Standard padding: 16px
- Card padding: 20px
- Component gaps: 12px

---

## Screen 1: Welcome Screen

### Layout
**Viewport:** Mobile-first (375x812px iPhone X)

**Structure:**
```
┌─────────────────────────────┐
│                             │
│      [App Logo Icon]        │ <- Center, 80x80px
│                             │
│   Beat the Sugar Spike      │ <- H1, Center
│                             │
│   Track sugar in 10 seconds │ <- Subtitle, Text Secondary
│   Get instant insights      │
│   Build healthy habits      │
│                             │
│  [Character Illustration]   │ <- Energetic mascot, 200px height
│                             │
│                             │
│   ┌───────────────────┐     │
│   │   Let's Go! 🚀    │     │ <- Primary button
│   └───────────────────┘     │
│                             │
│  No signup needed • Free    │ <- Fine print
└─────────────────────────────┘
```

### Visual Details
- **Background:** Gradient from #F7F9FC to #E6F2FF (top to bottom)
- **Logo:** Circular icon with sugar cube + heartbeat line, primary color
- **Title:** 32px Bold, #2D3748, letter-spacing: -0.5px
- **Subtitle bullets:** Each on new line, 16px, #718096
- **Character:** Friendly mascot holding healthy food, vibrant colors
- **Button:** 
  - Width: 280px, Height: 56px
  - Background: Linear gradient (#FF6B6B to #FF8E8E)
  - Border-radius: 28px (fully rounded)
  - Shadow: 0 4px 16px rgba(255, 107, 107, 0.3)
  - Text: 18px Semibold, White
  - Hover: Scale 1.05, shadow increases

### Animations
1. **Page Load:**
   - Logo fades in + scales from 0.8 to 1 (300ms, ease-out)
   - Title slides up with fade (delay 100ms)
   - Bullets appear sequentially (stagger 100ms each)
   - Character bounces in from bottom (delay 400ms, spring animation)
   - Button fades in with pulse (delay 600ms)

2. **Button Interaction:**
   - Tap: Scale 0.95 (150ms)
   - Ripple effect from tap point
   - Haptic feedback (light)

---

## Screen 2: Onboarding - Age Selection

### Layout
```
┌─────────────────────────────┐
│  [← Back]         2 of 5    │ <- Header
│                             │
│   How old are you? 🎂       │ <- H2, Center
│                             │
│         ┌─────┐             │
│         │  22 │             │ <- Large number display
│         └─────┘             │
│                             │
│  ─────────●──────────────── │ <- Slider track
│     16        35        60  │ <- Min/Max labels
│                             │
│                             │
│                             │
│   ┌───────────────────┐     │
│   │     Continue      │     │ <- Primary button
│   └───────────────────┘     │
│                             │
│   [Skip]                    │ <- Text link, subtle
└─────────────────────────────┘
```

### Visual Details
- **Progress:** "2 of 5" in top-right, 14px, #718096
- **Back Arrow:** Icon button, 40x40px, #4ECDC4
- **Title:** 24px Semibold, emoji for personality
- **Age Display:** 
  - 64px Bold, #FF6B6B
  - Light background circle (100px diameter)
  - Subtle shadow
- **Slider:**
  - Track: 4px height, #E2E8F0
  - Filled track: #4ECDC4 gradient
  - Thumb: 32px circle, white with shadow, #4ECDC4 border
  - Range: 16-60 years
  - Default: 22
- **Button:** Same style as welcome screen
- **Skip Link:** 14px, #718096, underline on hover

### Animations
1. **Entry:** Slide in from right (300ms)
2. **Slider Interaction:**
   - Thumb scales to 1.2 when dragging
   - Number updates with spring animation
   - Haptic feedback on value change
3. **Continue:** Slide out to left, next screen slides in from right

---

## Screen 3: Onboarding - Height Selection

### Layout
```
┌─────────────────────────────┐
│  [← Back]         3 of 5    │
│                             │
│   What's your height? 📏    │
│                             │
│   [Metric] [Imperial]       │ <- Toggle pills
│                             │
│     ┌─────────────┐         │
│     │             │         │
│ ────┤   170 cm    ├──── <- Visual ruler
│     │             │         │
│     └─────────────┘         │
│                             │
│  ────────────●──────────    │ <- Slider
│   140 cm         220 cm     │
│                             │
│   ┌───────────────────┐     │
│   │     Continue      │     │
│   └───────────────────┘     │
│   [Skip]                    │
└─────────────────────────────┘
```

### Visual Details
- **Unit Toggle:**
  - Two pills side-by-side (Metric/Imperial)
  - Active: #4ECDC4 background, white text
  - Inactive: #F7F9FC background, #718096 text
  - Smooth sliding background animation
- **Ruler Visualization:**
  - Vertical ruler graphic with tick marks
  - Current height highlighted
  - Animated height marker
- **Height Display:** 48px Bold, #2D3748
- **Slider:** Same style, ranges: 140-220cm or 4'6"-7'2"

### Animations
- Toggle switch: Background slides smoothly (200ms)
- Ruler: Animates to show selected height
- Number converts with flip animation when switching units

---

## Screen 4: Onboarding - Weight Selection

### Layout
```
┌─────────────────────────────┐
│  [← Back]         4 of 5    │
│                             │
│   What's your weight? ⚖️    │
│                             │
│   [Metric] [Imperial]       │
│                             │
│     ┌─────────────┐         │
│     │             │         │
│     │   70 kg     │         │ <- Scale visual
│     │             │         │
│     └─────────────┘         │
│        [Scale Icon]         │
│                             │
│  ────────────●──────────    │
│   40 kg          150 kg     │
│                             │
│   ┌───────────────────┐     │
│   │     Continue      │     │
│   └───────────────────┘     │
│   [Skip]                    │
└─────────────────────────────┘
```

### Visual Details
- **Scale Illustration:** Cute animated scale that reacts to weight changes
- **Weight Display:** 48px Bold, #FF6B6B
- **Visual Feedback:** Scale "bounces" slightly when value changes
- **Slider:** Ranges: 40-150kg or 88-330lbs

### Animations
- Scale bounces on value change
- Display updates with counter animation

---

## Screen 5: Onboarding - Gender Selection

### Layout
```
┌─────────────────────────────┐
│  [← Back]         5 of 5    │
│                             │
│   How do you identify? 🤝   │
│                             │
│  ┌─────────────────────┐    │
│  │   👨  Male           │    │ <- Card option
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │   👩  Female         │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │   🌈  Other          │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │   🙅  Prefer not say │    │
│  └─────────────────────┘    │
│                             │
│   ┌───────────────────┐     │
│   │  Get Started! 🚀  │     │
│   └───────────────────┘     │
└─────────────────────────────┘
```

### Visual Details
- **Cards:** 
  - Width: 280px, Height: 64px
  - Background: White, Border: 2px #E2E8F0
  - Border-radius: 12px
  - Padding: 16px
  - Shadow: 0 2px 8px rgba(0,0,0,0.05)
  - Hover: Border color changes to #4ECDC4, shadow increases
  - Selected: Background #4ECDC4, Text white, Border #4ECDC4
- **Icons:** 24px emoji, left-aligned
- **Text:** 18px Semibold, 12px gap from icon

### Animations
- Cards fade in with stagger (100ms each)
- Selection: Scale 1.02, background color transition (200ms)
- Unselected cards fade slightly (opacity 0.6)
- Button appears after selection

---

## Screen 6: Home Dashboard

### Layout
```
┌─────────────────────────────┐
│  Hey, Alex! 👋   🔥 Day 3   │ <- Header
│  240 XP • Level 2           │
│                             │
│  What did you have today?   │ <- Section title
│                             │
│  ┌──────┐ ┌──────┐          │
│  │  ☕  │ │  🥤  │          │ <- Preset grid
│  │ Chai │ │ Cold │          │
│  └──────┘ └──────┘          │
│  ┌──────┐ ┌──────┐          │
│  │  🍬  │ │  🍪  │          │
│  │Sweets│ │Biscui│          │
│  └──────┘ └──────┘          │
│  ┌──────┐ ┌──────┐          │
│  │  🍰  │ │  🍦  │          │
│  │ Cake │ │ Ice  │          │
│  └──────┘ └──────┘          │
│  ┌──────┐ ┌──────┐          │
│  │  🍿  │ │  ➕  │          │
│  │Snacks│ │Other │          │
│  └──────┘ └──────┘          │
│                             │
│  Today's Summary            │
│  ┌─────────────────────┐    │
│  │ 2 sugar events      │    │
│  │ 9:30 AM • Chai      │    │
│  │ 2:15 PM • Cold Drink│    │
│  └─────────────────────┘    │
│                             │
│  [🏠Home] [📊Stats] [👤Me]  │ <- Bottom nav
└─────────────────────────────┘
```

### Visual Details
- **Header:**
  - Greeting: 20px Semibold, #2D3748
  - Streak: #FF6B6B, flame icon animated
  - XP/Level: 14px, #718096
- **Preset Buttons:**
  - Size: 80x80px each
  - Grid: 2 columns, 12px gap
  - Background: White with gradient on tap
  - Border-radius: 16px
  - Shadow: 0 2px 8px rgba(0,0,0,0.08)
  - Icon: 32px emoji, centered
  - Label: 12px, below icon
  - Hover: Scale 1.05, shadow increases
  - Tap: Scale 0.95, vibrant gradient overlay
- **Summary Card:**
  - Background: Linear gradient (#4ECDC4 to #56D4CA)
  - White text, 16px
  - Border-radius: 16px
  - Padding: 20px
- **Bottom Nav:**
  - Height: 64px
  - Background: White, top border
  - Icons: 24px, active color #4ECDC4
  - Labels: 12px

### Animations
1. **Page Load:**
   - Header slides down with fade
   - Preset buttons appear in sequence (stagger 50ms)
   - Summary card slides up from bottom
2. **Button Tap:**
   - Immediate scale down
   - Haptic feedback
   - Ripple effect
   - Navigate to quantity selector

---

## Screen 7: Post-Log Success

### Layout
```
┌─────────────────────────────┐
│                             │
│         ┌─────┐             │
│         │ ✨  │             │ <- Lottie confetti
│         │     │             │
│         └─────┘             │
│                             │
│      Logged! 🎉             │ <- H1
│                             │
│       +10 XP                │ <- Large, animated
│                             │
│  ┌─────────────────────┐    │
│  │ 🏆 First Log Badge! │    │ <- Badge unlock
│  │     Unlocked!       │    │
│  └─────────────────────┘    │
│                             │
│  Insight:                   │
│  ┌─────────────────────┐    │
│  │ "Chai in morning is │    │
│  │ common! Track how   │    │
│  │ it affects energy." │    │
│  │                     │    │
│  │ [👍] [👎] [Learn →]│    │
│  └─────────────────────┘    │
│                             │
│  Suggested Action:          │
│  ┌─────────────────────┐    │
│  │ 🚶 10-min walk      │    │
│  │ +15 XP bonus        │    │
│  │ [Start Timer]       │    │
│  └─────────────────────┘    │
│                             │
│   [Done]                    │
└─────────────────────────────┘
```

### Visual Details
- **Confetti:** Lottie animation, plays once, 2 seconds
- **XP Display:**
  - 48px Bold, gradient text (#FFE66D to #FFC107)
  - Animated counter from 0
  - Particle burst effect
- **Badge Card:**
  - Background: Gradient (#FF6B6B to #FF8E8E)
  - White text, 16px
  - Badge icon: 48px, gold color
  - Shimmer animation
- **Insight Card:**
  - Background: #F7F9FC
  - Border: 2px #4ECDC4
  - Border-radius: 16px
  - Padding: 20px
  - Feedback buttons: Icon only, 32px
- **Action Card:**
  - Background: Linear gradient (#4ECDC4 to #56D4CA)
  - White text
  - Timer button: White background, teal text

### Animations
1. **Sequence:**
   - Confetti plays immediately
   - XP counter animates up (800ms)
   - Badge slides in from top (delay 500ms)
   - Badge shimmer effect
   - Insight fades in (delay 800ms)
   - Action card slides up (delay 1100ms)
2. **Interactions:**
   - Thumbs up/down: Scale + color change
   - Start Timer: Modal opens with countdown

---

## Animation Specifications

### Global Transitions
- **Page Transitions:** Slide (300ms, ease-out)
- **Modal Enter:** Scale from 0.9 + fade (200ms)
- **Modal Exit:** Scale to 0.9 + fade (150ms)
- **Button Press:** Scale 0.95 (100ms)

### Micro-Animations
- **Input Focus:** Border color transition (200ms)
- **Error Shake:** Horizontal shake 3 times (400ms total)
- **Success Pulse:** Scale 1.05 then 1.0 (600ms)
- **Loading Spinner:** Continuous rotation (1s per rotation)

### Lottie Files Needed
1. **Confetti:** Multi-color celebration
2. **Flame:** Animated streak fire
3. **Badge Unlock:** Shimmer + glow
4. **Level Up:** Explosion effect
5. **Loading:** Minimal spinner

---

## Responsive Breakpoints

```
Mobile: 320px - 767px (base design)
Tablet: 768px - 1023px (wider cards, 3-col grid)
Desktop: 1024px+ (centered max-width 480px)
```

---

## Generative AI Prompts

### For Welcome Screen:
> "Create a mobile app welcome screen for a health app called 'Beat the Sugar Spike'. Modern gradient background from light blue-gray to soft blue. Centered layout with: circular app logo (80px, sugar cube with heartbeat), title 'Beat the Sugar Spike' in bold 32px dark gray, three subtitle bullets in light gray, friendly character illustration holding healthy food (200px height, vibrant colors), large rounded button with coral-red gradient labeled 'Let's Go! 🚀', fine print at bottom. Clean, minimal, energetic style. Figma-ready."

### For Home Dashboard:
> "Design a mobile app home screen for sugar tracking app. White background. Header with 'Hey Alex! 👋' and streak flame icon '🔥 Day 3', XP counter '240 XP • Level 2'. Grid of 8 preset buttons (2 columns): Chai ☕, Cold Drink 🥤, Sweets 🍬, Biscuits 🍪, Cake 🍰, Ice Cream 🍦, Snacks 🍿, Other ➕. Each button 80x80px, white card with shadow, rounded corners, large emoji icon. Summary card at bottom with teal gradient showing logged events. Bottom navigation bar. Modern, clean, mobile-first design."

---

*Use these specifications with AI image generators (Midjourney, DALL-E, Figma AI) or design tools*
