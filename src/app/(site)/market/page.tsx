import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import StatCard from '@/components/StatCard';
import HomeValueChart from '@/components/HomeValueChart';
import { getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('market');
  const title = page?.metaTitle || 'South Shore MA Real Estate Market Data | Jessica Shauffer';
  const description = page?.metaDescription || 'Current housing market data for the South Shore and MetroWest MA. Get expert analysis, median home values, and trends for Plymouth, Easton, Canton, and more.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    openGraph: { title, description, images: [ogImage] },
    alternates: { canonical: '/market' },
  };
}

const marketSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'South Shore & MetroWest MA Real Estate Market Data',
  about: { '@type': 'Place', name: 'Eastern Massachusetts' },
  url: 'https://jessicashauffer.com/market',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the current state of the South Shore MA real estate market?', acceptedAnswer: { '@type': 'Answer', text: 'The South Shore market remains highly competitive with low inventory driving strong demand. Homes in towns like Plymouth and Hingham frequently sell at or above asking price within weeks.' } },
    { '@type': 'Question', name: 'Are home prices dropping in MetroWest MA?', acceptedAnswer: { '@type': 'Answer', text: 'No, home prices in MetroWest towns like Canton, Sharon, and Westwood continue to show steady year-over-year appreciation due to excellent school systems and commuter access to Boston.' } },
    { '@type': 'Question', name: 'How fast are homes selling in Bristol County?', acceptedAnswer: { '@type': 'Answer', text: 'In towns like Easton, Mansfield, and Norton, the median days on market remains low, typically under 30 days, indicating a fast-moving seller\'s market.' } },
  ],
};

