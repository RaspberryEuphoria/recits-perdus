import './global.css';

import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Layout } from '@/components/Layout';
import AppleTouchIcon from '@/public/images/favicon/apple-touch-icon.png';
import Favicon16x16 from '@/public/images/favicon/favicon-16x16.png';
import Favicon32x32 from '@/public/images/favicon/favicon-32x32.png';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: Favicon32x32.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: Favicon16x16.src,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: AppleTouchIcon.src,
    },
  ],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale="fr" timeZone="Europe/France" messages={messages}>
        {/* <head>
          <link rel="apple-touch-icon" sizes="180x180" href={AppleTouchIcon.src} />
          <link rel="icon" type="image/png" sizes="32x32" href={Favicon32x32.src} />
          <link rel="icon" type="image/png" sizes="16x16" href={Favicon16x16.src} />
          <link rel="mask-icon" href={SafariPinnedTab.src} color="#5bbad5" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head> */}
        <body>
          <Layout>{children}</Layout>
          {/* <Layout footer={pageProps.footer}>{children}</Layout> */}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
