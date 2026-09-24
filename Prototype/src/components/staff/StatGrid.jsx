export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200/70 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{s.label}</p>
              <Icon className={`w-4 h-4 ${s.highlight ? 'text-[#9A7400]' : 'text-slate-300'}`} />
            </div>
            <p className="mt-3 font-heading text-3xl text-navy">{s.value}</p>
          </div>
        );
      })}
    </div>
  );
}
