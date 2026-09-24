import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Save } from 'lucide-react';
import { useSiteSettings, saveSiteSettings } from '@/lib/useSiteSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import RequireArea from '@/components/staff/RequireArea';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import BrandPanel from '@/components/design/BrandPanel';
import ContentPanel from '@/components/design/ContentPanel';
import ModulesPanel from '@/components/design/ModulesPanel';
import PreviewFrame from '@/components/design/PreviewFrame';

export default function DesignMode() {
  const { settings, isLoading } = useSiteSettings();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => { if (!isLoading && !draft) setDraft(settings); }, [isLoading]);
  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));

  const publish = async () => {
    setSaving(true);
    await saveSiteSettings(draft);
    await qc.invalidateQueries({ queryKey: ['site-settings'] });
    setRefreshKey((k) => k + 1);
    setSaving(false);
    toast({ title: 'Changes published', description: 'The live site has been updated.' });
  };

  return (
    <RequireArea area="design">
      <StaffPageHeader
        eyebrow="Design Mode" title="Site Designer"
        description="Change colors, backgrounds, images, and promotional modules. Preview on desktop or mobile, then publish."
        actions={<Button onClick={publish} disabled={saving || !draft} className="bg-gold text-navy hover:bg-gold hover:brightness-105">{saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Publish changes</Button>}
      />
      {!draft ? <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div> : (
        <div className="grid xl:grid-cols-[380px_1fr] gap-6 items-start">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-5">
            <Tabs defaultValue="brand">
              <TabsList className="grid grid-cols-3 w-full mb-5">
                <TabsTrigger value="brand">Brand</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
              </TabsList>
              <TabsContent value="brand"><BrandPanel draft={draft} set={set} /></TabsContent>
              <TabsContent value="content"><ContentPanel draft={draft} set={set} /></TabsContent>
              <TabsContent value="modules"><ModulesPanel onChanged={() => setRefreshKey((k) => k + 1)} /></TabsContent>
            </Tabs>
          </div>
          <PreviewFrame refreshKey={refreshKey} />
        </div>
      )}
    </RequireArea>
  );
}
