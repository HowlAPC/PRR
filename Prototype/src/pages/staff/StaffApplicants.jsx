import { useState } from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { APP_STATUS } from '@/lib/statusStyles';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RequireArea from '@/components/staff/RequireArea';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import StatusBadge from '@/components/StatusBadge';
import ApplicantDrawer from '@/components/staff/ApplicantDrawer';

export default function StaffApplicants() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const { data: apps = [], isLoading } = useQuery({ queryKey: ['applications'], queryFn: () => base44.entities.Application.list('-created_date', 500) });
  const term = search.toLowerCase();
  const shown = apps.filter((a) => (status === 'all' || a.status === status)
    && `${a.first_name} ${a.last_name} ${a.email} ${a.course_name}`.toLowerCase().includes(term));

  return (
    <RequireArea area="applicants">
      <StaffPageHeader eyebrow="Admissions Workflow" title="Applicants & Dossiers" description="Every submitted application. Open one to review answers and update its status." />
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input className="pl-9 bg-white" placeholder="Search by name, email, or program…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-48 bg-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.entries(APP_STATUS).map(([k, s]) => <SelectItem key={k} value={k}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
        : shown.length === 0 ? <p className="py-20 text-center text-sm text-slate-400">No applicants found.</p>
        : (
          <div className="space-y-2">
            {shown.map((a) => (
              <button key={a.id} onClick={() => setSelectedId(a.id)} className="w-full text-left bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-gold hover:shadow-md transition-all grid gap-2 md:grid-cols-[1.2fr_1.6fr_1.2fr_auto] md:items-center">
                <div><p className="font-semibold text-navy">{a.last_name}, {a.first_name}</p><p className="text-xs text-slate-400">{format(new Date(a.created_date), 'MMM d, yyyy')}</p></div>
                <p className="text-sm text-slate-600 truncate">{a.course_name || '—'}</p>
                <p className="text-sm text-slate-500 truncate">{a.email}</p>
                <StatusBadge map={APP_STATUS} value={a.status} />
              </button>
            ))}
          </div>
        )}
      <ApplicantDrawer app={apps.find((a) => a.id === selectedId)} onClose={() => setSelectedId(null)} />
    </RequireArea>
  );
}
