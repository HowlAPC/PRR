import { useState } from 'react';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { INQ_STATUS } from '@/lib/statusStyles';

const Detail = ({ label, value }) => (
  <div><p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{label}</p><p className="mt-1 text-sm text-slate-800">{value || '—'}</p></div>
);

export default function InquiryDrawer({ inquiry: q, user, onClose }) {
  const qc = useQueryClient();
  const [note, setNote] = useState('');
  const update = async (patch) => {
    await base44.entities.Inquiry.update(q.id, patch);
    qc.invalidateQueries({ queryKey: ['inquiries'] });
  };
  const addNote = async () => {
    if (!note.trim()) return;
    await update({ notes: [...(q.notes || []), { text: note.trim(), author: user.full_name || user.email, date: new Date().toISOString() }] });
    setNote('');
  };

  return (
    <Sheet open={!!q} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        {q && (
          <>
            <SheetHeader><SheetTitle className="font-heading text-2xl text-navy text-left">{q.first_name} {q.last_name}</SheetTitle></SheetHeader>
            <div className="mt-4 flex gap-2">
              <Button asChild size="sm" variant="outline"><a href={`tel:${q.mobile}`}><Phone className="w-4 h-4 mr-1" />Call</a></Button>
              <Button asChild size="sm" variant="outline"><a href={`sms:${q.mobile}`}><MessageSquare className="w-4 h-4 mr-1" />Text</a></Button>
              <Button asChild size="sm" variant="outline"><a href={`mailto:${q.email}`}><Mail className="w-4 h-4 mr-1" />Email</a></Button>
            </div>
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">Status</p>
              <Select value={q.status} onValueChange={(v) => update({ status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(INQ_STATUS).map(([k, s]) => <SelectItem key={k} value={k}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-5">
              <Detail label="Email" value={q.email} /><Detail label="Mobile" value={q.mobile} />
              <Detail label="Guardian" value={q.guardian_name} /><Detail label="Guardian Contact" value={q.guardian_contact} />
              <Detail label="Visit Mode" value={q.visit_mode === 'online' ? 'Online' : 'On-site'} />
              <Detail label="Preferred Date" value={q.preferred_date} />
              <div className="col-span-2"><Detail label="Program of Interest" value={q.program_interest} /></div>
              <div className="col-span-2"><Detail label="Question / Comment" value={q.question} /></div>
            </div>
            <div className="mt-8">
              <p className="font-heading text-lg text-navy">CRM Notes</p>
              <div className="mt-3 space-y-3">
                {(q.notes || []).map((n, i) => (
                  <div key={i} className="rounded-xl bg-[#FFF7DB] border border-[#F2D97A] p-3">
                    <p className="text-xs font-bold text-slate-700">{n.author} <span className="font-normal text-slate-400">· {format(new Date(n.date), 'MMM d, h:mm a')}</span></p>
                    <p className="mt-1 text-sm text-slate-700">{n.text}</p>
                  </div>
                ))}
              </div>
              <Textarea className="mt-3" rows={3} placeholder="Call outcome, follow-up, next step…" value={note} onChange={(e) => setNote(e.target.value)} />
              <Button onClick={addNote} className="mt-2 bg-navy hover:opacity-90">Add note</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
