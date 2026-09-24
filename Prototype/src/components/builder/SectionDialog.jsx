import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FieldShell from '@/components/forms/FieldShell';

export default function SectionDialog({ state, sectionCount, onClose, onSaved }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (state) { setTitle(state.section?.title || ''); setDescription(state.section?.description || ''); }
  }, [state]);

  const save = async () => {
    if (!title.trim()) return;
    if (state.section?.id) await base44.entities.FormSection.update(state.section.id, { title, description });
    else await base44.entities.FormSection.create({ title, description, order: sectionCount });
    onSaved();
  };

  return (
    <Dialog open={!!state} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle className="font-heading text-navy">{state?.section ? 'Edit section' : 'New section'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <FieldShell label="Section title" required><Input value={title} onChange={(e) => setTitle(e.target.value)} /></FieldShell>
          <FieldShell label="Description"><Input value={description} onChange={(e) => setDescription(e.target.value)} /></FieldShell>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} className="bg-navy hover:opacity-90">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}