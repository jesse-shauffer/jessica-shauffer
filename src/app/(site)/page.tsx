import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getReviews, getPageBySlug, resolveHeroImage } from '@/lib/sanity';
import { buildAgentSchema, websiteSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ReviewCarousel from '@/components/ReviewCarousel';
import ConsultationForm from '@/components/ConsultationForm';
import SellersChart from '@/components/SellersChart';
import AgentAbout from '@/components/AgentAbout';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home');
  const title = page?.metaTitle || 'Jessica Shauffer — South Shore MA Real Estate';
  const description = page?.metaDescription || 'Top 3% Coldwell Banker agent serving 25 communities across the South Shore, MetroWest & Bristol County, MA. Free consultation.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    alternates: { canonical: 'https://www.jessicashauffer.com' },
    openGraph: {
      title,
      description,
      url: 'https://www.jessicashauffer.com',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'South Shore Massachusetts homes for sale' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

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
  const [reviews, page] = await Promise.all([getReviews(), getPageBySlug('home')]);
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);
  // Randomly pick 9 reviews on each server render — keeps carousel fresh without showing all 21
  const displayReviews = [...reviews].sort(() => Math.random() - 0.5).slice(0, 9);

  return (
    <>
      {/* Single authoritative RealEstateAgent entity — emitted on homepage only */}
      <JsonLd data={buildAgentSchema(reviews)} />
      <JsonLd data={faqSchema} />
      <JsonLd data={websiteSchema} />

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <Image
            src={heroSrc}
            alt={page?.heroTitle || 'Beautiful South Shore Massachusetts home exterior'}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="hero__overlay"></div>
        </div>
        <div className="container hero__container">
          <div className="hero__content">
            <span className="hero__badge">Top 3% Coldwell Banker Agent Globally</span>
            <h1 className="hero__title">
              Jessica Shauffer &mdash; Coldwell Banker&apos;s Top Agent for the South Shore
            </h1>
            <p className="hero__subtitle">
              Whether you&apos;re buying your dream home or selling for top dollar, get the results you deserve with Jessica Shauffer and the award-winning Weinstein Keach Group.
            </p>
            <div className="hero__trust">
              <div className="hero__rating">
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <i className="ph-fill ph-star" aria-hidden="true"></i>
                <span>5.0 from 21 Google Reviews</span>
              </div>
            </div>
            <div className="hero__actions">
              <Link href="#consultation" className="btn btn--accent btn--lg">
                Free Consultation
              </Link>
              <a href="tel:+16179491046" className="btn btn--ghost btn--lg">
                <i className="ph ph-phone" aria-hidden="true"></i> (617) 949-1046
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <AgentAbout />

      {/* SERVICE AREA */}
      <section className="section section--warm">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Service Area</p>
            <h2 className="section__title">Serving 25 Communities Across Eastern Massachusetts</h2>
            <p className="section__desc">
              Deep local knowledge across three counties. Whether you&apos;re buying or selling, understanding the local micro-market is the difference between a good deal and a great one.
            </p>
          </div>
          <div className="county-cards-grid">
            {/* Bristol County */}
            <div className="county-card">
              <div className="county-card__header">
                <div className="county-card__icon"><i className="ph-fill ph-house-line" aria-hidden="true"></i></div>
                <span className="county-card__count">12 Communities</span>
              </div>
              <h3 className="county-card__title">Bristol County</h3>
              <p className="county-card__tagline">The Heart of the South Shore</p>
              <p className="county-card__desc">Bristol County is home to some of the most sought-after communities in Eastern Massachusetts, including Easton, Mansfield, and the Bridgewater towns. With a mix of historic charm, excellent schools, and strong commuter access to Boston and Providence, Bristol County offers exceptional value for buyers and strong returns for sellers.</p>
              <div className="county-card__pills">
                {[['Easton','easton'],['North Easton','north-easton'],['South Easton','south-easton'],['Mansfield','mansfield'],['Norton','norton'],['Raynham','raynham'],['Taunton','taunton'],['Attleboro','attleboro'],['North Attleborough','north-attleborough'],['Bridgewater','bridgewater'],['West Bridgewater','west-bridgewater'],['East Bridgewater','east-bridgewater']].map(([name, slug]) => (
                  <Link key={slug} href={`/communities/${slug}`} className="county-pill">{name}</Link>
                ))}
              </div>
              <Link href="/counties/bristol-county" className="btn btn--outline county-card__btn">Explore Bristol County →</Link>
            </div>
            {/* Norfolk County */}
            <div className="county-card">
              <div className="county-card__header">
                <div className="county-card__icon"><i className="ph-fill ph-buildings" aria-hidden="true"></i></div>
                <span className="county-card__count">7 Communities</span>
              </div>
              <h3 className="county-card__title">Norfolk County</h3>
              <p className="county-card__tagline">Affluent Towns, Top-Rated Schools</p>
              <p className="county-card__desc">Norfolk County consistently ranks among the most desirable counties in Massachusetts, featuring high-income communities like Canton, Sharon, Westwood, and Weston. With top-rated school districts, convenient highway access, and a strong luxury market, Norfolk County attracts discerning buyers from across the region.</p>
              <div className="county-card__pills">
                {[['Canton','canton'],['Sharon','sharon'],['Norwood','norwood'],['Westwood','westwood'],['Stoughton','stoughton'],['Foxborough','foxborough'],['Weston','weston']].map(([name, slug]) => (
                  <Link key={slug} href={`/communities/${slug}`} className="county-pill">{name}</Link>
                ))}
              </div>
              <Link href="/counties/norfolk-county" className="btn btn--outline county-card__btn">Explore Norfolk County →</Link>
            </div>
            {/* Plymouth County */}
            <div className="county-card">
              <div className="county-card__header">
                <div className="county-card__icon"><i className="ph-fill ph-map-pin" aria-hidden="true"></i></div>
                <span className="county-card__count">6 Communities</span>
              </div>
              <h3 className="county-card__title">Plymouth County</h3>
              <p className="county-card__tagline">Coastal Living &amp; Historic Charm</p>
              <p className="county-card__desc">Plymouth County stretches from the historic town of Plymouth on the coast to the inland communities of Lakeville and Middleborough. With waterfront properties, strong tourism economies, and growing residential demand, Plymouth County offers diverse opportunities for buyers and investors alike.</p>
              <div className="county-card__pills">
                {[['Plymouth','plymouth'],['Hingham','hingham'],['Kingston','kingston'],['Halifax','halifax'],['Lakeville','lakeville'],['Middleborough','middleborough']].map(([name, slug]) => (
                  <Link key={slug} href={`/communities/${slug}`} className="county-pill">{name}</Link>
                ))}
              </div>
              <Link href="/counties/plymouth-county" className="btn btn--outline county-card__btn">Explore Plymouth County →</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <Link href="/communities" className="btn btn--primary">View All Communities</Link>
          </div>
        </div>
      </section>

      {/* FOR BUYERS */}
      <section className="section">
        <div className="container">
          <div className="split split--buyers">
            <div className="split__media">
              <Image
                src="/assets/market-kitchen.webp"
                alt="Beautiful South Shore home interior for buyers"
                width={720}
                height={540}
                style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: 'auto' }}
              />
            </div>
            <div className="split__content">
              <p className="section__label">For Buyers</p>
              <h2 className="section__title">Find Your Dream Home on the South Shore</h2>
              <p>Whether you&apos;re a first-time buyer or upgrading to your forever home, Jessica Shauffer delivers expert guidance, access to off-market listings, and tenacious negotiation across 25 communities in Eastern Massachusetts.</p>
              <ul className="split__checklist">
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Access off-market and pre-listed properties</li>
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Expert negotiation to win in a competitive market</li>
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Neighborhood tours and school district guidance</li>
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Mortgage pre-qualification referrals</li>
              </ul>
              <Link href="/buyers" className="btn btn--primary" style={{ marginTop: 'var(--space-6)' }}>
                Full Buyer&apos;s Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOR SELLERS */}
      <section className="section section--navy">
        <div className="container">
          <div className="split split--sellers">
            <div className="split__content">
              <p className="section__label section__label--gold">For Sellers</p>
              <h2 className="section__title section__title--light">Sell Smarter, Net More</h2>
              <p className="split__desc--light">South Shore homes are selling fast and at or above asking price. Jessica leverages her market analysis expertise, proven pricing strategies, innovative digital marketing, and home staging specialization to maximize your return.</p>
              <ul className="split__checklist split__checklist--light">
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Complimentary home valuation</li>
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Professional staging and photography</li>
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Marketing across hundreds of websites and social platforms</li>
                <li><i className="ph-fill ph-check-circle" aria-hidden="true"></i> Tenacious negotiation for top dollar</li>
              </ul>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-6)' }}>
                <Link href="/sellers" className="btn btn--accent">
                  Full Seller&apos;s Guide
                </Link>
                <Link href="/market" className="btn" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.5)', color: 'var(--white)' }}>
                  View Market Report
                </Link>
              </div>
            </div>
            <div className="split__chart">
              <SellersChart />
            </div>
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
              <span className="reviews-summary__text">5.0 · 21 Google Reviews</span>
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
