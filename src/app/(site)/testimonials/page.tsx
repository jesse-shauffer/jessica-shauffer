import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import { getAllReviews, getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('testimonials');
  const title = page?.metaTitle || 'Client Reviews | Jessica Shauffer, South Shore MA Realtor';
  const description = page?.metaDescription || 'Read verified 5-star reviews from buyers & sellers who worked with Jessica Shauffer across the South Shore, MetroWest & Bristol County, MA.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://www.jessicashauffer.com/testimonials',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: '/testimonials' },
  };
}

export default async function TestimonialsPage() {
  const [reviews, page] = await Promise.all([getAllReviews(), getPageBySlug('reviews')]);
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);

  /* ── Schema: AggregateRating + individual Review items ── */
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Jessica Shauffer',
    url: 'https://www.jessicashauffer.com',
    image: 'https://www.jessicashauffer.com/assets/jessica.jpg',
    telephone: '+16179491046',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      reviewCount: String(reviews.length || 19),
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating ?? 5),
        bestRating: '5',
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com/' },
      { '@type': 'ListItem', position: 2, name: 'Testimonials', item: 'https://www.jessicashauffer.com/testimonials' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What do clients say about working with Jessica Shauffer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Jessica Shauffer holds a perfect 5-star rating across ${reviews.length || 19} verified client reviews. Clients consistently highlight her responsiveness, deep local market knowledge across the South Shore and MetroWest, and her ability to negotiate exceptional outcomes for both buyers and sellers.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is Jessica Shauffer a trustworthy real estate agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Jessica Shauffer is a Coldwell Banker Presidents Circle member — placing her in the top 3% of agents globally — and a top-producing agent on the award-winning Weinstein Keach Group. Her track record is backed by dozens of verified 5-star reviews from real buyers and sellers across Eastern Massachusetts.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many homes has Jessica Shauffer sold?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jessica Shauffer has successfully closed hundreds of transactions across 25 communities in Bristol, Norfolk, and Plymouth counties. Her consistent Presidents Circle recognition reflects sustained top-tier production year over year.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={aggregateRatingSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image
            src={heroSrc}
            alt={page?.heroTitle || 'Jessica Shauffer — 5-star rated South Shore MA real estate agent'}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            priority
          />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Client Testimonials</p>
          <h1 className="page-hero__title">{page?.heroTitle || 'Real Stories from Real Clients'}</h1>
          <p className="page-hero__desc">
            {page?.heroDesc || `${reviews.length || 19} verified 5-star reviews from buyers and sellers across the South Shore, MetroWest, and Bristol County, MA.`}
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Testimonials</li>
          </ol>
        </nav>
      </div>

      {/* AGGREGATE STATS BAR */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="testimonials-stats">
            <div className="testimonials-stat">
              <span className="testimonials-stat__value">5.0</span>
              <div className="testimonials-stat__stars" aria-label="5 out of 5 stars">
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
                <i className="ph-fill ph-star"></i>
              </div>
              <span className="testimonials-stat__label">Average Rating</span>
            </div>
            <div className="testimonials-stat testimonials-stat--divider"></div>
            <div className="testimonials-stat">
              <span className="testimonials-stat__value">{reviews.length || 19}</span>
              <span className="testimonials-stat__label">Verified Reviews</span>
            </div>
            <div className="testimonials-stat testimonials-stat--divider"></div>
            <div className="testimonials-stat">
              <span className="testimonials-stat__value">100%</span>
              <span className="testimonials-stat__label">5-Star Reviews</span>
            </div>
            <div className="testimonials-stat testimonials-stat--divider"></div>
            <div className="testimonials-stat">
              <span className="testimonials-stat__value">Top 3%</span>
              <span className="testimonials-stat__label">Coldwell Banker Globally</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW ROWS */}
      <section className="section">
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <p className="section__label">What Clients Say</p>
            <h2 className="section__title">Trusted by Buyers &amp; Sellers Across Eastern MA</h2>
            <p>Every review below comes from a real client who trusted Jessica with their most important financial decision.</p>
          </div>

          <div className="testimonials-rows" itemScope itemType="https://schema.org/ItemList">
            {reviews.map((review) => (
              <article
                key={review._id}
                className="testimonial-row"
                itemScope
                itemType="https://schema.org/Review"
                itemProp="itemListElement"
              >
                {/* Left: stars + source */}
                <div className="testimonial-row__meta">
                  <div className="testimonial-row__stars" aria-label="5 stars">
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                  </div>
                  {review.source && (
                    <span className="testimonial-row__source">{review.source}</span>
                  )}
                </div>

                {/* Center: quote */}
                <blockquote className="testimonial-row__body" itemProp="reviewBody">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Right: author */}
                <footer className="testimonial-row__footer">
                  <div className="testimonial-row__avatar" aria-hidden="true">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong itemProp="author">{review.author}</strong>
                    <span>{review.role || 'Client'}</span>
                  </div>
                  <meta itemProp="datePublished" content={review.date} />
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={String(review.rating ?? 5)} />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <p className="section__label">Why Clients Choose Jessica</p>
            <h2 className="section__title">The Qualities That Drive Results</h2>
          </div>
          <div className="info-grid info-grid--3">
            <div className="info-card">
              <div className="info-card__icon"><i className="ph ph-chats-circle"></i></div>
              <h3>Always Responsive</h3>
              <p>Clients consistently mention Jessica&apos;s prompt communication and availability throughout every step of the transaction — from first showing to closing day.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon"><i className="ph ph-handshake"></i></div>
              <h3>Fierce Negotiator</h3>
              <p>Whether securing below-asking price for buyers or maximizing sale price for sellers, Jessica&apos;s tenacious negotiation skills are a recurring theme across her reviews.</p>
            </div>
            <div className="info-card">
              <div className="info-card__icon"><i className="ph ph-map-pin"></i></div>
              <h3>Deep Local Knowledge</h3>
              <p>With expertise across 25 communities in Bristol, Norfolk, and Plymouth counties, Jessica brings the kind of hyper-local insight that makes a real difference in every deal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Ready to Be the Next Success Story?</h2>
              <p>
                Join the growing list of buyers and sellers who trusted Jessica Shauffer with their most important financial decision. A quick conversation is all it takes to get started.
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
                    <strong>Proven Results</strong>
                    <span>{reviews.length || 19} five-star reviews and counting</span>
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
