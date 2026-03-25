import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import BuyersChart from '@/components/BuyersChart';
import ConsultationForm from '@/components/ConsultationForm';
import ReviewCarousel from '@/components/ReviewCarousel';
import { getReviews, getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('buyers');
  const title = page?.metaTitle || 'Buy a Home in South Shore MA | Jessica Shauffer';
  const description = page?.metaDescription || 'Expert buyer representation for South Shore and MetroWest MA real estate. Let top 3% agent Jessica Shauffer guide you to your dream home.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    openGraph: { title, description, images: [ogImage] },
    alternates: { canonical: '/buyers' },
  };
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Buyer Representation',
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Jessica Shauffer',
    url: 'https://www.jessicashauffer.com',
  },
  areaServed: [
    { '@type': 'Place', name: 'South Shore Massachusetts' },
    { '@type': 'Place', name: 'MetroWest Massachusetts' },
    { '@type': 'Place', name: 'Bristol County Massachusetts' }
  ],
  description: 'Expert real estate buyer representation across 25+ communities in Eastern Massachusetts, including property search, negotiation, and closing support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I start the home buying process in MA?', acceptedAnswer: { '@type': 'Answer', text: 'The first step is a consultation to discuss your goals, followed immediately by getting pre-approved for a mortgage so you are ready to make strong offers.' } },
    { '@type': 'Question', name: 'What are the best towns for commuters south of Boston?', acceptedAnswer: { '@type': 'Answer', text: 'Towns like Canton, Sharon, Westwood, and Norwood offer excellent commuter rail access and top-rated schools.' } },
    { '@type': 'Question', name: 'Why should I use a buyer\'s agent?', acceptedAnswer: { '@type': 'Answer', text: 'A buyer\'s agent protects your interests, provides market analysis, handles complex negotiations, and guides you through inspections and closing—typically at no direct cost to you.' } },
  ],
};

export default async function BuyersPage() {
  const [reviews, page] = await Promise.all([getReviews(), getPageBySlug('buyers')]);
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);
  // Randomly pick 9 reviews on each server render — keeps carousel fresh without showing all 21
  const displayReviews = [...reviews].sort(() => Math.random() - 0.5).slice(0, 9);
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com/' },
          { '@type': 'ListItem', position: 2, name: "Buyer's Guide", item: 'https://www.jessicashauffer.com/buyers' },
        ],
      }} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={heroSrc} alt={page?.heroTitle || 'Beautiful modern living room interior'} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Buyer&apos;s Guide</p>
          <h1 className="page-hero__title">{page?.heroTitle || 'Find Your Dream Home in Eastern Mass'}</h1>
          <p className="page-hero__desc">{page?.heroDesc || 'From coastal Plymouth to commuter-friendly Canton, let top 3% agent Jessica Shauffer guide you home.'}</p>
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
            <h2>Why Buy in the South Shore & MetroWest</h2>
            <p>Eastern Massachusetts offers diverse communities to fit every lifestyle, from historic coastal towns to bustling commuter suburbs.</p>
          </div>
          
          <div className="info-grid">
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-graduation-cap"></i></div><h3>Top-Rated Schools</h3><p>Access to some of the state&apos;s best public school systems in towns like Sharon, Canton, and Hingham.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-train-simple"></i></div><h3>Commuter Access</h3><p>Strategic locations along the MBTA commuter rail lines and major highways (I-95, Route 3, Route 24) into Boston.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-anchor"></i></div><h3>Coastal Living</h3><p>Beautiful oceanfront and harbor communities like Plymouth, Kingston, and Hingham offer incredible lifestyle amenities.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-tree"></i></div><h3>Natural Beauty</h3><p>Thousands of acres of state parks, hiking trails, and conservation land spread across Bristol and Plymouth counties.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-house-line"></i></div><h3>Diverse Housing</h3><p>From historic Victorians to new construction developments and coastal cottages, there&apos;s a home for every aesthetic.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-chart-line-up"></i></div><h3>Smart Investment</h3><p>Consistent, long-term appreciation makes real estate in these 25 target towns a solid financial anchor.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Regional Pricing</p>
            <h2 className="section__title section__title--light">Understand Your Buying Power</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Compare median home prices across our key service areas to find the right fit for your budget and lifestyle.</p>
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
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-8)' }}>Buying a home in a competitive market requires strategy. Jessica walks you through every step — from first search to closing day and beyond.</p>
              
              <div className="process-list">
                {[
                  { num: '1', title: 'Strategic Consultation', desc: 'Discuss your goals, budget, timeline, and preferred towns. Jessica tailors the search to your exact needs across 25+ communities.' },
                  { num: '2', title: 'Mortgage Pre-Approval', desc: 'Get connected with trusted local lenders to determine your buying power and strengthen your offers.' },
                  { num: '3', title: 'Home Search & Tours', desc: 'Access listings before they hit the market, attend private showings, and explore neighborhoods hands-on.' },
                  { num: '4', title: 'Offer & Negotiation', desc: "Craft a winning offer with Jessica's competitive market insight and tenacious negotiation skills." },
                  { num: '5', title: 'Inspection & Closing', desc: 'Navigate inspections, appraisals, and paperwork with full support. Jessica stays with you through closing and beyond.' },
                ].map(s => (
                  <div key={s.num} className="process-step">
                    <div className="process-step__number">{s.num}</div>
                    <div className="process-step__content">
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
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

      {/* TESTIMONIALS */}
      <section className="section section--testimonials" id="reviews">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Client Success Stories</p>
            <h2 className="section__title">What Jessica&apos;s Clients Say</h2>
            <div className="reviews-summary">
              <div className="reviews-summary__stars">
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
              </div>
              <span className="reviews-summary__text">5.0 &middot; 19 Google Reviews</span>
            </div>
          </div>
          <ReviewCarousel reviews={displayReviews} />
        </div>
      </section>

      <section className="section section--form" id="consultation" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Ready to Start Looking?</p>
              <h2 className="section__title">Find Your Perfect Home</h2>
              <p>Your dream home in Eastern Massachusetts is waiting. Book a free consultation and Jessica will help you navigate the market, find the right community, and make a winning offer.</p>
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
