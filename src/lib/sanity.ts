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

/* ── Static fallback data for all 25 service-area towns ── */
const STATIC_TOWNS: Record<string, Omit<SanityNeighborhood, '_id'>> = {
  'easton': { name: 'Easton', slug: { current: 'easton' }, tagline: 'Historic charm meets suburban convenience', heroTitle: 'Living in Easton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Easton, MA.', heroImage: '/assets/hero.webp', description: ['Easton is a highly sought-after community in Bristol County, Massachusetts, known for its historic Richardson architecture, excellent schools, and strong sense of community. The town offers a perfect blend of suburban tranquility and convenient access to Boston and Providence.', 'The Easton real estate market features a diverse range of properties, from historic colonial homes to new construction developments. With top-rated schools, beautiful parks, and a vibrant town center, Easton continues to attract families and professionals alike.'], highlights: [], metaTitle: 'Easton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Easton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'north-easton': { name: 'North Easton', slug: { current: 'north-easton' }, tagline: 'Historic village, Richardson architecture', heroTitle: 'Living in North Easton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in North Easton, MA.', heroImage: '/assets/hero.webp', description: ['North Easton is a charming village within Easton, MA, renowned for its stunning collection of H.H. Richardson-designed buildings. The village center features beautiful historic architecture alongside excellent dining and shopping options.', 'The North Easton real estate market offers a mix of historic homes and updated properties. Its walkable village center, strong community ties, and proximity to top employers make it one of the most desirable addresses on the South Shore.'], highlights: [], metaTitle: 'North Easton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in North Easton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'south-easton': { name: 'South Easton', slug: { current: 'south-easton' }, tagline: 'Family neighborhoods, new construction', heroTitle: 'Living in South Easton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in South Easton, MA.', heroImage: '/assets/hero.webp', description: ['South Easton offers a quieter, more residential feel within the town of Easton. Known for its family-friendly neighborhoods and newer construction developments, South Easton is a popular choice for buyers seeking modern homes with excellent schools.', 'The South Easton real estate market features a range of single-family homes and newer subdivisions. With easy access to Route 138 and major commuter routes, residents enjoy convenient connections to Boston and Providence.'], highlights: [], metaTitle: 'South Easton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in South Easton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'canton': { name: 'Canton', slug: { current: 'canton' }, tagline: 'Top-rated schools, strong appreciation', heroTitle: 'Living in Canton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Canton, MA.', heroImage: '/assets/hero.webp', description: ['Canton is one of Norfolk County\'s most desirable communities, consistently ranked among the top towns in Massachusetts for its excellent public schools, strong community programs, and beautiful natural surroundings including the Blue Hills Reservation.', 'The Canton real estate market has seen strong appreciation, driven by demand from Boston-area professionals seeking top-rated schools and convenient commuter access via Route 128 and the Canton Junction commuter rail station.'], highlights: [], metaTitle: 'Canton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Canton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'sharon': { name: 'Sharon', slug: { current: 'sharon' }, tagline: 'Lake living, award-winning schools', heroTitle: 'Living in Sharon, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Sharon, MA.', heroImage: '/assets/hero.webp', description: ['Sharon is a picturesque town in Norfolk County known for its beautiful lake, Massapoag Lake, award-winning public schools, and strong community spirit. The town offers a peaceful, nature-rich environment while maintaining easy access to Boston via the commuter rail.', 'Sharon real estate offers a diverse range of properties from lakefront homes to classic New England colonials. The town\'s top-rated schools and low crime rate make it especially popular with families.'], highlights: [], metaTitle: 'Sharon, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Sharon, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'stoughton': { name: 'Stoughton', slug: { current: 'stoughton' }, tagline: 'Affordable entry point, great commuter access', heroTitle: 'Living in Stoughton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Stoughton, MA.', heroImage: '/assets/hero.webp', description: ['Stoughton is a welcoming community in Norfolk County offering an affordable entry point into the South Shore real estate market. With direct commuter rail access to Boston and a strong local economy, Stoughton is an attractive option for first-time buyers and investors.', 'The Stoughton real estate market features a mix of single-family homes, condominiums, and multi-family properties at competitive price points. The town\'s ongoing revitalization and strong community programs continue to drive demand.'], highlights: [], metaTitle: 'Stoughton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Stoughton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'norwood': { name: 'Norwood', slug: { current: 'norwood' }, tagline: 'Thriving downtown, excellent highway access', heroTitle: 'Living in Norwood, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Norwood, MA.', heroImage: '/assets/hero.webp', description: ['Norwood is a vibrant town in Norfolk County with a thriving downtown, excellent highway access via Route 1 and I-95, and a strong local business community. The town offers a diverse range of housing options and a welcoming community atmosphere.', 'Norwood real estate is known for its value relative to neighboring towns, making it an attractive option for buyers seeking convenient access to Boston and Providence without the premium price tag of some surrounding communities.'], highlights: [], metaTitle: 'Norwood, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Norwood, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'westwood': { name: 'Westwood', slug: { current: 'westwood' }, tagline: 'Prestigious address, top schools', heroTitle: 'Living in Westwood, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Westwood, MA.', heroImage: '/assets/hero.webp', description: ['Westwood is one of Norfolk County\'s most prestigious communities, known for its exceptional public schools, beautiful neighborhoods, and convenient location along Route 128. The town consistently ranks among the best places to live in Massachusetts.', 'Westwood real estate commands premium prices reflecting the town\'s top-ranked schools, low crime rate, and desirable location. Properties range from classic New England colonials to luxury estates.'], highlights: [], metaTitle: 'Westwood, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Westwood, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'foxborough': { name: 'Foxborough', slug: { current: 'foxborough' }, tagline: 'Home of Gillette Stadium, growing market', heroTitle: 'Living in Foxborough, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Foxborough, MA.', heroImage: '/assets/hero.webp', description: ['Foxborough is best known as the home of Gillette Stadium and the New England Patriots, but it is also a thriving residential community with excellent schools, beautiful conservation land, and a growing real estate market.', 'Foxborough real estate offers excellent value with a mix of single-family homes, new construction, and condominiums. The town\'s strong school system and convenient highway access make it a popular choice for families.'], highlights: [], metaTitle: 'Foxborough, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Foxborough, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'mansfield': { name: 'Mansfield', slug: { current: 'mansfield' }, tagline: 'Growing market with excellent highway access', heroTitle: 'Living in Mansfield, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Mansfield, MA.', heroImage: '/assets/hero.webp', description: ['Mansfield is a dynamic community in Bristol County at the intersection of I-95 and I-495, making it one of the most accessible towns in Eastern Massachusetts. The town offers excellent schools, a vibrant town center, and a growing real estate market.', 'Mansfield real estate has seen strong appreciation driven by its strategic location and excellent quality of life. The town offers a range of housing options from starter homes to executive properties.'], highlights: [], metaTitle: 'Mansfield, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Mansfield, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'norton': { name: 'Norton', slug: { current: 'norton' }, tagline: 'Affordable homes near Wheaton College', heroTitle: 'Living in Norton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Norton, MA.', heroImage: '/assets/norton.webp', description: ['Norton is a welcoming community in Bristol County home to Wheaton College and offering an affordable entry into the South Shore real estate market. The town features beautiful natural areas, strong community programs, and convenient highway access.', 'Norton real estate offers excellent value with a range of single-family homes and newer developments. The town\'s growing popularity and improving amenities continue to drive appreciation.'], highlights: [], metaTitle: 'Norton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Norton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'raynham': { name: 'Raynham', slug: { current: 'raynham' }, tagline: 'Family-friendly with strong value', heroTitle: 'Living in Raynham, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Raynham, MA.', heroImage: '/assets/hero.webp', description: ['Raynham is a family-friendly community in Bristol County offering strong value in the South Shore real estate market. The town features excellent schools, beautiful conservation land, and convenient access to Route 44 and I-495.', 'Raynham real estate offers a mix of single-family homes at competitive price points. The town\'s strong community spirit and improving amenities make it an increasingly popular choice for buyers.'], highlights: [], metaTitle: 'Raynham, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Raynham, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'bridgewater': { name: 'Bridgewater', slug: { current: 'bridgewater' }, tagline: 'College town with broad appeal', heroTitle: 'Living in Bridgewater, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Bridgewater, MA.', heroImage: '/assets/hero.webp', description: ['Bridgewater is a vibrant community in Plymouth County home to Bridgewater State University. The town offers a diverse range of housing options, excellent recreational amenities, and convenient access to Boston via Route 24.', 'Bridgewater real estate offers excellent value with strong rental demand driven by the university. The town\'s growing economy and improving infrastructure continue to attract buyers and investors.'], highlights: [], metaTitle: 'Bridgewater, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Bridgewater, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'west-bridgewater': { name: 'West Bridgewater', slug: { current: 'west-bridgewater' }, tagline: 'Small-town feel, big opportunity', heroTitle: 'Living in West Bridgewater, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in West Bridgewater, MA.', heroImage: '/assets/hero.webp', description: ['West Bridgewater is a charming small town in Plymouth County offering a peaceful residential environment with convenient access to major employment centers. The town features excellent schools, beautiful conservation land, and a strong sense of community.', 'West Bridgewater real estate offers excellent value with a range of single-family homes. The town\'s low density and rural character appeal to buyers seeking a quieter lifestyle without sacrificing convenience.'], highlights: [], metaTitle: 'West Bridgewater, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in West Bridgewater, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'east-bridgewater': { name: 'East Bridgewater', slug: { current: 'east-bridgewater' }, tagline: 'Quiet residential with growing demand', heroTitle: 'Living in East Bridgewater, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in East Bridgewater, MA.', heroImage: '/assets/hero.webp', description: ['East Bridgewater is a quiet residential community in Plymouth County offering a peaceful suburban lifestyle with convenient access to Route 18 and Route 106. The town features excellent schools and a strong sense of community.', 'East Bridgewater real estate offers competitive pricing with a range of single-family homes. Growing demand from Boston-area buyers seeking more space and value continues to drive appreciation.'], highlights: [], metaTitle: 'East Bridgewater, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in East Bridgewater, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'taunton': { name: 'Taunton', slug: { current: 'taunton' }, tagline: 'The Silver City — diverse and growing', heroTitle: 'Living in Taunton, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Taunton, MA.', heroImage: '/assets/hero.webp', description: ['Taunton, known as the Silver City, is Bristol County\'s county seat and a growing urban center with a rich history and diverse community. The city offers excellent value in the real estate market with strong appreciation driven by ongoing revitalization efforts.', 'Taunton real estate offers a wide range of properties at competitive prices, from historic downtown buildings to suburban single-family homes. The city\'s strategic location at the intersection of Routes 44, 138, and 140 makes it highly accessible.'], highlights: [], metaTitle: 'Taunton, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Taunton, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'attleboro': { name: 'Attleboro', slug: { current: 'attleboro' }, tagline: 'Commuter-friendly with urban amenities', heroTitle: 'Living in Attleboro, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Attleboro, MA.', heroImage: '/assets/hero.webp', description: ['Attleboro is a thriving city in Bristol County with direct commuter rail access to Boston and Providence. The city offers a diverse range of housing options, excellent shopping and dining, and a growing economy driven by healthcare and manufacturing sectors.', 'Attleboro real estate offers excellent value with strong rental demand and appreciation. The city\'s commuter rail station and highway access make it attractive to Boston-area buyers seeking affordability.'], highlights: [], metaTitle: 'Attleboro, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Attleboro, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'north-attleborough': { name: 'North Attleborough', slug: { current: 'north-attleborough' }, tagline: 'Strong schools and community feel', heroTitle: 'Living in North Attleborough, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in North Attleborough, MA.', heroImage: '/assets/hero.webp', description: ['North Attleborough is a welcoming community in Bristol County known for its excellent schools, strong community programs, and convenient location near the Rhode Island border. The town offers a range of housing options at competitive prices.', 'North Attleborough real estate has seen consistent appreciation driven by its strong school system and quality of life. The town\'s proximity to Providence and Boston via I-95 makes it an attractive option for commuters.'], highlights: [], metaTitle: 'North Attleborough, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in North Attleborough, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'hingham': { name: 'Hingham', slug: { current: 'hingham' }, tagline: 'Coastal elegance, top-tier schools', heroTitle: 'Living in Hingham, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Hingham, MA.', heroImage: '/assets/hero.webp', description: ['Hingham is one of the South Shore\'s most prestigious coastal communities, offering stunning harbor views, a charming historic downtown, and some of the region\'s top-rated public schools. The town\'s ferry service to Boston makes it especially popular with professionals.', 'Hingham real estate commands premium prices reflecting the town\'s exceptional quality of life, waterfront properties, and top-ranked schools. The market features everything from historic colonials to luxury waterfront estates.'], highlights: [], metaTitle: 'Hingham, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Hingham, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'plymouth': { name: 'Plymouth', slug: { current: 'plymouth' }, tagline: 'America\'s Hometown — coastal living', heroTitle: 'Living in Plymouth, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Plymouth, MA.', heroImage: '/assets/hero.webp', description: ['Plymouth, America\'s Hometown, is Plymouth County\'s largest town offering a unique blend of rich history, beautiful coastline, and a growing real estate market. The town features stunning ocean views, excellent golf courses, and a vibrant downtown waterfront.', 'Plymouth real estate offers diverse options from oceanfront estates to affordable single-family homes and new construction communities. The town\'s growing popularity with retirees and remote workers continues to drive strong appreciation.'], highlights: [], metaTitle: 'Plymouth, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Plymouth, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'kingston': { name: 'Kingston', slug: { current: 'kingston' }, tagline: 'Coastal town with growing appeal', heroTitle: 'Living in Kingston, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Kingston, MA.', heroImage: '/assets/hero.webp', description: ['Kingston is a charming coastal town in Plymouth County offering beautiful waterfront areas, excellent schools, and a growing real estate market. The town\'s commuter rail station provides convenient access to Boston.', 'Kingston real estate offers a mix of waterfront properties, single-family homes, and new construction at competitive prices. The town\'s natural beauty and improving amenities continue to attract buyers from throughout the region.'], highlights: [], metaTitle: 'Kingston, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Kingston, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'halifax': { name: 'Halifax', slug: { current: 'halifax' }, tagline: 'Rural character, strong value', heroTitle: 'Living in Halifax, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Halifax, MA.', heroImage: '/assets/hero.webp', description: ['Halifax is a quiet rural community in Plymouth County offering a peaceful lifestyle with excellent value in the real estate market. The town features beautiful conservation land, Silver Lake Regional School District, and a strong sense of community.', 'Halifax real estate offers competitive pricing with a range of single-family homes on larger lots. Buyers seeking more space and a rural character without sacrificing convenience find Halifax an attractive option.'], highlights: [], metaTitle: 'Halifax, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Halifax, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'lakeville': { name: 'Lakeville', slug: { current: 'lakeville' }, tagline: 'Lakefront living, rural charm', heroTitle: 'Living in Lakeville, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Lakeville, MA.', heroImage: '/assets/hero.webp', description: ['Lakeville is a scenic community in Plymouth County known for its beautiful Long Pond and Assawompset Pond, which together form one of the largest freshwater ponds in Massachusetts. The town offers a peaceful rural lifestyle with convenient highway access.', 'Lakeville real estate features a mix of lakefront properties, rural estates, and single-family homes at competitive prices. The town\'s natural beauty and low density appeal to buyers seeking a quieter lifestyle.'], highlights: [], metaTitle: 'Lakeville, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Lakeville, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'middleborough': { name: 'Middleborough', slug: { current: 'middleborough' }, tagline: 'Growing community, commuter-friendly', heroTitle: 'Living in Middleborough, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Middleborough, MA.', heroImage: '/assets/hero.webp', description: ['Middleborough is one of Plymouth County\'s largest towns by area, offering a mix of rural character and growing suburban amenities. The town features a vibrant downtown, commuter rail access to Boston, and excellent value in the real estate market.', 'Middleborough real estate offers competitive pricing with a range of single-family homes, new construction, and rural properties. The town\'s ongoing growth and development continue to drive appreciation.'], highlights: [], metaTitle: 'Middleborough, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Middleborough, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
  'weston': { name: 'Weston', slug: { current: 'weston' }, tagline: 'Top-ranked schools, luxury estates', heroTitle: 'Living in Weston, MA', heroDesc: 'Discover homes for sale, market trends, and local lifestyle in Weston, MA.', heroImage: '/assets/hero.webp', description: ['Weston is consistently ranked among the wealthiest and most desirable communities in Massachusetts, known for its exceptional public schools, stunning estates, and beautiful conservation land. The town offers an exclusive residential environment with convenient access to Boston.', 'Weston real estate features luxury estates, historic properties, and high-end new construction at premium prices. The town\'s top-ranked schools and prestigious reputation make it one of the most sought-after addresses in Eastern Massachusetts.'], highlights: [], metaTitle: 'Weston, MA Real Estate & Homes for Sale | Jessica Shauffer', metaDescription: 'Explore real estate in Weston, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.' },
};

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
  return urlFor(heroImage).width(width).fit('max').auto('format').quality(80).url();
}

