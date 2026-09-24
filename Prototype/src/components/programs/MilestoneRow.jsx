import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MilestoneRow({ milestone, onSave, onDelete }) {
  const [m, setM] = useState(milestone);
  const dirty = m.date !== milestone.date || m.title !== milestone.title || m.description !== milestone.description;
  const set = (k) => (e) => setM((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div className="rounded-2xl border border-[#F2D97A] bg-[#FFFBEB] p-4 grid gap-2 sm:grid-cols-[160px_1fr_auto] sm:items-start">
      <Input type="date" value={m.date || ''} onChange={set('date')} className="bg-white" />
      <div className="space-y-2">
        <Input placeholder="Milestone title" value={m.title || ''} onChange={set('title')} className="bg-white" />
        <Input placeholder="Audience / note (optional)" value={m.description || ''} onChange={set('description')} className="bg-white" />
      </div>
      <div className="flex gap-1">
        <button disabled={!dirty} onClick={() => onSave(m)} className="w-9 h-9 rounded-lg bg-navy text-white flex items-center justify-center disabled:opacity-30" aria-label="Save"><Check className="w-4 h-4" /></button>
        <button onClick={onDelete} className="w-9 h-9 rounded-lg text-slate-400 hover:text-rose-600 flex items-center justify-center" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
