import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';


import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import AgentAbout from '@/components/AgentAbout';
import CopyLinkButton from '@/components/CopyLinkButton';
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getRelatedBlogPosts,
  getBlogPostNavigation,
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
    robots: { index: false, follow: false },
  };
}

// ── TOC helpers ────────────────────────────────────────────────────────────
type PtBlockChild = { _type?: string; text?: string; [key: string]: unknown };
type PtBlock = { _type: string; style?: string; children?: PtBlockChild[] };

/** Slugify a heading string into a URL-safe anchor ID */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Extract H2/H3 headings from a Portable Text body array */
function extractTocHeadings(body: unknown[]): { id: string; text: string; level: 2 | 3 }[] {
  const results: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const block of body as PtBlock[]) {
    if (block._type !== 'block') continue;
    if (block.style !== 'h2' && block.style !== 'h3') continue;
    const text = (block.children || []).map((c) => c.text || '').join('');
    if (!text) continue;
    const level: 2 | 3 = block.style === 'h2' ? 2 : 3;
    results.push({ id: slugifyHeading(text), text, level });
  }
  return results;
}

/** Render nested TOC from headings */
function TocNav({ headings }: { headings: ReturnType<typeof extractTocHeadings> }) {
  if (headings.length === 0) return null;
  const items: React.ReactNode[] = [];
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    if (h.level === 2) {
      // Collect following H3s
      const children: React.ReactNode[] = [];
      let j = i + 1;
      while (j < headings.length && headings[j].level === 3) {
        children.push(
          <li key={headings[j].id}>
            <a href={`#${headings[j].id}`} className="post-toc__link post-toc__link--h3">
              {headings[j].text}
            </a>
          </li>
        );
        j++;
      }
      items.push(
        <li key={h.id}>
          <a href={`#${h.id}`} className="post-toc__link post-toc__link--h2">{h.text}</a>
          {children.length > 0 && (
            <ul className="post-toc__sub">{children}</ul>
          )}
        </li>
      );
    }
    // H3s are consumed above; skip standalone H3s that appear before any H2
    else if (h.level === 3 && items.length === 0) {
      items.push(
        <li key={h.id}>
          <a href={`#${h.id}`} className="post-toc__link post-toc__link--h3">{h.text}</a>
        </li>
      );
    }
  }
  return <ul>{items}</ul>;
}