export async function getAllNeighborhoods(): Promise<SanityNeighborhood[]> {
  return client.fetch(
    `*[_type == "neighborhood"] | order(name asc) { ${neighborhoodFields} }`
  );
}

export async function getNeighborhoodBySlug(slug: string): Promise<SanityNeighborhood | null> {
  const result = await client.fetch<SanityNeighborhood | null>(
    `*[_type == "neighborhood" && slug.current == $slug][0] { ${neighborhoodFields} }`,
    { slug }
  );
  if (result) return result;
  // Fall back to static data so pages render even without a Sanity document
  const fallback = STATIC_TOWNS[slug];
  if (fallback) return { _id: `static-${slug}`, ...fallback };
  return null;
}

export async function getAllNeighborhoodSlugs(): Promise<string[]> {
  const result = await client.fetch<{ current: string }[]>(
    `*[_type == "neighborhood"].slug`
  );
  const sanitySlugs = result.map((s) => s.current);
  // Merge with all static town slugs so generateStaticParams covers every town
  const allSlugs = Array.from(new Set([...sanitySlugs, ...Object.keys(STATIC_TOWNS)]));
  return allSlugs;
}

// Maps each town slug to its county for county-aware nearby community ordering
export const TOWN_COUNTY_MAP: Record<string, string> = {
  // Bristol County
  'easton': 'bristol-county', 'north-easton': 'bristol-county', 'south-easton': 'bristol-county',
  'mansfield': 'bristol-county', 'norton': 'bristol-county', 'raynham': 'bristol-county',
  'taunton': 'bristol-county', 'attleboro': 'bristol-county', 'north-attleborough': 'bristol-county',
  'bridgewater': 'bristol-county', 'west-bridgewater': 'bristol-county', 'east-bridgewater': 'bristol-county',
  // Norfolk County
  'canton': 'norfolk-county', 'sharon': 'norfolk-county', 'norwood': 'norfolk-county',
  'westwood': 'norfolk-county', 'stoughton': 'norfolk-county', 'foxborough': 'norfolk-county',
  'weston': 'norfolk-county',
  // Plymouth County
  'plymouth': 'plymouth-county', 'hingham': 'plymouth-county', 'kingston': 'plymouth-county',
  'halifax': 'plymouth-county', 'lakeville': 'plymouth-county', 'middleborough': 'plymouth-county',
};

