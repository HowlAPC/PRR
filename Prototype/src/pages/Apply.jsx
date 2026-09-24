import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSiteSettings } from '@/lib/useSiteSettings';
import { useAdmissionForm } from '@/lib/useAdmissionForm';
import FormPageShell from '@/components/site/FormPageShell';
import PrivacyNotice from '@/components/site/PrivacyNotice';
import SuccessCard from '@/components/site/SuccessCard';
import DynamicField from '@/components/apply/DynamicField';

const isEmpty = (v) => v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

export default function Apply() {
  const { settings } = useSiteSettings();
  const { sections, fields, fieldsFor, courses, isLoading } = useAdmissionForm();
  const [agreed, setAgreed] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);
  const [formError, setFormError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    fields.forEach((f) => { if (f.required && isEmpty(values[f.field_key])) errs[f.field_key] = 'This field is required.'; });
    if (values.confirm_email && values.email !== values.confirm_email) errs.confirm_email = 'Emails do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return setFormError('Please review the highlighted fields.');
    setFormError(''); setSubmitting(true);
    try {
      const courseField = fields.find((f) => f.type === 'course');
      const course = courses.find((c) => c.id === values[courseField?.field_key]);
      await base44.entities.Application.create({
        email: (values.email || '').trim().toLowerCase(), first_name: values.first_name, middle_name: values.middle_name || '',
        last_name: values.last_name, mobile: values.mobile || '', course_id: course?.id, course_name: course?.name,
        answers: values, status: 'submitted',
      });
      setDone(values.email);
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <FormPageShell settings={settings} eyebrow="Admission Application" title="Begin your journey at APC" subtitle="Provide correct and complete information. Fields marked with an asterisk (*) are required.">
      {done ? (
        <SuccessCard title="Application submitted!">
          Next, create your RamConnect account using <b className="text-navy">{done}</b>. We'll send a verification code to confirm your email, then you can log in to complete your enrollment.
          <div className="mt-6"><Link to="/register" className="inline-flex h-11 px-6 items-center rounded-xl bg-navy text-white font-bold">Create my account</Link></div>
        </SuccessCard>
      ) : (
        <>
          <PrivacyNotice settings={settings} agreed={agreed} onChange={setAgreed} />
          {agreed && (
            <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="space-y-5">
              <div className="rounded-2xl bg-sky-50 border border-sky-100 p-4 flex gap-3 text-sm text-sky-800">
                <Info className="w-5 h-5 shrink-0" /> Please provide the correct and complete information. Fields marked with asterisk (*) are required.
              </div>
              {isLoading && <div className="py-16 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>}
              {sections.map((s) => (
                <section key={s.id} className="rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-black/5 p-6 sm:p-8">
                  <div className="flex items-center gap-3"><div className="w-1.5 h-6 rounded-full bg-gold" /><h2 className="font-heading text-xl text-navy">{s.title}</h2></div>
                  {s.description && <p className="mt-2 text-sm text-slate-500">{s.description}</p>}
                  <div className="mt-6 grid sm:grid-cols-2 gap-5">
                    {fieldsFor(s.id).map((f) => (
                      <DynamicField key={f.id} field={f} courses={courses} value={values[f.field_key]} error={errors[f.field_key]} onChange={(v) => setValues((p) => ({ ...p, [f.field_key]: v }))} />
                    ))}
                  </div>
                </section>
              ))}
              {formError && <p className="text-sm text-rose-600">{formError}</p>}
              <button disabled={submitting || isLoading} className="w-full sm:w-auto h-12 px-8 rounded-xl bg-navy text-white font-bold inline-flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-60">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />} Submit application
              </button>
            </motion.form>
          )}
        </>
      )}
    </FormPageShell>
  );
}
