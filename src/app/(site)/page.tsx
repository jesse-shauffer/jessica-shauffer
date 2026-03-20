import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getReviews } from '@/lib/sanity';
import JsonLd from '@/components/JsonLd';
import ReviewCarousel from '@/components/ReviewCarousel';
import ConsultationForm from '@/components/ConsultationForm';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Jessica Shauffer — South Shore & MetroWest MA Real Estate Agent',
  description: 'Top 3% globally ranked Coldwell Banker real estate agent serving Easton, Canton, Sharon, Plymouth, and the greater South Shore MA. Buy or sell with Jessica Shauffer.',
  alternates: { canonical: 'https://jessicashauffer.com' },
  openGraph: {
    title: 'Jessica Shauffer — South Shore & MetroWest MA Real Estate Agent',
    description: 'Top 3% globally ranked Coldwell Banker real estate agent serving Easton, Canton, Sharon, Plymouth, and the greater South Shore MA. Buy or sell with Jessica Shauffer.',
    url: 'https://jessicashauffer.com',
    images: [{ url: '/assets/hero.webp', width: 1200, height: 630, alt: 'South Shore MA homes' }],
  },
};

const agentSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Jessica Shauffer',
  url: 'https://jessicashauffer.com',
  image: 'https://jessicashauffer.com/assets/jessica.jpg',
  telephone: '+16179491046',
  email: 'Jessica.Shauffer@nemoves.com',
  jobTitle: 'Real Estate Agent',
  worksFor: [
    { '@type': 'Organization', name: 'Weinstein Keach Group' },
    { '@type': 'Organization', name: 'Coldwell Banker Realty', url: 'https://www.coldwellbanker.com' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '159 Belmont St #1175',
    addressLocality: 'South Easton',
    addressRegion: 'MA',
    postalCode: '02375',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Canton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Sharon', addressRegion: 'MA' },
    { '@type': 'City', name: 'Plymouth', addressRegion: 'MA' },
    { '@type': 'City', name: 'Norwood', addressRegion: 'MA' },
    { '@type': 'City', name: 'Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'Hingham', addressRegion: 'MA' },
    { '@type': 'City', name: 'Westwood', addressRegion: 'MA' },
    { '@type': 'City', name: 'Mansfield', addressRegion: 'MA' },
    { '@type': 'City', name: 'Foxborough', addressRegion: 'MA' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '19',
    bestRating: '5',
    worstRating: '1',
  },
  award: 'Coldwell Banker Presidents Circle (Top 3% Globally)',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is the best real estate agent in the South Shore MA?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jessica Shauffer is a top 3% globally ranked Coldwell Banker agent and member of the award-winning Weinstein Keach Group, serving 25+ communities across the South Shore and MetroWest Massachusetts.' }
    },
    {
      '@type': 'Question',
      name: 'What towns does Jessica Shauffer serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jessica Shauffer serves Easton, Canton, Sharon, Plymouth, Hingham, Norwood, Westwood, Mansfield, Foxborough, Bridgewater, Taunton, Kingston, Halifax, Lakeville, Middleborough, Stoughton, Attleboro, North Attleborough, Raynham, Norton, and more.' }
    },
    {
      '@type': 'Question',
      name: 'Is Jessica Shauffer a top real estate agent?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Jessica Shauffer is a member of the Coldwell Banker Presidents Circle, an honor reserved for the top 3% of agents globally. She is part of the Weinstein Keach Group, consistently ranked among the top-producing teams in Eastern Massachusetts.' }
    },
  ],
};

