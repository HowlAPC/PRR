import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl bg-white shadow-xl shadow-black/5 border border-slate-200/80 p-8 sm:p-12 text-center"
    >
      <div className="mx-auto w-16 h-16 rounded-full bg-[#FFF3C4] flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-[#9A7400]" />
      </div>
      <h2 className="mt-6 font-heading text-2xl sm:text-3xl text-navy">{title}</h2>
      <div className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">{children}</div>
    </motion.div>
  );
}
