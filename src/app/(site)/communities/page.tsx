import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import CommunitiesHoverList from '@/components/CommunitiesHoverList';
import { getAllNeighborhoods, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'South Shore & MetroWest MA Communities — Jessica Shauffer',
  description: 'Explore real estate and homes for sale across 25+ communities in the South Shore, MetroWest, and Bristol County, MA. Find your perfect town with Jessica Shauffer.',
  openGraph: {
    title: 'South Shore & MetroWest MA Communities — Jessica Shauffer',
    description: 'Explore real estate and homes for sale across 25+ communities in the South Shore, MetroWest, and Bristol County, MA. Find your perfect town with Jessica Shauffer.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/communities' },
};

// County mapping for each town slug
const COUNTY_MAP: Record<string, string> = {
  'easton': 'Bristol County',
  'north-easton': 'Bristol County',
  'south-easton': 'Bristol County',
  'mansfield': 'Bristol County',
  'norton': 'Bristol County',
  'raynham': 'Bristol County',
  'taunton': 'Bristol County',
  'attleboro': 'Bristol County',
  'north-attleborough': 'Bristol County',
  'bridgewater': 'Plymouth County',
  'west-bridgewater': 'Plymouth County',
  'east-bridgewater': 'Plymouth County',
  'hingham': 'Plymouth County',
  'kingston': 'Plymouth County',
  'halifax': 'Plymouth County',
  'lakeville': 'Plymouth County',
  'middleborough': 'Plymouth County',
  'plymouth': 'Plymouth County',
  'duxbury': 'Plymouth County',
  'marshfield': 'Plymouth County',
  'canton': 'Norfolk County',
  'sharon': 'Norfolk County',
  'stoughton': 'Norfolk County',
  'norwood': 'Norfolk County',
  'westwood': 'Norfolk County',
  'foxborough': 'Norfolk County',
  'weston': 'Norfolk County',
};

// Sub-neighborhoods to exclude (old Easton parts)
const EXCLUDED_SLUGS = new Set(['eastondale', 'north-easton', 'south-easton']);

export default async function CommunitiesPage() {
  const rawCommunities = await getAllNeighborhoods();

  // Filter out old sub-neighborhoods and map to the shape CommunitiesHoverList needs
  const communities = rawCommunities
    .filter((c) => !EXCLUDED_SLUGS.has(c.slug.current))
    .map((c) => ({
      slug: c.slug.current,
      name: c.name,
      tagline: c.tagline || `Explore ${c.name} real estate`,
      county: COUNTY_MAP[c.slug.current] || 'Massachusetts',
      image: resolveHeroImage(c.heroImage, 600),
    }));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Eastern Massachusetts Communities',
    itemListElement: communities.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `https://jessicashauffer.com/communities/${c.slug}`,
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
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-16)' }}>
            <h2>Discover Your Next Hometown</h2>
            <p>We serve {communities.length} distinct communities across Eastern Massachusetts. Hover any town to preview, then click to explore market data, local highlights, and listings.</p>
          </div>

          <CommunitiesHoverList towns={communities} />
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
