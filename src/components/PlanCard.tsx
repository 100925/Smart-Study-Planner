import { CheckCircle2, Circle, Clock, Trash2, CalendarDays } from 'lucide-react';
import type { StudyPlan } from '@/types/studyPlan';

interface PlanCardProps {
  plan: StudyPlan;
  onToggleStatus: (id: string, status: StudyPlan['status']) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
}

export default function PlanCard({ plan, onToggleStatus, onDelete }: PlanCardProps) {
  const isCompleted = plan.status === 'completed';

  return (
    <div
      className={`group rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
        isCompleted
          ? 'border-slate-200 opacity-75'
          : 'border-slate-200 hover:border-emerald-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() =>
              onToggleStatus(plan.id, isCompleted ? 'pending' : 'completed')
            }
            className="mt-0.5 shrink-0 transition-transform hover:scale-110"
            title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            ) : (
              <Circle className="h-6 w-6 text-slate-300 transition-colors hover:text-emerald-400" />
            )}
          </button>

          <div className="min-w-0">
            <span
              className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                isCompleted
                  ? 'bg-slate-100 text-slate-400'
                  : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              {plan.subject}
            </span>
            <h4
              className={`mt-1 text-sm font-semibold leading-snug ${
                isCompleted
                  ? 'text-slate-400 line-through'
                  : 'text-slate-800'
              }`}
            >
              {plan.topic}
            </h4>
          </div>
        </div>

        <button
          onClick={() => onDelete(plan.id)}
          className="shrink-0 rounded-lg p-1.5 text-slate-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
          title="Delete plan"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-4 pl-9 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(plan.study_date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {formatDuration(plan.duration_minutes)}
        </span>
      </div>
    </div>
  );
}
