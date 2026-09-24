import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

export function useAdmissionForm() {
  const sections = useQuery({ queryKey: ['form-sections'], queryFn: () => base44.entities.FormSection.list('order', 200) });
  const fields = useQuery({ queryKey: ['form-fields'], queryFn: () => base44.entities.FormField.list('order', 1000) });
  const courses = useQuery({ queryKey: ['courses'], queryFn: () => base44.entities.Course.list('order') });
  const sortedSections = [...(sections.data || [])].sort(byOrder);
  const allFields = fields.data || [];
  return {
    sections: sortedSections,
    fields: allFields,
    courses: courses.data || [],
    fieldsFor: (id) => allFields.filter((f) => f.section_id === id).sort(byOrder),
    isLoading: sections.isLoading || fields.isLoading,
  };
}
