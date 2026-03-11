import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zrerdn9o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

/* ── Types ── */
export interface SanityNeighborhood {
  _id: string;
  name: string;
  slug: { current: string };
  zipCode?: string;
  tagline: string;
  heroTitle: string;
  heroDesc: string;
  heroImage: string;
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
  return client.fetch<{ slug: string; name: string; tagline: string; image: string }[]>(
    `*[_type == "neighborhood" && slug.current != $slug] | order(name asc) {
      "slug": slug.current,
      name,
      tagline,
      "image": heroImage
    }`,
    { slug: currentSlug }
  );
}
