import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FieldShell from '@/components/forms/FieldShell';

const TYPES = [['text', 'Short text'], ['email', 'Email'], ['tel', 'Phone'], ['date', 'Date'], ['number', 'Number'], ['select', 'Dropdown'], ['radio', 'Single choice'], ['checkbox_group', 'Checkboxes'], ['textarea', 'Long text'], ['course', 'Degree program picker']];
const WITH_OPTIONS = ['select', 'radio', 'checkbox_group'];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

export default function FieldEditorDialog({ state, sections, fieldCount, onClose, onSaved }) {
  const [f, setF] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (state) setF({ label: '', type: 'text', required: false, help_text: '', placeholder: '', width: 'half', ...state.field, section_id: state.field?.section_id || state.section_id, optionsText: (state.field?.options || []).join('\n') });
  }, [state]);
  if (!f) return null;
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v?.target ? v.target.value : v }));
  const locked = !!state?.field?.locked;

  const save = async () => {
    if (!f.label.trim()) return;
    setSaving(true);
    const payload = {
      label: f.label.trim(), type: f.type, required: f.required, help_text: f.help_text, placeholder: f.placeholder, width: f.width, section_id: f.section_id,
      options: WITH_OPTIONS.includes(f.type) ? f.optionsText.split('\n').map((o) => o.trim()).filter(Boolean) : [],
    };
    if (state.field?.id) await base44.entities.FormField.update(state.field.id, payload);
    else await base44.entities.FormField.create({ ...payload, field_key: `${slug(f.label)}_${Date.now().toString(36).slice(-4)}`, order: fieldCount });
    setSaving(false);
    onSaved();
  };

  return (
    <Dialog open={!!state} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-heading text-navy">{state?.field ? 'Edit question' : 'New question'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <FieldShell label="Question label" required><Input value={f.label} onChange={set('label')} /></FieldShell>
          <div className="grid grid-cols-2 gap-3">
            <FieldShell label="Answer type" help={locked ? 'Core field — type is fixed.' : ''}>
              <Select value={f.type} onValueChange={set('type')} disabled={locked}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TYPES.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </FieldShell>
            <FieldShell label="Width">
              <Select value={f.width} onValueChange={set('width')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="half">Half width</SelectItem><SelectItem value="full">Full width</SelectItem></SelectContent>
              </Select>
            </FieldShell>
          </div>
          {WITH_OPTIONS.includes(f.type) && (
            <FieldShell label="Choices" help="One choice per line."><Textarea rows={6} value={f.optionsText} onChange={set('optionsText')} /></FieldShell>
          )}
          <FieldShell label="Section">
            <Select value={f.section_id} onValueChange={set('section_id')}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{sections.map((s) => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}</SelectContent>
            </Select>
          </FieldShell>
          <FieldShell label="Helper text"><Input value={f.help_text || ''} onChange={set('help_text')} /></FieldShell>
          <FieldShell label="Placeholder"><Input value={f.placeholder || ''} onChange={set('placeholder')} /></FieldShell>
          <label className="flex items-center justify-between rounded-xl border p-3 text-sm font-semibold text-slate-700">
            Required <Switch checked={!!f.required} onCheckedChange={set('required')} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving} className="bg-navy hover:opacity-90">{saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
