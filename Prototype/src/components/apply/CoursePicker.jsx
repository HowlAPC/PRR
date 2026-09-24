import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import CourseInfo from './CourseInfo';
import SparkleBurst from './SparkleBurst';

export default function CoursePicker({ courses, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [burst, setBurst] = useState(null);
  const ref = useRef(null);
  const selected = courses.find((c) => c.id === value);
  const active = courses.filter((c) => c.active !== false);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const pick = (c) => {
    onChange(c.id);
    setOpen(false);
    setHovered(null);
    setBurst({ key: Date.now(), category: c.category });
  };

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full min-h-11 px-4 py-2.5 rounded-md border border-input bg-white flex items-center justify-between text-left text-sm">
        <span className={selected ? 'text-slate-900' : 'text-slate-400'}>{selected?.name || 'Select a degree program'}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="absolute z-30 mt-2 w-full rounded-2xl border bg-white shadow-2xl overflow-hidden flex"
          >
            <ul className="max-h-80 overflow-auto flex-1 py-2">
              {active.map((c) => (
                <li
                  key={c.id} onMouseEnter={() => setHovered(c)} onClick={() => pick(c)}
                  className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between gap-2 transition-colors ${hovered?.id === c.id ? 'bg-[#FFF7DB]' : ''}`}
                >
                  <span className="text-slate-700">{c.name}</span>
                  {c.id === value && <Check className="w-4 h-4 text-[#9A7400] shrink-0" />}
                </li>
              ))}
            </ul>
            {hovered && <div className="hidden md:block w-72 shrink-0 border-l border-[#F2D97A] bg-[#FFF7DB] p-5"><CourseInfo course={hovered} /></div>}
          </motion.div>
        )}
      </AnimatePresence>
      {selected && !open && (
        <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-2xl bg-[#FFF7DB] border border-[#F2D97A] p-5">
          <CourseInfo course={selected} />
        </motion.div>
      )}
      <SparkleBurst burst={burst} />
    </div>
  );
}