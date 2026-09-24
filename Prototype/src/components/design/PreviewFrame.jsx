import { useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

export default function PreviewFrame({ refreshKey }) {
  const [device, setDevice] = useState('desktop');
  const btn = (d) => `h-9 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${device === d ? 'bg-white text-navy shadow-sm' : 'text-slate-500'}`;
  return (
    <div className="rounded-3xl bg-slate-200/60 border border-slate-200 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1.5 pl-1"><span className="w-3 h-3 rounded-full bg-rose-300" /><span className="w-3 h-3 rounded-full bg-amber-300" /><span className="w-3 h-3 rounded-full bg-emerald-300" /></div>
        <div className="flex gap-1 p-1 rounded-xl bg-slate-100">
          <button onClick={() => setDevice('desktop')} className={btn('desktop')}><Monitor className="w-3.5 h-3.5" />Desktop</button>
          <button onClick={() => setDevice('mobile')} className={btn('mobile')}><Smartphone className="w-3.5 h-3.5" />Mobile</button>
        </div>
      </div>
      <div className={`mx-auto bg-white overflow-hidden shadow-xl transition-all duration-500 ${device === 'mobile' ? 'w-[375px] max-w-full h-[700px] rounded-[32px] border-[10px] border-slate-900' : 'w-full h-[720px] rounded-2xl'}`}>
        <iframe key={refreshKey} src="/" title="Site preview" className="w-full h-full" />
      </div>
    </div>
  );
}
