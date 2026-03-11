import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import StatCard from '@/components/StatCard';
import ReviewCard from '@/components/ReviewCard';
import ConsultationForm from '@/components/ConsultationForm';
import ScrollHint from '@/components/ScrollHint';

export const metadata: Metadata = {
  title: 'Jessica Shauffer — Easton, MA Real Estate | Coldwell Banker Realty',
  description:
    'Buy or sell your home in Easton, MA with Jessica Shauffer — Coldwell Banker Presidents Circle, 5.0-star rated agent with 19 reviews. Free consultation.',
  alternates: { canonical: 'https://jessicashauffer.com' },
  openGraph: {
    title: 'Jessica Shauffer — Easton, MA Real Estate | Coldwell Banker Realty',
    description:
      'Buy or sell your home in Easton, MA with Jessica Shauffer — Coldwell Banker Presidents Circle, 5.0-star rated agent with 19 reviews. Free consultation.',
    url: 'https://jessicashauffer.com',
    images: [{ url: '/assets/hero.webp', width: 1200, height: 630, alt: 'Easton MA homes' }],
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
    {
      '@type': 'Organization',
      name: 'Weinstein Keach',
    },
    {
      '@type': 'Organization',
      name: 'Coldwell Banker Realty',
      url: 'https://www.coldwellbanker.com',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '159 Belmont St #1175',
    addressLocality: 'South Easton',
    addressRegion: 'MA',
    postalCode: '02375',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: 'Easton',
    addressRegion: 'MA',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '19',
    bestRating: '5',
    worstRating: '1',
  },
  award: 'Coldwell Banker Presidents Circle',
  review: [
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Hayley McLeod' },
      datePublished: '2026-03-03',
      reviewBody:
        'I would give Jess 10 stars if I could! As first time homebuyers, we were so grateful to have Jess by our side throughout the entire process. She was always available to answer our questions, provide guidance, and advocate for us. She truly went above and beyond to ensure we found the perfect home. We couldn\'t have done it without her!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Faride Muawad' },
      datePublished: '2025-06-10',
      reviewBody:
        'Jessica was a great realtor. We are new to the area and she was very knowledgeable about the towns and neighborhoods. She was always available and responsive. She helped us find the perfect home for our family. We highly recommend her!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Taryn Beuttler' },
      datePublished: '2024-03-10',
      reviewBody:
        'Jessica Shauffer single handedly made the experience of selling our home seamless and stress-free. She is incredibly knowledgeable, professional, and truly cares about her clients. She guided us through every step of the process and always had our best interests at heart. We couldn\'t have asked for a better realtor!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Dianna Abrams' },
      datePublished: '2024-03-10',
      reviewBody:
        'We used Jessica for the sale of our first home and the purchase of our second home. She was incredibly helpful, knowledgeable, and always available. She made the entire process smooth and stress-free. We highly recommend Jessica to anyone looking to buy or sell a home!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Sookie Noh' },
      datePublished: '2023-03-10',
      reviewBody:
        'If you are looking for a responsive, kind, knowledgeable agent, look no further. Jessica helped us find our dream home and made the process enjoyable. She is truly the best in the business!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Adina Preiss' },
      datePublished: '2023-03-10',
      reviewBody:
        'Jessica Shauffer was wonderful to work with \u2014 she sold our house for above asking and helped us find and purchase our new home. She is professional, responsive, and truly cares about her clients. Highly recommend!',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Michael & Lauren T.' },
      datePublished: '2024-11-15',
      reviewBody:
        "Jessica made buying our first home feel completely manageable. She walked us through every step, answered our countless questions with patience, and negotiated hard to get us $12,000 under asking price. We couldn't have asked for a better agent.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Sandra R.' },
      datePublished: '2024-10-02',
      reviewBody:
        "I was nervous about selling \u2014 hadn't moved in 22 years. Jessica's market knowledge was exceptional. She priced my home perfectly, and we had multiple offers within the first weekend. Final sale was 4% over list price.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'David K.' },
      datePublished: '2024-09-20',
      reviewBody:
        "We relocated from Chicago and needed someone who really knew the South Shore towns. Jessica's knowledge of Easton specifically \u2014 the schools, neighborhoods, commute times \u2014 was invaluable. Found us the perfect home in under three weeks.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Priya & Raj M.' },
      datePublished: '2024-08-14',
      reviewBody:
        "Jessica handled both the sale of our condo and purchase of our new home simultaneously. Flawless coordination. She's responsive, strategic, and genuinely cares about your outcome \u2014 not just closing a deal.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Tom & Elaine F.' },
      datePublished: '2024-07-30',
      reviewBody:
        'After interviewing three agents, Jessica stood out immediately. Her staging advice alone added at least $25,000 to our final price. Professional, honest, and incredibly hardworking. Will absolutely use her again.',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Carla D.' },
      datePublished: '2024-06-18',
      reviewBody:
        "First-time buyer, single income, tight budget \u2014 Jessica never made me feel like a small client. She found me a wonderful townhome in North Easton, below budget, with a finished basement I hadn't even hoped for. She's the real deal.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Brian & Stephanie O.' },
      datePublished: '2024-05-05',
      reviewBody:
        "We were in a seller's market and expected a bidding war. Jessica coached us on how to write a compelling offer, waive contingencies strategically, and ultimately we won \u2014 first offer, no war. She understood the sellers' motivations perfectly.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Monica L.' },
      datePublished: '2024-04-22',
      reviewBody:
        'Selling an estate property is complicated, and Jessica handled everything with grace and professionalism. Coordinated with attorneys, inspectors, and buyers seamlessly. Our family is so grateful for how smoothly the process went.',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'James & Olivia W.' },
      datePublished: '2024-03-10',
      reviewBody:
        "We've worked with agents before, but Jessica is a different caliber. She does the homework \u2014 comps, neighborhood data, school reports \u2014 before you even ask. Our home sold in 8 days for $31K over asking.",
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Rebecca & Finn C.' },
      datePublished: '2023-08-28',
      reviewBody:
        "Third time using Jessica \u2014 bought our starter home, sold it, bought our forever home. Every time she exceeds expectations. There's no one else we'd call. Easton is lucky to have her.",
    },
  ],
};

