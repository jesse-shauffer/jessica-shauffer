import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import CommunitiesHoverList from '@/components/CommunitiesHoverList';
import ConsultationForm from '@/components/ConsultationForm';
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

// Sub-neighborhoods to exclude (deleted from Sanity)
const EXCLUDED_SLUGS = new Set(['eastondale', 'five-corners', 'furnace-village', 'unionville']);

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

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re ready to make a move or just exploring the market across the South Shore, MetroWest, or Bristol County &mdash; a quick conversation with Jessica can save you time, money, and stress.
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
                    <strong>Regional Expertise</strong>
                    <span>Data-driven insights for 25 local communities</span>
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
