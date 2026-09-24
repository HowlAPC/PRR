import { ShieldCheck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function PrivacyNotice({ settings, agreed, onChange }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-black/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 text-navy">
        <ShieldCheck className="w-5 h-5" />
        <h2 className="font-heading text-xl">Data Privacy Notice</h2>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line">{settings.privacy_notice}</p>
      <label className={`mt-6 flex items-start gap-3 rounded-2xl p-4 cursor-pointer border transition-colors ${agreed ? 'bg-[#FFF7DB] border-[#F2D97A]' : 'bg-slate-50 border-slate-200'}`}>
        <Checkbox checked={agreed} onCheckedChange={(v) => onChange(!!v)} className="mt-0.5" />
        <span className="text-sm text-slate-700 leading-relaxed">{settings.privacy_consent}</span>
      </label>
    </div>
  );
}
