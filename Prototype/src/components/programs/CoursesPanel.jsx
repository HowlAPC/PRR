import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import CourseDialog from './CourseDialog';

export default function CoursesPanel() {
  const qc = useQueryClient();
  const [state, setState] = useState(null);
  const { data: courses = [] } = useQuery({ queryKey: ['courses'], queryFn: () => base44.entities.Course.list('order') });
  const refresh = () => qc.invalidateQueries({ queryKey: ['courses'] });
  const remove = async (c) => { if (window.confirm(`Delete ${c.name}?`)) { await base44.entities.Course.delete(c.id); refresh(); } };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-heading text-xl text-navy">Degree Programs</p>
        <Button size="sm" onClick={() => setState({})} className="bg-gold text-navy hover:bg-gold hover:brightness-105"><Plus className="w-4 h-4 mr-1" />Add</Button>
      </div>
      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
              <p className="text-[11px] text-slate-400">{c.code} · {c.outcomes?.length || 0} outcomes {c.active === false && '· Hidden'}</p>
            </div>
            <button onClick={() => setState({ course: c })} className="p-2 text-slate-400 hover:text-navy"><Pencil className="w-4 h-4" /></button>
            <button onClick={() => remove(c)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <CourseDialog state={state} count={courses.length} onClose={() => setState(null)} onSaved={() => { setState(null); refresh(); }} />
    </div>
  );
}
