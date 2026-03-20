import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getNeighborhoodBySlug, getOtherNeighborhoods, resolveHeroImage, getAllNeighborhoodSlugs } from '@/lib/sanity';

export const revalidate = 3600;

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
    name: `${n.name}, MA`,
    description: n.description?.[0] || `Community information for ${n.name}, Massachusetts.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: n.name,
      addressRegion: 'MA',
      postalCode: n.zipCode || '',
      addressCountry: 'US',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jessicashauffer.com/' },
      { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://jessicashauffer.com/communities' },
      { '@type': 'ListItem', position: 3, name: n.name, item: `https://jessicashauffer.com/communities/${n.slug.current}` },
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
          <Image src={resolveHeroImage(n.heroImage, 1600)} alt={`${n.name}, MA real estate`} fill style={{ objectFit: 'cover' }} priority />
          <div className="hero__overlay"></div>
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
                  <i className={`ph ${h.icon}`}></i>
                  <div>
                    <h4>{h.title}</h4>
                    <p>{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Looking to Buy or Sell in {n.name}?</h2>
            <p>Jessica Shauffer is a top 3% Coldwell Banker agent globally. Let her data-driven approach and local expertise guide your next move in {n.name}.</p>
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Book a Free Consultation</Link>
          </div>
        </div>
      </section>

      {others && others.length > 0 && (
        <section className="section" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
              <h2>Explore Nearby Communities</h2>
              <p>Discover other highly-rated towns across the South Shore and MetroWest.</p>
            </div>
            <div className="neighborhood-grid">
              {others.slice(0, 3).map((other: { slug: string; name: string; image: string }) => (
                <Link key={other.slug} href={`/communities/${other.slug}`} className="neighborhood-card">
                  <div className="neighborhood-card__bg">
                    <Image src={resolveHeroImage(other.image, 600)} alt={other.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="neighborhood-card__arrow"><i className="ph ph-arrow-right"></i></div>
                  <div className="neighborhood-card__content">
                    <h3>{other.name}</h3>
                    <p>{other.tagline || `Explore ${other.name} real estate`}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
