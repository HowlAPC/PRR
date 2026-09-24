import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FieldShell from '@/components/forms/FieldShell';
import CoursePicker from './CoursePicker';

export default function DynamicField({ field, value, onChange, error, courses }) {
  const options = (field.options || []).filter(Boolean);
  let control;
  switch (field.type) {
    case 'select':
      control = (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger><SelectValue placeholder={field.placeholder || 'Select'} /></SelectTrigger>
          <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
      );
      break;
    case 'radio':
      control = (
        <div className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button key={o} type="button" onClick={() => onChange(o)} className={`px-4 py-2 rounded-full text-sm border transition-colors ${value === o ? 'bg-navy text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>{o}</button>
          ))}
        </div>
      );
      break;
    case 'checkbox_group': {
      const arr = Array.isArray(value) ? value : [];
      control = (
        <div className="grid sm:grid-cols-2 gap-2">
          {options.map((o) => (
            <label key={o} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm cursor-pointer hover:bg-slate-50">
              <Checkbox checked={arr.includes(o)} onCheckedChange={(v) => onChange(v ? [...arr, o] : arr.filter((x) => x !== o))} />
              {o}
            </label>
          ))}
        </div>
      );
      break;
    }
    case 'textarea':
      control = <Textarea rows={3} value={value || ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
      break;
    case 'course':
      control = <CoursePicker courses={courses} value={value} onChange={onChange} />;
      break;
    default:
      control = <Input type={field.type || 'text'} value={value || ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <FieldShell label={field.label} required={field.required} help={field.help_text} error={error} className={field.width === 'half' ? '' : 'sm:col-span-2'}>
      {control}
    </FieldShell>
  );
}