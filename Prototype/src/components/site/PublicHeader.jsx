import { Link } from 'react-router-dom';
import { useCurrentUser } from '@/lib/useCurrentUser';
import BrandMark from './BrandMark';

export default function PublicHeader({ settings }) {
  const { data: user } = useCurrentUser();
  const link = 'hidden sm:inline px-3 py-2 rounded-full text-white/75 hover:text-white transition-colors';
  return (
    <header className="relative z-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BrandMark />
          <span className="font-heading text-lg text-white hidden xs:inline sm:inline">{settings.school_name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold">
          <Link to="/inquire" className={link}>Inquire</Link>
          <Link to="/apply" className={link}>Apply</Link>
          <Link
            to={user ? '/portal' : '/login?returnTo=%2Fportal'}
            className="ml-2 px-5 py-2.5 rounded-full bg-gold text-navy hover:brightness-105 transition"
          >
            {user ? 'My Portal' : 'Log in'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
