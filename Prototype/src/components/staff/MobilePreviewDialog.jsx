import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PAGES = [['/', 'Home'], ['/inquire', 'Inquire'], ['/apply', 'Apply']];

export default function MobilePreviewDialog({ open, onOpenChange, initialPath = '/' }) {
  const [path, setPath] = useState(initialPath);
  useEffect(() => { if (open) setPath(initialPath); }, [open, initialPath]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[440px] p-5">
        <DialogHeader><DialogTitle className="font-heading text-navy">Mobile view</DialogTitle></DialogHeader>
        <div className="flex gap-1 p-1 rounded-xl bg-slate-100">
          {PAGES.map(([p, label]) => (
            <button key={p} onClick={() => setPath(p)} className={`flex-1 h-9 rounded-lg text-xs font-bold transition ${path === p ? 'bg-white text-navy shadow-sm' : 'text-slate-500'}`}>{label}</button>
          ))}
        </div>
        <div className="mx-auto mt-2 w-[375px] max-w-full h-[640px] max-h-[65vh] rounded-[36px] border-[10px] border-slate-900 overflow-hidden bg-white shadow-2xl">
          <iframe key={path} src={path} title="Mobile preview" className="w-full h-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
