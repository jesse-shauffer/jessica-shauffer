import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import StatCard from '@/components/StatCard';
import HomeValueChart from '@/components/HomeValueChart';

export const metadata: Metadata = {
  title: 'South Shore & MetroWest MA Real Estate Market Data — Jessica Shauffer',
  description: 'Current housing market data for the South Shore and MetroWest MA. Get expert analysis, median home values, and trends for Plymouth, Easton, Canton, and more.',
  openGraph: {
    title: 'South Shore & MetroWest MA Real Estate Market Data — Jessica Shauffer',
    description: 'Current housing market data for the South Shore and MetroWest MA. Get expert analysis, median home values, and trends for Plymouth, Easton, Canton, and more.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/market' },
};

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

export default function MarketPage() {
  return (
    <>
      <JsonLd data={marketSchema} />
      <JsonLd data={faqSchema} />
      
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/market-aerial.webp" alt="Aerial view of Eastern Massachusetts real estate" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Market Data</p>
          <h1 className="page-hero__title">Regional Market Insights</h1>
          <p className="page-hero__desc">Data-driven analysis across 25+ communities in the South Shore, MetroWest, and Bristol County to help you make informed decisions.</p>
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
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Micro-Market Dynamics</h2>
            <p>Real estate is hyper-local. Here is a look at what is driving the market across our three primary service areas.</p>
          </div>
          
          <div className="market-highlights">
            <div className="market-highlight">
              <h3><i className="ph ph-map-pin"></i> South Shore Coastal</h3>
              <ul>
                <li><strong>Towns:</strong> Plymouth, Hingham, Kingston, Halifax</li>
                <li><strong>Trend:</strong> High demand for coastal access and lifestyle amenities</li>
                <li><strong>Buyer Tip:</strong> Expect intense competition for turnkey properties near the water</li>
                <li><strong>Seller Tip:</strong> Emphasize lifestyle features and outdoor living spaces</li>
              </ul>
            </div>
            
            <div className="market-highlight">
              <h3><i className="ph ph-buildings"></i> MetroWest Commuter</h3>
              <ul>
                <li><strong>Towns:</strong> Canton, Sharon, Norwood, Westwood, Stoughton</li>
                <li><strong>Trend:</strong> Premium pricing driven by top-tier school districts and rail access</li>
                <li><strong>Buyer Tip:</strong> Pre-approval is mandatory; be prepared to waive minor contingencies</li>
                <li><strong>Seller Tip:</strong> Highlight commuter rail proximity and school ratings</li>
              </ul>
            </div>
            
            <div className="market-highlight">
              <h3><i className="ph ph-house-line"></i> Bristol County Value</h3>
              <ul>
                <li><strong>Towns:</strong> Easton, Mansfield, Norton, Raynham, Bridgewaters</li>
                <li><strong>Trend:</strong> Strong growth as buyers seek more square footage and yard space</li>
                <li><strong>Buyer Tip:</strong> Excellent opportunities for first-time buyers and growing families</li>
                <li><strong>Seller Tip:</strong> Focus on home office spaces and family-friendly neighborhood aspects</li>
              </ul>
            </div>
            
            <div className="market-highlight">
              <h3><i className="ph ph-trend-up"></i> Overall Market Outlook</h3>
              <ul>
                <li>Inventory remains historically tight across all 25 communities</li>
                <li>Interest rate stabilization is bringing more buyers back to the market</li>
                <li>Well-priced, move-in ready homes still generate multiple offers</li>
                <li>Strategic pricing is more important than ever to avoid stale listings</li>
              </ul>
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
              <Link href="/contact#consultation" className="btn btn--primary">Get a Personalized Market Analysis</Link>
            </div>
            <div className="split__media">
              <Image src="/assets/market-kitchen.webp" alt="Beautiful modern kitchen interior" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Curious About Your Specific Town?</h2>
            <p>Get a free, no-obligation home valuation or buyer consultation tailored to your exact community.</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
              <Link href="/contact#consultation" className="btn btn--accent btn--lg">Request Valuation</Link>
              <Link href="/communities" className="btn btn--outline btn--lg" style={{ borderColor: 'var(--white)', color: 'var(--white)' }}>Find Your Town</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
