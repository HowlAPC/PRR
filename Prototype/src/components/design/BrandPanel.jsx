import { Input } from '@/components/ui/input';
import FieldShell from '@/components/forms/FieldShell';
import ImageUpload from './ImageUpload';

const STYLES = [['waves', 'Gradient waves'], ['solid', 'Soft gradient'], ['image', 'Photo']];
const PRESETS = [['#F2B705', '#0B1F3A'], ['#E0A526', '#10284A'], ['#D4AF37', '#1B1B3A'], ['#F5C542', '#0E3B43']];

function ColorInput({ label, value, onChange }) {
  return (
    <FieldShell label={label}>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-11 h-10 rounded-lg border cursor-pointer p-1" />
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="font-mono text-xs" />
      </div>
    </FieldShell>
  );
}

export default function BrandPanel({ draft, set }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <ColorInput label="Primary (gold)" value={draft.gold_color} onChange={set('gold_color')} />
        <ColorInput label="Accent (navy)" value={draft.navy_color} onChange={set('navy_color')} />
      </div>
      <div className="flex gap-2">
        {PRESETS.map(([g, n]) => (
          <button key={g + n} onClick={() => { set('gold_color')(g); set('navy_color')(n); }} className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow border flex" aria-label="Color preset">
            <span className="flex-1" style={{ background: g }} /><span className="flex-1" style={{ background: n }} />
          </button>
        ))}
      </div>
      <FieldShell label="Background style">
        <div className="grid grid-cols-3 gap-2">
          {STYLES.map(([v, l]) => (
            <button key={v} onClick={() => set('background_style')(v)} className={`h-10 rounded-xl text-xs font-bold border-2 transition ${draft.background_style === v ? 'border-gold bg-[#FFF7DB] text-navy' : 'border-slate-200 text-slate-500'}`}>{l}</button>
          ))}
        </div>
      </FieldShell>
      {draft.background_style === 'image' && <FieldShell label="Background photo"><ImageUpload value={draft.background_image} onChange={set('background_image')} /></FieldShell>}
      <FieldShell label="Hero image" help="Shown under the headline on desktop."><ImageUpload value={draft.hero_image} onChange={set('hero_image')} /></FieldShell>
    </div>
  );
}