export async function getOtherNeighborhoods(currentSlug: string) {
  const results = await client.fetch<{ slug: string; name: string; tagline: string; image: SanityImageSource | string }[]>(
    `*[_type == "neighborhood" && slug.current != $slug] | order(name asc) {
      "slug": slug.current,
      name,
      tagline,
      "image": heroImage
    }`,
    { slug: currentSlug }
  );
  // Build the full list: prefer Sanity data, fall back to static towns
  const allOthers: { slug: string; name: string; tagline: string; image: SanityImageSource | string }[] =
    results && results.length > 0
      ? results
      : Object.entries(STATIC_TOWNS)
          .filter(([slug]) => slug !== currentSlug)
          .map(([slug, town]) => ({
            slug,
            name: town.name,
            tagline: town.tagline,
            image: town.heroImage,
          }));

  // Sort: same-county towns first (alphabetically), then other counties (alphabetically)
  const currentCounty = TOWN_COUNTY_MAP[currentSlug] || '';
  return allOthers.sort((a, b) => {
    const aCounty = TOWN_COUNTY_MAP[a.slug] || '';
    const bCounty = TOWN_COUNTY_MAP[b.slug] || '';
    const aSame = aCounty === currentCounty ? 0 : 1;
    const bSame = bCounty === currentCounty ? 0 : 1;
    if (aSame !== bSame) return aSame - bSame;
    return a.name.localeCompare(b.name);
  });
}

