export default function StaffPageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A7400]">{eyebrow}</p>
        <h1 className="mt-1.5 font-heading text-3xl sm:text-4xl text-navy">{title}</h1>
        {description && <p className="mt-2 text-sm text-slate-500 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
