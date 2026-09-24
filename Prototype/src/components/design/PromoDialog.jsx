import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import FieldShell from '@/components/forms/FieldShell';
import ImageUpload from './ImageUpload';

export default function PromoDialog({ state, count, onClose, onSaved }) {
  const [p, setP] = useState(null);
  useEffect(() => { if (state) setP({ title: '', body: '', image_url: '', link_label: '', link_url: '', active: true, ...state.promo }); }, [state]);
  if (!p) return null;
  const set = (k) => (v) => setP((x) => ({ ...x, [k]: v?.target ? v.target.value : v }));
  const save = async () => {
    if (!p.title.trim()) return;
    const { title, body, image_url, link_label, link_url, active } = p;
    const payload = { title, body, image_url, link_label, link_url, active };
    if (state.promo?.id) await base44.entities.Promo.update(state.promo.id, payload);
    else await base44.entities.Promo.create({ ...payload, order: count });
    onSaved();
  };
  return (
    <Dialog open={!!state} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-heading text-navy">{state?.promo ? 'Edit module' : 'New module'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <FieldShell label="Image"><ImageUpload value={p.image_url} onChange={set('image_url')} /></FieldShell>
          <FieldShell label="Title" required><Input value={p.title} onChange={set('title')} /></FieldShell>
          <FieldShell label="Body"><Textarea rows={3} value={p.body || ''} onChange={set('body')} /></FieldShell>
          <div className="grid grid-cols-2 gap-3">
            <FieldShell label="Button label"><Input value={p.link_label || ''} onChange={set('link_label')} /></FieldShell>
            <FieldShell label="Button link"><Input value={p.link_url || ''} onChange={set('link_url')} /></FieldShell>
          </div>
          <label className="flex items-center justify-between rounded-xl border p-3 text-sm font-semibold text-slate-700">Visible on site <Switch checked={p.active !== false} onCheckedChange={set('active')} /></label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} className="bg-navy hover:opacity-90">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
