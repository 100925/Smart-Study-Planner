export type PlanStatus = 'pending' | 'completed';

export interface StudyPlan {
  id: string;
  subject: string;
  topic: string;
  study_date: string;
  duration_minutes: number;
  status: PlanStatus;
  created_at: string;
}

export interface StudyPlanInput {
  subject: string;
  topic: string;
  study_date: string;
  duration_minutes: number;
}
