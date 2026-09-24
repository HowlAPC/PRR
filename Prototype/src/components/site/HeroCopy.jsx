import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function HeroCopy({ settings }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-white flex flex-col justify-center py-4"
    >
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
        <Sparkles className="w-3.5 h-3.5" /> Admissions Open
      </span>
      <h1 className="mt-6 font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">{settings.headline}</h1>
      <p className="mt-5 text-lg sm:text-xl text-gold font-medium">{settings.motto}</p>
      {settings.hero_image && (
        <div className="mt-8 relative rounded-3xl overflow-hidden aspect-[16/9] ring-1 ring-white/10 hidden sm:block">
          <Image src={settings.hero_image} alt="Campus life" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}
