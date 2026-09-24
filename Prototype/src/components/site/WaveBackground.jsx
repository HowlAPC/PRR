import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function WaveBackground({ settings }) {
  if (settings.background_style === 'image' && settings.background_image) {
    return (
      <div className="absolute inset-0 -z-10">
        <Image src={settings.background_image} alt="" className="w-full h-full" />
        <div className="absolute inset-0 opacity-80" style={{ background: 'var(--navy)' }} />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" style={{ background: 'linear-gradient(155deg, var(--navy) 0%, #16345f 55%, var(--navy) 100%)' }}>
      <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20" style={{ background: 'var(--gold)' }} />
      {settings.background_style === 'waves' && (
        <motion.svg
          viewBox="0 0 1440 600" preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-[120%] h-[70%]"
          animate={{ x: ['0%', '-8%', '0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M0,380 C240,300 480,460 720,400 C960,340 1200,260 1440,330 L1440,600 L0,600 Z" fill="var(--gold)" opacity="0.10" />
          <path d="M0,450 C300,380 540,520 820,460 C1080,400 1260,380 1440,420 L1440,600 L0,600 Z" fill="var(--gold)" opacity="0.14" />
          <path d="M0,520 C260,470 560,580 860,530 C1120,490 1300,500 1440,510 L1440,600 L0,600 Z" fill="#ffffff" opacity="0.05" />
          <path d="M0,300 C260,240 520,380 780,320 C1040,260 1240,220 1440,260" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.35" />
        </motion.svg>
      )}
    </div>
  );
}
