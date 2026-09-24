import { format } from 'date-fns';
import { GraduationCap, Mail, Database } from 'lucide-react';

export default function EnrollmentComplete({ app }) {
  return (
    <div className="rounded-3xl bg-navy text-white p-6 sm:p-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold opacity-20 blur-3xl" />
      <GraduationCap className="w-10 h-10 text-gold" />
      <h2 className="mt-4 font-heading text-2xl sm:text-3xl">Welcome to APC, {app.first_name}!</h2>
      <p className="mt-2 text-white/70 text-sm">Your reservation fee has been received and you are now officially a student.</p>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-[11px] uppercase tracking-widest text-white/50 font-bold flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Student Email</p>
          <p className="mt-2 font-semibold text-gold break-all">{app.student_email}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-[11px] uppercase tracking-widest text-white/50 font-bold flex items-center gap-2"><Database className="w-3.5 h-3.5" /> apc.edu.ph Records</p>
          <p className="mt-2 text-sm">Transferred {app.transferred_at ? format(new Date(app.transferred_at), 'MMM d, yyyy h:mm a') : ''}</p>
          <p className="text-xs text-white/50 mt-1">Reference: {app.payment_reference}</p>
        </div>
      </div>
    </div>
  );
}
