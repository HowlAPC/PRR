import { Check } from 'lucide-react';

const STEPS = ['Submitted', 'Under Review', 'Reservation Paid', 'Enrolled'];
const INDEX = { submitted: 0, under_review: 1, qualified: 1, paid: 2, enrolled: 3 };

export default function StatusStepper({ status }) {
  const current = INDEX[status] ?? 0;
  return (
    <div className="flex items-center">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= current ? 'bg-gold text-navy' : 'bg-slate-200 text-slate-500'}`}>
              {i < current || status === 'enrolled' ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-600 text-center w-16 sm:w-24">{label}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 -mt-6 mx-1 ${i < current ? 'bg-gold' : 'bg-slate-200'}`} />}
        </div>
      ))}
    </div>
  );
}
