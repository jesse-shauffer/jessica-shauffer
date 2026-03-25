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

// Static FAQ items per county (not in Sanity schema, kept locally)
const COUNTY_FAQS: Record<string, { q: string; a: string }[]> = {
  'bristol-county': [
    { q: 'What is the real estate market like in Bristol County, MA?', a: 'Bristol County, MA offers a competitive real estate market with median home prices ranging from $350,000 to $600,000 depending on the town. Easton, Mansfield, and North Attleborough are among the most sought-after communities. Inventory remains tight, and well-priced homes typically sell within 30 days. Jessica Shauffer tracks Bristol County market data monthly and can provide a current analysis for any specific town.' },
    { q: 'Which towns in Bristol County are best for families?', a: 'Easton, Mansfield, and Norton are consistently ranked among the top family-friendly towns in Bristol County, MA, thanks to their highly rated public schools, safe neighborhoods, and community amenities. North Attleborough and Raynham also offer excellent family environments at more accessible price points.' },
    { q: 'Who is the best real estate agent in Bristol County, MA?', a: 'Jessica Shauffer is one of the top-rated real estate agents in Bristol County, MA. A member of the Coldwell Banker Presidents Circle (top 3% globally) and a top-producing agent on the award-winning Weinstein Keach Group, Jessica has deep expertise across all Bristol County communities she serves.' },
    { q: 'What is the average home price in Bristol County, MA?', a: 'As of the most recent market data, the median sale price for single-family homes in Bristol County, MA ranges from approximately $380,000 in Taunton and Attleboro to over $550,000 in Easton and Mansfield. Contact Jessica Shauffer for the most current figures for any specific town.' },
  ],
  'norfolk-county': [
    { q: 'What is the real estate market like in Norfolk County, MA?', a: 'Norfolk County, MA features one of the strongest real estate markets in Eastern Massachusetts. Median home prices range from approximately $500,000 in Stoughton and Foxborough to over $1 million in Weston and Westwood. Low inventory and high demand mean well-priced homes sell quickly. Jessica Shauffer provides monthly market updates for every Norfolk County town she serves.' },
    { q: 'Which towns in Norfolk County have the best schools?', a: 'Weston, Westwood, Canton, and Sharon consistently rank among the top school districts in Norfolk County and the entire state of Massachusetts. These towns attract families willing to pay a premium for access to exceptional public education.' },
    { q: 'Who is the best real estate agent in Norfolk County, MA?', a: 'Jessica Shauffer is one of the top-rated real estate agents serving Norfolk County, MA. As a Coldwell Banker Presidents Circle member and top-producing agent on the Weinstein Keach Group, she brings deep expertise to every transaction in Canton, Sharon, Norwood, Westwood, Stoughton, Foxborough, and Weston.' },
    { q: 'Is Norfolk County a good place to invest in real estate?', a: 'Yes. Norfolk County, MA has consistently demonstrated strong appreciation, low vacancy rates, and high rental demand — particularly in towns near Route 128 and MBTA commuter rail lines. Jessica Shauffer can provide investment analysis for any specific town or property type in Norfolk County.' },
  ],
  'plymouth-county': [
    { q: 'What is the real estate market like in Plymouth County, MA?', a: 'Plymouth County, MA has experienced strong appreciation, particularly in coastal communities like Hingham and Plymouth. Median home prices range from approximately $400,000 in Middleborough and Halifax to over $800,000 in Hingham. Limited coastal inventory and growing demand from Boston-area buyers continue to drive the market. Jessica Shauffer tracks Plymouth County data monthly.' },
    { q: 'Is Hingham, MA a good place to buy a home?', a: 'Hingham is one of the most desirable communities on the South Shore, offering top-rated schools, a beautiful harbor, ferry service to Boston, and a charming downtown. It commands premium prices, but its strong appreciation history and quality of life make it an excellent long-term investment.' },
    { q: 'Who is the best real estate agent in Plymouth County, MA?', a: 'Jessica Shauffer is one of the top-rated real estate agents serving Plymouth County, MA. A Coldwell Banker Presidents Circle member and top-producing agent on the Weinstein Keach Group, she serves Plymouth, Hingham, Kingston, Halifax, Lakeville, and Middleborough with deep local expertise and monthly market data.' },
    { q: 'What are the most affordable towns in Plymouth County, MA?', a: 'Halifax, Middleborough, and Lakeville offer the most accessible entry points in Plymouth County, MA, with median home prices typically ranging from $380,000 to $450,000. These towns offer strong value with good schools, quiet residential character, and easy access to Route 3 and Route 44.' },
  ],
};

