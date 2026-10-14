import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { StudyPlan, StudyPlanInput, PlanStatus } from '@/types/studyPlan';

export function useStudyPlans() {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('study_plans')
      .select('*')
      .order('study_date', { ascending: true })
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setPlans(data as StudyPlan[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const addPlan = useCallback(
    async (input: StudyPlanInput) => {
      const { data, error: insertError } = await supabase
        .from('study_plans')
        .insert(input)
        .select()
        .single();

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setPlans((prev) => [...prev, data as StudyPlan]);
    },
    [],
  );

  const updateStatus = useCallback(
    async (id: string, status: PlanStatus) => {
      const { error: updateError } = await supabase
        .from('study_plans')
        .update({ status })
        .eq('id', id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setPlans((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p)),
      );
    },
    [],
  );

  const deletePlan = useCallback(async (id: string) => {
    const { error: deleteError } = await supabase
      .from('study_plans')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setPlans((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    plans,
    loading,
    error,
    addPlan,
    updateStatus,
    deletePlan,
    refresh: fetchPlans,
  };
}
