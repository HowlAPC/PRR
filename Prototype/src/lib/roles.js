export const STAFF_ROLES = ['admin', 'admission_officer', 'marketing'];

export const ROLE_LABELS = {
  admin: 'Administrator',
  admission_officer: 'Admission Officer',
  marketing: 'Marketing Team',
  user: 'Applicant',
};

const AREAS = {
  admission_officer: ['dashboard', 'applicants', 'form', 'courses'],
  marketing: ['design'],
};

export const isStaff = (user) => !!user && STAFF_ROLES.includes(user.role);

export const can = (user, area) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return (AREAS[user.role] || []).includes(area);
};

export const staffHome = (user) => (user?.role === 'marketing' ? '/staff/design' : '/staff');
