import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { generateStudentEmail } from '@/lib/studentEmail';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FieldShell from '@/components/forms/FieldShell';

const BANKS = ['BDO', 'BPI', 'Metrobank', 'Landbank', 'UnionBank', 'Security Bank', 'GCash', 'Maya'];

export default function PaymentForm({ app, settings }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({ bank: '', name: '', account: '', reference: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));
  const fee = Number(settings.reservation_fee || 0);

  const pay = async (e) => {
    e.preventDefault();
    if (!form.bank || !form.name || form.account.replace(/\D/g, '').length < 4) return setError('Please complete your banking details.');
    setError(''); setBusy(true);
    try {
      const student_email = await generateStudentEmail(app, settings.student_email_domain);
      const now = new Date().toISOString();
      await base44.entities.Application.update(app.id, {
        status: 'enrolled', payment_bank: form.bank, payment_account_name: form.name,
        payment_account_last4: form.account.replace(/\D/g, '').slice(-4), payment_amount: fee,
        payment_reference: form.reference || `RSV-${Date.now().toString(36).toUpperCase()}`,
        paid_at: now, student_email, transferred_at: now,
      });
      qc.invalidateQueries({ queryKey: ['my-application'] });
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    }
    setBusy(false);
  };

  return (
    <form onSubmit={pay} className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8">
      <div className="flex items-end justify-between gap-4 pb-6 border-b border-dashed">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400">Reservation Fee</p>
          <p className="mt-1 font-heading text-3xl text-navy">₱{fee.toLocaleString()}</p>
        </div>
        <span className="text-xs text-slate-500 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Secure</span>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <FieldShell label="Bank / E-wallet" required>
          <Select value={form.bank} onValueChange={set('bank')}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>{BANKS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
          </Select>
        </FieldShell>
        <FieldShell label="Account Holder Name" required><Input value={form.name} onChange={set('name')} /></FieldShell>
        <FieldShell label="Account / Mobile Number" required help="Only the last 4 digits are kept on record."><Input inputMode="numeric" value={form.account} onChange={set('account')} /></FieldShell>
        <FieldShell label="Transaction Reference" help="Optional"><Input value={form.reference} onChange={set('reference')} /></FieldShell>
      </div>
      {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
      <button disabled={busy} className="mt-7 w-full h-12 rounded-xl bg-gold text-navy font-bold inline-flex items-center justify-center gap-2 hover:brightness-105 disabled:opacity-60">
        {busy && <Loader2 className="w-4 h-4 animate-spin" />} Pay ₱{fee.toLocaleString()} and enroll
      </button>
    </form>
  );
}
