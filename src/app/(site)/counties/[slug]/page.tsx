import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import FaqAccordion from '@/components/FaqAccordion';
import {
  getCountyBySlug,
  getAllCountySlugs,
  getNeighborhoodsByCounty,
  resolveHeroImage,
} from '@/lib/sanity';

export const revalidate = 3600;

// Static county data fallback (used when Sanity record not yet created)
const COUNTY_FALLBACK: Record<string, {
  name: string;
  tagline: string;
  description: string[];
  towns: { name: string; slug: string; tagline: string }[];
  highlights: { icon: string; title: string; description: string }[];
  faqItems: { q: string; a: string }[];
}> = {
  'bristol-county': {
    name: 'Bristol County',
    tagline: 'The Heart of the South Shore',
    description: [
      'Bristol County is one of the most dynamic real estate markets in Eastern Massachusetts, encompassing 12 communities that range from the historic town of Easton to the growing city of Taunton. With strong commuter access to Boston and Providence via Routes 24, 495, and 138, Bristol County attracts buyers seeking suburban value without sacrificing urban convenience.',
      'The county features a diverse mix of housing stock — from colonial-era homes in North Easton to new construction developments in Mansfield and Raynham. Median home prices across Bristol County remain competitive compared to neighboring Norfolk County, making it a top destination for first-time buyers and growing families alike.',
      'Jessica Shauffer has deep roots in Bristol County, having built her reputation as a top-producing agent in Easton before expanding across the region. Her daily market analysis and local connections give buyers and sellers in Bristol County a decisive edge.',
    ],
    towns: [
      { name: 'Easton', slug: 'easton', tagline: 'Historic charm meets suburban convenience' },
      { name: 'North Easton', slug: 'north-easton', tagline: 'Village character with top-rated schools' },
      { name: 'South Easton', slug: 'south-easton', tagline: 'Quiet residential living near Route 138' },
      { name: 'Mansfield', slug: 'mansfield', tagline: 'Growing market with excellent highway access' },
      { name: 'Norton', slug: 'norton', tagline: 'Affordable homes near Wheaton College' },
      { name: 'Raynham', slug: 'raynham', tagline: 'Family-friendly with strong value' },
      { name: 'Taunton', slug: 'taunton', tagline: 'The Silver City — diverse and growing' },
      { name: 'Attleboro', slug: 'attleboro', tagline: 'Commuter-friendly with urban amenities' },
      { name: 'North Attleborough', slug: 'north-attleborough', tagline: 'Strong schools and community feel' },
      { name: 'Bridgewater', slug: 'bridgewater', tagline: 'College town with broad appeal' },
      { name: 'West Bridgewater', slug: 'west-bridgewater', tagline: 'Small-town feel, big opportunity' },
      { name: 'East Bridgewater', slug: 'east-bridgewater', tagline: 'Quiet residential with growing demand' },
    ],
    highlights: [
      { icon: 'ph-train', title: 'Commuter Rail Access', description: 'Multiple MBTA commuter rail stations connecting to Boston South Station in under 60 minutes.' },
      { icon: 'ph-graduation-cap', title: 'Strong School Districts', description: 'Easton, Mansfield, and Norton consistently rank among the top school districts in Bristol County.' },
      { icon: 'ph-trend-up', title: 'Competitive Pricing', description: 'Median home prices below Norfolk County averages with strong year-over-year appreciation.' },
      { icon: 'ph-road-horizon', title: 'Highway Access', description: 'Routes 24, 495, 138, and 44 provide direct access to Boston, Providence, and Cape Cod.' },
    ],
    faqItems: [
      { q: 'What is the real estate market like in Bristol County, MA?', a: 'Bristol County, MA offers a competitive real estate market with median home prices ranging from $350,000 to $600,000 depending on the town. Easton, Mansfield, and North Attleborough are among the most sought-after communities. Inventory remains tight, and well-priced homes typically sell within 30 days. Jessica Shauffer tracks Bristol County market data monthly and can provide a current analysis for any specific town.' },
      { q: 'Which towns in Bristol County are best for families?', a: 'Easton, Mansfield, and Norton are consistently ranked among the top family-friendly towns in Bristol County, MA, thanks to their highly rated public schools, safe neighborhoods, and community amenities. North Attleborough and Raynham also offer excellent family environments at more accessible price points.' },
      { q: 'Who is the best real estate agent in Bristol County, MA?', a: 'Jessica Shauffer is one of the top-rated real estate agents in Bristol County, MA. A member of the Coldwell Banker Presidents Circle (top 3% globally) and a top-producing agent on the award-winning Weinstein Keach Group, Jessica has deep expertise across all 12 Bristol County communities she serves.' },
      { q: 'What is the average home price in Bristol County, MA?', a: 'As of the most recent market data, the median sale price for single-family homes in Bristol County, MA ranges from approximately $380,000 in Taunton and Attleboro to over $550,000 in Easton and Mansfield. Contact Jessica Shauffer for the most current figures for any specific town.' },
    ],
  },
  'norfolk-county': {
    name: 'Norfolk County',
    tagline: 'Affluent Towns, Top-Rated Schools',
    description: [
      'Norfolk County consistently ranks among the most desirable counties in Massachusetts, home to some of the state\'s highest-income communities and top-performing school districts. Towns like Canton, Sharon, Westwood, and Weston attract buyers seeking premium suburban living within commuting distance of Boston.',
      'The county\'s real estate market is characterized by strong demand, limited inventory, and above-average home values. Luxury properties, new construction, and well-maintained colonials all command premium prices in Norfolk County, making it an excellent market for sellers and a competitive environment for buyers who need expert representation.',
      'Jessica Shauffer brings the same top-3% expertise and negotiation skills to Norfolk County that have made her a trusted name in Bristol County. Her knowledge of the local micro-markets — from the lakefront properties in Sharon to the executive homes of Westwood — ensures clients make informed decisions.',
    ],
    towns: [
      { name: 'Canton', slug: 'canton', tagline: 'Top-rated schools and strong community' },
      { name: 'Sharon', slug: 'sharon', tagline: 'Lakefront living and excellent schools' },
      { name: 'Norwood', slug: 'norwood', tagline: 'Vibrant town center with great access' },
      { name: 'Westwood', slug: 'westwood', tagline: 'Premium suburb with top schools' },
      { name: 'Stoughton', slug: 'stoughton', tagline: 'Affordable entry into Norfolk County' },
      { name: 'Foxborough', slug: 'foxborough', tagline: 'Home of Gillette Stadium and great value' },
      { name: 'Weston', slug: 'weston', tagline: 'One of Massachusetts\'s most exclusive towns' },
    ],
    highlights: [
      { icon: 'ph-graduation-cap', title: 'Top-Ranked Schools', description: 'Canton, Westwood, Sharon, and Weston consistently rank in the top tier of Massachusetts school districts.' },
      { icon: 'ph-currency-dollar', title: 'Strong Home Values', description: 'Norfolk County median home prices reflect the premium quality of life, with strong year-over-year appreciation.' },
      { icon: 'ph-train', title: 'Boston Commuter Access', description: 'Multiple MBTA commuter rail lines and Route 128/I-95 provide fast access to Boston and the Route 128 tech corridor.' },
      { icon: 'ph-tree', title: 'Upscale Amenities', description: 'From Sharon\'s Lake Massapoag to Weston\'s conservation land, Norfolk County offers exceptional quality of life.' },
    ],
    faqItems: [
      { q: 'What is the real estate market like in Norfolk County, MA?', a: 'Norfolk County, MA features one of the strongest real estate markets in Eastern Massachusetts. Median home prices range from approximately $500,000 in Stoughton and Foxborough to over $1 million in Weston and Westwood. Low inventory and high demand mean well-priced homes sell quickly. Jessica Shauffer provides monthly market updates for every Norfolk County town she serves.' },
      { q: 'Which towns in Norfolk County have the best schools?', a: 'Weston, Westwood, Canton, and Sharon consistently rank among the top school districts in Norfolk County and the entire state of Massachusetts. These towns attract families willing to pay a premium for access to exceptional public education.' },
      { q: 'Who is the best real estate agent in Norfolk County, MA?', a: 'Jessica Shauffer is one of the top-rated real estate agents serving Norfolk County, MA. As a Coldwell Banker Presidents Circle member and top-producing agent on the Weinstein Keach Group, she brings deep expertise to every transaction in Canton, Sharon, Norwood, Westwood, Stoughton, Foxborough, and Weston.' },
      { q: 'Is Norfolk County a good place to invest in real estate?', a: 'Yes. Norfolk County, MA has consistently demonstrated strong appreciation, low vacancy rates, and high rental demand — particularly in towns near Route 128 and MBTA commuter rail lines. Jessica Shauffer can provide investment analysis for any specific town or property type in Norfolk County.' },
    ],
  },
  'plymouth-county': {
    name: 'Plymouth County',
    tagline: 'Coastal Living & Historic Charm',
    description: [
      'Plymouth County offers a unique blend of coastal living, historic character, and growing residential demand. From the iconic waterfront of Plymouth — America\'s Hometown — to the quiet lakeside communities of Lakeville and Middleborough, the county provides diverse real estate opportunities for buyers at every stage of life.',
      'The county has seen significant appreciation over the past several years, driven by remote work migration from Boston, strong tourism economies, and limited coastal inventory. Hingham stands out as one of the most prestigious addresses in the region, while Kingston, Halifax, and Lakeville offer more accessible price points with strong upside potential.',
      'Jessica Shauffer brings her top-3% expertise and monthly market data to every Plymouth County transaction, helping buyers identify the right community for their lifestyle and helping sellers maximize their return in a competitive market.',
    ],
    towns: [
      { name: 'Plymouth', slug: 'plymouth', tagline: 'America\'s Hometown — coastal and historic' },
      { name: 'Hingham', slug: 'hingham', tagline: 'Premier coastal suburb south of Boston' },
      { name: 'Kingston', slug: 'kingston', tagline: 'Waterfront living at accessible prices' },
      { name: 'Halifax', slug: 'halifax', tagline: 'Quiet lakeside community with great value' },
      { name: 'Lakeville', slug: 'lakeville', tagline: 'Rural charm with growing demand' },
      { name: 'Middleborough', slug: 'middleborough', tagline: 'Affordable entry with strong upside' },
    ],
    highlights: [
      { icon: 'ph-waves', title: 'Coastal Properties', description: 'Waterfront and water-view homes in Plymouth, Hingham, and Kingston offer lifestyle and investment value.' },
      { icon: 'ph-anchor', title: 'Tourism Economy', description: 'Plymouth\'s strong tourism base supports short-term rental demand and commercial real estate opportunities.' },
      { icon: 'ph-trend-up', title: 'Strong Appreciation', description: 'Plymouth County has seen above-average appreciation driven by remote work migration and coastal demand.' },
      { icon: 'ph-road-horizon', title: 'Route 3 Corridor', description: 'Route 3 connects Plymouth County communities directly to Boston and Cape Cod, making commuting and recreation easy.' },
    ],
    faqItems: [
      { q: 'What is the real estate market like in Plymouth County, MA?', a: 'Plymouth County, MA has experienced strong appreciation, particularly in coastal communities like Hingham and Plymouth. Median home prices range from approximately $400,000 in Middleborough and Halifax to over $800,000 in Hingham. Limited coastal inventory and growing demand from Boston-area buyers continue to drive the market. Jessica Shauffer tracks Plymouth County data monthly.' },
      { q: 'Is Hingham, MA a good place to buy a home?', a: 'Hingham is one of the most desirable communities in Plymouth County, MA, offering top-rated schools, a vibrant town center, ferry access to Boston, and beautiful coastal properties. Home prices reflect the premium, with medians well above $700,000. Jessica Shauffer can provide a detailed market analysis for Hingham and surrounding towns.' },
      { q: 'Who is the best real estate agent in Plymouth County, MA?', a: 'Jessica Shauffer is one of the top-rated real estate agents serving Plymouth County, MA. A Coldwell Banker Presidents Circle member and top-producing agent on the Weinstein Keach Group, she serves Plymouth, Hingham, Kingston, Halifax, Lakeville, and Middleborough with deep local expertise and monthly market data.' },
      { q: 'What are the most affordable towns in Plymouth County, MA?', a: 'Halifax, Middleborough, and Lakeville offer the most accessible entry points in Plymouth County, MA, with median home prices typically ranging from $380,000 to $450,000. These towns offer strong value with good schools, quiet residential character, and easy access to Route 3 and Route 44.' },
    ],
  },
};

