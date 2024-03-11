import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = {
    ...(await import(`@/public/locales/${locale}/scenarios.json`)).default,
    ...(await import(`@/public/locales/${locale}/moves.json`)).default,
  };

  return { messages };
});