/* ── Static fallback data for the 3 counties ── */
const STATIC_COUNTIES: Record<string, Omit<SanityCounty, '_id'>> = {
  'bristol-county': {
    name: 'Bristol County',
    slug: { current: 'bristol-county' },
    state: 'MA',
    tagline: 'The heart of South Shore real estate',
    heroTitle: 'Bristol County, MA — Homes for Sale & Real Estate Guide',
    heroDesc: 'Explore real estate across Bristol County, MA — from Easton and Mansfield to Taunton and Attleboro. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    heroImage: '/assets/hero.webp',
    description: [
      'Bristol County is one of the most dynamic real estate markets in Eastern Massachusetts, encompassing a diverse range of communities from the historic villages of Easton to the growing urban centers of Taunton and Attleboro. With convenient access to both Boston and Providence via I-95 and I-495, Bristol County attracts buyers seeking value, strong schools, and a high quality of life.',
      'Jessica Shauffer brings deep local expertise to every Bristol County transaction. As a top-producing Coldwell Banker Presidents Circle agent, she serves communities including Easton, North Easton, South Easton, Mansfield, Norton, Raynham, Taunton, Attleboro, North Attleborough, and Foxborough — helping buyers and sellers navigate one of the region\'s most active markets.',
    ],
    highlights: [
      { icon: 'ph-map-pin', title: '10 Communities', description: 'From Easton to Attleboro, Bristol County covers a wide range of lifestyles and price points.' },
      { icon: 'ph-trend-up', title: 'Strong Appreciation', description: 'Bristol County has seen consistent home value growth driven by Boston-area demand and limited inventory.' },
      { icon: 'ph-train', title: 'Commuter Access', description: 'Multiple commuter rail lines and major highways connect Bristol County to Boston and Providence.' },
    ],
    metaTitle: 'Bristol County, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Bristol County, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
  'norfolk-county': {
    name: 'Norfolk County',
    slug: { current: 'norfolk-county' },
    state: 'MA',
    tagline: 'Prestigious schools, strong appreciation',
    heroTitle: 'Norfolk County, MA — Homes for Sale & Real Estate Guide',
    heroDesc: 'Explore real estate across Norfolk County, MA — from Canton and Sharon to Norwood and Westwood. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    heroImage: '/assets/hero.webp',
    description: [
      'Norfolk County is home to some of Eastern Massachusetts\' most prestigious communities, including Canton, Sharon, Westwood, and Norwood. Known for top-ranked public schools, strong home appreciation, and convenient access to Boston via Route 128 and the commuter rail, Norfolk County is a perennial favorite among families and professionals.',
      'Jessica Shauffer brings the same top-3% expertise and negotiation skills to Norfolk County that have made her a trusted name in Bristol County. Her knowledge of the local micro-markets — from the lakefront properties in Sharon to the executive homes of Westwood — ensures clients make informed decisions.',
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Norfolk County communities consistently rank among the best school districts in Massachusetts.' },
      { icon: 'ph-house-line', title: 'Premium Properties', description: 'From luxury estates in Westwood to family colonials in Canton, Norfolk County offers exceptional homes.' },
      { icon: 'ph-train', title: 'Boston Commuter Belt', description: 'Route 128 and multiple commuter rail stations make Norfolk County ideal for Boston professionals.' },
    ],
    metaTitle: 'Norfolk County, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Norfolk County, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
  'plymouth-county': {
    name: 'Plymouth County',
    slug: { current: 'plymouth-county' },
    state: 'MA',
    tagline: 'Coastal living meets suburban value',
    heroTitle: 'Plymouth County, MA — Homes for Sale & Real Estate Guide',
    heroDesc: 'Explore real estate across Plymouth County, MA — from Plymouth and Hingham to Bridgewater and Kingston. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    heroImage: '/assets/hero.webp',
    description: [
      'Plymouth County stretches from the coastal elegance of Hingham and Plymouth to the growing inland communities of Bridgewater and Middleborough. The county offers a remarkable diversity of real estate — from oceanfront estates and historic homes to affordable single-family properties and new construction developments.',
      'Jessica Shauffer serves Plymouth County buyers and sellers with the same dedication and market expertise that has earned her Presidents Circle status. Whether you\'re seeking a waterfront retreat in Plymouth, a family home in Kingston, or an investment property in Bridgewater, Jessica provides the data-driven guidance and tenacious negotiation you need.',
    ],
    highlights: [
      { icon: 'ph-waves', title: 'Coastal Communities', description: 'Plymouth County includes some of the South Shore\'s most beautiful coastal towns including Hingham and Plymouth.' },
      { icon: 'ph-currency-dollar', title: 'Diverse Price Points', description: 'From affordable inland towns to premium coastal properties, Plymouth County offers options for every budget.' },
      { icon: 'ph-tree', title: 'Natural Beauty', description: 'Extensive conservation land, ponds, and coastline make Plymouth County one of the most scenic areas in Massachusetts.' },
    ],
    metaTitle: 'Plymouth County, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Plymouth County, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
};

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
  const result = await client.fetch<SanityCounty | null>(
    `*[_type == "county" && slug.current == $slug][0] { ${countyFields} }`,
    { slug }
  );
  if (result) return result;
  // Fall back to static data so pages render even without a Sanity document
  const fallback = STATIC_COUNTIES[slug];
  if (fallback) return { _id: `static-${slug}`, ...fallback };
  return null;
}

export async function getAllCountySlugs(): Promise<string[]> {
  const result = await client.fetch<{ current: string }[]>(
    `*[_type == "county"].slug`
  );
  const sanitySlugs = result.map((s) => s.current);
  // Merge with static county slugs so generateStaticParams covers all 3 counties
  const allSlugs = Array.from(new Set([...sanitySlugs, ...Object.keys(STATIC_COUNTIES)]));
  return allSlugs;
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

/* ── Page CMS Types & Queries ── */
export interface SanityPage {
  _id: string;
  title: string;
  slug: { current: string };
  heroImage?: SanityImageSource | string;
  heroTitle?: string;
  heroDesc?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource | string;
}

/** Static fallbacks — used until a Sanity Page document is published */
const STATIC_PAGES: Record<string, Omit<SanityPage, '_id'>> = {
  home: {
    title: 'Home',
    slug: { current: 'home' },
    heroImage: '/assets/hero.webp',
    heroTitle: "Jessica Shauffer — Coldwell Banker's Top Agent for the South Shore",
    heroDesc: "South Shore & MetroWest's top-rated Coldwell Banker real estate agent serving 25 communities across Eastern Massachusetts.",
    metaTitle: "Jessica Shauffer — Coldwell Banker's Top Agent for the South Shore",
    metaDescription: "South Shore & MetroWest's top-rated Coldwell Banker real estate agent. Jessica Shauffer serves 25 communities across Eastern Massachusetts including Easton, Canton, Sharon, Plymouth, Hingham, and more.",
    ogImage: '/assets/hero.webp',
  },
  market: {
    title: 'Market',
    slug: { current: 'market' },
    heroImage: '/assets/market-aerial.webp',
    heroTitle: 'South Shore & MetroWest MA Real Estate Market Data',
    heroDesc: 'Current housing market data for the South Shore and MetroWest MA. Expert analysis, median home values, and trends.',
    metaTitle: 'South Shore & MetroWest MA Real Estate Market Data — Jessica Shauffer',
    metaDescription: 'Current housing market data for the South Shore and MetroWest MA. Get expert analysis, median home values, and trends for Plymouth, Easton, Canton, and more.',
    ogImage: '/assets/jessica.jpg',
  },
  buyers: {
    title: 'Buyers',
    slug: { current: 'buyers' },
    heroImage: '/assets/buyers-hero.webp',
    heroTitle: 'Buy a Home on the South Shore & MetroWest MA',
    heroDesc: 'Expert buyer representation across 25 communities in Eastern Massachusetts. Find your perfect home with Jessica Shauffer.',
    metaTitle: 'Buy a Home in South Shore & MetroWest MA — Jessica Shauffer',
    metaDescription: 'Find your perfect home with Jessica Shauffer, top 3% Coldwell Banker agent. Expert buyer representation across Plymouth, Easton, Canton, and 25+ South Shore communities.',
    ogImage: '/assets/jessica.jpg',
  },
  sellers: {
    title: 'Sellers',
    slug: { current: 'sellers' },
    heroImage: '/assets/market-neighborhood.webp',
    heroTitle: 'Sell Your Home in South Shore & MetroWest MA',
    heroDesc: 'Sell your home for top dollar with expert pricing, staging, and digital marketing across 25+ local towns.',
    metaTitle: 'Sell Your Home in South Shore & MetroWest MA — Jessica Shauffer',
    metaDescription: 'Sell your home for top dollar with Jessica Shauffer. Expert pricing, staging, and digital marketing across Plymouth, Canton, Easton, and 25+ local towns.',
    ogImage: '/assets/market-neighborhood.webp',
  },
  about: {
    title: 'About',
    slug: { current: 'about' },
    heroImage: '/assets/hero.webp',
    heroTitle: 'About Jessica Shauffer',
    heroDesc: 'Top-producing Coldwell Banker Presidents Circle agent serving 25 communities across the South Shore, MetroWest, and Bristol County, MA.',
    metaTitle: 'About Jessica Shauffer — Top Real Estate Agent, South Shore & MetroWest MA',
    metaDescription: "Meet Jessica Shauffer — a top-producing Coldwell Banker Presidents Circle agent and member of the Weinstein Keach Group, serving 25 communities across the South Shore, MetroWest, and Bristol County, MA.",
    ogImage: '/assets/jessica.jpg',
  },
  contact: {
    title: 'Contact',
    slug: { current: 'contact' },
    heroImage: '/assets/consultation.webp',
    heroTitle: 'Contact Jessica Shauffer',
    heroDesc: "Ready to make a move? Let's talk. Book a free consultation or reach out directly.",
    metaTitle: 'Contact Jessica Shauffer — Easton, MA Real Estate Agent',
    metaDescription: 'Book a free consultation with Jessica Shauffer, Coldwell Banker Presidents Circle agent. Call (617) 949-1046 or schedule online.',
    ogImage: '/assets/jessica.jpg',
  },
  testimonials: {
    title: 'Testimonials',
    slug: { current: 'testimonials' },
    heroImage: '/assets/jessica.jpg',
    heroTitle: 'Client Reviews & Testimonials',
    heroDesc: 'Verified 5-star reviews from real buyers and sellers across 25 Eastern Massachusetts communities.',
    metaTitle: 'Client Reviews & Testimonials — Jessica Shauffer, South Shore MA Real Estate',
    metaDescription: 'Read verified 5-star reviews from buyers and sellers who worked with Jessica Shauffer across the South Shore, MetroWest, and Bristol County, MA. Top 3% Coldwell Banker agent.',
    ogImage: '/assets/jessica.jpg',
  },
  communities: {
    title: 'Communities',
    slug: { current: 'communities' },
    heroImage: '/assets/park.webp',
    heroTitle: 'Explore Communities Across Eastern Massachusetts',
    heroDesc: 'Browse 25 towns across the South Shore, MetroWest, and Bristol County. Find market data, local highlights, and homes for sale.',
    metaTitle: 'Communities in South Shore & MetroWest MA | Jessica Shauffer',
    metaDescription: 'Explore 25 communities across the South Shore, MetroWest, and Bristol County, MA. Find homes, market data, and local insights with top agent Jessica Shauffer.',
    ogImage: '/assets/park.webp',
  },
  calculators: {
    title: 'Mortgage Calculator',
    slug: { current: 'calculators' },
    heroImage: '/assets/buyers-hero.webp',
    heroTitle: 'Mortgage Calculator',
    heroDesc: 'Estimate your monthly payment in seconds. Adjust home price, down payment, rate, and term to see how it affects your budget.',
    metaTitle: 'Mortgage Calculator | Jessica Shauffer — South Shore MA Real Estate',
    metaDescription: 'Free mortgage calculator for South Shore MA homes. Estimate monthly payment, closing costs, interest savings, and amortization schedule.',
    ogImage: '/assets/buyers-hero.webp',
  },
  counties: {
    title: 'Counties',
    slug: { current: 'counties' },
    heroImage: '/assets/hero.webp',
    heroTitle: 'Real Estate Across Bristol, Norfolk & Plymouth Counties',
    heroDesc: 'Explore homes for sale and market trends across three Eastern Massachusetts counties served by Jessica Shauffer.',
    metaTitle: 'Bristol, Norfolk & Plymouth County MA Real Estate | Jessica Shauffer',
    metaDescription: 'Browse homes for sale and real estate market data across Bristol, Norfolk, and Plymouth Counties, MA. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    ogImage: '/assets/hero.webp',
  },
};
const pageFields = `
  _id, title, slug,
  heroImage, heroTitle, heroDesc,
  metaTitle, metaDescription, ogImage
`;

export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  const result = await client.fetch<SanityPage | null>(
    `*[_type == "page" && slug.current == $slug][0] { ${pageFields} }`,
    { slug }
  );
  if (result) return result;
  const fallback = STATIC_PAGES[slug];
  if (fallback) return { _id: `static-${slug}`, ...fallback };
  return null;
}

// ── Blog Posts ─────────────────────────────────────────────────────────────────

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  topic: string;
  secondaryTopic?: string;
  primaryKeyword?: string;
  readTimeMinutes?: number;
  heroImage?: SanityImageSource;
  heroImageAlt?: string;
  excerpt: string;
  body?: unknown[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource;
  author?: string;
}

const blogPostCardFields = `
  _id, title, slug, publishedAt, topic, secondaryTopic, primaryKeyword,
  heroImage, heroImageAlt, excerpt, author
`;

const blogPostFullFields = `
  _id, title, slug, publishedAt, topic, secondaryTopic, primaryKeyword, readTimeMinutes,
  heroImage, heroImageAlt, excerpt, body,
  metaTitle, metaDescription, ogImage, author
`;

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  return client.fetch<SanityBlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) { ${blogPostCardFields} }`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return client.fetch<SanityBlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] { ${blogPostFullFields} }`,
    { slug }
  );
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "blogPost"] { slug }`
  );
  return results.map((r) => r.slug.current);
}

export async function getBlogPostsByTopic(topic: string, excludeSlug?: string): Promise<SanityBlogPost[]> {
  const query = excludeSlug
    ? `*[_type == "blogPost" && topic == $topic && slug.current != $excludeSlug] | order(publishedAt desc) [0...3] { ${blogPostCardFields} }`
    : `*[_type == "blogPost" && topic == $topic] | order(publishedAt desc) [0...3] { ${blogPostCardFields} }`;
  return client.fetch<SanityBlogPost[]>(query, { topic, excludeSlug });
}

// Fetch 6 related posts (same topic or secondary topic, excluding current)
export async function getRelatedBlogPosts(topic: string, excludeSlug: string): Promise<SanityBlogPost[]> {
  return client.fetch<SanityBlogPost[]>(
    `*[_type == "blogPost" && (topic == $topic || secondaryTopic == $topic) && slug.current != $excludeSlug] | order(publishedAt desc) [0...6] { ${blogPostCardFields} }`,
    { topic, excludeSlug }
  );
}

// Fetch the previous and next post by date for prev/next navigation
export async function getBlogPostNavigation(publishedAt: string): Promise<{ prev: SanityBlogPost | null; next: SanityBlogPost | null }> {
  const [prev, next, oldest, newest] = await Promise.all([
    client.fetch<SanityBlogPost | null>(
      `*[_type == "blogPost" && publishedAt < $publishedAt] | order(publishedAt desc) [0] { _id, title, slug, publishedAt, heroImage, heroImageAlt }`,
      { publishedAt }
    ),
    client.fetch<SanityBlogPost | null>(
      `*[_type == "blogPost" && publishedAt > $publishedAt] | order(publishedAt asc) [0] { _id, title, slug, publishedAt, heroImage, heroImageAlt }`,
      { publishedAt }
    ),
    client.fetch<SanityBlogPost | null>(
      `*[_type == "blogPost"] | order(publishedAt asc) [0] { _id, title, slug, publishedAt, heroImage, heroImageAlt }`
    ),
    client.fetch<SanityBlogPost | null>(
      `*[_type == "blogPost"] | order(publishedAt desc) [0] { _id, title, slug, publishedAt, heroImage, heroImageAlt }`
    ),
  ]);
  // Circular wrap: if no prev, show newest; if no next, show oldest
  return {
    prev: prev ?? newest ?? null,
    next: next ?? oldest ?? null,
  };
}
