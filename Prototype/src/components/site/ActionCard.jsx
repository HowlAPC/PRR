import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCurrentUser } from '@/lib/useCurrentUser';

function CTA({ to, label, hint, cls }) {
  return (
    <div>
      <Link to={to} className={`group w-full h-12 px-5 rounded-xl font-bold text-sm flex items-center justify-between transition-all hover:-translate-y-0.5 hover:shadow-lg ${cls}`}>
        {label}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
      <p className="mt-1.5 text-xs text-slate-500 pl-1">{hint}</p>
    </div>
  );
}

export default function ActionCard({ settings }) {
  const { data: user } = useCurrentUser();
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-[28px] shadow-2xl shadow-black/30 p-6 sm:p-9"
    >
      <h2 className="font-heading text-2xl sm:text-3xl text-navy leading-tight">{settings.welcome_title}</h2>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{settings.welcome_text}</p>
      {settings.update_text && (
        <div className="mt-5 rounded-2xl bg-[#FFF7DB] border border-[#F7E3A1] p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9A7400]">Update</p>
          <p className="mt-1 text-sm text-slate-700">{settings.update_text}</p>
        </div>
      )}
      <div className="mt-7 space-y-3">
        <CTA to="/inquire" label="Inquire" hint="To know more about APC programs." cls="bg-gold text-navy" />
        <CTA to="/apply" label="Apply" hint="To proceed to admission application." cls="bg-navy text-white" />
        <CTA
          to={user ? '/portal' : '/login?returnTo=%2Fportal'} label={user ? 'Go to my portal' : 'Log in'}
          hint="If you have an existing RamConnect account." cls="bg-white text-navy border-2 border-navy"
        />
      </div>
    </motion.div>
  );
}