export default async function MarketPage() {
  const page = await getPageBySlug('market');
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);
  return (
    <>
      <JsonLd data={marketSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jessicashauffer.com/' },
          { '@type': 'ListItem', position: 2, name: 'Market Data', item: 'https://jessicashauffer.com/market' },
        ],
      }} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={heroSrc} alt={page?.heroTitle || 'Aerial view of Eastern Massachusetts real estate'} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Market Data</p>
          <h1 className="page-hero__title">{page?.heroTitle || 'Regional Market Insights'}</h1>
          <p className="page-hero__desc">{page?.heroDesc || 'Data-driven analysis across 25+ communities in the South Shore, MetroWest, and Bristol County to help you make informed decisions.'}</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Market Data</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Regional Snapshot</p>
            <h2 className="section__title">Eastern Mass by the Numbers</h2>
            <p className="section__desc">While every town is unique, these aggregated metrics highlight the overall strength of the regional market.</p>
          </div>
          <div className="stats-grid">
            <StatCard value="$725K" label="Avg. Regional Home Value" delta="+4.5% YoY" deltaType="up" />
            <StatCard value="28" label="Median Days on Market" delta="Selling Fast" deltaType="down" />
            <StatCard value="100.5%" label="Sale-to-List Ratio" delta="At or Above Asking" deltaType="up" />
            <StatCard value="$410" label="Price per Sq. Ft." delta="Steady Growth" deltaType="neutral" />
          </div>
          <p className="stats-source">Aggregated data across 25 target communities — updated regularly.</p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Home Value Trends</p>
            <h2 className="section__title section__title--light">Regional Appreciation Over Time</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Home values across the South Shore and MetroWest have appreciated significantly since 2018, consistently outpacing the national average. Explore the trend below.</p>
          </div>
          <HomeValueChart />
        </div>
      </section>

      <section className="section" style={{ padding: 0 }}>
        <Image src="/assets/market-neighborhood.webp" alt="Aerial view of New England neighborhood in autumn" width={1920} height={400} style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section__header">
            <p className="section__label">Micro-Market Dynamics</p>
            <h2 className="section__title">What&apos;s Driving Each Region</h2>
            <p className="section__desc">Real estate is hyper-local. Here is a look at what is driving the market across our three primary service areas.</p>
          </div>

          <div className="market-highlights">
            <div className="market-highlight">
              <div className="market-highlight__header">
                <div className="market-highlight__icon"><i className="ph ph-map-pin" aria-hidden="true"></i></div>
                <div>
                  <span className="market-highlight__badge">South Shore</span>
                  <h3 className="market-highlight__title">South Shore Coastal</h3>
                </div>
              </div>
              <div className="market-highlight__rows">
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Towns</span>
                  <span className="market-highlight__row-value">Plymouth, Hingham, Kingston, Halifax</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Trend</span>
                  <span className="market-highlight__row-value">High demand for coastal access and lifestyle amenities</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Buyer Tip</span>
                  <span className="market-highlight__row-value">Expect intense competition for turnkey properties near the water</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Seller Tip</span>
                  <span className="market-highlight__row-value">Emphasize lifestyle features and outdoor living spaces</span>
                </div>
              </div>
            </div>

            <div className="market-highlight">
              <div className="market-highlight__header">
                <div className="market-highlight__icon"><i className="ph ph-buildings" aria-hidden="true"></i></div>
                <div>
                  <span className="market-highlight__badge">MetroWest</span>
                  <h3 className="market-highlight__title">MetroWest Commuter</h3>
                </div>
              </div>
              <div className="market-highlight__rows">
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Towns</span>
                  <span className="market-highlight__row-value">Canton, Sharon, Norwood, Westwood, Stoughton</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Trend</span>
                  <span className="market-highlight__row-value">Premium pricing driven by top-tier school districts and rail access</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Buyer Tip</span>
                  <span className="market-highlight__row-value">Pre-approval is mandatory; be prepared to waive minor contingencies</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Seller Tip</span>
                  <span className="market-highlight__row-value">Highlight commuter rail proximity and school ratings</span>
                </div>
              </div>
            </div>

            <div className="market-highlight">
              <div className="market-highlight__header">
                <div className="market-highlight__icon"><i className="ph ph-house-line" aria-hidden="true"></i></div>
                <div>
                  <span className="market-highlight__badge">Bristol County</span>
                  <h3 className="market-highlight__title">Bristol County Value</h3>
                </div>
              </div>
              <div className="market-highlight__rows">
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Towns</span>
                  <span className="market-highlight__row-value">Easton, Mansfield, Norton, Raynham, Bridgewater</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Trend</span>
                  <span className="market-highlight__row-value">Strong growth as buyers seek more square footage and yard space</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Buyer Tip</span>
                  <span className="market-highlight__row-value">Excellent opportunities for first-time buyers and growing families</span>
                </div>
                <div className="market-highlight__row">
                  <span className="market-highlight__row-label">Seller Tip</span>
                  <span className="market-highlight__row-value">Focus on home office spaces and family-friendly neighborhood aspects</span>
                </div>
              </div>
            </div>

            <div className="market-highlight market-highlight--outlook">
              <div className="market-highlight__header">
                <div className="market-highlight__icon market-highlight__icon--gold"><i className="ph ph-trend-up" aria-hidden="true"></i></div>
                <div>
                  <span className="market-highlight__badge">2025 Outlook</span>
                  <h3 className="market-highlight__title">Overall Market Outlook</h3>
                </div>
              </div>
              <div className="market-highlight__rows">
                <div className="market-highlight__row market-highlight__row--bullet">
                  <span className="market-highlight__row-value">Inventory remains historically tight across all 25 communities</span>
                </div>
                <div className="market-highlight__row market-highlight__row--bullet">
                  <span className="market-highlight__row-value">Interest rate stabilization is bringing more buyers back to the market</span>
                </div>
                <div className="market-highlight__row market-highlight__row--bullet">
                  <span className="market-highlight__row-value">Well-priced, move-in ready homes still generate multiple offers</span>
                </div>
                <div className="market-highlight__row market-highlight__row--bullet">
                  <span className="market-highlight__row-value">Strategic pricing is more important than ever to avoid stale listings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__content">
              <p className="section__label">Expert Analysis</p>
              <h2 className="section__title">What This Means for You</h2>
              <p>The Eastern Massachusetts real estate market rewards those who are prepared. Whether you are buying in Plymouth, selling in Canton, or investing in Easton, having the right strategy and the right agent makes all the difference.</p>
              <p>Jessica monitors these micro-markets daily and can help you understand exactly how regional trends impact your specific situation — your target neighborhood, your property type, and your timeline.</p>
              <Link href="#consultation" className="btn btn--primary">Get a Personalized Market Analysis</Link>
            </div>
            <div className="split__media">
              <Image src="/assets/market-kitchen.webp" alt="Beautiful modern kitchen interior" width={600} height={400} />
            </div>
          </div>
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
                Curious about your specific town? Whether you&apos;re ready to make a move or just exploring the market &mdash; a quick conversation with Jessica can save you time, money, and stress.
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
                    <strong>Local Market Data</strong>
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
