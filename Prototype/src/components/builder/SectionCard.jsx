import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Pencil, Trash2, Plus } from 'lucide-react';
import FieldRow from './FieldRow';

export default function SectionCard({ section, fields, index, total, onMoveSection, onEditSection, onDeleteSection, onAddField, onEditField, onMoveField, onDeleteField }) {
  const btn = 'w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30';
  return (
    <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 36 }} className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden">
      <div className="bg-navy text-white px-5 py-3.5 flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">{index + 1}</span>
        <div className="flex-1 min-w-0">
          <p className="font-heading text-lg truncate">{section.title}</p>
          {section.description && <p className="text-xs text-white/50 truncate">{section.description}</p>}
        </div>
        <button className={btn} disabled={index === 0} onClick={() => onMoveSection(-1)} aria-label="Move section up"><ArrowUp className="w-4 h-4" /></button>
        <button className={btn} disabled={index === total - 1} onClick={() => onMoveSection(1)} aria-label="Move section down"><ArrowDown className="w-4 h-4" /></button>
        <button className={btn} onClick={onEditSection} aria-label="Edit section"><Pencil className="w-4 h-4" /></button>
        <button className={btn} onClick={onDeleteSection} aria-label="Delete section"><Trash2 className="w-4 h-4" /></button>
      </div>
      <div className="p-4 space-y-2">
        {fields.map((f, i) => (
          <motion.div layout key={f.id} transition={{ type: 'spring', stiffness: 400, damping: 36 }}>
            <FieldRow field={f} isFirst={i === 0} isLast={i === fields.length - 1} onMove={(d) => onMoveField(fields, i, d)} onEdit={() => onEditField(f)} onDelete={() => onDeleteField(f)} />
          </motion.div>
        ))}
        <button onClick={onAddField} className="w-full h-11 rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-400 hover:border-gold hover:text-navy flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add question
        </button>
      </div>
    </motion.div>
  );
}