const reviews = [
  {
    body: 'I would give Jess 10 stars if I could! As first time homebuyers, we were so grateful to have Jess by our side throughout the entire process. She was always available to answer our questions, provide guidance, and advocate for us.',
    author: 'Hayley McLeod',
    role: 'First-Time Home Buyer',
    date: '2026-03-03',
  },
  {
    body: 'Jessica was a great realtor. We are new to the area and she was very knowledgeable about the towns and neighborhoods. She was always available and responsive. She helped us find the perfect home for our family.',
    author: 'Faride Muawad',
    role: 'Relocation Buyer',
    date: '2025-06-10',
  },
  {
    body: 'Jessica Shauffer single handedly made the experience of selling our home seamless and stress-free. She is incredibly knowledgeable, professional, and truly cares about her clients.',
    author: 'Taryn Beuttler',
    role: 'Home Seller',
    date: '2024-03-10',
  },
  {
    body: 'We used Jessica for the sale of our first home and the purchase of our second home. She was incredibly helpful, knowledgeable, and always available. She made the entire process smooth and stress-free.',
    author: 'Dianna Abrams',
    role: 'Buy & Sell Client',
    date: '2024-03-10',
  },
  {
    body: 'If you are looking for a responsive, kind, knowledgeable agent, look no further. Jessica helped us find our dream home and made the process enjoyable. She is truly the best in the business!',
    author: 'Sookie Noh',
    role: 'Home Buyer',
    date: '2023-03-10',
  },
  {
    body: 'Jessica Shauffer was wonderful to work with \u2014 she sold our house for above asking and helped us find and purchase our new home. She is professional, responsive, and truly cares about her clients. Highly recommend!',
    author: 'Adina Preiss',
    role: 'Buy & Sell Client',
    date: '2023-03-10',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={agentSchema} />

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero__bg">
          <Image
            src="/assets/hero.webp"
            alt="Beautiful homes in Easton, Massachusetts"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__overlay" aria-hidden="true" />
        </div>
        <div className="hero__content">
          <span className="hero__badge">Coldwell Banker Presidents Circle — Top 3% Globally</span>
          <h1 className="hero__title">
            Your Easton Real Estate Expert
          </h1>
          <p className="hero__subtitle">
            Whether you&apos;re buying your dream home or selling for top dollar, get the
            results you deserve with Jessica Shauffer and the award-winning Weinstein
            Keach Group.
          </p>
          <div className="hero__trust">
            <div className="hero__rating">
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <span>5.0 from 19 Google Reviews</span>
            </div>
          </div>
          <div className="hero__ctas">
            <a href="#consultation" className="btn btn--accent btn--lg">
              Book a Free Consultation
            </a>
            <a href="tel:+16179491046" className="btn btn--ghost btn--lg">
              <i className="ph ph-phone" aria-hidden="true"></i> (617) 949-1046
            </a>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* ── Agent Intro ── */}
      <section className="section section--agent" id="about">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Image
                src="/assets/jessica.jpg"
                alt="Jessica Shauffer, Coldwell Banker Realty"
                width={640}
                height={640}
                className="agent-portrait"
              />
            </div>
            <div className="split__content">
              <p className="section__label">Meet Your Agent</p>
              <h2 className="section__title">Jessica Shauffer</h2>
              <p className="agent-subtitle">
                Weinstein Keach Group | Coldwell Banker Realty
              </p>
              <p>
                Jessica is a seasoned, top-producing agent known for her outgoing personality,
                excellent communication, and detail-focused mindset. A member of the Coldwell Banker
                Presidents Circle (top 3% globally), she&apos;s a local expert who studies market
                trends daily and offers invaluable insights on neighborhoods, schools, and amenities.
              </p>
              <p>
                With a UMass degree in Sociology and Education, Jessica brings a natural talent for
                helping people. Whether you&apos;re a first-time buyer or selling your family home,
                she guides every step with patience, integrity, and relentless advocacy.
              </p>
              <div className="agent-creds">
                <span className="agent-cred">
                  <i className="ph ph-trophy" aria-hidden="true"></i>
                  Presidents Circle
                </span>
                <span className="agent-cred">
                  <i className="ph ph-star" aria-hidden="true"></i>
                  5.0 Google Rating
                </span>
                <span className="agent-cred">
                  <i className="ph ph-certificate" aria-hidden="true"></i>
                  10+ Designations
                </span>
              </div>
              <Link href="/about" className="btn btn--primary btn--lg">
                Learn More About Jessica
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Stats ── */}
      <section className="section section--stats" id="market-stats">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Market Snapshot</p>
            <h2 className="section__title">Easton by the Numbers</h2>
            <p className="section__desc">
              A competitive market with steady appreciation &mdash; here&apos;s what you need to know right now.
            </p>
          </div>
          <div className="stats-grid">
            <StatCard
              value="$662K"
              label="Avg. Home Value"
              delta="+5% YoY"
              deltaType="up"
            />
            <StatCard
              value="23"
              label="Median Days on Market"
              delta="Selling Fast"
              deltaType="down"
            />
            <StatCard
              value="101%"
              label="Sale-to-List Ratio"
              delta="Above Asking"
              deltaType="up"
            />
            <StatCard
              value="$380"
              label="Price per Sq. Ft."
              delta="Steady Growth"
              deltaType="neutral"
            />
          </div>
          <p className="stats-source">
            Data sourced from Zillow, Redfin, and Realtor.com &mdash; updated regularly.
          </p>
        </div>
      </section>

      {/* ── Buyers Section ── */}
      <section className="section section--split" id="buyers">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Image
                src="/assets/interior.webp"
                alt="Beautiful home interior in Easton MA"
                width={640}
                height={480}
              />
            </div>
            <div className="split__content">
              <p className="section__label">For Buyers</p>
              <h2 className="section__title">Find Your Dream Home in Easton</h2>
              <p>
                Easton offers the perfect balance of suburban charm and city access. Top-rated
                schools, beautiful neighborhoods like North Easton Village and Tanglewood Estates,
                and easy commutes via Route 24 and I-495.
              </p>
              <ul className="check-list">
                <li>
                  <i className="ph ph-check-circle" aria-hidden="true"></i>
                  Access off-market and pre-listed properties
                </li>
                <li>
                  <i className="ph ph-check-circle" aria-hidden="true"></i>
                  Expert negotiation to win in a competitive market
                </li>
                <li>
                  <i className="ph ph-check-circle" aria-hidden="true"></i>
                  Neighborhood tours and school district guidance
                </li>
                <li>
                  <i className="ph ph-check-circle" aria-hidden="true"></i>
                  Mortgage pre-qualification referrals
                </li>
              </ul>
              <Link href="/buyers" className="btn btn--primary btn--lg">
                Full Buyer&apos;s Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sellers Section ── */}
      <section className="section section--dark" id="sellers">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__media">
              <div className="seller-card">
                <div className="seller-card__header">
                  <i className="ph ph-chart-line-up"></i>
                  <span>Average Seller Outcome</span>
                </div>
                <div className="seller-card__stat">
                  <span className="seller-card__big">3.4%</span>
                  <span className="seller-card__sub">Year-over-year appreciation</span>
                </div>
                <div className="seller-card__divider"></div>
                <div className="seller-card__stat">
                  <span className="seller-card__big">23 Days</span>
                  <span className="seller-card__sub">Average time to sell</span>
                </div>
                <div className="seller-card__divider"></div>
                <div className="seller-card__stat">
                  <span className="seller-card__big">101%</span>
                  <span className="seller-card__sub">Of list price received</span>
                </div>
              </div>
            </div>
            <div className="split__content">
              <p className="section__label section__label--light">For Sellers</p>
              <h2 className="section__title section__title--light">Sell Smarter, Net More</h2>
              <p className="text--light">
                Easton homes are selling fast and at or above asking price. Jessica leverages her
                market analysis expertise, proven pricing strategies, innovative digital marketing,
                and home staging specialization to maximize your return.
              </p>
              <ul className="check-list check-list--light">
                <li><i className="ph ph-check-circle"></i> Complimentary home valuation</li>
                <li><i className="ph ph-check-circle"></i> Professional staging and photography</li>
                <li><i className="ph ph-check-circle"></i> Marketing across hundreds of websites and social platforms</li>
                <li><i className="ph ph-check-circle"></i> Tenacious negotiation for top dollar</li>
              </ul>
              <Link href="/sellers" className="btn btn--accent">Full Seller&apos;s Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Easton / Community ── */}
      <section className="section" id="easton">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Life in Easton</p>
            <h2 className="section__title">Why Families Love Easton</h2>
            <p className="section__desc">
              A tight-knit community with New England charm, natural beauty, and everything you need.
            </p>
          </div>
          <div className="community-grid">
            <div className="community-card community-card--featured">
              <Image
                src="/assets/park.webp"
                alt="Borderland State Park, Easton MA"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="community-card__overlay">
                <h3>Borderland State Park</h3>
                <p>1,800+ acres of trails, ponds, and historic beauty right in your backyard.</p>
              </div>
            </div>
            <div className="community-card">
              <div className="community-card__icon">
                <i className="ph-fill ph-graduation-cap" aria-hidden="true"></i>
              </div>
              <h3>Top-Rated Schools</h3>
              <p>Oliver Ames High School rated 8/10 with strong academics and extracurriculars.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon">
                <i className="ph-fill ph-train-simple" aria-hidden="true"></i>
              </div>
              <h3>Easy Commute</h3>
              <p>Quick access to Boston via Route 24 and I-495. Suburban living, city opportunity.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon">
                <i className="ph-fill ph-tree" aria-hidden="true"></i>
              </div>
              <h3>New England Charm</h3>
              <p>Historic villages, tree-lined streets, and a genuine sense of community.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon">
                <i className="ph-fill ph-house-line" aria-hidden="true"></i>
              </div>
              <h3>Growing Neighborhoods</h3>
              <p>New developments like Sawmill Village alongside established favorites like Tanglewood Estates.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="section section--testimonials" id="reviews">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Google Reviews</p>
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
          <div className="testimonials-grid">
            {reviews.map((review) => (
              <ReviewCard
                key={review.author}
                body={review.body}
                author={review.author}
                role={review.role}
                date={review.date}
              />
            ))}
          </div>
          <div className="reviews-more">
            <a
              href="https://www.google.com/maps/place/Jessica+Shauffer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <i className="ph ph-google-logo" aria-hidden="true"></i> See All 19 Reviews on Google
            </a>
            <a href="#consultation" className="btn btn--accent">
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* ── Consultation Form ── */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re ready to make a move or just exploring &mdash; a quick conversation
                with Jessica can save you time, money, and stress. No pressure, just expert advice
                from a top 3% agent.
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
                    <strong>Local Expertise</strong>
                    <span>Nearly a decade of Easton market knowledge</span>
                  </div>
                </div>
              </div>
              <div className="form-privacy">
                <i className="ph ph-lock-simple" aria-hidden="true"></i>
                Your info is private and will never be shared.
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
