import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'de', 'es', 'fr', 'hi', 'ja', 'pt', 'ru', 'zh'];
  const BASE_URL = 'https://andevbonilla.com';

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${BASE_URL}/${locale}`])
        ),
      },
    },
    ...locales.map((locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
    })),
  ];
}
