import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import StatCard from '@/components/StatCard';
import HomeValueChart from '@/components/HomeValueChart';

export const metadata: Metadata = {
  title: 'Easton, MA Real Estate Market Data — Jessica Shauffer',
  description: 'Current Easton MA housing market data: $662K avg home value, 23-day median time on market, 101% sale-to-list ratio. Get expert analysis from Jessica Shauffer.',
  openGraph: {
    title: 'Easton, MA Real Estate Market Data — Jessica Shauffer',
    description: 'Current Easton MA housing market data: $662K avg home value, 23-day median time on market, 101% sale-to-list ratio. Get expert analysis from Jessica Shauffer.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/market' },
};

const marketSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Easton, MA Real Estate Market Data',
  about: { '@type': 'City', name: 'Easton', containedInPlace: { '@type': 'State', name: 'Massachusetts' } },
  url: 'https://jessicashauffer.com/market',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the average home value in Easton, MA?', acceptedAnswer: { '@type': 'Answer', text: 'The average home value in Easton, MA is approximately $662,000, with a 5% year-over-year increase.' } },
    { '@type': 'Question', name: 'How fast are homes selling in Easton?', acceptedAnswer: { '@type': 'Answer', text: 'The median days on market in Easton is 23 days, indicating a fast-moving and competitive market.' } },
    { '@type': 'Question', name: 'What is the sale-to-list ratio in Easton?', acceptedAnswer: { '@type': 'Answer', text: 'Easton homes sell at 101% of their list price on average, meaning most homes sell above the asking price.' } },
  ],
};

export default function MarketPage() {
  return (
    <>
      <JsonLd data={marketSchema} />
      <JsonLd data={faqSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/market-aerial.webp" alt="Aerial view of Easton Massachusetts real estate" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Market Data</p>
          <h1 className="page-hero__title">Easton Real Estate Market</h1>
          <p className="page-hero__desc">A competitive market with steady appreciation. Here&apos;s the data you need to make an informed decision.</p>
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
            <p className="section__label">Market Snapshot</p>
            <h2 className="section__title">Easton by the Numbers</h2>
            <p className="section__desc">Key metrics for the current Easton, MA housing market.</p>
          </div>
          <div className="stats-grid">
            <StatCard value="$662K" label="Avg. Home Value" delta="+5% YoY" deltaType="up" />
            <StatCard value="23" label="Median Days on Market" delta="Selling Fast" deltaType="down" />
            <StatCard value="101%" label="Sale-to-List Ratio" delta="Above Asking" deltaType="up" />
            <StatCard value="$380" label="Price per Sq. Ft." delta="Steady Growth" deltaType="neutral" />
          </div>
          <p className="stats-source">Data sourced from Zillow, Redfin, and Realtor.com — updated regularly.</p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Home Value Trends</p>
            <h2 className="section__title section__title--light">Easton Home Values Over Time</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Easton home values have appreciated 57% since 2018, consistently outpacing the national average. Explore the trend below.</p>
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
            <h2>Market Insights</h2>
            <p>A deeper look at what&apos;s driving the Easton real estate market today.</p>
          </div>
          <div className="market-highlights">
            <div className="market-highlight">
              <h3><i className="ph ph-trend-up"></i> Buyer&apos;s Perspective</h3>
              <ul>
                <li>Homes are selling at 101% of list price — expect competition</li>
                <li>Median 23 days on market means you need to move quickly</li>
                <li>Average home value of $662K with steady 5% annual appreciation</li>
                <li>Pre-approval and strong offers are essential to win</li>
              </ul>
            </div>
            <div className="market-highlight">
              <h3><i className="ph ph-currency-dollar"></i> Seller&apos;s Perspective</h3>
              <ul>
                <li>Strong seller&apos;s market — homes consistently sell above asking</li>
                <li>Low inventory creates urgency among buyers</li>
                <li>Strategic pricing and staging can yield well above market value</li>
                <li>Spring and early fall remain the strongest selling seasons</li>
              </ul>
            </div>
            <div className="market-highlight">
              <h3><i className="ph ph-buildings"></i> Community Demographics</h3>
              <ul>
                <li>Population: 25,162 residents across diverse neighborhoods</li>
                <li>Median age: 45 — established, family-oriented community</li>
                <li>Average household income: $151,670</li>
                <li>9,324 households with a mix of families and professionals</li>
              </ul>
            </div>
            <div className="market-highlight">
              <h3><i className="ph ph-graduation-cap"></i> Schools &amp; Access</h3>
              <ul>
                <li>Oliver Ames High School rated 8/10 — strong academics</li>
                <li>4 elementary schools, 1 middle school, plus Stonehill College</li>
                <li>Direct access via Route 24 and I-495 for commuters</li>
                <li>30 minutes to Boston, Providence, and Cape Cod</li>
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
              <p>Easton&apos;s real estate market rewards those who are prepared. Whether you&apos;re buying or selling, having the right strategy and the right agent makes all the difference.</p>
              <p>Jessica monitors these numbers daily and can help you understand exactly how they impact your specific situation — your neighborhood, your property type, your timeline.</p>
              <Link href="/contact#consultation" className="btn btn--primary">Get a Personalized Market Analysis</Link>
            </div>
            <div className="split__media">
              <Image src="/assets/market-kitchen.webp" alt="Beautiful kitchen interior in Easton home" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Curious About Your Home&apos;s Value?</h2>
            <p>Get a free, no-obligation home valuation from Jessica based on current market conditions and comparable sales.</p>
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Request Your Free Valuation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
