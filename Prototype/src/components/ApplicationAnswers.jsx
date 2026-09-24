import { useAdmissionForm } from '@/lib/useAdmissionForm';

const formatValue = (field, value, app) => {
  if (field.type === 'course') return app.course_name;
  if (Array.isArray(value)) return value.join(', ');
  return value;
};

export default function ApplicationAnswers({ app }) {
  const { sections, fieldsFor } = useAdmissionForm();
  return (
    <div className="space-y-4">
      {sections.map((s) => {
        const fs = fieldsFor(s.id).filter((f) => f.field_key !== 'confirm_email');
        if (!fs.length) return null;
        return (
          <div key={s.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6">
            <h3 className="font-heading text-lg text-navy mb-4">{s.title}</h3>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {fs.map((f) => (
                <div key={f.id} className={f.width === 'half' ? '' : 'sm:col-span-2'}>
                  <dt className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{f.label}</dt>
                  <dd className="mt-1 text-sm text-slate-800 break-words">{formatValue(f, app.answers?.[f.field_key], app) || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
