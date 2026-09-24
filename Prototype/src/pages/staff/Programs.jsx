import RequireArea from '@/components/staff/RequireArea';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import CoursesPanel from '@/components/programs/CoursesPanel';
import MilestonesPanel from '@/components/programs/MilestonesPanel';

export default function Programs() {
  return (
    <RequireArea area="courses">
      <StaffPageHeader eyebrow="Content Management" title="Programs & Schedule" description="Manage degree programs shown in the Apply picker, their career outcomes, and enrollment dates." />
      <div className="grid xl:grid-cols-2 gap-6 items-start">
        <CoursesPanel />
        <MilestonesPanel />
      </div>
    </RequireArea>
  );
}