export async function generateStaticParams() {
  // Always include the 3 known county slugs even if not yet in Sanity
  const sanitySlugsSlugs = await getAllCountySlugs();
  const fallbackSlugs = Object.keys(COUNTY_FALLBACK);
  const allSlugs = Array.from(new Set([...sanitySlugsSlugs, ...fallbackSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await getCountyBySlug(params.slug);
  const fb = COUNTY_FALLBACK[params.slug];
  const name = c?.name || fb?.name;
  if (!name) return { title: 'County Not Found' };

  const title = c?.metaTitle || `${name}, MA Real Estate — Homes for Sale | Jessica Shauffer`;
  const description = c?.metaDescription || `Explore real estate in ${name}, MA. Find homes for sale, community guides, and monthly market data with top 3% Coldwell Banker agent Jessica Shauffer.`;

  return {
    title,
    description,
    alternates: { canonical: `https://jessicashauffer.com/counties/${params.slug}` },
    openGraph: { title, description, url: `https://jessicashauffer.com/counties/${params.slug}`, images: [{ url: '/assets/hero.webp', width: 1200, height: 630 }] },
  };
}

export default async function CountyPage({ params }: { params: { slug: string } }) {
  const [c, sanityTowns] = await Promise.all([
    getCountyBySlug(params.slug),
    (async () => {
      const county = await getCountyBySlug(params.slug);
      return county ? getNeighborhoodsByCounty(county._id) : [];
    })(),
  ]);

  const fb = COUNTY_FALLBACK[params.slug];
  if (!c && !fb) notFound();

  const name = c?.name || fb!.name;
  const tagline = c?.tagline || fb!.tagline;
  const description = c?.description || fb!.description;
  const highlights = c?.highlights || fb!.highlights;
  const towns = sanityTowns.length > 0
    ? sanityTowns.map((t) => ({ name: t.name, slug: t.slug, tagline: t.tagline || '' }))
    : (fb?.towns || []);
  const faqItems = fb?.faqItems || [];

  const heroImageUrl = c?.heroImage ? resolveHeroImage(c.heroImage, 1400) : '/assets/hero.webp';

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'AdministrativeArea',
    name: `${name}, Massachusetts`,
    description: description[0] || '',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'MA',
      addressCountry: 'US',
    },
    containedInPlace: {
      '@type': 'State',
      name: 'Massachusetts',
    },
  };

  const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Jessica Shauffer',
    url: 'https://jessicashauffer.com',
    areaServed: { '@type': 'AdministrativeArea', name: `${name}, Massachusetts` },
    award: 'Coldwell Banker Presidents Circle — Top 3% Globally',
    worksFor: { '@type': 'Organization', name: 'Weinstein Keach Group at Coldwell Banker Realty' },
  };

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jessicashauffer.com/' },
      { '@type': 'ListItem', position: 2, name: 'Counties', item: 'https://jessicashauffer.com/counties' },
      { '@type': 'ListItem', position: 3, name: name, item: `https://jessicashauffer.com/counties/${params.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={areaSchema} />
      <JsonLd data={agentSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={heroImageUrl} alt={`${name} Massachusetts real estate`} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Massachusetts Real Estate</p>
          <h1 className="page-hero__title">{name}, MA — Homes for Sale &amp; Real Estate Guide</h1>
          <p className="page-hero__desc">{tagline} — Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/counties">Counties</Link></li>
            <li>{name}</li>
          </ol>
        </nav>
      </div>

      {/* DESCRIPTION */}
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section__label">{name}, Massachusetts</p>
              <h2 className="section__title">Real Estate in {name}</h2>
              {description.map((para, i) => (
                <p key={i} style={{ marginBottom: 'var(--space-4)', lineHeight: 1.75 }}>{para}</p>
              ))}
              <Link href="#consultation" className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
                Get a Free Market Analysis
              </Link>
            </div>
            <div>
              <p className="section__label">Why {name}</p>
              <h2 className="section__title">What Makes This County Stand Out</h2>
              <div className="highlights-list">
                {highlights.map((h, i) => (
                  <div key={i} className="highlight-item">
                    <div className="highlight-item__icon">
                      <i className={`ph-fill ${h.icon}`} aria-hidden="true"></i>
                    </div>
                    <div>
                      <h3 className="highlight-item__title">{h.title}</h3>
                      <p className="highlight-item__desc">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOWNS GRID */}
      <section className="section section--warm">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Communities</p>
            <h2 className="section__title">Towns in {name}</h2>
            <p className="section__desc" style={{ color: 'var(--color-text-muted)' }}>
              Explore each community in {name} — with local market data, school information, and neighborhood insights.
            </p>
          </div>
          <div className="community-grid">
            {towns.map((town) => (
              <Link key={town.slug} href={`/communities/${town.slug}`} className="community-card community-card--link">
                <h3 className="community-card__name">{town.name}</h3>
                {town.tagline && <p className="community-card__tagline">{town.tagline}</p>}
                <span className="community-card__arrow">View Community →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__header">
              <p className="section__label">Common Questions</p>
              <h2 className="section__title">{name} Real Estate — FAQ</h2>
            </div>
            <FaqAccordion items={faqItems.map(({ q, a }) => ({ question: q, answer: a }))} />
          </div>
        </section>
      )}

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re ready to make a move or just exploring the market in {name} — a quick conversation with Jessica can save you time, money, and stress.
              </p>
              <div className="form-benefits">
                <div className="form-benefit">
                  <i className="ph ph-clock" aria-hidden="true"></i>
                  <div>
                    <strong>15-Minute Call</strong>
                    <span>Quick, focused, and tailored to you</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-currency-dollar-simple" aria-hidden="true"></i>
                  <div>
                    <strong>100% Free</strong>
                    <span>No cost, no obligation, no pressure</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-shield-check" aria-hidden="true"></i>
                  <div>
                    <strong>Local Expertise</strong>
                    <span>Data-driven insights for every town in {name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-split__form">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
