import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FieldShell from '@/components/forms/FieldShell';

const CATEGORIES = [['it', 'IT / Computing'], ['bmma', 'Multimedia Arts'], ['engineering', 'Engineering'], ['architecture', 'Architecture'], ['psychology', 'Psychology'], ['business', 'Business'], ['other', 'Other']];

export default function CourseDialog({ state, count, onClose, onSaved }) {
  const [c, setC] = useState(null);
  useEffect(() => { if (state) setC({ name: '', code: '', category: 'other', description: '', info_url: '', active: true, ...state.course, outcomesText: (state.course?.outcomes || []).join('\n') }); }, [state]);
  if (!c) return null;
  const set = (k) => (v) => setC((p) => ({ ...p, [k]: v?.target ? v.target.value : v }));

  const save = async () => {
    if (!c.name.trim()) return;
    const payload = { name: c.name, code: c.code, category: c.category, description: c.description, info_url: c.info_url, active: c.active, outcomes: c.outcomesText.split('\n').map((s) => s.trim()).filter(Boolean) };
    if (state.course?.id) await base44.entities.Course.update(state.course.id, payload);
    else await base44.entities.Course.create({ ...payload, order: count });
    onSaved();
  };

  return (
    <Dialog open={!!state} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-heading text-navy">{state?.course ? 'Edit program' : 'New program'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <FieldShell label="Program name" required><Input value={c.name} onChange={set('name')} /></FieldShell>
          <div className="grid grid-cols-2 gap-3">
            <FieldShell label="Code"><Input value={c.code || ''} onChange={set('code')} /></FieldShell>
            <FieldShell label="Sparkle theme">
              <Select value={c.category} onValueChange={set('category')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </FieldShell>
          </div>
          <FieldShell label="Description"><Textarea rows={3} value={c.description || ''} onChange={set('description')} /></FieldShell>
          <FieldShell label="Career outcomes" help="One per line."><Textarea rows={4} value={c.outcomesText} onChange={set('outcomesText')} /></FieldShell>
          <FieldShell label="More info link (apc.edu.ph)"><Input value={c.info_url || ''} onChange={set('info_url')} /></FieldShell>
          <label className="flex items-center justify-between rounded-xl border p-3 text-sm font-semibold text-slate-700">Accepting applicants <Switch checked={c.active !== false} onCheckedChange={set('active')} /></label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} className="bg-navy hover:opacity-90">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
