import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const THEMES = {
  it: { colors: ['#22d3ee', '#3b82f6', '#a5f3fc'], glyphs: ['</>', '{ }', '01', '✦'] },
  bmma: { colors: ['#e879f9', '#a855f7', '#f472b6'], glyphs: ['✦', '◆', '●', '✺'] },
  engineering: { colors: ['#f97316', '#facc15', '#fb923c'], glyphs: ['⚙', '✦', '▲'] },
  architecture: { colors: ['#14b8a6', '#5eead4', '#0ea5e9'], glyphs: ['▢', '△', '✦'] },
  psychology: { colors: ['#f9a8d4', '#c4b5fd', '#fda4af'], glyphs: ['♥', '✦', '○'] },
  business: { colors: ['#22c55e', '#F2B705', '#86efac'], glyphs: ['↗', '✦', '◆'] },
  other: { colors: ['#F2B705', '#fde68a', '#ffffff'], glyphs: ['✦', '✧'] },
};

export default function SparkleBurst({ burst }) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!burst) return;
    setActive(burst);
    const t = setTimeout(() => setActive(null), 1900);
    return () => clearTimeout(t);
  }, [burst]);

  const theme = THEMES[active?.category] || THEMES.other;
  const particles = useMemo(() => (active ? Array.from({ length: 38 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: 20 + Math.random() * 80,
    dx: (Math.random() - 0.5) * 220, dy: -80 - Math.random() * 180,
    size: 12 + Math.random() * 20, delay: Math.random() * 0.45,
    color: theme.colors[i % theme.colors.length], glyph: theme.glyphs[i % theme.glyphs.length],
  })) : []), [active, theme]);

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div key={active.key} className="fixed inset-0 pointer-events-none z-[100] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 55%, ${theme.colors[0]}40, transparent 65%)` }}
            initial={{ scale: 0.5 }} animate={{ scale: 1.5 }} transition={{ duration: 1.6 }}
          />
          {particles.map((p) => (
            <motion.span
              key={p.id} className="absolute font-bold"
              style={{ left: `${p.x}%`, top: `${p.y}%`, color: p.color, fontSize: p.size, textShadow: `0 0 14px ${p.color}` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.8], x: p.dx, y: p.dy, rotate: p.dx }}
              transition={{ duration: 1.4, delay: p.delay, ease: 'easeOut' }}
            >
              {p.glyph}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}