// Static town lists per county (fallback when no Sanity neighborhood docs exist)
const COUNTY_TOWNS: Record<string, { name: string; slug: string; tagline: string }[]> = {
  'bristol-county': [
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
  'norfolk-county': [
    { name: 'Canton', slug: 'canton', tagline: 'Top-rated schools and strong community' },
    { name: 'Sharon', slug: 'sharon', tagline: 'Lakefront living and excellent schools' },
    { name: 'Norwood', slug: 'norwood', tagline: 'Vibrant town center with great access' },
    { name: 'Westwood', slug: 'westwood', tagline: 'Premium suburb with top schools' },
    { name: 'Stoughton', slug: 'stoughton', tagline: 'Affordable entry into Norfolk County' },
    { name: 'Foxborough', slug: 'foxborough', tagline: 'Home of Gillette Stadium and great value' },
    { name: 'Weston', slug: 'weston', tagline: "One of Massachusetts's most exclusive towns" },
  ],
  'plymouth-county': [
    { name: 'Plymouth', slug: 'plymouth', tagline: "America's Hometown — coastal and historic" },
    { name: 'Hingham', slug: 'hingham', tagline: 'Premier coastal suburb south of Boston' },
    { name: 'Kingston', slug: 'kingston', tagline: 'Waterfront living at accessible prices' },
    { name: 'Halifax', slug: 'halifax', tagline: 'Quiet lakeside community with great value' },
    { name: 'Lakeville', slug: 'lakeville', tagline: 'Rural charm with growing demand' },
    { name: 'Middleborough', slug: 'middleborough', tagline: 'Affordable entry with strong upside' },
  ],
};

export async function generateStaticParams() {
  const slugs = await getAllCountySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await getCountyBySlug(params.slug);
  if (!c) return { title: 'County Not Found' };

  const title = c.metaTitle || `${c.name}, MA Real Estate | Jessica Shauffer`;
  const description = c.metaDescription || `Explore homes for sale in ${c.name}, MA. Community guides, market data & expert advice from top 3% Coldwell Banker agent Jessica Shauffer.`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.jessicashauffer.com/counties/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.jessicashauffer.com/counties/${params.slug}`,
      images: [{ url: resolveHeroImage(c.heroImage, 1200), width: 1200, height: 630 }],
    },
  };
}

export default async function CountyPage({ params }: { params: { slug: string } }) {
  const c = await getCountyBySlug(params.slug);
  if (!c) notFound();

  // Resolve towns: prefer Sanity neighborhood docs linked to this county, fall back to static list
  const sanityTowns = await getNeighborhoodsByCounty(c._id);
  const towns = sanityTowns.length > 0
    ? sanityTowns.map((t) => ({ name: t.name, slug: t.slug, tagline: t.tagline || '' }))
    : (COUNTY_TOWNS[params.slug] || []);

  const faqItems = COUNTY_FAQS[params.slug] || [];

  // CMS fields with inline fallbacks
  const name = c.name;
  const heroTitle = c.heroTitle || `${name}, MA — Homes for Sale & Real Estate Guide`;
  const heroDesc = c.heroDesc || `${c.tagline || ''} — Expert guidance from top 3% Coldwell Banker agent Jessica Shauffer.`;
  const description = c.description && c.description.length > 0 ? c.description : [];
  const highlights = c.highlights && c.highlights.length > 0 ? c.highlights : [];
  const heroImageUrl = resolveHeroImage(c.heroImage, 1400);

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'AdministrativeArea',
    name: `${name}, Massachusetts`,
    description: description[0] || heroDesc,
    address: { '@type': 'PostalAddress', addressRegion: 'MA', addressCountry: 'US' },
    containedInPlace: { '@type': 'State', name: 'Massachusetts' },
  };

  const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Jessica Shauffer',
    url: 'https://www.jessicashauffer.com',
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com/' },
      { '@type': 'ListItem', position: 2, name: 'Counties', item: 'https://www.jessicashauffer.com/counties' },
      { '@type': 'ListItem', position: 3, name: name, item: `https://www.jessicashauffer.com/counties/${params.slug}` },
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
          <Image
            src={heroImageUrl}
            alt={`${name} Massachusetts real estate`}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Massachusetts Real Estate</p>
          <h1 className="page-hero__title">{heroTitle}</h1>
          <p className="page-hero__desc">{heroDesc}</p>
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
      {description.length > 0 && (
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
              {highlights.length > 0 && (
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
              )}
            </div>
          </div>
        </section>
      )}

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
