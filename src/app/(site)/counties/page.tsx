import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Massachusetts Counties — Bristol, Norfolk & Plymouth | Jessica Shauffer',
  description: 'Explore real estate across Bristol County, Norfolk County, and Plymouth County, MA with top Coldwell Banker agent Jessica Shauffer. 25 communities, monthly market data, and expert local guidance.',
  alternates: { canonical: 'https://jessicashauffer.com/counties' },
  openGraph: {
    title: 'Massachusetts Counties — Bristol, Norfolk & Plymouth | Jessica Shauffer',
    description: 'Explore real estate across Bristol County, Norfolk County, and Plymouth County, MA with top Coldwell Banker agent Jessica Shauffer.',
    url: 'https://jessicashauffer.com/counties',
    images: [{ url: '/assets/hero.webp', width: 1200, height: 630, alt: 'Eastern Massachusetts real estate by county' }],
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Massachusetts Counties Served by Jessica Shauffer',
  description: 'Real estate coverage across Bristol County, Norfolk County, and Plymouth County, Massachusetts.',
  numberOfItems: 3,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Bristol County, MA',
      url: 'https://jessicashauffer.com/counties/bristol-county',
      description: 'Easton, Mansfield, Norton, Raynham, Taunton, Attleboro, North Attleborough, Bridgewater, West Bridgewater, East Bridgewater',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Norfolk County, MA',
      url: 'https://jessicashauffer.com/counties/norfolk-county',
      description: 'Canton, Sharon, Norwood, Westwood, Stoughton, Foxborough, Weston',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Plymouth County, MA',
      url: 'https://jessicashauffer.com/counties/plymouth-county',
      description: 'Plymouth, Hingham, Kingston, Halifax, Lakeville, Middleborough',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jessicashauffer.com/' },
    { '@type': 'ListItem', position: 2, name: 'Counties', item: 'https://jessicashauffer.com/counties' },
  ],
};

const COUNTIES = [
  {
    slug: 'bristol-county',
    name: 'Bristol County',
    tagline: 'The Heart of the South Shore',
    description: 'Bristol County is home to some of the most sought-after communities in Eastern Massachusetts, including Easton, Mansfield, and the Bridgewater towns. With a mix of historic charm, excellent schools, and strong commuter access to Boston and Providence, Bristol County offers exceptional value for buyers and strong returns for sellers.',
    towns: ['Easton', 'North Easton', 'South Easton', 'Mansfield', 'Norton', 'Raynham', 'Taunton', 'Attleboro', 'North Attleborough', 'Bridgewater', 'West Bridgewater', 'East Bridgewater'],
    icon: 'ph-house-line',
    highlight: '12 Communities',
  },
  {
    slug: 'norfolk-county',
    name: 'Norfolk County',
    tagline: 'Affluent Towns, Top-Rated Schools',
    description: 'Norfolk County consistently ranks among the most desirable counties in Massachusetts, featuring high-income communities like Canton, Sharon, Westwood, and Weston. With top-rated school districts, convenient highway access, and a strong luxury market, Norfolk County attracts discerning buyers from across the region.',
    towns: ['Canton', 'Sharon', 'Norwood', 'Westwood', 'Stoughton', 'Foxborough', 'Weston'],
    icon: 'ph-buildings',
    highlight: '7 Communities',
  },
  {
    slug: 'plymouth-county',
    name: 'Plymouth County',
    tagline: 'Coastal Living & Historic Charm',
    description: 'Plymouth County stretches from the historic town of Plymouth on the coast to the inland communities of Lakeville and Middleborough. With waterfront properties, strong tourism economies, and growing residential demand, Plymouth County offers diverse opportunities for buyers and investors alike.',
    towns: ['Plymouth', 'Hingham', 'Kingston', 'Halifax', 'Lakeville', 'Middleborough'],
    icon: 'ph-map-pin',
    highlight: '6 Communities',
  },
];

export default function CountiesPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/hero.webp" alt="Eastern Massachusetts real estate by county" fill style={{ objectFit: 'cover' }} priority />
          <div className="hero__overlay"></div>
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Service Area</p>
          <h1 className="page-hero__title">Real Estate Across Three Massachusetts Counties</h1>
          <p className="page-hero__desc">
            Jessica Shauffer serves 25 communities across Bristol County, Norfolk County, and Plymouth County — bringing deep local expertise and monthly market data to every town.
          </p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Counties</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Coverage Area</p>
            <h2 className="section__title">Three Counties. 25 Communities. One Expert Agent.</h2>
            <p className="section__desc">
              Whether you are buying or selling in Bristol County, Norfolk County, or Plymouth County, Jessica Shauffer brings the same level of dedication, market intelligence, and proven results to every transaction.
            </p>
          </div>

          <div className="county-grid">
            {COUNTIES.map((county) => (
              <div key={county.slug} className="county-card">
                <div className="county-card__header">
                  <div className="county-card__icon">
                    <i className={`ph-fill ${county.icon}`} aria-hidden="true"></i>
                  </div>
                  <div>
                    <span className="county-card__badge">{county.highlight}</span>
                    <h2 className="county-card__title">{county.name}</h2>
                    <p className="county-card__tagline">{county.tagline}</p>
                  </div>
                </div>
                <p className="county-card__desc">{county.description}</p>
                <div className="county-card__towns">
                  {county.towns.map((town) => (
                    <Link
                      key={town}
                      href={`/communities/${town.toLowerCase().replace(/\s+/g, '-')}`}
                      className="town-pill"
                    >
                      {town}
                    </Link>
                  ))}
                </div>
                <Link href={`/counties/${county.slug}`} className="btn btn--outline county-card__cta">
                  Explore {county.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Why It Matters</p>
            <h2 className="section__title section__title--light">County-Level Market Intelligence</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Real estate markets vary significantly even between neighboring towns. Understanding county-level trends — median prices, inventory levels, days on market — gives buyers and sellers a critical edge. Jessica Shauffer tracks all of this data monthly across all 25 communities she serves.
            </p>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link href="/market" className="btn btn--accent btn--lg">View Regional Market Data</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Not Sure Which County Is Right for You?</h2>
            <p>Jessica Shauffer can walk you through the differences between Bristol, Norfolk, and Plymouth Counties — schools, commute times, price points, and lifestyle — so you can make the most informed decision possible.</p>
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Book a Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
