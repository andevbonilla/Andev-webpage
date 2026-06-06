import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Andrés Bonilla - Andev Portfolio',
    short_name: 'Andev',
    description: 'Andrés Bonilla Personal Portfolio - Software Developer & Entrepreneur',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F193B',
    theme_color: '#0F193B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
