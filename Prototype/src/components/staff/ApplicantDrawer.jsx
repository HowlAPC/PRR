import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { APP_STATUS } from '@/lib/statusStyles';
import ApplicationAnswers from '@/components/ApplicationAnswers';

export default function ApplicantDrawer({ app, onClose }) {
  const qc = useQueryClient();
  const setStatus = async (status) => {
    await base44.entities.Application.update(app.id, { status });
    qc.invalidateQueries({ queryKey: ['applications'] });
  };
  return (
    <Sheet open={!!app} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-[#F6F5F0]">
        {app && (
          <>
            <SheetHeader>
              <SheetTitle className="font-heading text-2xl text-navy text-left">{app.first_name} {app.middle_name} {app.last_name}</SheetTitle>
              <p className="text-sm text-slate-500 text-left">{app.course_name}</p>
            </SheetHeader>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white border p-4">
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">Status</p>
                <Select value={app.status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.entries(APP_STATUS).map(([k, s]) => <SelectItem key={k} value={k}>{s.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="rounded-2xl bg-white border p-4 text-sm">
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Contact</p>
                <p className="mt-1.5 text-slate-800 break-all">{app.email}</p>
                <p className="text-slate-500">{app.mobile}</p>
              </div>
              {app.student_email && (
                <div className="sm:col-span-2 rounded-2xl bg-navy text-white p-4 text-sm">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-white/50">Student Email · Paid via {app.payment_bank} ••{app.payment_account_last4}</p>
                  <p className="mt-1 text-gold font-semibold">{app.student_email}</p>
                </div>
              )}
            </div>
            <div className="mt-5"><ApplicationAnswers app={app} /></div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
