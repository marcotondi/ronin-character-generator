import { getRequestConfig, type RequestConfig } from 'next-intl/server';

// Funzione helper per import dinamico dei messaggi
function loadMessages(locale: string): Record<string, any> {
  switch (locale) {
    case 'it':
      return require('./lib/locales/it.json');
    case 'en':
      return require('./lib/locales/en.json');
    // aggiungi altri casi se hai altre lingue
    default:
      return require('./lib/locales/it.json');
  }
}

export default getRequestConfig(({ locale }): RequestConfig => {
  const resolvedLocale = locale ?? 'it'; // Imposta 'it' come lingua predefinita se locale non è definito
  return {
    locale: resolvedLocale,
    messages: loadMessages(resolvedLocale)
  };
});
