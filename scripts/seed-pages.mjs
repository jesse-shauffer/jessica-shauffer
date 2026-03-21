/**
 * Seed the 7 top-level Page documents in Sanity.
 * Run: node scripts/seed-pages.mjs
 */
const PROJECT_ID = 'zrerdn9o';
const DATASET = 'production';
const API_TOKEN = 'sk5Ehav7I9S3mV5MCKqwHQb7iBGwn4rvIwCOH1UAPmOzb5BrhZ5IaYWVxWBT9CR1SPGTeQnPaRklSoBlOsYt1bSC5JbMeWnWeCHOGEHrKRnREV4huW4Zz4JneWGk4fOHNUfon6stmxE6wFXaYi0m50uxZUWVDAuSKj9RCbiNtV6XDCMFKisQ';

const pages = [
  {
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    heroTitle: "Jessica Shauffer — Coldwell Banker's Top Agent for the South Shore",
    heroDesc: "South Shore & MetroWest's top-rated Coldwell Banker real estate agent serving 25 communities across Eastern Massachusetts.",
    metaTitle: "Jessica Shauffer — Coldwell Banker's Top Agent for the South Shore",
    metaDescription: "South Shore & MetroWest's top-rated Coldwell Banker real estate agent. Jessica Shauffer serves 25 communities across Eastern Massachusetts including Easton, Canton, Sharon, Plymouth, Hingham, and more.",
  },
  {
    _id: 'page-market',
    _type: 'page',
    title: 'Market',
    slug: { _type: 'slug', current: 'market' },
    heroTitle: 'South Shore & MetroWest MA Real Estate Market Data',
    heroDesc: 'Current housing market data for the South Shore and MetroWest MA. Expert analysis, median home values, and trends.',
    metaTitle: 'South Shore & MetroWest MA Real Estate Market Data — Jessica Shauffer',
    metaDescription: 'Current housing market data for the South Shore and MetroWest MA. Get expert analysis, median home values, and trends for Plymouth, Easton, Canton, and more.',
  },
  {
    _id: 'page-buyers',
    _type: 'page',
    title: 'Buyers',
    slug: { _type: 'slug', current: 'buyers' },
    heroTitle: 'Buy a Home on the South Shore & MetroWest MA',
    heroDesc: 'Expert buyer representation across 25 communities in Eastern Massachusetts. Find your perfect home with Jessica Shauffer.',
    metaTitle: 'Buy a Home in South Shore & MetroWest MA — Jessica Shauffer',
    metaDescription: 'Find your perfect home with Jessica Shauffer, top 3% Coldwell Banker agent. Expert buyer representation across Plymouth, Easton, Canton, and 25+ South Shore communities.',
  },
  {
    _id: 'page-sellers',
    _type: 'page',
    title: 'Sellers',
    slug: { _type: 'slug', current: 'sellers' },
    heroTitle: 'Sell Your Home in South Shore & MetroWest MA',
    heroDesc: 'Sell your home for top dollar with expert pricing, staging, and digital marketing across 25+ local towns.',
    metaTitle: 'Sell Your Home in South Shore & MetroWest MA — Jessica Shauffer',
    metaDescription: 'Sell your home for top dollar with Jessica Shauffer. Expert pricing, staging, and digital marketing across Plymouth, Canton, Easton, and 25+ local towns.',
  },
  {
    _id: 'page-about',
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
    heroTitle: 'About Jessica Shauffer',
    heroDesc: 'Top-producing Coldwell Banker Presidents Circle agent serving 25 communities across the South Shore, MetroWest, and Bristol County, MA.',
    metaTitle: 'About Jessica Shauffer — Top Real Estate Agent, South Shore & MetroWest MA',
    metaDescription: "Meet Jessica Shauffer — a top-producing Coldwell Banker Presidents Circle agent and member of the Weinstein Keach Group, serving 25 communities across the South Shore, MetroWest, and Bristol County, MA.",
  },
  {
    _id: 'page-contact',
    _type: 'page',
    title: 'Contact',
    slug: { _type: 'slug', current: 'contact' },
    heroTitle: 'Contact Jessica Shauffer',
    heroDesc: "Ready to make a move? Let's talk. Book a free consultation or reach out directly.",
    metaTitle: 'Contact Jessica Shauffer — Easton, MA Real Estate Agent',
    metaDescription: 'Book a free consultation with Jessica Shauffer, Coldwell Banker Presidents Circle agent. Call (617) 949-1046 or schedule online.',
  },
  {
    _id: 'page-testimonials',
    _type: 'page',
    title: 'Testimonials',
    slug: { _type: 'slug', current: 'testimonials' },
    heroTitle: 'Real Stories from Real Clients',
    heroDesc: 'Verified 5-star reviews from real buyers and sellers across 25 Eastern Massachusetts communities.',
    metaTitle: 'Client Reviews & Testimonials — Jessica Shauffer, South Shore MA Real Estate',
    metaDescription: 'Read verified 5-star reviews from buyers and sellers who worked with Jessica Shauffer across the South Shore, MetroWest, and Bristol County, MA. Top 3% Coldwell Banker agent.',
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
  console.log('✅ Seeded', pages.length, 'page documents');
  console.log(JSON.stringify(json.results?.map(r => r.id), null, 2));
} else {
  console.error('❌ Error:', JSON.stringify(json, null, 2));
}
