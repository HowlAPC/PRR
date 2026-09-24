import { base44 } from '@/api/base44Client';

const clean = (s) => (s || '').toLowerCase().replace(/[^a-z]/g, '');

// First initial + middle initial + last name, e.g. Harry C. Roque -> hcroque@domain; duplicates get hcroque1, hcroque2...
export async function generateStudentEmail(app, domain) {
  const base = clean(app.first_name).charAt(0) + clean(app.middle_name).charAt(0) + clean(app.last_name);
  const enrolled = await base44.entities.Application.filter({ status: 'enrolled' }, '-created_date', 1000);
  const taken = new Set(enrolled.map((a) => a.student_email));
  let n = 0;
  let email = `${base}@${domain}`;
  while (taken.has(email)) {
    n += 1;
    email = `${base}${n}@${domain}`;
  }
  return email;
}
