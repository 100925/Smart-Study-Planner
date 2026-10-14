import { useState, useMemo } from 'react';
import { GraduationCap, Loader2, AlertCircle, ClipboardList } from 'lucide-react';
import { useStudyPlans } from '@/hooks/useStudyPlans';
import Dashboard from '@/components/Dashboard';
import AddPlanForm from '@/components/AddPlanForm';
import PlanCard from '@/components/PlanCard';
import FilterBar, {
  type SubjectFilter,
  type StatusFilter,
} from '@/components/FilterBar';

export default function App() {
  const { plans, loading, error, addPlan, updateStatus, deletePlan } =
    useStudyPlans();

  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const subjects = useMemo(
    () => Array.from(new Set(plans.map((p) => p.subject))).sort(),
    [plans],
  );

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      if (subjectFilter !== 'all' && plan.subject !== subjectFilter) return false;
      if (statusFilter !== 'all' && plan.status !== statusFilter) return false;
      return true;
    });
  }, [plans, subjectFilter, statusFilter]);

  const pendingPlans = filteredPlans.filter((p) => p.status === 'pending');
  const completedPlans = filteredPlans.filter((p) => p.status === 'completed');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Smart Study Planner
              </h1>
              <p className="text-xs text-slate-500">
                Plan your study sessions and track your progress
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6">
        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Dashboard */}
        <Dashboard plans={plans} />

        {/* Add Plan */}
        <AddPlanForm onAdd={addPlan} />

        {/* Filters */}
        {plans.length > 0 && (
          <FilterBar
            subjects={subjects}
            subjectFilter={subjectFilter}
            statusFilter={statusFilter}
            onSubjectChange={setSubjectFilter}
            onStatusChange={setStatusFilter}
          />
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        )}

        {/* Empty state */}
        {!loading && plans.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white py-16 text-center">
            <ClipboardList className="h-10 w-10 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-600">
              No study plans yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Click "Add Study Plan" above to create your first plan.
            </p>
          </div>
        )}

        {/* No results after filtering */}
        {!loading && plans.length > 0 && filteredPlans.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-12 text-center">
            <p className="text-sm font-semibold text-slate-600">
              No plans match your filters
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting the subject or status filter.
            </p>
          </div>
        )}

        {/* Pending Plans */}
        {!loading && pendingPlans.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-bold text-slate-700">
              Pending{' '}
              <span className="font-normal text-slate-400">
                ({pendingPlans.length})
              </span>
            </h2>
            <div className="space-y-2.5">
              {pendingPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onToggleStatus={updateStatus}
                  onDelete={deletePlan}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed Plans */}
        {!loading && completedPlans.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-bold text-slate-700">
              Completed{' '}
              <span className="font-normal text-slate-400">
                ({completedPlans.length})
              </span>
            </h2>
            <div className="space-y-2.5">
              {completedPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onToggleStatus={updateStatus}
                  onDelete={deletePlan}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <p className="text-center text-xs text-slate-400">
          Smart Study Planner — Track your study progress
        </p>
      </footer>
    </div>
  );
}
