import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ShieldCheck } from 'lucide-react';
import { useSiteSettings, saveSiteSettings } from '@/lib/useSiteSettings';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FieldShell from '@/components/forms/FieldShell';

export default function PrivacyNoticeEditor() {
  const { settings, isLoading } = useSiteSettings();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [notice, setNotice] = useState('');
  const [consent, setConsent] = useState('');
  useEffect(() => { if (!isLoading) { setNotice(settings.privacy_notice); setConsent(settings.privacy_consent); } }, [isLoading]);

  const save = async () => {
    await saveSiteSettings({ privacy_notice: notice, privacy_consent: consent });
    qc.invalidateQueries({ queryKey: ['site-settings'] });
    toast({ title: 'Privacy notice updated' });
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-6">
      <div className="flex items-center gap-2 text-navy mb-4"><ShieldCheck className="w-5 h-5" /><p className="font-heading text-lg">Data Privacy Notice</p></div>
      <div className="space-y-4">
        <FieldShell label="Notice text"><Textarea rows={6} value={notice} onChange={(e) => setNotice(e.target.value)} /></FieldShell>
        <FieldShell label="Consent checkbox text"><Textarea rows={4} value={consent} onChange={(e) => setConsent(e.target.value)} /></FieldShell>
        <Button onClick={save} className="bg-navy hover:opacity-90">Save notice</Button>
      </div>
    </div>
  );
}