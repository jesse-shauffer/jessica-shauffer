import { NextResponse } from 'next/server';

const COMMUNITY_SLUGS = [
  'north-easton', 'south-easton', 'easton', 'bridgewater', 'west-bridgewater',
  'east-bridgewater', 'canton', 'sharon', 'raynham', 'taunton', 'plymouth',
  'norton', 'mansfield', 'foxborough', 'attleboro', 'halifax', 'kingston',
  'lakeville', 'middleborough', 'stoughton', 'hingham', 'norwood', 'weston',
  'westwood', 'north-attleborough',
];

const COUNTY_SLUGS = ['bristol-county', 'norfolk-county', 'plymouth-county'];

export async function GET() {
  const base = 'https://www.jessicashauffer.com';
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: base, priority: '1.0', changefreq: 'weekly' },
    { url: `${base}/about`, priority: '0.8', changefreq: 'monthly' },
    { url: `${base}/market`, priority: '0.9', changefreq: 'weekly' },
    { url: `${base}/buyers`, priority: '0.8', changefreq: 'monthly' },
    { url: `${base}/sellers`, priority: '0.8', changefreq: 'monthly' },
    { url: `${base}/communities`, priority: '0.9', changefreq: 'monthly' },
    { url: `${base}/counties`, priority: '0.9', changefreq: 'monthly' },
    { url: `${base}/contact`, priority: '0.7', changefreq: 'monthly' },
    { url: `${base}/testimonials`, priority: '0.7', changefreq: 'monthly' },
  ];

  const countyPages = COUNTY_SLUGS.map((slug) => ({
    url: `${base}/counties/${slug}`,
    priority: '0.85',
    changefreq: 'monthly',
  }));

  const communityPages = COMMUNITY_SLUGS.map((slug) => ({
    url: `${base}/communities/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...countyPages, ...communityPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    ({ url, priority, changefreq }) =>
      `  <url>\n    <loc>${url}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
