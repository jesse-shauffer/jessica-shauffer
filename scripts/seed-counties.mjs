/**
 * Seed the 3 county documents in Sanity.
 * Run: node scripts/seed-counties.mjs
 */

const PROJECT_ID = 'zrerdn9o';
const DATASET = 'production';
const TOKEN = 'sk5Ehav7I9S3mV5MCKqwHQb7iBGwn4rvIwCOH1UAPmOzb5BrhZ5IaYWVxWBT9CR1SPGTeQnPaRklSoBlOsYt1bSC5JbMeWnWeCHOGEHrKRnREV4huW4Zz4JneWGk4fOHNUfon6stmxE6wFXaYi0m50uxZUWVDAuSKj9RCbiNtV6XDCMFKisQ';

const COUNTIES = [
  {
    _id: 'county-bristol',
    _type: 'county',
    name: 'Bristol County',
    slug: { _type: 'slug', current: 'bristol-county' },
    state: 'MA',
    tagline: 'The heart of South Shore real estate',
    heroTitle: 'Bristol County, MA — Homes for Sale & Real Estate Guide',
    heroDesc: 'Explore real estate across Bristol County, MA — from Easton and Mansfield to Taunton and Attleboro. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    description: [
      'Bristol County is one of the most dynamic real estate markets in Eastern Massachusetts, encompassing a diverse range of communities from the historic villages of Easton to the growing urban centers of Taunton and Attleboro. With convenient access to both Boston and Providence via I-95 and I-495, Bristol County attracts buyers seeking value, strong schools, and a high quality of life.',
      'Jessica Shauffer brings deep local expertise to every Bristol County transaction. As a top-producing Coldwell Banker Presidents Circle agent, she serves communities including Easton, North Easton, South Easton, Mansfield, Norton, Raynham, Taunton, Attleboro, North Attleborough, and Foxborough — helping buyers and sellers navigate one of the region\'s most active markets.',
    ],
    highlights: [
      { _key: 'h1', icon: 'ph-map-pin', title: '10 Communities', description: 'From Easton to Attleboro, Bristol County covers a wide range of lifestyles and price points.' },
      { _key: 'h2', icon: 'ph-trend-up', title: 'Strong Appreciation', description: 'Bristol County has seen consistent home value growth driven by Boston-area demand and limited inventory.' },
      { _key: 'h3', icon: 'ph-train', title: 'Commuter Access', description: 'Multiple commuter rail lines and major highways connect Bristol County to Boston and Providence.' },
    ],
    metaTitle: 'Bristol County, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Bristol County, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
  {
    _id: 'county-norfolk',
    _type: 'county',
    name: 'Norfolk County',
    slug: { _type: 'slug', current: 'norfolk-county' },
    state: 'MA',
    tagline: 'Prestigious schools, strong appreciation',
    heroTitle: 'Norfolk County, MA — Homes for Sale & Real Estate Guide',
    heroDesc: 'Explore real estate across Norfolk County, MA — from Canton and Sharon to Norwood and Westwood. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    description: [
      'Norfolk County is home to some of Eastern Massachusetts\' most prestigious communities, including Canton, Sharon, Westwood, and Norwood. Known for top-ranked public schools, strong home appreciation, and convenient access to Boston via Route 128 and the commuter rail, Norfolk County is a perennial favorite among families and professionals.',
      'Jessica Shauffer brings the same top-3% expertise and negotiation skills to Norfolk County that have made her a trusted name in Bristol County. Her knowledge of the local micro-markets — from the lakefront properties in Sharon to the executive homes of Westwood — ensures clients make informed decisions.',
    ],
    highlights: [
      { _key: 'h1', icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Norfolk County communities consistently rank among the best school districts in Massachusetts.' },
      { _key: 'h2', icon: 'ph-house-line', title: 'Premium Properties', description: 'From luxury estates in Westwood to family colonials in Canton, Norfolk County offers exceptional homes.' },
      { _key: 'h3', icon: 'ph-train', title: 'Boston Commuter Belt', description: 'Route 128 and multiple commuter rail stations make Norfolk County ideal for Boston professionals.' },
    ],
    metaTitle: 'Norfolk County, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Norfolk County, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
  {
    _id: 'county-plymouth',
    _type: 'county',
    name: 'Plymouth County',
    slug: { _type: 'slug', current: 'plymouth-county' },
    state: 'MA',
    tagline: 'Coastal living meets suburban value',
    heroTitle: 'Plymouth County, MA — Homes for Sale & Real Estate Guide',
    heroDesc: 'Explore real estate across Plymouth County, MA — from Plymouth and Hingham to Bridgewater and Kingston. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
    description: [
      'Plymouth County stretches from the coastal elegance of Hingham and Plymouth to the growing inland communities of Bridgewater and Middleborough. The county offers a remarkable diversity of real estate — from oceanfront estates and historic homes to affordable single-family properties and new construction developments.',
      'Jessica Shauffer serves Plymouth County buyers and sellers with the same dedication and market expertise that has earned her Presidents Circle status. Whether you\'re seeking a waterfront retreat in Plymouth, a family home in Kingston, or an investment property in Bridgewater, Jessica provides the data-driven guidance and tenacious negotiation you need.',
    ],
    highlights: [
      { _key: 'h1', icon: 'ph-waves', title: 'Coastal Communities', description: 'Plymouth County includes some of the South Shore\'s most beautiful coastal towns including Hingham and Plymouth.' },
      { _key: 'h2', icon: 'ph-currency-dollar', title: 'Diverse Price Points', description: 'From affordable inland towns to premium coastal properties, Plymouth County offers options for every budget.' },
      { _key: 'h3', icon: 'ph-tree', title: 'Natural Beauty', description: 'Extensive conservation land, ponds, and coastline make Plymouth County one of the most scenic areas in Massachusetts.' },
    ],
    metaTitle: 'Plymouth County, MA Real Estate & Homes for Sale | Jessica Shauffer',
    metaDescription: 'Explore real estate in Plymouth County, MA. Find homes for sale, market data, and community insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
];

const mutations = COUNTIES.map((doc) => ({ createOrReplace: doc }));

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  }
);

const json = await res.json();
if (!res.ok) {
  console.error('❌ Seed failed:', JSON.stringify(json, null, 2));
  process.exit(1);
}
console.log('✅ Counties seeded successfully:');
json.results?.forEach((r) => console.log(' ', r.id, r.operation));
