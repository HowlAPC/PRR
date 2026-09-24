import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSiteSettings } from '@/lib/useSiteSettings';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormPageShell from '@/components/site/FormPageShell';
import PrivacyNotice from '@/components/site/PrivacyNotice';
import SuccessCard from '@/components/site/SuccessCard';
import VisitModePicker from '@/components/site/VisitModePicker';
import FieldShell from '@/components/forms/FieldShell';

const EMPTY = { first_name: '', last_name: '', email: '', mobile: '', guardian_name: '', guardian_contact: '', program_interest: '', visit_mode: 'onsite', preferred_date: '', question: '' };

export default function Inquire() {
  const { settings } = useSiteSettings();
  const { data: courses = [] } = useQuery({ queryKey: ['courses'], queryFn: () => base44.entities.Course.list('order') });
  const [form, setForm] = useState(EMPTY);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.mobile) return setError('Please complete all required fields.');
    setError(''); setSubmitting(true);
    try {
      const data = Object.fromEntries(Object.entries(form).filter(([, v]) => v !== ''));
      await base44.entities.Inquiry.create({ ...data, status: 'new', notes: [] });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <FormPageShell settings={settings} eyebrow="Inquire" title="Let's get to know each other" subtitle="Ask us anything and choose how you'd like to visit — on campus or online.">
      {done ? (
        <SuccessCard title="Thank you for reaching out!">
          An Admissions Officer will contact you soon through your email or mobile number.
          <div className="mt-6"><Link to="/" className="font-bold text-navy underline underline-offset-4">Back to home</Link></div>
        </SuccessCard>
      ) : (
        <>
          <PrivacyNotice settings={settings} agreed={agreed} onChange={setAgreed} />
          {agreed && (
            <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-black/5 p-6 sm:p-8 space-y-8">
              <div className="grid sm:grid-cols-2 gap-5">
                <FieldShell label="First Name" required><Input value={form.first_name} onChange={set('first_name')} /></FieldShell>
                <FieldShell label="Last Name" required><Input value={form.last_name} onChange={set('last_name')} /></FieldShell>
                <FieldShell label="Email" required><Input type="email" value={form.email} onChange={set('email')} /></FieldShell>
                <FieldShell label="Mobile No." required help="e.g. 09157990479 or +639157990479"><Input type="tel" value={form.mobile} onChange={set('mobile')} /></FieldShell>
                <FieldShell label="Parent / Guardian Name"><Input value={form.guardian_name} onChange={set('guardian_name')} /></FieldShell>
                <FieldShell label="Guardian Email or Mobile"><Input value={form.guardian_contact} onChange={set('guardian_contact')} /></FieldShell>
                <FieldShell label="Program of Interest" className="sm:col-span-2">
                  <Select value={form.program_interest} onValueChange={set('program_interest')}>
                    <SelectTrigger><SelectValue placeholder="Select a program (optional)" /></SelectTrigger>
                    <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </FieldShell>
              </div>
              <FieldShell label="How would you like to visit?"><VisitModePicker value={form.visit_mode} onChange={set('visit_mode')} /></FieldShell>
              <div className="grid sm:grid-cols-2 gap-5">
                <FieldShell label="Preferred Date"><Input type="date" value={form.preferred_date} onChange={set('preferred_date')} /></FieldShell>
                <FieldShell label="Your questions or comments" className="sm:col-span-2"><Textarea rows={4} value={form.question} onChange={set('question')} placeholder="What would you like to know?" /></FieldShell>
              </div>
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button disabled={submitting} className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gold text-navy font-bold inline-flex items-center justify-center gap-2 hover:brightness-105 disabled:opacity-60">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Send inquiry
              </button>
            </motion.form>
          )}
        </>
      )}
    </FormPageShell>
  );
}
