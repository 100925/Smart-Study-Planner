import { TrendingUp, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import type { StudyPlan } from '@/types/studyPlan';

interface DashboardProps {
  plans: StudyPlan[];
}

export default function Dashboard({ plans }: DashboardProps) {
  const total = plans.length;
  const completed = plans.filter((p) => p.status === 'completed').length;
  const pending = total - completed;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const totalMinutes = plans.reduce((sum, p) => sum + p.duration_minutes, 0);
  const completedMinutes = plans
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.duration_minutes, 0);

  const stats = [
    {
      label: 'Total Plans',
      value: total,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      ring: 'ring-blue-100',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      ring: 'ring-emerald-100',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      ring: 'ring-amber-100',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-800">Progress</h3>
          </div>
          <span className="text-2xl font-bold text-slate-800">{progress}%</span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            {completedMinutes} min completed of {totalMinutes} min planned
          </span>
          <span>
            {completed} / {total} plans
          </span>
        </div>
      </div>
    </div>
  );
}
