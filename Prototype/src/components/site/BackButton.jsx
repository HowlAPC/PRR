import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ to = '/', label = 'Back', className = '' }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(to))}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" /> {label}
    </button>
  );
}
