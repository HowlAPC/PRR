import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function PromoModules({ promos }) {
  if (!promos.length) return null;
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Discover APC</p>
      <h2 className="mt-2 font-heading text-3xl sm:text-4xl text-navy">Opportunities waiting for you</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((p, i) => (
          <motion.article
            key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/70 hover:shadow-xl transition-shadow"
          >
            {p.image_url && <Image src={p.image_url} alt={p.title} className="w-full aspect-[16/10]" />}
            <div className="p-6">
              <div className="w-8 h-1 rounded-full bg-gold mb-4" />
              <h3 className="font-heading text-xl text-navy">{p.title}</h3>
              {p.body && <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.body}</p>}
              {p.link_url && (
                <a href={p.link_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy group-hover:gap-2 transition-all">
                  {p.link_label || 'Learn more'} <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
