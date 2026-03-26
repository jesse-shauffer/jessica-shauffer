/**
 * schema.ts — Single source of truth for all JSON-LD structured data
 *
 * Rules:
 * - ONE RealEstateAgent entity emitted site-wide (homepage only via buildAgentSchema)
 * - All other pages reference the agent by URL only — no duplicate LocalBusiness/Organization
 * - Reviews nested inside the parent entity have NO itemReviewed (they inherit context)
 * - itemReviewed is only used on standalone Review schemas (not used here)
 */

import type { SanityReview } from './sanity';

/* ─────────────────────────────────────────────
   AGENT CONSTANTS — edit once, applies everywhere
───────────────────────────────────────────── */
export const AGENT = {
  name: 'Jessica Shauffer',
  url: 'https://www.jessicashauffer.com',
  image: 'https://www.jessicashauffer.com/assets/jessica.jpg',
  telephone: '+16179491046',
  email: 'Jessica.Shauffer@nemoves.com',
  jobTitle: 'Real Estate Agent',
  award: 'Coldwell Banker Presidents Circle — Top 3% of Agents Globally',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '159 Belmont St #1175',
    addressLocality: 'South Easton',
    addressRegion: 'MA',
    postalCode: '02375',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.0501,
    longitude: -71.1006,
  },
  sameAs: [
    'https://www.coldwellbankerhomes.com/ma/south-easton/agent/jessica-shauffer/aid_1095428/',
    'https://www.zillow.com/profile/JessicaShauffer',
    'https://www.linkedin.com/in/jessica-shauffer',
    'https://www.facebook.com/JessicaShaufferRealEstate',
  ],
  worksFor: [
    { '@type': 'Organization', name: 'Weinstein Keach Group', url: 'https://weinsteinkeach.com' },
    { '@type': 'Organization', name: 'Coldwell Banker Realty', url: 'https://www.coldwellbanker.com' },
  ],
  areaServed: [
    { '@type': 'City', name: 'North Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'South Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'West Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'East Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'Canton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Sharon', addressRegion: 'MA' },
    { '@type': 'City', name: 'Raynham', addressRegion: 'MA' },
    { '@type': 'City', name: 'Taunton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Plymouth', addressRegion: 'MA' },
    { '@type': 'City', name: 'Norton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Mansfield', addressRegion: 'MA' },
    { '@type': 'City', name: 'Foxborough', addressRegion: 'MA' },
    { '@type': 'City', name: 'Attleboro', addressRegion: 'MA' },
    { '@type': 'City', name: 'Halifax', addressRegion: 'MA' },
    { '@type': 'City', name: 'Kingston', addressRegion: 'MA' },
    { '@type': 'City', name: 'Lakeville', addressRegion: 'MA' },
    { '@type': 'City', name: 'Middleborough', addressRegion: 'MA' },
    { '@type': 'City', name: 'Stoughton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Hingham', addressRegion: 'MA' },
    { '@type': 'City', name: 'Norwood', addressRegion: 'MA' },
    { '@type': 'City', name: 'Weston', addressRegion: 'MA' },
    { '@type': 'City', name: 'Westwood', addressRegion: 'MA' },
    { '@type': 'City', name: 'North Attleborough', addressRegion: 'MA' },
  ],
  priceRange: '$$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '16:00' },
  ],
};

/* ─────────────────────────────────────────────
   FULL AGENT SCHEMA — emitted ONCE on homepage only
   Includes aggregateRating + nested reviews (no itemReviewed needed)
───────────────────────────────────────────── */
export function buildAgentSchema(reviews: SanityReview[]) {
  const googleReviews = reviews.filter((r) => r.source === 'google');
  const reviewCount = googleReviews.length || 19;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${AGENT.url}/#agent`,
    ...AGENT,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    // Reviews nested inside the parent entity — no itemReviewed needed,
    // Google infers the reviewed entity from the parent context.
    review: googleReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating ?? 5),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: r.text,
    })),
  };
}

/* ─────────────────────────────────────────────
   BREADCRUMB HELPER — used on every page
───────────────────────────────────────────── */
export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${AGENT.url}/` },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  };
}

/* ─────────────────────────────────────────────
   WEBSITE SCHEMA — emitted ONCE on homepage only
───────────────────────────────────────────── */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jessica Shauffer Real Estate',
  url: AGENT.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${AGENT.url}/communities?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};
