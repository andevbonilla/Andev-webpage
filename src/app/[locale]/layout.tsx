// app/[locale]/layout.tsx
import '../globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import {
  getMessages,
  getTranslations
} from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

/**
 * Dinamiza la metadata por idioma.
 * Se ejecuta en el servidor, por lo que no pesa en el bundle del cliente.
 */
export async function generateMetadata(
  { params }: LayoutProps
): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const BASE_URL = 'https://andevbonilla.com';

  const ogImage = `${BASE_URL}/og/andev-web.jpg`;

  return {
    title: {
      default: t('title'),              
      template: `%s | ${t('title')}` 
    },
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'x-default': BASE_URL,
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        fr: `${BASE_URL}/fr`,
        de: `${BASE_URL}/de`,
        pt: `${BASE_URL}/pt`,
        ru: `${BASE_URL}/ru`,
        zh: `${BASE_URL}/zh`,
        ja: `${BASE_URL}/ja`,
        hi: `${BASE_URL}/hi`
      }
    },

    openGraph: {
      title:       t('title'),
      description: t('description'),
      url:         `${BASE_URL}/${locale}`,
      siteName:    'Andev',
      locale,
      type:        'website',
      images: [{
        url:    ogImage,
        width:  1200,
        height: 630,
        alt:    t('title')
      }]
    },

    twitter: {
      card:        'summary_large_image',
      title:       t('title'),
      description: t('description'),
      creator:     '@andevbonilla',  
      images:      [ogImage]
    },

    robots: {
      index:  true,
      follow: true
    },

    metadataBase: new URL(BASE_URL)
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LayoutProps) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const BASE_URL = 'https://andevbonilla.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrés Bonilla',
    alternateName: 'Andev',
    url: BASE_URL,
    image: `${BASE_URL}/og/andev-web.jpg`,
    logo: `${BASE_URL}/og/andev-web.jpg`,
    sameAs: [
      'https://github.com/andevbonilla',
      'https://www.linkedin.com/in/andevbonilla',
      'https://www.instagram.com/andevbonilla',
      'https://www.tiktok.com/@mugre.fit'
    ],
    jobTitle: 'Software Developer & Entrepreneur',
    description: t('description'),
    knowsAbout: [
      'Software Development',
      'Web Development',
      'Entrepreneurship',
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS'
    ]
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
