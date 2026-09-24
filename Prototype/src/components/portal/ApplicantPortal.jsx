import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, FileText, CreditCard } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSiteSettings } from '@/lib/useSiteSettings';
import ApplicationAnswers from '@/components/ApplicationAnswers';
import PortalHeader from './PortalHeader';
import StatusStepper from './StatusStepper';
import PaymentForm from './PaymentForm';
import EnrollmentComplete from './EnrollmentComplete';
import BackButton from '@/components/site/BackButton';

export default function ApplicantPortal({ user }) {
  const { settings } = useSiteSettings();
  const [tab, setTab] = useState('info');
  const { data: apps, isLoading } = useQuery({
    queryKey: ['my-application', user.email],
    queryFn: () => base44.entities.Application.filter({ email: user.email.toLowerCase() }, '-created_date', 1),
  });
  const app = apps?.[0];
  const tabCls = (t) => `flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 h-11 rounded-xl text-sm font-bold transition-all ${tab === t ? 'bg-navy text-white shadow' : 'text-slate-500 hover:text-slate-800'}`;

  return (
    <div className="min-h-screen bg-[#F7F6F1]">
      <PortalHeader user={user} />
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <BackButton to="/" label="Back to site" className="text-slate-500 hover:text-navy mb-6" />
        {isLoading ? (
          <div className="py-24 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
        ) : !app ? (
          <div className="rounded-3xl bg-white border p-10 text-center">
            <h1 className="font-heading text-2xl text-navy">No application found</h1>
            <p className="mt-2 text-sm text-slate-500">We couldn't find an application for {user.email}. Start one to continue.</p>
            <Link to="/apply" className="mt-6 inline-flex h-11 px-6 items-center rounded-xl bg-gold text-navy font-bold">Start application</Link>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Application</p>
            <h1 className="mt-1 font-heading text-3xl sm:text-4xl text-navy">Hello, {app.first_name}</h1>
            <p className="mt-1 text-sm text-slate-500">{app.course_name || 'No program selected'}</p>
            <div className="mt-8 rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-7"><StatusStepper status={app.status} /></div>
            {app.status === 'enrolled' ? (
              <div className="mt-6 space-y-6"><EnrollmentComplete app={app} /><ApplicationAnswers app={app} /></div>
            ) : (
              <>
                <div className="mt-6 inline-flex w-full sm:w-auto p-1 rounded-2xl bg-white border">
                  <button onClick={() => setTab('info')} className={tabCls('info')}><FileText className="w-4 h-4" /> My Information</button>
                  <button onClick={() => setTab('pay')} className={tabCls('pay')}><CreditCard className="w-4 h-4" /> Reservation Fee</button>
                </div>
                <div className="mt-6">
                  {tab === 'info' ? <ApplicationAnswers app={app} /> : app.status === 'rejected'
                    ? <p className="rounded-2xl bg-rose-50 text-rose-700 p-5 text-sm">Your application was not approved. Please contact the Admissions Office.</p>
                    : <PaymentForm app={app} settings={settings} />}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
