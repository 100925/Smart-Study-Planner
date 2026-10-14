import { Filter } from 'lucide-react';
import type { PlanStatus } from '@/types/studyPlan';

export type SubjectFilter = 'all' | string;
export type StatusFilter = 'all' | PlanStatus;

interface FilterBarProps {
  subjects: string[];
  subjectFilter: SubjectFilter;
  statusFilter: StatusFilter;
  onSubjectChange: (value: SubjectFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
}

export default function FilterBar({
  subjects,
  subjectFilter,
  statusFilter,
  onSubjectChange,
  onStatusChange,
}: FilterBarProps) {
  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <Filter className="h-4 w-4 text-slate-400" />
        Filter
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <select
            value={subjectFilter}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-700 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-1.5">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:flex-none ${
                statusFilter === opt.value
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
