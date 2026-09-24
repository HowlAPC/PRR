import { format, parseISO } from 'date-fns';
import { CalendarDays } from 'lucide-react';

export default function MilestonesCard({ title, milestones }) {
  if (!milestones.length) return null;
  return (
    <div className="rounded-[28px] bg-[#FFF7DB] border border-[#F2D97A] shadow-xl shadow-black/5 p-6 sm:p-9">
      <div className="flex items-center justify-center gap-2 text-navy">
        <CalendarDays className="w-5 h-5" />
        <h3 className="font-heading text-2xl">{title}</h3>
      </div>
      <div className="mt-7 grid sm:grid-cols-3 gap-6 sm:gap-4 sm:divide-x divide-[#F2D97A]">
        {milestones.map((m) => (
          <div key={m.id} className="text-center px-2">
            <p className="font-heading text-2xl text-navy">{m.date ? format(parseISO(m.date), 'd MMMM yyyy') : '—'}</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">{m.title}</p>
            {m.description && <p className="mt-1 text-xs text-slate-500">{m.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
