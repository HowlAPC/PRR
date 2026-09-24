import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, EyeOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import PromoDialog from './PromoDialog';

export default function ModulesPanel({ onChanged }) {
  const qc = useQueryClient();
  const [state, setState] = useState(null);
  const { data: promos = [] } = useQuery({ queryKey: ['promos'], queryFn: () => base44.entities.Promo.list('order') });
  const refresh = () => { qc.invalidateQueries({ queryKey: ['promos'] }); qc.invalidateQueries({ queryKey: ['promos-active'] }); onChanged(); };
  const remove = async (p) => { if (window.confirm(`Delete "${p.title}"?`)) { await base44.entities.Promo.delete(p.id); refresh(); } };

  return (
    <div className="space-y-3">
      {promos.map((p) => (
        <div key={p.id} className="flex items-center gap-3 rounded-xl border p-2 pr-3">
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">{p.image_url && <Image src={p.image_url} alt="" className="w-full h-full" />}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{p.title}</p>
            {p.active === false && <p className="text-[11px] text-slate-400 flex items-center gap-1"><EyeOff className="w-3 h-3" />Hidden</p>}
          </div>
          <button onClick={() => setState({ promo: p })} className="p-1.5 text-slate-400 hover:text-navy"><Pencil className="w-4 h-4" /></button>
          <button onClick={() => remove(p)} className="p-1.5 text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={() => setState({})} className="w-full h-11 rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-400 hover:border-gold hover:text-navy flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Add module
      </button>
      <PromoDialog state={state} count={promos.length} onClose={() => setState(null)} onSaved={() => { setState(null); refresh(); }} />
    </div>
  );
}
