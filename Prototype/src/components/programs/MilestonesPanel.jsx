import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import MilestoneRow from './MilestoneRow';

export default function MilestonesPanel() {
  const qc = useQueryClient();
  const { data: milestones = [] } = useQuery({ queryKey: ['milestones'], queryFn: () => base44.entities.Milestone.list('order') });
  const refresh = () => qc.invalidateQueries({ queryKey: ['milestones'] });
  const add = async () => { await base44.entities.Milestone.create({ title: 'New milestone', date: new Date().toISOString().slice(0, 10), order: milestones.length }); refresh(); };
  const save = async (m) => { await base44.entities.Milestone.update(m.id, { date: m.date, title: m.title, description: m.description }); refresh(); };
  const remove = async (m) => { await base44.entities.Milestone.delete(m.id); refresh(); };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-1">
        <p className="font-heading text-xl text-navy">Enrollment Dates</p>
        <Button size="sm" onClick={add} className="bg-gold text-navy hover:bg-gold hover:brightness-105"><Plus className="w-4 h-4 mr-1" />Add</Button>
      </div>
      <p className="text-xs text-slate-400 mb-4">Shown in the Schedule card on the home page.</p>
      <div className="space-y-3">
        {milestones.map((m) => <MilestoneRow key={`${m.id}-${m.updated_date}`} milestone={m} onSave={save} onDelete={() => remove(m)} />)}
      </div>
    </div>
  );
}
