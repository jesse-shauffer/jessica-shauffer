import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getAllNeighborhoods, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'South Shore & MetroWest MA Communities — Jessica Shauffer',
  description: 'Explore real estate and homes for sale across 25+ communities in the South Shore, MetroWest, and Bristol County, MA. Find your perfect town with Jessica Shauffer.',
  openGraph: {
    title: 'South Shore & MetroWest MA Communities — Jessica Shauffer',
    description: 'Explore real estate and homes for sale across 25+ communities in the South Shore, MetroWest, and Bristol County, MA. Find your perfect town with Jessica Shauffer.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/neighborhoods' },
};

export default async function CommunitiesPage() {
  const communities = await getAllNeighborhoods();
  
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Eastern Massachusetts Communities',
    itemListElement: communities.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `https://jessicashauffer.com/neighborhoods/${c.slug.current}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/park.webp" alt="Beautiful New England scenery in Eastern MA" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Local Expertise</p>
          <h1 className="page-hero__title">Explore Our Communities</h1>
          <p className="page-hero__desc">From historic coastal villages to bustling commuter suburbs, discover the perfect town for your lifestyle across the South Shore and MetroWest.</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Communities</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Discover Your Next Hometown</h2>
            <p>We serve over 25 distinct communities across Eastern Massachusetts. Click any town below to explore market data, local highlights, and active real estate listings.</p>
          </div>
          
          <div className="neighborhood-grid">
            {communities.map((c) => (
              <Link key={c.slug.current} href={`/neighborhoods/${c.slug.current}`} className="neighborhood-card">
                <div className="neighborhood-card__bg">
                  <Image src={resolveHeroImage(c.heroImage, 600)} alt={c.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="neighborhood-card__arrow"><i className="ph ph-arrow-right"></i></div>
                <div className="neighborhood-card__content">
                  <h3>{c.name}</h3>
                  <p>{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="split">
            <div className="split__content">
              <p className="section__label">Regional Lifestyle</p>
              <h2 className="section__title">Why Buyers Love Eastern Mass</h2>
              <p>With top-rated public schools, beautiful coastal and forested open spaces, and excellent commuter access to Boston and Providence, the South Shore and MetroWest regions offer an unparalleled quality of life.</p>
              <ul className="check-list">
                <li><i className="ph ph-check-circle"></i> Top-tier public school districts statewide</li>
                <li><i className="ph ph-check-circle"></i> Miles of coastal beaches and harbor access</li>
                <li><i className="ph ph-check-circle"></i> Direct MBTA commuter rail access to Boston</li>
                <li><i className="ph ph-check-circle"></i> Historic downtowns with local dining and shops</li>
                <li><i className="ph ph-check-circle"></i> Strong, consistent property value appreciation</li>
              </ul>
              <Link href="/contact#consultation" className="btn btn--primary">Find Your Perfect Town</Link>
            </div>
            <div className="split__media">
              <Image src="/assets/consultation.webp" alt="Jessica Shauffer real estate consultation" width={600} height={450} style={{ borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
