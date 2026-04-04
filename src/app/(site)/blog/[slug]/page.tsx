import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getBlogPostsByTopic,
  resolveHeroImage,
  urlFor,
} from '@/lib/sanity';
import { TOPIC_LABELS } from '../page';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.ogImage
    ? resolveHeroImage(post.ogImage, 1200)
    : post.heroImage
    ? resolveHeroImage(post.heroImage, 1200)
    : '/assets/hero.webp';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.jessicashauffer.com/blog/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'Jessica Shauffer'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

// Portable Text component overrides
const ptComponents = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      const src = urlFor(value.asset as Parameters<typeof urlFor>[0]).width(1200).url();
      return (
        <figure className="blog-post__figure">
          <Image
            src={src}
            alt={value.alt || ''}
            width={1200}
            height={675}
            style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }}
          />
          {value.caption && (
            <figcaption className="blog-post__caption">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href: string; blank?: boolean };
    }) => (
      <a
        href={value?.href || '#'}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPostBySlug(slug).then((p) =>
      p ? getBlogPostsByTopic(p.topic, slug) : []
    ),
  ]);

  if (!post) notFound();

  const heroSrc = post.heroImage
    ? resolveHeroImage(post.heroImage, 1600)
    : '/assets/hero.webp';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `https://www.jessicashauffer.com/blog/${slug}`,
    image: heroSrc,
    author: {
      '@type': 'Person',
      name: post.author || 'Jessica Shauffer',
      url: 'https://www.jessicashauffer.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jessica Shauffer Real Estate',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.jessicashauffer.com/assets/coldwell-banker-logo-nav.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.jessicashauffer.com/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.jessicashauffer.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.jessicashauffer.com/blog/${slug}` },
    ],
  };

  const topicLabel = TOPIC_LABELS[post.topic] || post.topic;

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image
            src={heroSrc}
            alt={post.heroImageAlt || post.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="page-hero__content">
          {post.topic && (
            <p className="page-hero__label">{topicLabel}</p>
          )}
          <h1 className="page-hero__title">{post.title}</h1>
          <p className="page-hero__desc">{post.excerpt}</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li>{post.title}</li>
          </ol>
        </nav>
      </div>

      {/* ARTICLE */}
      <section className="section">
        <div className="container">
          <div className="blog-post-layout">
            {/* Main content */}
            <article className="blog-post__article">
              {/* Post meta */}
              <div className="blog-post__meta">
                {post.topic && (
                  <Link href={`/blog?topic=${post.topic}`} className="blog-card__topic">
                    {topicLabel}
                  </Link>
                )}
                <time dateTime={post.publishedAt} className="blog-post__date">
                  {formatDate(post.publishedAt)}
                </time>
                <span className="blog-post__author">
                  By {post.author || 'Jessica Shauffer'}
                </span>
              </div>

              {/* Body */}
              {post.body && post.body.length > 0 ? (
                <div className="blog-post__body portable-text">
                  <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
                </div>
              ) : (
                <div className="blog-post__body">
                  <p>{post.excerpt}</p>
                </div>
              )}

              {/* CTA at bottom of post */}
              <div className="blog-post__cta-box">
                <div className="blog-post__cta-content">
                  <h3>Ready to Make a Move?</h3>
                  <p>
                    Jessica Shauffer is a top Coldwell Banker agent serving Easton, Attleboro, Mansfield, and 22 other South Shore communities. Get a free consultation today.
                  </p>
                </div>
                <a href="#consultation" className="btn btn--primary">
                  Book a Free Consultation
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="blog-post__sidebar">
              <div className="blog-sidebar-card">
                <div className="blog-sidebar-card__avatar">
                  <Image
                    src="/assets/jessica-headshot.webp"
                    alt="Jessica Shauffer, Coldwell Banker Realty"
                    width={80}
                    height={80}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
                <h3 className="blog-sidebar-card__name">Jessica Shauffer</h3>
                <p className="blog-sidebar-card__title">Coldwell Banker Realty</p>
                <p className="blog-sidebar-card__bio">
                  Top 3% agent serving 25 communities across Bristol, Norfolk &amp; Plymouth Counties. Over $50M in transactions.
                </p>
                <a href="#consultation" className="btn btn--primary btn--sm" style={{ width: '100%', textAlign: 'center' }}>
                  Free Consultation
                </a>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="blog-sidebar-related">
                  <h3 className="blog-sidebar-related__title">More in {topicLabel}</h3>
                  <ul className="blog-sidebar-related__list">
                    {relatedPosts.map((rp) => (
                      <li key={rp._id} className="blog-sidebar-related__item">
                        <Link href={`/blog/${rp.slug.current}`} className="blog-sidebar-related__link">
                          {rp.heroImage && (
                            <div className="blog-sidebar-related__thumb">
                              <Image
                                src={resolveHeroImage(rp.heroImage, 120)}
                                alt={rp.heroImageAlt || rp.title}
                                width={80}
                                height={60}
                                style={{ objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                              />
                            </div>
                          )}
                          <div>
                            <span className="blog-sidebar-related__post-title">{rp.title}</span>
                            <time className="blog-sidebar-related__date" dateTime={rp.publishedAt}>
                              {formatDate(rp.publishedAt)}
                            </time>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="blog-sidebar-back">
                <Link href="/blog" className="btn btn--ghost btn--sm">
                  <i className="ph ph-arrow-left" aria-hidden="true"></i> All Posts
                </Link>
              </div>
            </aside>
          </div>
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
                Whether you&apos;re buying, selling, or just exploring the South Shore market &mdash; a quick conversation with Jessica can save you time, money, and stress.
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
