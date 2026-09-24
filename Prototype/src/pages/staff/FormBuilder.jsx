import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Smartphone, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAdmissionForm } from '@/lib/useAdmissionForm';
import { Button } from '@/components/ui/button';
import RequireArea from '@/components/staff/RequireArea';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import SectionCard from '@/components/builder/SectionCard';
import FieldEditorDialog from '@/components/builder/FieldEditorDialog';
import SectionDialog from '@/components/builder/SectionDialog';
import PrivacyNoticeEditor from '@/components/builder/PrivacyNoticeEditor';

export default function FormBuilder() {
  const { openPreview } = useOutletContext();
  const qc = useQueryClient();
  const { sections, fields, fieldsFor, isLoading } = useAdmissionForm();
  const [fieldState, setFieldState] = useState(null);
  const [sectionState, setSectionState] = useState(null);
  const refresh = () => { qc.invalidateQueries({ queryKey: ['form-sections'] }); qc.invalidateQueries({ queryKey: ['form-fields'] }); };

  const reorder = async (entity, key, list, index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    const orders = Object.fromEntries(next.map((item, i) => [item.id, i]));
    qc.setQueryData([key], (old = []) => old.map((item) => (item.id in orders ? { ...item, order: orders[item.id] } : item)));
    await Promise.all(next.map((item, i) => (item.order !== i ? entity.update(item.id, { order: i }) : null)));
  };

  const deleteField = async (f) => {
    if (!window.confirm(`Delete "${f.label}"?`)) return;
    await base44.entities.FormField.delete(f.id);
    refresh();
  };
  const deleteSection = async (s) => {
    const fs = fieldsFor(s.id);
    if (fs.some((f) => f.locked)) return window.alert('This section contains core fields. Move them to another section first.');
    if (!window.confirm(`Delete "${s.title}" and its ${fs.length} question(s)?`)) return;
    await Promise.all(fs.map((f) => base44.entities.FormField.delete(f.id)));
    await base44.entities.FormSection.delete(s.id);
    refresh();
  };

  return (
    <RequireArea area="form">
      <StaffPageHeader
        eyebrow="Content Management" title="Admission Form Builder"
        description="Edit questions, dropdown choices, and reorder sections — changes go live on the Apply page immediately."
        actions={<>
          <Button variant="outline" onClick={() => openPreview('/apply')}><Smartphone className="w-4 h-4 mr-2" />Mobile preview</Button>
          <Button onClick={() => setSectionState({})} className="bg-gold text-navy hover:brightness-105 hover:bg-gold"><Plus className="w-4 h-4 mr-2" />Add section</Button>
        </>}
      />
      <div className="grid xl:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="space-y-5">
          {isLoading && <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>}
          {sections.map((s, i) => (
            <SectionCard
              key={s.id} section={s} fields={fieldsFor(s.id)} index={i} total={sections.length}
              onMoveSection={(d) => reorder(base44.entities.FormSection, 'form-sections', sections, i, d)}
              onEditSection={() => setSectionState({ section: s })} onDeleteSection={() => deleteSection(s)}
              onAddField={() => setFieldState({ section_id: s.id })} onEditField={(f) => setFieldState({ field: f })}
              onMoveField={(list, idx, d) => reorder(base44.entities.FormField, 'form-fields', list, idx, d)} onDeleteField={deleteField}
            />
          ))}
        </div>
        <div className="xl:sticky xl:top-8"><PrivacyNoticeEditor /></div>
      </div>
      <FieldEditorDialog state={fieldState} sections={sections} fieldCount={fields.length} onClose={() => setFieldState(null)} onSaved={() => { setFieldState(null); refresh(); }} />
      <SectionDialog state={sectionState} sectionCount={sections.length} onClose={() => setSectionState(null)} onSaved={() => { setSectionState(null); refresh(); }} />
    </RequireArea>
  );
}
