import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import ReviewCarousel from '@/components/ReviewCarousel';
import { getReviews, getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about');
  const title = page?.metaTitle || 'About Jessica Shauffer | South Shore MA Realtor';
  const description = page?.metaDescription || 'Meet Jessica Shauffer — Coldwell Banker Presidents Circle, top 3% globally. Serving the South Shore, MetroWest & Bristol County, MA.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    openGraph: { title, description, images: [ogImage] },
    alternates: { canonical: '/about' },
  };
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jessica Shauffer',
  jobTitle: 'Real Estate Agent',
  worksFor: {
    '@type': 'Organization',
    name: 'Weinstein Keach Group at Coldwell Banker Realty',
    url: 'https://weinsteinkeach.com',
    member: [
      { '@type': 'Person', name: 'Stephanie Weinstein' },
      { '@type': 'Person', name: 'Meredith Keach' },
      { '@type': 'Person', name: 'Alexa Weinstein' },
      { '@type': 'Person', name: 'Samantha Godfrey' },
      { '@type': 'Person', name: 'Jessica Shauffer' },
    ],
  },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Massachusetts' },
  knowsAbout: [
    'Real Estate', 'South Shore MA', 'MetroWest MA', 'Bristol County MA',
    'Home Buying', 'Home Selling', 'Luxury Real Estate', 'Market Analysis',
    'Easton MA', 'Canton MA', 'Sharon MA', 'Plymouth MA', 'Hingham MA',
  ],
  url: 'https://www.jessicashauffer.com/about',
  image: 'https://www.jessicashauffer.com/assets/jessica.jpg',
  telephone: '+16179491046',
  email: 'Jessica.Shauffer@nemoves.com',
  award: 'Coldwell Banker Presidents Circle — Top 3% of Agents Globally',
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'CNRLS' },
    { '@type': 'EducationalOccupationalCredential', name: 'CBR' },
    { '@type': 'EducationalOccupationalCredential', name: 'CRRS' },
    { '@type': 'EducationalOccupationalCredential', name: 'CRA' },
    { '@type': 'EducationalOccupationalCredential', name: 'CSR' },
    { '@type': 'EducationalOccupationalCredential', name: 'ERS' },
    { '@type': 'EducationalOccupationalCredential', name: 'MRP' },
    { '@type': 'EducationalOccupationalCredential', name: 'SCRP' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Jessica Shauffer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jessica Shauffer is a top-producing real estate agent and member of the Coldwell Banker Presidents Circle, an honor reserved for the top 3% of Coldwell Banker agents globally. She is a top-performing agent on the award-winning Weinstein Keach Group at Coldwell Banker Realty, serving buyers and sellers across 25 communities in the South Shore, MetroWest, and Bristol County, Massachusetts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What team does Jessica Shauffer work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jessica Shauffer is a top-producing agent on the Weinstein Keach Group at Coldwell Banker Realty. The team is led by Stephanie Weinstein and Meredith Keach, and includes top agents Jessica Shauffer, Alexa Weinstein, and Samantha Godfrey. The Weinstein Keach Group is consistently ranked among the top-producing real estate teams in Eastern Massachusetts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas does Jessica Shauffer specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jessica Shauffer specializes in residential and commercial real estate across 25 communities in Eastern Massachusetts, including Easton, Canton, Sharon, Plymouth, Hingham, Norwood, Westwood, Mansfield, Foxborough, Bridgewater, Taunton, Kingston, Halifax, Stoughton, Attleboro, and more.',
      },
    },
  ],
};