export default async function HomePage() {
  const reviews = await getReviews();
  const displayReviews = reviews.slice(0, 6);

  return (
    <>
      <JsonLd data={agentSchema} />
      <JsonLd data={faqSchema} />
      <section className="hero">
        <div className="hero__bg">
          <Image src="/assets/hero.webp" alt="Beautiful South Shore Massachusetts home exterior" fill style={{ objectFit: 'cover' }} priority />
          <div className="hero__overlay"></div>
        </div>
        <div className="container hero__container">
          <div className="hero__content">
            <span className="hero__badge">Top 3% Coldwell Banker Agent Globally</span>
            <h1 className="hero__title">
              Your Guide to South Shore &amp; MetroWest Real Estate
            </h1>
            <p className="hero__desc">
              From historic Easton to coastal Plymouth, Jessica Shauffer delivers award-winning expertise, tenacious negotiation, and a seamless experience for buyers and sellers across Eastern Massachusetts.
            </p>
            <div className="hero__actions">
              <Link href="/contact#consultation" className="btn btn--primary btn--lg">
                Book a Free Consultation
              </Link>
              <Link href="/communities" className="btn btn--outline btn--lg">
                Explore Communities
              </Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-val">5.0</span>
                <span className="hero__stat-label">Google Rating</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-val">Top 3%</span>
                <span className="hero__stat-label">Agents Globally</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-val">25+</span>
                <span className="hero__stat-label">Towns Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="split">
            <div className="split__media split__media--portrait">
              <Image src="/assets/jessica-portrait-01.webp" alt="Jessica Shauffer - Top Real Estate Agent in Easton MA" width={600} height={800} style={{ borderRadius: 'var(--radius-lg)' }} />
              <div className="experience-badge">
                <span className="experience-badge__number">Weinstein Keach</span>
                <span className="experience-badge__text">Award-Winning Team</span>
              </div>
            </div>
            <div className="split__content">
              <p className="section__label">Meet Jessica Shauffer</p>
              <h2 className="section__title">Unwavering Integrity. Proven Results.</h2>
              <p>
                As part of the top-producing, award-winning Weinstein Keach Group, full-time Realtor Jessica Shauffer is accustomed to delivering results. Jessica is a member of the esteemed Coldwell Banker® Presidents Circle, an honor reserved for the top 3% of agents globally.
              </p>
              <p>
                Residential and commercial buyers, sellers, and renters across the South Shore and MetroWest areas benefit from Jessica&apos;s experience, knowledge, and sheer drive to help clients achieve their real estate goals. Whether you need a luxury home, vacation property, or your very first house, Jessica works tirelessly on your behalf.
              </p>
              <p>
                She listens carefully, studies market trends daily, and offers invaluable insights on neighborhoods, schools, and amenities from Easton to Plymouth and beyond.
              </p>
              <Link href="/about" className="btn btn--outline" style={{ marginTop: 'var(--space-4)' }}>
                Read Full Bio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Areas of Expertise</p>
            <h2 className="section__title section__title--light">Serving Eastern Massachusetts</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Deep local knowledge across 25+ communities. Whether you&apos;re buying or selling, understanding the local micro-market is the key to success.
            </p>
          </div>
          <div className="community-highlights">
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-map-pin" aria-hidden="true"></i></div>
              <h3>South Shore</h3>
              <p>Expert guidance in Plymouth, Hingham, Kingston, Halifax, and surrounding coastal communities.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-buildings" aria-hidden="true"></i></div>
              <h3>MetroWest</h3>
              <p>Strategic representation in Canton, Sharon, Norwood, Westwood, and Stoughton.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-house-line" aria-hidden="true"></i></div>
              <h3>Bristol County</h3>
              <p>Deep roots in Easton, Mansfield, Norton, Raynham, Taunton, and the Bridgewaters.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-trend-up" aria-hidden="true"></i></div>
              <h3>Market Analysis</h3>
              <p>Daily tracking of inventory, pricing trends, and buyer demand across all target towns.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/communities" className="btn btn--accent">View All 25 Communities</Link>
          </div>
        </div>
      </section>

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
              <span className="reviews-summary__text">5.0 from 19 Google Reviews</span>
            </div>
          </div>
          <ReviewCarousel reviews={displayReviews} />
        </div>
      </section>

      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re ready to make a move or just exploring the market across the South Shore or MetroWest — a quick conversation with Jessica can save you time, money, and stress.
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
                    <span>No cost, no obligation, no strings</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-shield-check" aria-hidden="true"></i>
                  <div>
                    <strong>Regional Expertise</strong>
                    <span>Data-driven insights for 25+ local towns</span>
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