/** Extract plain text from React children for use as anchor ID */
function extractChildText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractChildText).join('');
  if (React.isValidElement(children)) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return extractChildText(el.props.children);
  }
  return '';
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
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children }: any) => {
      const id = slugifyHeading(extractChildText(children));
      return <h2 id={id} style={{ scrollMarginTop: '5rem' }}>{children}</h2>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children }: any) => {
      const id = slugifyHeading(extractChildText(children));
      return <h3 id={id} style={{ scrollMarginTop: '5rem' }}>{children}</h3>;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h4: ({ children }: any) => {
      const id = slugifyHeading(extractChildText(children));
      return <h4 id={id} style={{ scrollMarginTop: '5rem' }}>{children}</h4>;
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

/** Estimate read time from PortableText body blocks */
function estimateReadTime(body: unknown[]): number {
  const text = body
    .filter((b: unknown) => (b as { _type: string })._type === 'block')
    .flatMap((b: unknown) => ((b as { children?: { text?: string }[] }).children || []).map((c) => c.text || ''))
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 260));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [relatedPosts, nav] = await Promise.all([
    getRelatedBlogPosts(post.topic, slug),
    getBlogPostNavigation(post.publishedAt),
  ]);

  const tocHeadings = post.body && post.body.length > 0 ? extractTocHeadings(post.body) : [];
  const heroSrc = post.heroImage
    ? resolveHeroImage(post.heroImage, 1600)
    : '/assets/hero.webp';

  const readTime =
    post.readTimeMinutes ??
    (post.body && post.body.length > 0 ? estimateReadTime(post.body) : 5);

  const postUrl = `https://www.jessicashauffer.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const primaryLabel = TOPIC_LABELS[post.topic] || post.topic;
  const secondaryLabel = post.secondaryTopic ? (TOPIC_LABELS[post.secondaryTopic] || post.secondaryTopic) : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: postUrl,
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
      '@id': postUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.jessicashauffer.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── POST HEADER ──────────────────────────────────────────── */}
      <section className="post-header">
        <div className="container">

          {/* Label pill */}
          <div className="post-header__label-row">
            <span className="post-header__label">Blog Post</span>
          </div>

          {/* H1 */}
          <h1 className="post-header__title">{post.title}</h1>

          {/* Hero image */}
          <div className="post-header__image-wrap">
            <div className="post-header__image-ratio">
              <Image
                src={heroSrc}
                alt={post.heroImageAlt || post.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                priority
              />
            </div>
          </div>

          {/* Breadcrumb — below hero image */}
          <nav className="breadcrumbs post-header__breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumbs__list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li>{post.title}</li>
            </ol>
          </nav>

          {/* Meta bar */}
          <div className="post-meta-bar">
            <div className="post-meta-bar__item">
              <span className="post-meta-bar__label">Written by</span>
              <span className="post-meta-bar__value">{post.author || 'Jessica Shauffer'}</span>
            </div>
            <div className="post-meta-bar__divider" aria-hidden="true" />
            <div className="post-meta-bar__item">
              <span className="post-meta-bar__label">Published on</span>
              <time className="post-meta-bar__value" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="post-meta-bar__divider" aria-hidden="true" />
            <div className="post-meta-bar__item">
              <span className="post-meta-bar__label">Category</span>
              <div className="post-meta-bar__cats">
                <Link href={`/blog?topic=${post.topic}`} className="post-meta-bar__cat">
                  {primaryLabel}
                </Link>
                {secondaryLabel && (
                  <>
                    <span className="post-meta-bar__cat-sep" aria-hidden="true">|</span>
                    <Link href={`/blog?topic=${post.secondaryTopic}`} className="post-meta-bar__cat">
                      {secondaryLabel}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="post-meta-bar__divider" aria-hidden="true" />
            <div className="post-meta-bar__item">
              <span className="post-meta-bar__label">Read Time</span>
              <span className="post-meta-bar__value">{readTime} min read</span>
            </div>
            <div className="post-meta-bar__divider" aria-hidden="true" />
            {/* Social share */}
            <div className="post-meta-bar__item post-meta-bar__share">
              <span className="post-meta-bar__label">Share</span>
              <div className="post-share-icons">
                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-share-icon"
                  aria-label="Share on X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" fill="currentColor"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-share-icon"
                  aria-label="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" fill="currentColor"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-share-icon"
                  aria-label="Share on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path clipRule="evenodd" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 15.5V10H6.5v8.5H8Zm-.75-9.75a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75ZM18 18.5v-5.1c.033-1.59-1.142-2.946-2.72-3.14-.9-.1-1.969.325-2.53 1.1V10H11.5v8.5H13v-4.75a1.75 1.75 0 0 1 3.5 0V18.5H18Z" fill="currentColor" fillRule="evenodd"/>
                  </svg>
                </a>
                {/* Email */}
                <a
                  href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                  className="post-share-icon"
                  aria-label="Share via email"
                >
                  <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path clipRule="evenodd" d="M4 4.758h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Zm9.65 11.45 6.35-4.45V8.208l-7.35 5.15a.875.875 0 0 1-1.3 0L4 8.208v3.55l6.35 4.45a2.625 2.625 0 0 0 3.3 0Z" fill="currentColor" fillRule="evenodd"/>
                  </svg>
                </a>
                {/* Copy link */}
                <CopyLinkButton url={postUrl} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE + SIDEBAR ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="post-layout">

            {/* Main article */}
            <article className="post-article" id="blog-content">
              {post.body && post.body.length > 0 ? (
                <div className="blog-post__body portable-text">
                  <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
                </div>
              ) : (
                <div className="blog-post__body">
                  <p>{post.excerpt}</p>
                </div>
              )}

              {/* In-article CTA */}
              <div className="blog-post__cta-box">
                <div className="blog-post__cta-content">
                  <h3>Ready to Make a Move?</h3>
                  <p>
                    Jessica Shauffer is a top Coldwell Banker agent serving Easton, Attleboro, Mansfield, and 22 other South Shore communities. Get a free consultation today.
                  </p>
                </div>
                <a href="#consultation" className="btn btn--accent">
                  Book a Free Consultation
                </a>
              </div>
            </article>

            {/* Sticky sidebar — Table of Contents */}
            <aside className="post-sidebar">
              <div className="post-toc" id="toc-wrapper">
                <h3 className="post-toc__title">Table of Contents</h3>
                <div className="post-toc__divider" />
                <nav className="post-toc__nav" aria-label="Table of contents">
                  <TocNav headings={tocHeadings} />
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT NAVIGATION ───────────────────────────────── */}
      {(nav.prev || nav.next) && (
        <section className="section section--warm post-prevnext">
          <div className="container">
            <div className="post-prevnext__inner">
              {nav.prev ? (
                <Link href={`/blog/${nav.prev.slug.current}`} className="post-prevnext__btn post-prevnext__btn--prev">
                  <i className="ph ph-arrow-left" aria-hidden="true" />
                  <div className="post-prevnext__text">
                    <span className="post-prevnext__dir">Previous Post</span>
                    <span className="post-prevnext__name">{nav.prev.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nav.next ? (
                <Link href={`/blog/${nav.next.slug.current}`} className="post-prevnext__btn post-prevnext__btn--next">
                  <div className="post-prevnext__text post-prevnext__text--right">
                    <span className="post-prevnext__dir">Next Post</span>
                    <span className="post-prevnext__name">{nav.next.title}</span>
                  </div>
                  <i className="ph ph-arrow-right" aria-hidden="true" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED POSTS ────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="section post-related">
          <div className="container">
            <div className="section__header">
              <p className="section__label">Keep Reading</p>
              <h2 className="section__title">More Articles You May Like</h2>
            </div>
            <div className="blog-grid blog-grid--related">
              {relatedPosts.map((rp) => {
                const rpHero = rp.heroImage ? resolveHeroImage(rp.heroImage, 600) : '/assets/hero.webp';
                const rpPrimary = TOPIC_LABELS[rp.topic] || rp.topic;
                const rpSecondary = rp.secondaryTopic ? (TOPIC_LABELS[rp.secondaryTopic] || rp.secondaryTopic) : null;
                return (
                  <article key={rp._id} className="blog-card">
                    <Link href={`/blog/${rp.slug.current}`} className="blog-card__image-link" tabIndex={-1} aria-hidden="true">
                      <div className="blog-card__image-wrap">
                        <Image
                          src={rpHero}
                          alt={rp.heroImageAlt || rp.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="blog-card__arrow-circle" aria-hidden="true">
                          <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                            <path d="M13.0003 5.00586L11.5316 6.47461L17.3441 12.2975H4.66699V14.3809H17.3441L11.5316 20.2038L13.0003 21.6725L21.3337 13.3392L13.0003 5.00586Z" fill="currentColor"/>
                          </svg>
                        </div>
                      </div>
                    </Link>
                    <div className="blog-card__body">
                      <div className="blog-card__cats">
                        {rpPrimary && (
                          <Link href={`/blog?topic=${rp.topic}`} className="blog-card__cat">
                            {rpPrimary}
                          </Link>
                        )}
                        {rpSecondary && (
                          <Link href={`/blog?topic=${rp.secondaryTopic}`} className="blog-card__cat">
                            {rpSecondary}
                          </Link>
                        )}
                      </div>
                      <h3 className="blog-card__title">
                        <Link href={`/blog/${rp.slug.current}`}>{rp.title}</Link>
                      </h3>
                      <div className="blog-card__footer">
                        <time className="blog-card__date" dateTime={rp.publishedAt}>
                          {formatDate(rp.publishedAt)}
                        </time>
                        <Link href={`/blog/${rp.slug.current}`} className="blog-card__cta" aria-label={`Read ${rp.title}`}>
                          Read Article <i className="ph ph-arrow-right" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <Link href="/blog" className="btn btn--ghost">
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT JESSICA ────────────────────────────────────────── */}
      <AgentAbout />

      {/* ── CONSULTATION FORM ────────────────────────────────────── */}
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
