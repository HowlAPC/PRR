import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export const DEFAULT_SETTINGS = {
  school_name: 'Asia Pacific College',
  motto: 'Real Projects. Real Learning.',
  headline: 'Your industry-based learning begins here!',
  welcome_title: 'Welcome to Asia Pacific College!',
  welcome_text: 'Your first step to dedication to improve your career starts here. Your pursuit for learning, passion for knowledge, creativity, commitment, and need for advancing education will bring you closer to your goals.',
  update_text: 'We are now accepting applications for Term 1 Academic Year 2026-2027.',
  schedule_title: 'Schedule',
  gold_color: '#F2B705',
  navy_color: '#0B1F3A',
  background_style: 'waves',
  background_image: '',
  hero_image: '',
  footer_text: '© 2026 Asia Pacific College. All rights reserved.',
  privacy_notice: 'APC collects and maintains personal data as part of its records management process in accordance with Republic Act 10173, or the Data Privacy Act (DPA) of 2012. Likewise, APC adheres to the general principles of transparency, legitimate purpose, and proportionality in the processing of personal data and information (Rule IV. Sec. 18, IRR, DPA of 2012).\n\nFor more details about the APC Data Privacy Policy you may visit www.apc.edu.ph.',
  privacy_consent: 'I have read and understood the collection, processing, and management of my personal data along with the policies and guidelines stated in the Asia Pacific College Data Privacy Policy. Likewise, I express adherence to the rules and regulations of Asia Pacific College without hesitation and reservation. I further understand that APC reserves the right to amend all, or in part, the provisions in these guidelines.',
  reservation_fee: 5000,
  student_email_domain: 'apc.edu.ph',
};

export function useSiteSettings() {
  const query = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const rows = await base44.entities.SiteSettings.list('-created_date', 1);
      return rows[0] ? { ...DEFAULT_SETTINGS, ...rows[0] } : DEFAULT_SETTINGS;
    },
  });
  return { settings: query.data || DEFAULT_SETTINGS, isLoading: query.isLoading };
}

export async function saveSiteSettings(patch) {
  const clean = Object.fromEntries(Object.keys(DEFAULT_SETTINGS).filter((k) => k in patch).map((k) => [k, patch[k]]));
  const rows = await base44.entities.SiteSettings.list('-created_date', 1);
  if (rows[0]) return base44.entities.SiteSettings.update(rows[0].id, clean);
  return base44.entities.SiteSettings.create(clean);
}
