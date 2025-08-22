'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLanguage(newLocale: string) {
    // Sostituisci il segmento lingua nell'URL
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <div>
      <button disabled={currentLocale === 'it'} onClick={() => switchLanguage('it')}>IT</button>
      <button disabled={currentLocale === 'en'} onClick={() => switchLanguage('en')}>EN</button>
    </div>
  );
}
