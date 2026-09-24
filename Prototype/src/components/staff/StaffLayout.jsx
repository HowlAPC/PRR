import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2, Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useCurrentUser } from '@/lib/useCurrentUser';
import { isStaff } from '@/lib/roles';
import StaffSidebar from './StaffSidebar';
import MobilePreviewDialog from './MobilePreviewDialog';
import BrandMark from '@/components/site/BrandMark';

export default function StaffLayout() {
  const { data: user, isLoading } = useCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState({ open: false, path: '/' });
  if (isLoading || !user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>;
  if (!isStaff(user)) return <Navigate to="/portal" replace />;
  const openPreview = (path = '/') => { setMenuOpen(false); setPreview({ open: true, path }); };

  return (
    <div className="min-h-screen bg-[#F6F5F0] lg:flex">
      <aside className="hidden lg:block w-64 shrink-0 bg-navy sticky top-0 h-screen">
        <StaffSidebar user={user} onPreview={() => openPreview()} />
      </aside>
      <div className="lg:hidden sticky top-0 z-30 bg-navy text-white h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2"><BrandMark size="sm" /><span className="font-heading">RamConnect</span></div>
        <button onClick={() => setMenuOpen(true)} aria-label="Menu"><Menu className="w-5 h-5" /></button>
      </div>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-navy border-none">
          <StaffSidebar user={user} onPreview={() => openPreview()} onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>
      <main className="flex-1 min-w-0"><Outlet context={{ user, openPreview }} /></main>
      <MobilePreviewDialog open={preview.open} initialPath={preview.path} onOpenChange={(o) => setPreview((p) => ({ ...p, open: o }))} />
    </div>
  );
}
