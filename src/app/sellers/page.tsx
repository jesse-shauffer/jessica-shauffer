import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import SellersChart from '@/components/SellersChart';

export const metadata: Metadata = {
  title: "Seller's Guide — Sell Your Easton, MA Home | Jessica Shauffer",
  description: 'Sell your Easton MA home for top dollar with Jessica Shauffer. Homes selling in 23 days at 101% of list price. Free home valuation.',
  openGraph: {
    title: "Seller's Guide — Sell Your Easton, MA Home | Jessica Shauffer",
    description: 'Sell your Easton MA home for top dollar with Jessica Shauffer. Homes selling in 23 days at 101% of list price. Free home valuation.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/sellers' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Sell Your Home in Easton, MA',
  step: [
    { '@type': 'HowToStep', name: 'Home Valuation', text: 'A complimentary, data-driven market analysis to determine the optimal listing price.' },
    { '@type': 'HowToStep', name: 'Preparation & Staging', text: 'Expert guidance on improvements, professional staging, and high-quality photography.' },
    { '@type': 'HowToStep', name: 'Strategic Marketing', text: "Multi-platform marketing across hundreds of websites, social media, and Jessica's buyer network." },
    { '@type': 'HowToStep', name: 'Showings & Open Houses', text: 'Professionally managed showings with feedback tracking and real-time updates.' },
    { '@type': 'HowToStep', name: 'Negotiation & Closing', text: 'Tenacious negotiation for the best price and terms, plus full support through closing.' },
  ],
};

export default function SellersPage() {
  return (
    <>
      <JsonLd data={howToSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/hero.webp" alt="Easton Massachusetts homes aerial view" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Seller&apos;s Guide</p>
          <h1 className="page-hero__title">Sell Smarter, Net More</h1>
          <p className="page-hero__desc">Easton homes are selling fast and above asking. Jessica&apos;s proven strategy maximizes your return every time.</p>
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
            <p className="section__label">The Easton Advantage</p>
            <h2 className="section__title">It&apos;s a Great Time to Sell</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><span className="stat-card__value">101%</span><span className="stat-card__label">Sale-to-List Ratio</span><span className="stat-card__delta stat-card__delta--up">Above Asking</span></div>
            <div className="stat-card"><span className="stat-card__value">23</span><span className="stat-card__label">Median Days to Sell</span><span className="stat-card__delta stat-card__delta--down">Selling Fast</span></div>
            <div className="stat-card"><span className="stat-card__value">+5%</span><span className="stat-card__label">Year-over-Year Growth</span><span className="stat-card__delta stat-card__delta--up">Steady Gains</span></div>
            <div className="stat-card"><span className="stat-card__value">$380</span><span className="stat-card__label">Price per Sq. Ft.</span><span className="stat-card__delta stat-card__delta--neutral">Strong Demand</span></div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Market Performance</p>
            <h2 className="section__title section__title--light">Easton Sellers Are Winning</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Homes in Easton consistently sell at or above asking price, and they&apos;re selling fast. Track the quarterly trends below.</p>
          </div>
          <SellersChart />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section__header">
            <p className="section__label">The Process</p>
            <h2 className="section__title">How Jessica Sells Your Home</h2>
            <p className="section__desc">From pricing strategy to closing, Jessica manages every detail to maximize your home&apos;s sale price and minimize your stress.</p>
          </div>
          <div className="process-grid">
            {[
              { num: '1', title: 'Home Valuation', desc: 'A complimentary, data-driven market analysis to determine the optimal listing price for your property.' },
              { num: '2', title: 'Preparation & Staging', desc: "Expert guidance on improvements, professional staging, and high-quality photography to showcase your home's best features." },
              { num: '3', title: 'Strategic Marketing', desc: "Multi-platform marketing across hundreds of websites, social media, targeted ads, and Jessica's extensive buyer network." },
              { num: '4', title: 'Showings & Open Houses', desc: 'Professionally managed showings with feedback tracking and real-time updates on buyer interest.' },
              { num: '5', title: 'Negotiation & Closing', desc: 'Tenacious negotiation for the best price and terms, plus full support through inspection, appraisal, and closing.' },
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
            <h2 className="section__title">Jessica&apos;s Selling Advantage</h2>
          </div>
          <div className="advantage-grid">
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-camera"></i></div><h3>Professional Photography</h3><p>HDR photos and virtual tours that make your home stand out online where 95% of buyers start their search.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-megaphone"></i></div><h3>Digital Marketing</h3><p>Targeted social media campaigns, email blasts, and syndication across Zillow, Realtor.com, Redfin, and more.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-armchair"></i></div><h3>Staging Consultation</h3><p>Expert advice on presenting your home to appeal to the widest pool of buyers and command top dollar.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-scales"></i></div><h3>Pricing Strategy</h3><p>Data-driven pricing that generates competition and urgency, backed by daily market monitoring.</p></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)', paddingBlock: 'var(--space-16)' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>What&apos;s Your Home Worth?</h2>
            <p>Get a free, no-obligation home valuation based on current market conditions and comparable sales in your neighborhood.</p>
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Get My Free Valuation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
