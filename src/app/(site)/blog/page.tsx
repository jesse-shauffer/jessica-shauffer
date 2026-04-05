import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import BlogFilterClient from '@/components/BlogFilterClient';
import { getAllBlogPosts, getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Real Estate Blog — South Shore MA | Jessica Shauffer',
  description: 'Local real estate insights, market updates, neighborhood guides, and home buying tips for Easton, Attleboro, Mansfield, and the South Shore of Massachusetts.',
  openGraph: {
    title: 'Real Estate Blog — South Shore MA | Jessica Shauffer',
    description: 'Local real estate insights, market updates, neighborhood guides, and home buying tips for Easton, Attleboro, Mansfield, and the South Shore of Massachusetts.',
    url: 'https://www.jessicashauffer.com/blog',
    images: [{ url: '/assets/hero.webp', width: 1200, height: 630, alt: 'Jessica Shauffer Real Estate Blog' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Blog — South Shore MA | Jessica Shauffer',
    description: 'Local real estate insights, market updates, neighborhood guides, and home buying tips for Easton, Attleboro, Mansfield, and the South Shore of Massachusetts.',
    images: ['/assets/hero.webp'],
  },
  alternates: { canonical: '/blog' },
  robots: { index: false, follow: false },
};

export const TOPIC_LABELS: Record<string, string> = {
  'market-updates': 'Market Updates',
  'buying': 'Buying a Home',
  'selling': 'Selling a Home',
  'neighborhood-guides': 'Neighborhood Guides',
  'first-time-buyers': 'First-Time Buyers',
  'investment-relocation': 'Investment & Relocation',
  'local-lifestyle': 'Local Lifestyle',
  'tips-advice': 'Tips & Advice',
};

export default async function BlogPage() {
  const [posts, pageData] = await Promise.all([
    getAllBlogPosts(),
    getPageBySlug('blog'),
  ]);

  const heroImageSrc = pageData?.heroImage
    ? (typeof pageData.heroImage === 'string' ? pageData.heroImage : resolveHeroImage(pageData.heroImage, 1920))
    : '/assets/hero.webp';
  const heroTitle = pageData?.heroTitle || 'Real Estate Insights';
  const heroDesc = pageData?.heroDesc || 'Market updates, neighborhood guides, and home buying tips for Easton, Attleboro, Mansfield, and the South Shore of Massachusetts.';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.jessicashauffer.com/blog' },
    ],
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Jessica Shauffer Real Estate Blog',
    description: 'Local real estate insights, market updates, and neighborhood guides for the South Shore of Massachusetts.',
    url: 'https://www.jessicashauffer.com/blog',
    author: {
      '@type': 'Person',
      name: 'Jessica Shauffer',
      url: 'https://www.jessicashauffer.com/about',
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `https://www.jessicashauffer.com/blog/${p.slug.current}`,
      datePublished: p.publishedAt,
      description: p.excerpt,
    })),
  };

  // Serialize posts for client component
  const serializedPosts = posts.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug.current,
    publishedAt: p.publishedAt,
    topic: p.topic,
    secondaryTopic: p.secondaryTopic,
    excerpt: p.excerpt,
    author: p.author || 'Jessica Shauffer',
    heroImageUrl: p.heroImage ? resolveHeroImage(p.heroImage, 800) : '/assets/hero.webp',
    heroImageAlt: p.heroImageAlt || p.title,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogSchema} />

      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image
            src={heroImageSrc}
            alt="South Shore Massachusetts real estate insights"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Local Expertise</p>
          <h1 className="page-hero__title">{heroTitle}</h1>
          <p className="page-hero__desc">{heroDesc}</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Blog</li>
          </ol>
        </nav>
      </div>

      {/* BLOG GRID WITH CLIENT-SIDE FILTER */}
      <section className="section section--blog-grid">
        <div className="container">
          <BlogFilterClient posts={serializedPosts} topicLabels={TOPIC_LABELS} />
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Have a Real Estate Question?</h2>
              <p>
                Whether you&apos;re buying, selling, or just exploring the South Shore market &mdash; Jessica is happy to answer your questions with no obligation.
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
