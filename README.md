# Smart Study Planner

A full-stack study planning app that lets you create study plans, track completion, and visualize your progress — all backed by a persistent cloud database.

## Features

- **Add study plans** with subject, topic, date, and duration
- **Mark plans** as completed or pending with one click
- **Dashboard** showing total plans, completed plans, pending plans, and a progress bar
- **Filter plans** by subject and completion status
- **Clean, modern, responsive UI** that works on mobile and desktop
- **Persistent database** — all data is stored in Supabase (PostgreSQL), not localStorage

## Tech Stack

| Layer       | Technology                        |
| ----------- | --------------------------------- |
| Frontend    | React + Vite + TypeScript         |
| Styling     | Tailwind CSS + Lucide icons       |
| Backend     | Supabase (PostgreSQL + REST API)  |
| Database    | Supabase PostgreSQL (free tier)   |

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

The project includes a pre-configured `.env` file with the following Supabase variables:

```
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

These are already set up — no manual configuration needed.

### 3. Run the development server

```bash
npm run dev
```

The app will be available at the URL shown in your terminal (typically `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Database Schema

The app uses a single `study_plans` table:

| Column              | Type      | Description                          |
| ------------------- | --------- | ------------------------------------ |
| `id`                | uuid      | Primary key                          |
| `subject`           | text      | Subject name (e.g. "Mathematics")    |
| `topic`             | text      | Specific topic (e.g. "Algebra")      |
| `study_date`        | date      | Planned study date                   |
| `duration_minutes`  | integer   | Study duration in minutes            |
| `status`            | text      | `pending` or `completed`             |
| `created_at`        | timestamptz | Auto-set creation timestamp        |

Row Level Security (RLS) is enabled with policies allowing anonymous and authenticated users to read, create, update, and delete plans (single-tenant app, no login required).

## Project Structure

```
src/
├── App.tsx                    # Main app layout and state
├── components/
│   ├── AddPlanForm.tsx        # Form to add new study plans
│   ├── Dashboard.tsx          # Stats cards + progress bar
│   ├── FilterBar.tsx          # Subject and status filters
│   └── PlanCard.tsx           # Individual plan card
├── hooks/
│   └── useStudyPlans.ts       # Data fetching and CRUD logic
├── lib/
│   └── supabase.ts            # Supabase client singleton
└── types/
    └── studyPlan.ts           # TypeScript interfaces
```

## Free Tier Only

This project uses exclusively free-tier services:
- **Supabase** — free tier includes 500MB database, 50,000 monthly active users, and unlimited API requests
- **Vite** — open-source build tool, no cost
- No paid services are activated
