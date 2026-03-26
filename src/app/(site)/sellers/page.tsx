import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SellersChart from '@/components/SellersChart';
import StatCard from '@/components/StatCard';
import ConsultationForm from '@/components/ConsultationForm';
import { getPageBySlug, resolveHeroImage } from '@/lib/sanity';
import { buildBreadcrumbSchema, AGENT } from '@/lib/schema';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('sellers');
  const title = page?.metaTitle || 'Sell Your Home on the South Shore MA | Jessica Shauffer';
  const description = page?.metaDescription || 'Sell your home for top dollar with Jessica Shauffer. Expert pricing, staging, and digital marketing across Plymouth, Canton, Easton, and 25+ local towns.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://www.jessicashauffer.com/sellers',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: '/sellers' },
  };
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Seller Representation',
  provider: {
    '@type': 'RealEstateAgent',
    '@id': `${AGENT.url}/#agent`,
    name: AGENT.name,
    url: AGENT.url,
  },
  areaServed: [
    { '@type': 'Place', name: 'South Shore Massachusetts' },
    { '@type': 'Place', name: 'MetroWest Massachusetts' },
    { '@type': 'Place', name: 'Bristol County Massachusetts' }
  ],
  description: 'Expert real estate seller representation, including market analysis, home staging, digital marketing, and negotiation to maximize return on investment.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much is my home worth in Eastern Massachusetts?', acceptedAnswer: { '@type': 'Answer', text: 'Home values vary significantly by town. A free Comparative Market Analysis (CMA) from Jessica Shauffer will provide an accurate, data-driven valuation based on recent sales in your specific neighborhood.' } },
    { '@type': 'Question', name: 'What is the best time to sell a house in MA?', acceptedAnswer: { '@type': 'Answer', text: 'While spring and early fall are traditionally the strongest markets, low inventory in the South Shore and MetroWest means well-priced homes sell quickly year-round.' } },
    { '@type': 'Question', name: 'How do you market my home to buyers?', acceptedAnswer: { '@type': 'Answer', text: 'We use a comprehensive digital strategy including HDR photography, targeted social media ads, and syndication across hundreds of websites, leveraging the global reach of Coldwell Banker.' } },
  ],
};

export default async function SellersPage() {
  const page = await getPageBySlug('sellers');
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Seller's Guide", url: 'https://www.jessicashauffer.com/sellers' }])} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={heroSrc} alt={page?.heroTitle || 'Beautiful suburban neighborhood from above'} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Seller&apos;s Guide</p>
          <h1 className="page-hero__title">{page?.heroTitle || "Maximize Your Home's Value"}</h1>
          <p className="page-hero__desc">{page?.heroDesc || 'Data-driven pricing, elite marketing, and tenacious negotiation to get you top dollar across Eastern Massachusetts.'}</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Seller&apos;s Guide</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Regional Advantage</p>
            <h2 className="section__title">A Seller&apos;s Market</h2>
            <p className="section__desc">Inventory remains tight across the South Shore and MetroWest. Here is why it is a great time to list your property.</p>
          </div>
          <div className="stats-grid">
            <StatCard value="100.5%" label="Avg. Sale-to-List Ratio" delta="Above Asking" deltaType="up" />
            <StatCard value="28" label="Median Days to Sell" delta="Selling Fast" deltaType="down" />
            <StatCard value="+4.5%" label="Year-over-Year Growth" delta="Steady Gains" deltaType="up" />
            <StatCard value="High" label="Buyer Demand" delta="Multiple Offers Common" deltaType="neutral" />
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Market Performance</p>
            <h2 className="section__title section__title--light">Sellers Are Winning</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Homes across our 25 target communities consistently sell at or above asking price. Track the regional trends below.</p>
          </div>
          <SellersChart />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section__header">
            <p className="section__label">The Process</p>
            <h2 className="section__title">How Jessica Sells Your Home</h2>
            <p className="section__desc">From pricing strategy to closing, Jessica manages every detail to maximize your sale price and minimize your stress.</p>
          </div>
          <div className="process-grid">
            {[
              { num: '1', title: 'Data-Driven Valuation', desc: 'A complimentary, comprehensive market analysis to determine the optimal listing price for your specific town and neighborhood.' },
              { num: '2', title: 'Preparation & Staging', desc: "Expert guidance on high-ROI improvements, professional staging advice, and HDR photography to showcase your home's best features." },
              { num: '3', title: 'Global Marketing', desc: "Multi-platform marketing leveraging the Coldwell Banker network, targeted social ads, and Jessica's extensive buyer database." },
              { num: '4', title: 'Showings & Open Houses', desc: 'Professionally managed showings with rigorous feedback tracking and real-time updates on buyer interest.' },
              { num: '5', title: 'Negotiation & Closing', desc: 'Tenacious negotiation for the best price and terms, plus full support through inspection, appraisal, and the closing table.' },
            ].map(s => (
              <div key={s.num} className="process-step">
                <div className="process-step__number">{s.num}</div>
                <div className="process-step__content"><h3>{s.title}</h3><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <p className="section__label">What You Get</p>
            <h2 className="section__title">The Top 3% Advantage</h2>
          </div>
          <div className="advantage-grid">
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-camera"></i></div><h3>Elite Presentation</h3><p>Professional HDR photos, virtual tours, and floor plans that make your home stand out online where 95% of buyers start their search.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-globe-hemisphere-west"></i></div><h3>Global Reach</h3><p>As part of Coldwell Banker Presidents Circle, your listing gets syndicated globally, reaching buyers relocating to Massachusetts.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-target"></i></div><h3>Targeted Digital Ads</h3><p>Sophisticated social media campaigns targeting active buyers looking in your specific town and price point.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-scales"></i></div><h3>Strategic Pricing</h3><p>Hyper-local pricing strategies that generate competition, urgency, and multiple offer scenarios.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--form" id="consultation" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">What&apos;s Your Home Worth?</p>
              <h2 className="section__title">Get Your Free Home Valuation</h2>
              <p>Get a free, no-obligation home valuation based on current market conditions and comparable sales in your town. Jessica will prepare a detailed analysis within 24 hours.</p>
              <div className="form-benefits">
                <div className="form-benefit">
                  <i className="ph ph-chart-bar"></i>
                  <div>
                    <strong>Hyper-Local Analysis</strong>
                    <span>Based on recent sales in your exact neighborhood</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-currency-dollar-simple"></i>
                  <div>
                    <strong>100% Free</strong>
                    <span>No cost, no obligation to list</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-clock"></i>
                  <div>
                    <strong>24-Hour Turnaround</strong>
                    <span>Get your valuation fast and accurately</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-split__form">
              <ConsultationForm source="sellers" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
