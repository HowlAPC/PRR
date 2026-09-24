import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Inbox, CalendarCheck, FileText, GraduationCap, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { INQ_STATUS } from '@/lib/statusStyles';
import RequireArea from '@/components/staff/RequireArea';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import StatGrid from '@/components/staff/StatGrid';
import InquiryRow from '@/components/staff/InquiryRow';
import InquiryDrawer from '@/components/staff/InquiryDrawer';

export default function StaffDashboard() {
  const { user } = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const { data: inquiries = [], isLoading } = useQuery({ queryKey: ['inquiries'], queryFn: () => base44.entities.Inquiry.list('-created_date', 300) });
  const { data: apps = [] } = useQuery({ queryKey: ['applications'], queryFn: () => base44.entities.Application.list('-created_date', 500) });
  const shown = filter === 'all' ? inquiries : inquiries.filter((i) => i.status === filter);

  const stats = [
    { label: 'New Inquiries', value: inquiries.filter((i) => i.status === 'new').length, icon: Inbox, highlight: true },
    { label: 'Visits Scheduled', value: inquiries.filter((i) => i.status === 'scheduled').length, icon: CalendarCheck },
    { label: 'Applications', value: apps.length, icon: FileText },
    { label: 'Enrolled', value: apps.filter((a) => a.status === 'enrolled').length, icon: GraduationCap },
  ];

  return (
    <RequireArea area="dashboard">
      <StaffPageHeader eyebrow="Customer Relationships" title="Inquiries Dashboard" description="Prospective students who reached out. Review who to call, email, or text next." />
      <StatGrid stats={stats} />
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {[['all', 'All'], ...Object.entries(INQ_STATUS).map(([k, s]) => [k, s.label])].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} className={`shrink-0 px-4 h-9 rounded-full text-xs font-bold transition ${filter === k ? 'bg-navy text-white' : 'bg-white border text-slate-500 hover:text-slate-800'}`}>{label}</button>
        ))}
      </div>
      {isLoading ? <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
        : shown.length === 0 ? <p className="py-20 text-center text-sm text-slate-400">No inquiries here yet.</p>
        : <div className="space-y-3">{shown.map((q) => <InquiryRow key={q.id} inquiry={q} onClick={() => setSelectedId(q.id)} />)}</div>}
      <InquiryDrawer inquiry={inquiries.find((i) => i.id === selectedId)} user={user} onClose={() => setSelectedId(null)} />
    </RequireArea>
  );
}
