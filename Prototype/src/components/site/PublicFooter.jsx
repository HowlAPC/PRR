import BrandMark from './BrandMark';

export default function PublicFooter({ settings }) {
  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <BrandMark size="sm" />
          <span className="font-heading text-white">{settings.school_name}</span>
        </div>
        <p>{settings.footer_text}</p>
      </div>
    </footer>
  );
}
