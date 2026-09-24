import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import BrandMark from '@/components/site/BrandMark';

export default function PortalHeader({ user }) {
  return (
    <header className="bg-navy text-white border-b-4 border-gold">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BrandMark size="sm" />
          <span className="font-heading text-lg">RamConnect</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-white/70">{user.full_name || user.email}</span>
          <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </div>
    </header>
  );
}
