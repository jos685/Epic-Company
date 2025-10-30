import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot', // Special rules for Google
        allow: '/',
        disallow: ['/api/', '/admin/'],
        crawlDelay: 1, // Be nice to servers
      },
    ],
    sitemap: [
      'https://epicsoftwares.shop/sitemap.xml',
      // Add more sitemaps if you have them
    ],
    host: 'https://epicsoftwares.shop', // Preferred domain
  }
}