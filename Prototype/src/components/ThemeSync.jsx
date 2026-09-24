import { useEffect } from 'react';
import { useSiteSettings } from '@/lib/useSiteSettings';

export default function ThemeSync() {
  const { settings } = useSiteSettings();
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--gold', settings.gold_color);
    root.setProperty('--navy', settings.navy_color);
  }, [settings.gold_color, settings.navy_color]);
  return null;
}
