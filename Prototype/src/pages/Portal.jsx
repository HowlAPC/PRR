import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { isStaff, staffHome } from '@/lib/roles';
import ApplicantPortal from '@/components/portal/ApplicantPortal';

export default function Portal() {
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading || !user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>;
  if (isStaff(user)) return <Navigate to={staffHome(user)} replace />;
  return <ApplicantPortal user={user} />;
}
