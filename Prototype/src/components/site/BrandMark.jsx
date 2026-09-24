export default function BrandMark({ size = 'md' }) {
  const dims = size === 'sm' ? 'w-8 h-8 text-[10px]' : 'w-10 h-10 text-xs';
  return (
    <div className={`${dims} rounded-full bg-gold text-navy font-extrabold tracking-tight flex items-center justify-center ring-4 ring-white/10 shrink-0`}>
      APC
    </div>
  );
}
