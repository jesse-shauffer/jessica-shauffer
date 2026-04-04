import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { AGENT } from '@/lib/schema';
import ConsultationForm from '@/components/ConsultationForm';
import FaqAccordion from '@/components/FaqAccordion';
import CommunityChartTabs from '@/components/CommunityChartTabs';
import { getNeighborhoodBySlug, getOtherNeighborhoods, resolveHeroImage, getAllNeighborhoodSlugs } from '@/lib/sanity';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllNeighborhoodSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const n = await getNeighborhoodBySlug(params.slug);
  if (!n) return { title: 'Community Not Found' };
  return {
    title: n.metaTitle || `${n.name}, MA Real Estate & Homes for Sale | Jessica Shauffer`,
    description: n.metaDescription || `Explore real estate in ${n.name}, MA. Find homes for sale, market data, and community insights with top 3% agent Jessica Shauffer.`,
    openGraph: {
      title: n.metaTitle || `${n.name}, MA Real Estate & Homes for Sale | Jessica Shauffer`,
      description: n.metaDescription || `Explore real estate in ${n.name}, MA. Find homes for sale, market data, and community insights with top 3% agent Jessica Shauffer.`,
      url: `https://www.jessicashauffer.com/communities/${n.slug.current}`,
      images: [{ url: resolveHeroImage(n.heroImage, 1200), width: 1200, height: 630, alt: `${n.name}, MA real estate` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: n.metaTitle || `${n.name}, MA Real Estate & Homes for Sale | Jessica Shauffer`,
      description: n.metaDescription || `Explore real estate in ${n.name}, MA. Find homes for sale, market data, and community insights with top 3% agent Jessica Shauffer.`,
      images: [resolveHeroImage(n.heroImage, 1200)],
    },
    alternates: { canonical: `/communities/${n.slug.current}` },
  };
}

export default async function CommunityPage({ params }: { params: { slug: string } }) {
  const n = await getNeighborhoodBySlug(params.slug);
  if (!n) notFound();
  const others = await getOtherNeighborhoods(params.slug);

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `https://www.jessicashauffer.com/communities/${n.slug.current}/#place`,
    name: `${n.name}, MA`,
    description: n.description?.[0] || `Community information for ${n.name}, Massachusetts.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: n.name,
      addressRegion: 'MA',
      postalCode: n.zipCode || '',
      addressCountry: 'US',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Homes for Sale in ${n.name}, MA`,
      provider: { '@type': 'RealEstateAgent', '@id': `${AGENT.url}/#agent` },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com/' },
      { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.jessicashauffer.com/communities' },
      { '@type': 'ListItem', position: 3, name: n.name, item: `https://www.jessicashauffer.com/communities/${n.slug.current}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${n.name}, MA a good place to live?`,
        acceptedAnswer: { '@type': 'Answer', text: `Yes, ${n.name} is highly sought after for its strong community, excellent amenities, and consistent real estate appreciation.` }
      },
      {
        '@type': 'Question',
        name: `Who is the best real estate agent in ${n.name}, MA?`,
        acceptedAnswer: { '@type': 'Answer', text: `Jessica Shauffer is a top 3% globally ranked Coldwell Banker agent with extensive experience buying and selling homes in ${n.name} and the surrounding area.` }
      },
      {
        '@type': 'Question',
        name: `What are homes selling for in ${n.name}, MA?`,
        acceptedAnswer: { '@type': 'Answer', text: `Home prices in ${n.name} vary based on property type and neighborhood. Contact Jessica Shauffer for a free, data-driven market analysis specific to ${n.name}.` }
      },
    ],
  };

  return (
    <>
      <JsonLd data={placeSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={resolveHeroImage(n.heroImage, 1600)} alt={`${n.name}, MA real estate`} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Community Guide</p>
          <h1 className="page-hero__title">{n.heroTitle || `Living in ${n.name}, MA`}</h1>
          <p className="page-hero__desc">{n.heroDesc || `Discover homes for sale, market trends, and local lifestyle in ${n.name}.`}</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/communities">Communities</Link></li>
            <li>{n.name}</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__content">
              <p className="section__label">Overview</p>
              <h2 className="section__title">About {n.name}</h2>
              {n.description && n.description.length > 0 ? (
                n.description.map((p: string, i: number) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>{n.name} is a vibrant community in Eastern Massachusetts offering an exceptional quality of life. Known for its strong neighborhoods and excellent local amenities, it has become a highly desirable destination for homebuyers.</p>
                  <p>Whether you are looking for a historic home with character or new construction, the {n.name} real estate market offers diverse options. With easy access to major highways and commuter routes, residents enjoy the perfect balance of suburban tranquility and urban accessibility.</p>
                </>
              )}
            </div>
            <div className="split__media">
              <Image src={resolveHeroImage(n.heroImage, 600)} alt={`${n.name} MA community`} width={600} height={450} style={{ borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </section>

      {n.highlights && n.highlights.length > 0 && (
        <section className="section" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
              <h2>What Makes {n.name} Special</h2>
              <p>Discover the highlights that make {n.name} a unique and highly sought-after community.</p>
            </div>
            <div className="highlight-grid">
              {n.highlights.map((h: { icon: string; title: string; description: string }, i: number) => (
                <div key={i} className="highlight-card">
                  <i className={`ph ${h.icon || 'ph-map-pin'}`}></i>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {others && others.length > 0 && (
        <section className="section" style={{ background: 'var(--warm-gray)' }}>
          <div className="container">
            <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
              <h2>Explore Nearby Communities</h2>
              <p>Discover other highly-rated towns across the South Shore and MetroWest.</p>
            </div>
            <div className="neighborhood-grid">
              {others.slice(0, 6).map((other) => (
                <Link key={other.slug} href={`/communities/${other.slug}`} className="neighborhood-card">
                  <div className="neighborhood-card__bg">
                    <Image src={resolveHeroImage(other.image, 600)} alt={other.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="neighborhood-card__arrow"><i className="ph ph-arrow-right"></i></div>
                  <div className="neighborhood-card__content">
                    <h3>{other.name}</h3>
                    <p>{other.tagline || `Explore ${other.name} real estate`}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
              <Link href="/communities" className="btn btn--outline">View All Communities</Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ ACCORDION */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-10)' }}>
            <p className="section__label">Common Questions</p>
            <h2 className="section__title">{n.name} Real Estate — FAQ</h2>
          </div>
          <FaqAccordion
            items={[
              {
                question: `Is ${n.name}, MA a good place to live?`,
                answer: `Yes, ${n.name} is highly sought after for its strong community, excellent amenities, and consistent real estate appreciation. The town offers a great quality of life for families, professionals, and retirees alike.`,
              },
              {
                question: `Who is the best real estate agent in ${n.name}, MA?`,
                answer: `Jessica Shauffer is a top 3% globally ranked Coldwell Banker Presidents Circle agent with extensive experience buying and selling homes in ${n.name} and the surrounding South Shore area. She is a top-producing member of the Weinstein Keach Group at Coldwell Banker Realty.`,
              },
              {
                question: `What are homes selling for in ${n.name}, MA?`,
                answer: `Home prices in ${n.name} vary based on property type, size, and neighborhood. Contact Jessica Shauffer for a free, data-driven Comparative Market Analysis (CMA) specific to ${n.name} — no cost, no obligation.`,
              },
              {
                question: `How long does it take to buy a home in ${n.name}, MA?`,
                answer: `The timeline varies, but most buyers in ${n.name} can expect 30–90 days from accepted offer to closing. Getting pre-approved before you start searching significantly speeds up the process. Jessica Shauffer can connect you with trusted local lenders.`,
              },
              {
                question: `What should I know before selling my home in ${n.name}, MA?`,
                answer: `Pricing strategy is everything. Homes in ${n.name} that are priced correctly from day one sell faster and for more money. Jessica Shauffer provides a free, no-obligation market analysis and a proven marketing plan to maximize your sale price.`,
              },
            ]}
          />
        </div>
      </section>

      {/* MARKET DATA CHARTS — Home Values · Sale-to-List · Days on Market */}
      <section className="section community-chart-section">
        <div className="container">
          <CommunityChartTabs slug={params.slug} />
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Looking to buy or sell in {n.name}? A quick conversation with Jessica can save you time, money, and stress &mdash; no pressure, just expert local guidance.
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
                    <span>Deep knowledge of {n.name} and surrounding towns</span>
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
