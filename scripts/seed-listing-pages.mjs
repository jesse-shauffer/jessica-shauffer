/**
 * Seed the Communities and Counties listing page documents in Sanity.
 * Run: node scripts/seed-listing-pages.mjs
 *
 * These documents will appear in Sanity Studio under "Pages".
 * All text fields are pre-filled — Jesse only needs to add heroImage and ogImage.
 */
const PROJECT_ID = 'zrerdn9o';
const DATASET = 'production';
const API_TOKEN = 'sk5Ehav7I9S3mV5MCKqwHQb7iBGwn4rvIwCOH1UAPmOzb5BrhZ5IaYWVxWBT9CR1SPGTeQnPaRklSoBlOsYt1bSC5JbMeWnWeCHOGEHrKRnREV4huW4Zz4JneWGk4fOHNUfon6stmxE6wFXaYi0m50uxZUWVDAuSKj9RCbiNtV6XDCMFKisQ';

const pages = [
  {
    _id: 'page-communities',
    _type: 'page',
    title: 'Communities',
    slug: { _type: 'slug', current: 'communities' },
    heroTitle: 'Explore Communities Across Eastern Massachusetts',
    heroDesc: 'Browse 25 towns across the South Shore, MetroWest, and Bristol County. Find market data, local highlights, and homes for sale in every community Jessica Shauffer serves.',
    metaTitle: 'Communities in South Shore & MetroWest MA | Jessica Shauffer',
    metaDescription: 'Explore 25 communities across the South Shore, MetroWest, and Bristol County, MA. Find homes, market data, and local insights with top 3% Coldwell Banker agent Jessica Shauffer.',
  },
  {
    _id: 'page-counties',
    _type: 'page',
    title: 'Counties',
    slug: { _type: 'slug', current: 'counties' },
    heroTitle: 'Real Estate Across Three Massachusetts Counties',
    heroDesc: 'Jessica Shauffer serves 25 communities across Bristol County, Norfolk County, and Plymouth County — bringing deep local expertise and monthly market data to every town.',
    metaTitle: 'Bristol, Norfolk & Plymouth County MA Real Estate | Jessica Shauffer',
    metaDescription: 'Browse homes for sale and real estate market data across Bristol, Norfolk, and Plymouth Counties, MA. Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.',
  },
];

const mutations = pages.map(doc => ({ createOrReplace: doc }));

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/${DATASET}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  }
);

const json = await res.json();
if (res.ok) {
  console.log('✅ Seeded', pages.length, 'page documents:');
  console.log(JSON.stringify(json.results?.map(r => r.id), null, 2));
  console.log('\n📸 Next step: open Sanity Studio → Pages → Communities & Counties, then add heroImage and ogImage.');
} else {
  console.error('❌ Error:', JSON.stringify(json, null, 2));
}
