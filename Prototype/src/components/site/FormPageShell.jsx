import WaveBackground from './WaveBackground';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import BackButton from './BackButton';

export default function FormPageShell({ settings, eyebrow, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden pb-28">
        <WaveBackground settings={settings} />
        <PublicHeader settings={settings} />
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10 text-white">
          <BackButton className="mb-4 text-white/70" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
          <h1 className="mt-3 font-heading text-3xl sm:text-5xl leading-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-white/70 max-w-xl">{subtitle}</p>}
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-8 -mt-16 relative z-10 pb-20 space-y-5">{children}</div>
      <PublicFooter settings={settings} />
    </div>
  );
}
