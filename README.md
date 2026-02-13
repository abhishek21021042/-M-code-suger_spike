# Beat the Sugar Spike - Project Documentation

**Beat the Sugar Spike** is a gamified Progressive Web App (PWA) designed to help users track and reduce their sugar intake. It combines frictionless logging with real-time, context-aware insights to improve metabolic health awareness.

> **[View Live Demo](https://majestic-fudge-011560.netlify.app/)**

## Features

-   **Speed Logging:** Log sugar intake in under 10 seconds with presets.
-   **Gamification:** Earn XP, maintain streaks, and unlock badges.
-   **AI-Powered Insights:** Real-time feedback on metabolic impact based on time, activity, and sleep.
-   **Food Lens:** Automatic sugar estimation from food photos using Google Gemini.
-   **Voice Logging:** Natural language processing for easy logging.
-   **PWA Ready:** Installable on mobile devices.

## Tech Stack

-   **Frontend:** Next.js 15 (App Router), React 19
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4
-   **Animations:** Framer Motion, Lottie React
-   **Backend & Auth:** Supabase
-   **AI & ML:** Google Gemini API (`gemini-1.5-flash`)
-   **Deployment:** Static Export (Netlify)

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd suger_spike_app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run Locally:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` to view the app.

## Deployment (Netlify Drop)

This project is configured for Static Export.

1.  **Build the project:**
    ```bash
    npm run build
    ```
    *This generates a `dist` folder.*

2.  **Deploy:**
    -   Go to Netlify Drop.
    -   Drag and drop the `dist` folder onto the page.

## API & AI Models

### Google Gemini API
-   **Model:** `gemini-1.5-flash`
-   **Usage:** Food analysis and voice log processing.

### Supabase
-   **Database:** Stores user profiles, logs, and streaks.
-   **Authentication:** Manages user sessions.

## Beta Features

> [!NOTE]
> This application is currently in a **Beta Phase**. Features powered by AI (Food Lens & Voice Logging) are experimental and may have variable accuracy. We are actively refining these capabilities based on user feedback.


