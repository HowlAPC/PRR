import { Monitor, MapPin } from 'lucide-react';

const MODES = [
  { value: 'onsite', label: 'On-site campus visit', desc: 'Tour the campus and meet us face to face.', icon: MapPin },
  { value: 'online', label: 'Online session', desc: 'For students outside the region or country, or who prefer to meet remotely.', icon: Monitor },
];

export default function VisitModePicker({ value, onChange }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {MODES.map((m) => {
        const active = value === m.value;
        const Icon = m.icon;
        return (
          <button
            key={m.value} type="button" onClick={() => onChange(m.value)}
            className={`text-left rounded-2xl border-2 p-4 transition-all ${active ? 'border-gold bg-[#FFF7DB]' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-navy' : 'text-slate-400'}`} />
            <p className="mt-2 font-semibold text-sm text-slate-800">{m.label}</p>
            <p className="mt-1 text-xs text-slate-500">{m.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
