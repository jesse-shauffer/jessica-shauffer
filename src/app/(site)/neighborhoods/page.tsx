import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getAllNeighborhoods, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: 'Easton, MA Neighborhoods — Explore Communities | Jessica Shauffer',
  description: 'Explore Easton MA neighborhoods: North Easton, South Easton, Five Corners, Furnace Village, Eastondale, and Unionville. Find your perfect community.',
  openGraph: {
    title: 'Easton, MA Neighborhoods — Explore Communities | Jessica Shauffer',
    description: 'Explore Easton MA neighborhoods: North Easton, South Easton, Five Corners, Furnace Village, Eastondale, and Unionville. Find your perfect community.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/neighborhoods' },
};

export default async function NeighborhoodsPage() {
  const neighborhoods = await getAllNeighborhoods();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Easton, MA Neighborhoods',
    itemListElement: neighborhoods.map((n, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: n.name,
      url: `https://jessicashauffer.com/neighborhoods/${n.slug.current}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/park.webp" alt="Beautiful New England scenery in Easton MA" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Neighborhoods</p>
          <h1 className="page-hero__title">Explore Easton&apos;s Communities</h1>
          <p className="page-hero__desc">From historic villages to growing family neighborhoods, Easton has a community for every lifestyle.</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Neighborhoods</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Discover Your Neighborhood</h2>
            <p>Each of Easton&apos;s six distinct neighborhoods has its own character, charm, and appeal. Click any neighborhood to explore in detail.</p>
          </div>
          <div className="neighborhood-grid">
            {neighborhoods.map((n) => (
              <Link key={n.slug.current} href={`/neighborhoods/${n.slug.current}`} className="neighborhood-card">
                <div className="neighborhood-card__bg">
                  <Image src={resolveHeroImage(n.heroImage, 600)} alt={n.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="neighborhood-card__arrow"><i className="ph ph-arrow-right"></i></div>
                <div className="neighborhood-card__content">
                  <h3>{n.name}</h3>
                  <p>{n.tagline}</p>
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
              <p className="section__label">Life in Easton</p>
              <h2 className="section__title">Why Families Love Easton</h2>
              <p>With 25,162 residents, top-rated schools, beautiful open spaces, and a genuine sense of community, Easton is consistently ranked among the best places to live on the South Shore.</p>
              <ul className="check-list">
                <li><i className="ph ph-check-circle"></i> Oliver Ames High School rated 8/10</li>
                <li><i className="ph ph-check-circle"></i> Borderland State Park — 1,800+ acres</li>
                <li><i className="ph ph-check-circle"></i> Average household income: $151,670</li>
                <li><i className="ph ph-check-circle"></i> Easy commutes via Route 24 &amp; I-495</li>
                <li><i className="ph ph-check-circle"></i> Shovel Town Brewery, local shops &amp; dining</li>
              </ul>
              <Link href="/contact#consultation" className="btn btn--primary">Find Your Perfect Neighborhood</Link>
            </div>
            <div className="split__media">
              <Image src="/assets/consultation.webp" alt="Jessica Shauffer neighborhood consultation" width={600} height={450} style={{ borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
