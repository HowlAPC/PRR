import { ArrowUpRight, Briefcase } from 'lucide-react';

export default function CourseInfo({ course }) {
  return (
    <div>
      {course.code && <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A7400]">{course.code}</p>}
      <p className="mt-1 font-heading text-base text-navy leading-snug">{course.name}</p>
      {course.description && <p className="mt-2 text-xs text-slate-600 leading-relaxed">{course.description}</p>}
      {course.outcomes?.length > 0 && (
        <>
          <p className="mt-3 text-[11px] font-bold text-slate-500 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Career Prospects</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {course.outcomes.map((o) => <span key={o} className="text-[11px] px-2 py-1 rounded-full bg-white border border-[#F2D97A] text-slate-700">{o}</span>)}
          </div>
        </>
      )}
      {course.info_url && (
        <a href={course.info_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-navy">
          More on apc.edu.ph <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}
