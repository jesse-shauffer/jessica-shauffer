import type { MetadataRoute } from 'next';

const COMMUNITY_SLUGS = [
  'north-easton', 'south-easton', 'easton', 'bridgewater', 'west-bridgewater',
  'east-bridgewater', 'canton', 'sharon', 'raynham', 'taunton', 'plymouth',
  'norton', 'mansfield', 'foxborough', 'attleboro', 'halifax', 'kingston',
  'lakeville', 'middleborough', 'stoughton', 'hingham', 'norwood', 'weston',
  'westwood', 'north-attleborough',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jessicashauffer.com';

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/market`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/buyers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/sellers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/communities`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  const communityPages = COMMUNITY_SLUGS.map((slug) => ({
    url: `${base}/communities/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...communityPages];
}
