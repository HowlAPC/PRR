import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, GraduationCap, Palette, Smartphone, ExternalLink, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { can, ROLE_LABELS } from '@/lib/roles';
import BrandMark from '@/components/site/BrandMark';

const NAV = [
  { group: 'Admissions Workflow', items: [
    { to: '/staff', label: 'Dashboard', icon: LayoutDashboard, area: 'dashboard', end: true },
    { to: '/staff/applicants', label: 'Applicants', icon: Users, area: 'applicants' },
  ] },
  { group: 'Content Management', items: [
    { to: '/staff/form-builder', label: 'Admission Form', icon: ClipboardList, area: 'form' },
    { to: '/staff/programs', label: 'Programs & Schedule', icon: GraduationCap, area: 'courses' },
    { to: '/staff/design', label: 'Design Mode', icon: Palette, area: 'design' },
  ] },
];

export default function StaffSidebar({ user, onPreview, onNavigate }) {
  const initials = (user.full_name || user.email).split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="flex flex-col h-full text-white">
      <div className="px-6 h-20 flex items-center gap-3 border-b border-white/10">
        <BrandMark />
        <div>
          <p className="font-heading text-lg leading-none">RamConnect</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold mt-1.5">Admissions CMS</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-7">
        {NAV.map((g) => {
          const items = g.items.filter((i) => can(user, i.area));
          if (!items.length) return null;
          return (
            <div key={g.group}>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{g.group}</p>
              <div className="space-y-1">
                {items.map((i) => {
                  const Icon = i.icon;
                  return (
                    <NavLink key={i.to} to={i.to} end={i.end} onClick={onNavigate}
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-gold text-navy shadow-lg shadow-black/20' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
                      <Icon className="w-4 h-4" /> {i.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-2">
        <button onClick={onPreview} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/5 border border-white/10">
          <Smartphone className="w-4 h-4" /> Mobile view
        </button>
        <Link to="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/5">
          <ExternalLink className="w-4 h-4" /> View live site
        </Link>
        <div className="flex items-center gap-3 px-3 pt-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{initials}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{user.full_name || user.email}</p>
            <p className="text-[11px] text-gold">{ROLE_LABELS[user.role] || user.role}</p>
          </div>
          <button onClick={() => base44.auth.logout('/')} className="text-white/50 hover:text-white" aria-label="Log out"><LogOut className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}
