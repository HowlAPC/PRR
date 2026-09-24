import { Navigate, useOutletContext } from 'react-router-dom';
import { can, staffHome } from '@/lib/roles';

export default function RequireArea({ area, children }) {
  const { user } = useOutletContext();
  if (!can(user, area)) return <Navigate to={staffHome(user)} replace />;
  return <div className="p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto">{children}</div>;
}
