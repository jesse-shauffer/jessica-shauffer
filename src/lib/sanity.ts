import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zrerdn9o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ── Types ── */
export interface SanityReview {
  _id: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  date: string;
  source?: string;
}

export interface SanityNeighborhood {
  _id: string;
  name: string;
  slug: { current: string };
  zipCode?: string;
  tagline: string;
  heroTitle: string;
  heroDesc: string;
  heroImage: SanityImageSource | string;
  description: string[];
  highlights: { icon: string; title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
}

/* ── Queries ── */
const neighborhoodFields = `
  _id, name, slug, zipCode, tagline,
  heroTitle, heroDesc, heroImage,
  description, highlights[]{ icon, title, description },
  metaTitle, metaDescription
`;

/** Resolve a heroImage field to a URL string — handles both legacy string paths and Sanity image objects */
export function resolveHeroImage(heroImage: SanityImageSource | string | undefined, width = 1200): string {
  if (!heroImage) return '/assets/eastondale.webp';
  if (typeof heroImage === 'string') return heroImage;
  return urlFor(heroImage).width(width).auto('format').quality(80).url();
}

export async function getAllNeighborhoods(): Promise<SanityNeighborhood[]> {
  return client.fetch(
    `*[_type == "neighborhood"] | order(name asc) { ${neighborhoodFields} }`
  );
}

export async function getNeighborhoodBySlug(slug: string): Promise<SanityNeighborhood | null> {
  return client.fetch(
    `*[_type == "neighborhood" && slug.current == $slug][0] { ${neighborhoodFields} }`,
    { slug }
  );
}

export async function getAllNeighborhoodSlugs(): Promise<string[]> {
  const result = await client.fetch<{ current: string }[]>(
    `*[_type == "neighborhood"].slug`
  );
  return result.map((s) => s.current);
}

export async function getOtherNeighborhoods(currentSlug: string) {
  return client.fetch<{ slug: string; name: string; tagline: string; image: SanityImageSource | string }[]>(
    `*[_type == "neighborhood" && slug.current != $slug] | order(name asc) {
      "slug": slug.current,
      name,
      tagline,
      "image": heroImage
    }`,
    { slug: currentSlug }
  );
}

/* ── County Types & Queries ── */
export interface SanityCounty {
  _id: string;
  name: string;
  slug: { current: string };
  state?: string;
  tagline?: string;
  heroTitle?: string;
  heroDesc?: string;
  heroImage?: SanityImageSource | string;
  description?: string[];
  highlights?: { icon: string; title: string; description: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

const countyFields = `
  _id, name, slug, state, tagline,
  heroTitle, heroDesc, heroImage,
  description, highlights[]{ icon, title, description },
  metaTitle, metaDescription
`;

export async function getAllCounties(): Promise<SanityCounty[]> {
  return client.fetch(
    `*[_type == "county"] | order(name asc) { ${countyFields} }`
  );
}

export async function getCountyBySlug(slug: string): Promise<SanityCounty | null> {
  return client.fetch(
    `*[_type == "county" && slug.current == $slug][0] { ${countyFields} }`,
    { slug }
  );
}

export async function getAllCountySlugs(): Promise<string[]> {
  const result = await client.fetch<{ current: string }[]>(
    `*[_type == "county"].slug`
  );
  return result.map((s) => s.current);
}

export async function getNeighborhoodsByCounty(countyId: string) {
  return client.fetch<{ slug: string; name: string; tagline: string; zipCode: string; image: SanityImageSource | string }[]>(
    `*[_type == "neighborhood" && county._ref == $countyId] | order(name asc) {
      "slug": slug.current,
      name,
      tagline,
      zipCode,
      "image": heroImage
    }`,
    { countyId }
  );
}

/* ── Review Queries ── */
export async function getAllReviews(): Promise<SanityReview[]> {
  return client.fetch(
    `*[_type == "review"] | order(date desc) { _id, author, role, rating, text, date, source }`
  );
}

/** Alias used by homepage and other pages */
export const getReviews = getAllReviews;
