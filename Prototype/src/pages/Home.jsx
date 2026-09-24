import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useSiteSettings } from '@/lib/useSiteSettings';
import WaveBackground from '@/components/site/WaveBackground';
import PublicHeader from '@/components/site/PublicHeader';
import PublicFooter from '@/components/site/PublicFooter';
import HeroCopy from '@/components/site/HeroCopy';
import ActionCard from '@/components/site/ActionCard';
import MilestonesCard from '@/components/site/MilestonesCard';
import PromoModules from '@/components/site/PromoModules';

export default function Home() {
  const { settings } = useSiteSettings();
  const { data: milestones = [] } = useQuery({ queryKey: ['milestones'], queryFn: () => base44.entities.Milestone.list('order') });
  const { data: promos = [] } = useQuery({ queryKey: ['promos-active'], queryFn: () => base44.entities.Promo.filter({ active: true }, 'order') });

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden pb-32">
        <WaveBackground settings={settings} />
        <PublicHeader settings={settings} />
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          <HeroCopy settings={settings} />
          <ActionCard settings={settings} />
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 -mt-16 relative z-10">
        <MilestonesCard title={settings.schedule_title} milestones={milestones} />
      </div>
      <PromoModules promos={promos} />
      <PublicFooter settings={settings} />
    </div>
  );
}
