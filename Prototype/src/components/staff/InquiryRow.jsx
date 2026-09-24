import { format } from 'date-fns';
import { Mail, Phone, Monitor, MapPin } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { INQ_STATUS } from '@/lib/statusStyles';

export default function InquiryRow({ inquiry: q, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 hover:border-gold hover:shadow-md transition-all grid gap-3 md:grid-cols-[1.1fr_1.4fr_1.2fr_auto] md:items-center">
      <div>
        <p className="font-semibold text-navy">{q.first_name} {q.last_name}</p>
        <p className="text-xs text-slate-400">{format(new Date(q.created_date), 'MMM d, yyyy')}</p>
      </div>
      <div className="text-sm text-slate-600 space-y-0.5 min-w-0">
        <p className="flex items-center gap-2 truncate"><Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />{q.email}</p>
        <p className="flex items-center gap-2 truncate"><Phone className="w-3.5 h-3.5 text-slate-300 shrink-0" />{q.mobile}</p>
      </div>
      <div className="text-sm min-w-0">
        <p className="text-[11px] text-slate-400 font-semibold">Guardian</p>
        <p className="text-slate-700 truncate">{q.guardian_name || '—'}</p>
        {q.guardian_contact && <p className="text-xs text-slate-500 truncate">{q.guardian_contact}</p>}
      </div>
      <div className="flex md:flex-col items-center md:items-end gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
          {q.visit_mode === 'online' ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
          {q.visit_mode === 'online' ? 'Online' : 'On-site'}
        </span>
        <StatusBadge map={INQ_STATUS} value={q.status} />
      </div>
      {q.question && <p className="md:col-span-4 text-sm text-slate-500 line-clamp-1 italic">“{q.question}”</p>}
    </button>
  );
}
