import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getReviews, getPageBySlug, resolveHeroImage } from '@/lib/sanity';
import { buildAgentSchema, websiteSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ReviewsSection from '@/components/ReviewsSection';
import ConsultationForm from '@/components/ConsultationForm';
import SellersChart from '@/components/SellersChart';

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
        text: "The Weinstein Keach Group at Coldwell Banker Realty is led by Stephanie Weinstein and Meredith Keach, and includes top-producing agents Jessica Shauffer, Alexa Weinstein, and Samantha Godfrey, among others. Jessica Shauffer is one of the team's highest-performing agents and a member of the Coldwell Banker Presidents Circle.",
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
              Serving 25 communities across the South Shore, MetroWest &amp; Bristol County, MA
            </p>
            <div className="hero__actions">
              <Link href="#consultation" className="btn btn--primary">Book Free Consultation</Link>
              <Link href="/communities" className="btn btn--outline">Explore Communities</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container stats-bar__grid">
          <div className="stat">
            <span className="stat__number">Top 3%</span>
            <span className="stat__label">Coldwell Banker Globally</span>
          </div>
          <div className="stat">
            <span className="stat__number">25+</span>
            <span className="stat__label">Communities Served</span>
          </div>
          <div className="stat">
            <span className="stat__number">5.0★</span>
            <span className="stat__label">Google Reviews</span>
          </div>
          <div className="stat">
            <span className="stat__number">$100M+</span>
            <span className="stat__label">In Sales</span>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section section--about" id="about">
        <div className="container about-split">
          <div className="about-split__image">
            <Image
              src="/assets/jessica.jpg"
              alt="Jessica Shauffer — Top 3% Coldwell Banker Agent, South Shore MA"
              width={560}
              height={700}
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
          <div className="about-split__content">
            <p className="section__label">About Jessica</p>
            <h2 className="section__title">South Shore&apos;s Most Trusted Real Estate Agent</h2>
            <p>
              Jessica Shauffer is a top-producing real estate agent with Coldwell Banker Realty, proudly serving the South Shore, MetroWest, and Bristol County communities of Eastern Massachusetts. A member of the prestigious Presidents Circle — an honor reserved for the top 3% of Coldwell Banker agents globally — Jessica brings unmatched market expertise and a client-first approach to every transaction.
            </p>
            <p>
              As a proud member of the award-winning Weinstein Keach Group, Jessica combines the resources of one of New England&apos;s top real estate teams with a deeply personal commitment to her clients. Whether you&apos;re buying your first home or selling a luxury property, Jessica delivers results.
            </p>
            <div className="credentials">
              <span className="credential">Presidents Circle</span>
              <span className="credential">CNRLS</span>
              <span className="credential">CBR</span>
              <span className="credential">MRP</span>
              <span className="credential">SCRP</span>
            </div>
            <Link href="/about" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
              Meet Jessica
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITIES PREVIEW */}
      <section className="section section--communities" id="communities">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Service Area</p>
            <h2 className="section__title">25 Communities Across Eastern Massachusetts</h2>
            <p className="section__desc">
              From the South Shore to MetroWest and Bristol County, Jessica Shauffer has the local knowledge to guide you home.
            </p>
          </div>
          <div className="county-grid">
            <div className="county-card">
              <h3 className="county-card__title">Plymouth County</h3>
              <p className="county-card__desc">South Shore communities with top schools and coastal living</p>
              <ul className="county-card__towns">
                <li>Easton</li><li>Bridgewater</li><li>Plymouth</li><li>Kingston</li>
                <li>Halifax</li><li>Lakeville</li><li>Middleborough</li>
              </ul>
              <Link href="/counties/plymouth-county" className="county-card__link">Explore Plymouth County →</Link>
            </div>
            <div className="county-card">
              <h3 className="county-card__title">Norfolk County</h3>
              <p className="county-card__desc">Top-rated schools and strong appreciation near Boston</p>
              <ul className="county-card__towns">
                <li>Canton</li><li>Sharon</li><li>Norwood</li><li>Westwood</li>
                <li>Stoughton</li><li>Weston</li>
              </ul>
              <Link href="/counties/norfolk-county" className="county-card__link">Explore Norfolk County →</Link>
            </div>
            <div className="county-card">
              <h3 className="county-card__title">Bristol County</h3>
              <p className="county-card__desc">Affordable options with excellent highway access</p>
              <ul className="county-card__towns">
                <li>Taunton</li><li>Raynham</li><li>Mansfield</li><li>Foxborough</li>
                <li>Attleboro</li><li>Norton</li><li>North Attleborough</li>
              </ul>
              <Link href="/counties/bristol-county" className="county-card__link">Explore Bristol County →</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/communities" className="btn btn--outline">View All 25 Communities</Link>
          </div>
        </div>
      </section>

      {/* SELLERS MARKET CHART */}
      <section className="section section--market" id="market">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Market Intelligence</p>
            <h2 className="section__title">South Shore Real Estate Market Trends</h2>
            <p className="section__desc">
              Median sale prices across key South Shore communities — updated monthly.
            </p>
          </div>
          <SellersChart />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/market" className="btn btn--outline">Full Market Report</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re buying, selling, or just exploring your options, Jessica offers a no-pressure, no-obligation consultation to help you understand the market and make the best decision for your family.
              </p>
              <ul className="consult-benefits">
                <li>Free home valuation for sellers</li>
                <li>Personalized buyer search strategy</li>
                <li>Local market insights for your town</li>
                <li>No obligation — just expert advice</li>
              </ul>
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
