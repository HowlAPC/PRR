export default function StatusBadge({ map, value }) {
  const s = map[value] || { label: value, cls: 'bg-slate-100 text-slate-600 ring-slate-200' };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset whitespace-nowrap ${s.cls}`}>
      {s.label}
    </span>
  );
}
