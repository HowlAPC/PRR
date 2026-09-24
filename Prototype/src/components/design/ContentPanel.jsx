import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FieldShell from '@/components/forms/FieldShell';

const FIELDS = [
  ['school_name', 'School name'], ['headline', 'Hero headline', true], ['motto', 'Motto'],
  ['welcome_title', 'Welcome card title'], ['welcome_text', 'Welcome card text', true],
  ['update_text', 'Update banner', true], ['schedule_title', 'Schedule card title'], ['footer_text', 'Footer text'],
];

export default function ContentPanel({ draft, set }) {
  return (
    <div className="space-y-4">
      {FIELDS.map(([k, label, long]) => (
        <FieldShell key={k} label={label}>
          {long
            ? <Textarea rows={3} value={draft[k] || ''} onChange={(e) => set(k)(e.target.value)} />
            : <Input value={draft[k] || ''} onChange={(e) => set(k)(e.target.value)} />}
        </FieldShell>
      ))}
    </div>
  );
}
