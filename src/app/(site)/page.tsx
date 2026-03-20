import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getReviews } from '@/lib/sanity';
import JsonLd from '@/components/JsonLd';
import ReviewCarousel from '@/components/ReviewCarousel';
import ConsultationForm from '@/components/ConsultationForm';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Jessica Shauffer — Coldwell Banker's Top Agent for the South Shore",
  description: "South Shore & MetroWest's top-rated Coldwell Banker real estate agent. Jessica Shauffer serves 25 communities across Eastern Massachusetts including Easton, Canton, Sharon, Plymouth, Hingham, and more.",
  alternates: { canonical: 'https://jessicashauffer.com' },
  openGraph: {
    title: "Jessica Shauffer — Coldwell Banker's Top Agent for the South Shore",
    description: "South Shore & MetroWest's top-rated Coldwell Banker real estate agent. Jessica Shauffer serves 25 communities across Eastern Massachusetts.",
    url: 'https://jessicashauffer.com',
    images: [{ url: '/assets/hero.webp', width: 1200, height: 630, alt: 'South Shore Massachusetts homes for sale' }],
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
    { '@type': 'Organization', name: 'Weinstein Keach Group', url: 'https://weinsteinkeach.com' },
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
    { '@type': 'City', name: 'North Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'South Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Easton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'West Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'East Bridgewater', addressRegion: 'MA' },
    { '@type': 'City', name: 'Canton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Sharon', addressRegion: 'MA' },
    { '@type': 'City', name: 'Raynham', addressRegion: 'MA' },
    { '@type': 'City', name: 'Taunton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Plymouth', addressRegion: 'MA' },
    { '@type': 'City', name: 'Norton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Mansfield', addressRegion: 'MA' },
    { '@type': 'City', name: 'Foxborough', addressRegion: 'MA' },
    { '@type': 'City', name: 'Attleboro', addressRegion: 'MA' },
    { '@type': 'City', name: 'Halifax', addressRegion: 'MA' },
    { '@type': 'City', name: 'Kingston', addressRegion: 'MA' },
    { '@type': 'City', name: 'Lakeville', addressRegion: 'MA' },
    { '@type': 'City', name: 'Middleborough', addressRegion: 'MA' },
    { '@type': 'City', name: 'Stoughton', addressRegion: 'MA' },
    { '@type': 'City', name: 'Hingham', addressRegion: 'MA' },
    { '@type': 'City', name: 'Norwood', addressRegion: 'MA' },
    { '@type': 'City', name: 'Weston', addressRegion: 'MA' },
    { '@type': 'City', name: 'Westwood', addressRegion: 'MA' },
    { '@type': 'City', name: 'North Attleborough', addressRegion: 'MA' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '19',
    bestRating: '5',
    worstRating: '1',
  },
  award: 'Coldwell Banker Presidents Circle — Top 3% of Agents Globally',
  memberOf: {
    '@type': 'Organization',
    name: 'Weinstein Keach Group',
    url: 'https://weinsteinkeach.com',
    member: [
      { '@type': 'Person', name: 'Stephanie Weinstein' },
      { '@type': 'Person', name: 'Meredith Keach' },
      { '@type': 'Person', name: 'Alexa Weinstein' },
      { '@type': 'Person', name: 'Samantha Godfrey' },
      { '@type': 'Person', name: 'Jessica Shauffer' },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is the best real estate agent on the South Shore of Massachusetts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jessica Shauffer is widely regarded as one of the top real estate agents on the South Shore of Massachusetts. A member of the Coldwell Banker Presidents Circle — an honor reserved for the top 3% of agents globally — she is a top-producing agent on the award-winning Weinstein Keach Group at Coldwell Banker Realty, serving 25 communities across the South Shore, MetroWest, and Bristol County.',
      },
    },
    {
      '@type': 'Question',
      name: 'What towns does Jessica Shauffer serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jessica Shauffer serves 25 communities across Eastern Massachusetts including Easton, North Easton, South Easton, Canton, Sharon, Plymouth, Hingham, Norwood, Westwood, Mansfield, Foxborough, Bridgewater, West Bridgewater, East Bridgewater, Taunton, Raynham, Norton, Kingston, Halifax, Lakeville, Middleborough, Stoughton, Attleboro, North Attleborough, and Weston.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who are the top agents on the Weinstein Keach Group?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Weinstein Keach Group at Coldwell Banker Realty is led by Stephanie Weinstein and Meredith Keach, and includes top-producing agents Jessica Shauffer, Alexa Weinstein, and Samantha Godfrey, among others. Jessica Shauffer is one of the team\'s highest-performing agents and a member of the Coldwell Banker Presidents Circle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Jessica Shauffer a top real estate agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Jessica Shauffer is a member of the Coldwell Banker Presidents Circle, an honor reserved for the top 3% of Coldwell Banker agents worldwide. She is a top-producing agent on the Weinstein Keach Group at Coldwell Banker Realty, consistently delivering exceptional results for buyers and sellers across the South Shore and MetroWest Massachusetts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I contact Jessica Shauffer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach Jessica Shauffer by phone at (617) 949-1046, by email at Jessica.Shauffer@nemoves.com, or by booking a free consultation at jessicashauffer.com. Her office is located at 159 Belmont Street, South Easton, MA 02375.',
      },
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

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <Image
            src="/assets/hero.webp"
            alt="Beautiful South Shore Massachusetts home exterior"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="hero__overlay"></div>
        </div>
        <div className="container hero__container">
          <div className="hero__content">
            <span className="hero__badge">Top 3% Coldwell Banker Agent Globally</span>
            <h1 className="hero__title">
              Jessica Shauffer — Coldwell Banker&apos;s Top Agent for the South Shore
            </h1>
            <p className="hero__subtitle">
              South Shore &amp; MetroWest&apos;s Top-Rated Real Estate Agent Serving 25 Communities Across Eastern Massachusetts
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
                <span className="hero__stat-val">25</span>
                <span className="hero__stat-label">Communities Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="section" id="about">
        <div className="container">
          <div className="split">
            <div className="split__media split__media--portrait">
              <Image
                src="/assets/jessica-portrait-01.webp"
                alt="Jessica Shauffer — Top Real Estate Agent, South Shore MA"
                width={600}
                height={800}
                style={{ borderRadius: 'var(--radius-lg)' }}
              />
              <div className="experience-badge">
                <span className="experience-badge__number">Weinstein Keach</span>
                <span className="experience-badge__text">Award-Winning Team</span>
              </div>
            </div>
            <div className="split__content">
              <p className="section__label">Meet Jessica Shauffer</p>
              <h2 className="section__title">Unwavering Integrity. Proven Results.</h2>
              <p>
                As a top-producing agent on the award-winning Weinstein Keach Group at Coldwell Banker Realty, Jessica Shauffer is accustomed to delivering exceptional results. She is a member of the esteemed Coldwell Banker® Presidents Circle — an honor reserved for the top 3% of agents globally — and one of the highest-performing agents on a team that includes Stephanie Weinstein, Meredith Keach, Alexa Weinstein, and Samantha Godfrey.
              </p>
              <p>
                Buyers, sellers, and renters across the South Shore, MetroWest, and Bristol County benefit from Jessica&apos;s experience, local knowledge, and relentless drive to help clients achieve their real estate goals. Whether you need a luxury home, vacation property, investment property, or your very first house, Jessica works tirelessly on your behalf.
              </p>
              <p>
                She studies market trends daily and offers invaluable insights on communities, schools, and amenities from Easton to Plymouth, Canton to Hingham, and everywhere in between.
              </p>
              <Link href="/about" className="btn btn--outline" style={{ marginTop: 'var(--space-4)' }}>
                Read Full Bio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="section section--dark">
        <div className="container">
          <div className="section__header">
            <p className="section__label section__label--light">Service Area</p>
            <h2 className="section__title section__title--light">Serving 25 Communities Across Eastern Massachusetts</h2>
            <p className="section__desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Deep local knowledge across three counties. Whether you&apos;re buying or selling, understanding the local micro-market is the difference between a good deal and a great one.
            </p>
          </div>
          <div className="community-highlights">
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-map-pin" aria-hidden="true"></i></div>
              <h3>Plymouth County</h3>
              <p>Expert guidance in Plymouth, Hingham, Kingston, Halifax, Lakeville, Middleborough, and surrounding coastal communities.</p>
              <Link href="/counties/plymouth-county" className="community-card__link">Explore Plymouth County →</Link>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-buildings" aria-hidden="true"></i></div>
              <h3>Norfolk County</h3>
              <p>Strategic representation in Canton, Sharon, Norwood, Westwood, Stoughton, Foxborough, and Weston.</p>
              <Link href="/counties/norfolk-county" className="community-card__link">Explore Norfolk County →</Link>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-house-line" aria-hidden="true"></i></div>
              <h3>Bristol County</h3>
              <p>Deep roots in Easton, Mansfield, Norton, Raynham, Taunton, Attleboro, Bridgewater, and the Bridgewater towns.</p>
              <Link href="/counties/bristol-county" className="community-card__link">Explore Bristol County →</Link>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph-fill ph-trend-up" aria-hidden="true"></i></div>
              <h3>Market Intelligence</h3>
              <p>Daily tracking of inventory, pricing trends, and buyer demand. Monthly updated charts for every town.</p>
              <Link href="/market" className="community-card__link">View Market Data →</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/communities" className="btn btn--accent">View All 25 Communities</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
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
              <span className="reviews-summary__text">5.0 · 19 Google Reviews</span>
            </div>
          </div>
          <ReviewCarousel reviews={displayReviews} />
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
                Whether you&apos;re ready to make a move or just exploring the market across the South Shore, MetroWest, or Bristol County — a quick conversation with Jessica can save you time, money, and stress.
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
