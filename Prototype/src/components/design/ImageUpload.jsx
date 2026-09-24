import { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';

export default function ImageUpload({ value, onChange }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
    onChange(file_url);
    setBusy(false);
  };
  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border aspect-[16/9]">
          <Image src={value} alt="" className="w-full h-full" />
          <button type="button" onClick={() => onChange('')} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} className="w-full aspect-[16/9] rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-gold hover:text-navy flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-colors">
          {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
          {busy ? 'Uploading…' : 'Upload image'}
        </button>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={upload} />
    </div>
  );
}
