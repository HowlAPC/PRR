import { ArrowUp, ArrowDown, Pencil, Trash2, Lock } from 'lucide-react';

const TYPE_LABELS = { text: 'Short text', email: 'Email', tel: 'Phone', date: 'Date', number: 'Number', select: 'Dropdown', radio: 'Single choice', checkbox_group: 'Checkboxes', textarea: 'Long text', course: 'Program picker' };

export default function FieldRow({ field, isFirst, isLast, onMove, onEdit, onDelete }) {
  const btn = 'w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-navy hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 hover:border-gold transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">
          {field.label}{field.required && <span className="text-rose-500">*</span>}
          {field.locked && <Lock className="inline w-3 h-3 ml-1.5 text-slate-300" />}
        </p>
        <p className="text-[11px] text-slate-400 truncate">
          {TYPE_LABELS[field.type] || field.type} · {field.width === 'half' ? 'Half width' : 'Full width'}
          {field.options?.length > 0 && ` · ${field.options.length} choices`}
        </p>
      </div>
      <div className="flex items-center">
        <button className={btn} disabled={isFirst} onClick={() => onMove(-1)} aria-label="Move up"><ArrowUp className="w-4 h-4" /></button>
        <button className={btn} disabled={isLast} onClick={() => onMove(1)} aria-label="Move down"><ArrowDown className="w-4 h-4" /></button>
        <button className={btn} onClick={onEdit} aria-label="Edit"><Pencil className="w-4 h-4" /></button>
        {!field.locked && <button className={`${btn} hover:text-rose-600`} onClick={onDelete} aria-label="Delete"><Trash2 className="w-4 h-4" /></button>}
      </div>
    </div>
  );
}