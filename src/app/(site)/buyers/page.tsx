import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import BuyersChart from '@/components/BuyersChart';
import ConsultationForm from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: "Buyer's Guide — Easton, MA Homes for Sale | Jessica Shauffer",
  description: 'Your complete guide to buying a home in Easton, MA. Expert guidance from Jessica Shauffer on neighborhoods, schools, and the home buying process.',
  openGraph: {
    title: "Buyer's Guide — Easton, MA Homes for Sale | Jessica Shauffer",
    description: 'Your complete guide to buying a home in Easton, MA. Expert guidance from Jessica Shauffer on neighborhoods, schools, and the home buying process.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/buyers' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Buy a Home in Easton, MA',
  step: [
    { '@type': 'HowToStep', name: 'Free Consultation', text: 'Discuss your goals, budget, timeline, and preferred neighborhoods.' },
    { '@type': 'HowToStep', name: 'Mortgage Pre-Approval', text: 'Get connected with trusted local lenders to determine your buying power.' },
    { '@type': 'HowToStep', name: 'Home Search & Tours', text: 'Access listings before they hit the market and explore neighborhoods.' },
    { '@type': 'HowToStep', name: 'Offer & Negotiation', text: "Craft a winning offer with Jessica's competitive market insight." },
    { '@type': 'HowToStep', name: 'Inspection & Closing', text: 'Navigate inspections, appraisals, and paperwork with full support.' },
  ],
};

export default function BuyersPage() {
  return (
    <>
      <JsonLd data={howToSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/interior.webp" alt="Beautiful home interior in Easton MA" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Buyer&apos;s Guide</p>
          <h1 className="page-hero__title">Find Your Dream Home in Easton</h1>
          <p className="page-hero__desc">Top-rated schools, charming neighborhoods, and easy commutes — Easton has it all. Let Jessica guide you home.</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Buyer&apos;s Guide</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Why Buy in Easton</h2>
            <p>Easton offers the perfect balance of suburban tranquility and urban accessibility for families, professionals, and first-time buyers alike.</p>
          </div>
          <div className="info-grid">
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-graduation-cap"></i></div><h3>Top-Rated Schools</h3><p>Oliver Ames High School (8/10), strong elementary programs, and Stonehill College provide excellent educational opportunities at every level.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-tree"></i></div><h3>Natural Beauty</h3><p>Borderland State Park&apos;s 1,800+ acres, NRT Sheep Pasture trails, and tree-lined streets create a scenic, nature-rich environment.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-train-simple"></i></div><h3>Easy Commutes</h3><p>Route 24, I-495, and nearby commuter rail options put Boston, Providence, and Cape Cod within easy reach.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-house-line"></i></div><h3>Diverse Housing</h3><p>From historic Victorians in North Easton to new construction at Sawmill Village, there&apos;s a home for every lifestyle and budget.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-users-three"></i></div><h3>Strong Community</h3><p>Active town events, local shops like Shovel Town Brewery, and a welcoming neighborhood feel make Easton a place you&apos;ll love calling home.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-chart-line-up"></i></div><h3>Smart Investment</h3><p>With 5% annual appreciation and a 101% sale-to-list ratio, Easton homes are a solid investment for your future.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Neighborhood Pricing</p>
            <h2 className="section__title section__title--light">Find Your Price Range</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Easton offers options at every price point. Compare median home prices across neighborhoods to find the right fit for your budget.</p>
          </div>
          <BuyersChart />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section__label">The Process</p>
              <h2 className="section__title">Your Home Buying Journey</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-8)' }}>Buying a home doesn&apos;t have to be stressful. Jessica walks you through every step — from first search to closing day and beyond.</p>
              <div className="process-list">
                {[
                  { num: '1', title: 'Free Consultation', desc: 'Discuss your goals, budget, timeline, and preferred neighborhoods. Jessica tailors the search to your exact needs.' },
                  { num: '2', title: 'Mortgage Pre-Approval', desc: 'Get connected with trusted local lenders to determine your buying power and strengthen your offers.' },
                  { num: '3', title: 'Home Search & Tours', desc: 'Access listings before they hit the market, attend private showings, and explore neighborhoods hands-on.' },
                  { num: '4', title: 'Offer & Negotiation', desc: "Craft a winning offer with Jessica's competitive market insight and tenacious negotiation skills." },
                  { num: '5', title: 'Inspection & Closing', desc: 'Navigate inspections, appraisals, and paperwork with full support. Jessica stays with you through closing and beyond.' },
                ].map(s => (
                  <div key={s.num} className="process-step">
                    <div className="process-step__number">{s.num}</div>
                    <div className="process-step__content"><h3>{s.title}</h3><p>{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Image src="/assets/interior.webp" alt="Beautiful home interior" width={600} height={400} style={{ borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-lg)', width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--form" id="consultation" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Ready to Start Looking?</p>
              <h2 className="section__title">Find Your Easton Home</h2>
              <p>Your perfect home in Easton is waiting. Book a free consultation and Jessica will help you navigate the market, find the right neighborhood, and make a winning offer.</p>
              <div className="form-benefits">
                <div className="form-benefit">
                  <i className="ph ph-magnifying-glass"></i>
                  <div>
                    <strong>Custom Home Search</strong>
                    <span>Listings tailored to your criteria</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-map-pin"></i>
                  <div>
                    <strong>Neighborhood Tours</strong>
                    <span>See the area before you commit</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-handshake"></i>
                  <div>
                    <strong>Expert Negotiation</strong>
                    <span>Win in a competitive market</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-split__form">
              <ConsultationForm source="buyers" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
