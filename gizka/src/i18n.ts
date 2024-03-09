import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['fr'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const messages = {
    ...(await import(`@/public/locales/${locale}/scenarios.json`)).default,
    ...(await import(`@/public/locales/${locale}/moves.json`)).default,
  };

  return { messages };
});