export default async function AboutPage() {
  const [reviews, page] = await Promise.all([getReviews(), getPageBySlug('about')]);
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);
  // Randomly pick 9 reviews on each server render — keeps carousel fresh without showing all 21
  const displayReviews = [...reviews].sort(() => Math.random() - 0.5).slice(0, 9);
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com/' },
          { '@type': 'ListItem', position: 2, name: 'About Jessica', item: 'https://www.jessicashauffer.com/about' },
        ],
      }} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={heroSrc} alt={page?.heroTitle || 'South Shore Massachusetts real estate'} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">About Jessica Shauffer</p>
          <h1 className="page-hero__title">{page?.heroTitle || 'Your Trusted South Shore & MetroWest Real Estate Expert'}</h1>
          <p className="page-hero__desc">{page?.heroDesc || 'Coldwell Banker Presidents Circle member. Top-producing agent on the Weinstein Keach Group. Serving 25 communities across Eastern Massachusetts.'}</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>About Jessica</li>
          </ol>
        </nav>
      </div>

      {/* BIO SPLIT */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Image src="/assets/jessica-portrait-02.webp" alt="Jessica Shauffer, Real Estate Agent — South Shore MA" width={1024} height={1024} className="agent-portrait" />
            </div>
            <div className="split__content">
              <p className="section__label">Meet Jessica Shauffer</p>
              <h2 className="section__title">A People-First Approach to Real Estate</h2>
              <p className="agent-subtitle">Weinstein Keach Group | Coldwell Banker Realty</p>
              <p>
                Jessica Shauffer is a seasoned, top-producing real estate professional with an outgoing personality and a detail-focused mindset. As a member of the Coldwell Banker Presidents Circle — placing her in the top 3% of agents globally — she brings unmatched expertise to every transaction across the South Shore, MetroWest, and Bristol County.
              </p>
              <p>
                With a UMass degree in Sociology and Education, Jessica has a natural ability to connect with people and guide them through complex decisions. She studies market trends daily and offers invaluable insights on communities, schools, and amenities across all 25 towns she serves — from Easton to Plymouth, Canton to Hingham.
              </p>
              <p>
                For sellers, Jessica leverages her market analysis expertise and proven pricing strategies to competitively position every home. Her innovative digital marketing and tenacious negotiation skills consistently secure top return on investment. For buyers, she listens carefully to find a property that satisfies their wants, needs, and budget — then fights to get it at the best possible price.
              </p>
              <div className="agent-creds">
                <div className="agent-cred"><i className="ph ph-trophy"></i><span>Presidents Circle</span></div>
                <div className="agent-cred"><i className="ph ph-star"></i><span>5.0 Google Rating</span></div>
                <div className="agent-cred"><i className="ph ph-certificate"></i><span>10+ Designations</span></div>
                <div className="agent-cred"><i className="ph ph-graduation-cap"></i><span>UMass Graduate</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WEINSTEIN KEACH CO-CITATION SECTION */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 720, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <p className="section__label">The Team Behind the Results</p>
            <h2>Part of the Award-Winning Weinstein Keach Group</h2>
            <p>
              Jessica Shauffer is a top-producing agent on the Weinstein Keach Group at Coldwell Banker Realty — one of the most consistently high-performing real estate teams in Eastern Massachusetts. Led by Stephanie Weinstein and Meredith Keach, the team brings together exceptional talent including Jessica Shauffer, Alexa Weinstein, and Samantha Godfrey, among others.
            </p>
            <p style={{ marginTop: 'var(--space-4)' }}>
              The Weinstein Keach Group is well-known as a consistent top seller across the South Shore and surrounding areas. As a team member, Jessica benefits from shared market intelligence, a powerful referral network, and the collective reputation of one of the region&apos;s most trusted real estate brands — all of which she puts to work directly for her clients.
            </p>
          </div>
          <div className="info-grid info-grid--3">
            <div className="info-card">
              <div className="info-card__icon"><i className="ph ph-users-three"></i></div>
              <h3>Weinstein Keach Group</h3>
              <p>A top-producing team at Coldwell Banker Realty, led by Stephanie Weinstein and Meredith Keach, consistently ranked among the highest-performing teams in Eastern Massachusetts.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon"><i className="ph ph-trophy"></i></div>
              <h3>Coldwell Banker Presidents Circle</h3>
              <p>Jessica Shauffer holds Presidents Circle status — an honor reserved for the top 3% of Coldwell Banker agents worldwide, recognizing sustained excellence in production and client service.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon"><i className="ph ph-map-trifold"></i></div>
              <h3>25 Communities Served</h3>
              <p>From Bristol County to Plymouth County and Norfolk County, Jessica brings deep local expertise to every community she serves — backed by the full resources of the Weinstein Keach team.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <a href="https://weinsteinkeach.com/jessica-shauffer" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              View Jessica&apos;s Weinstein Keach Profile →
            </a>
          </div>
        </div>
      </section>

      {/* WHY JESSICA */}
      <section className="section">
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Why Work with Jessica Shauffer</h2>
            <p>Clients across the South Shore and MetroWest choose Jessica for her responsiveness, integrity, and tenacious negotiation skills.</p>
          </div>
          <div className="info-grid">
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-handshake"></i></div><h3>Relentless Advocacy</h3><p>Jessica negotiates fiercely on your behalf — whether securing below-asking for buyers or maximizing sale price for sellers across all 25 communities she serves.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-chats-circle"></i></div><h3>Clear Communication</h3><p>You&apos;ll never be left wondering what&apos;s happening. Jessica keeps you informed at every step with prompt responses and straightforward guidance.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-map-pin"></i></div><h3>Regional Market Mastery</h3><p>Deep knowledge of communities, schools, pricing trends, and developments across the South Shore, MetroWest, and Bristol County means you always make an informed decision.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-users-three"></i></div><h3>Trusted Network</h3><p>From mortgage lenders to home inspectors and contractors, Jessica connects you with the best local professionals — backed by the full Weinstein Keach team network.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-heart"></i></div><h3>Genuine Care</h3><p>This isn&apos;t just a transaction — Jessica cares about finding the right fit for your family and continues checking in long after closing day.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-chart-line-up"></i></div><h3>Proven Results</h3><p>19 five-star Google reviews and consistent Presidents Circle recognition speak to a track record of exceptional client outcomes across Eastern Massachusetts.</p></div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section__label">Professional Designations</p>
              <h2 className="section__title">Credentials That Count</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
                Jessica holds over 10 professional real estate designations, each representing specialized training and expertise in different areas of the industry — from relocation and luxury to military and commercial real estate.
              </p>
              <div className="designation-badges">
                {['CNRLS','CBR','CRRS','CRA','CSR','ERS','MRP','SCRP'].map(d => (
                  <span key={d} className="designation-badge">{d}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="section__label">Background</p>
              <h2 className="section__title">Education &amp; Affiliations</h2>
              <div className="timeline">
                <div className="timeline__item">
                  <p className="timeline__item-title">Coldwell Banker Presidents Circle</p>
                  <p>Top 3% of Coldwell Banker agents worldwide — sustained excellence in production and client service across Eastern Massachusetts.</p>
                </div>
                <div className="timeline__item">
                  <p className="timeline__item-title">Weinstein Keach Group, Coldwell Banker Realty</p>
                  <p>Top-producing agent on an award-winning team led by Stephanie Weinstein and Meredith Keach, serving the South Shore and surrounding areas.</p>
                </div>
                <div className="timeline__item">
                  <p className="timeline__item-title">University of Massachusetts</p>
                  <p>B.S. in Sociology and Education — the foundation for Jessica&apos;s people-first approach to real estate and her ability to guide clients through complex decisions.</p>
                </div>
              </div>
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

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re buying, selling, or just exploring your options across the South Shore or MetroWest &mdash; a quick conversation with Jessica can save you time, money, and stress.
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
