/*
# Create study_plans table (single-tenant, no auth)

1. New Tables
- `study_plans`
  - `id` (uuid, primary key)
  - `subject` (text, not null) — e.g. "Mathematics", "Biology"
  - `topic` (text, not null) — e.g. "Algebra fundamentals"
  - `study_date` (date, not null) — the date the study session is planned for
  - `duration_minutes` (integer, not null) — planned study duration in minutes
  - `status` (text, not null, default 'pending') — 'pending' or 'completed'
  - `created_at` (timestamptz, default now())
2. Indexes
- Index on `subject` for filtering by subject
- Index on `status` for filtering by completion status
- Index on `study_date` for date-based ordering
3. Security
- Enable RLS on `study_plans`.
- Allow anon + authenticated full CRUD because the data is intentionally shared/public (single-tenant app, no sign-in).
4. Notes
- This is a single-tenant app with no authentication. All study plans are shared/public.
- `USING (true)` is acceptable because the data is intentionally public.
*/

CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  topic text NOT NULL,
  study_date date NOT NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_study_plans_subject ON study_plans(subject);
CREATE INDEX IF NOT EXISTS idx_study_plans_status ON study_plans(status);
CREATE INDEX IF NOT EXISTS idx_study_plans_study_date ON study_plans(study_date);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_study_plans" ON study_plans;
CREATE POLICY "anon_select_study_plans"
  ON study_plans FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_study_plans" ON study_plans;
CREATE POLICY "anon_insert_study_plans"
  ON study_plans FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_study_plans" ON study_plans;
CREATE POLICY "anon_update_study_plans"
  ON study_plans FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_study_plans" ON study_plans;
CREATE POLICY "anon_delete_study_plans"
  ON study_plans FOR DELETE
  TO anon, authenticated USING (true);
