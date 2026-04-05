import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllBlogPosts,
  getAllNeighborhoods,
  getAllCounties,
} from '@/lib/sanity';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Sitemap | Jessica Shauffer Real Estate',
  description: 'Full sitemap for jessicashauffer.com — browse all pages including community guides, blog posts, and real estate resources.',
  alternates: { canonical: '/sitemap' },
  robots: { index: true, follow: true },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function SitemapPage() {
  const [posts, communities, counties] = await Promise.all([
    getAllBlogPosts(),
    getAllNeighborhoods(),
    getAllCounties(),
  ]);

  // Sort communities alphabetically
  const sortedCommunities = [...communities].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const mainPages = [
    { label: 'Home', href: '/' },
    { label: 'About Jessica', href: '/about' },
    { label: 'Market Reports', href: '/market' },
    { label: 'Buyers Guide', href: '/buyers' },
    { label: 'Sellers Guide', href: '/sellers' },
    { label: 'Communities', href: '/communities' },
    { label: 'Counties', href: '/counties' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Mortgage Calculator', href: '/calculators' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <div className="sitemap-page">
        <div className="container">

          {/* Page header */}
          <div className="sitemap-page__header">
            <p className="section__label">jessicashauffer.com</p>
            <h1 className="sitemap-page__title">Site Map</h1>
            <p className="sitemap-page__desc">
              A complete index of every page on this site — updated automatically as new content is published.
            </p>
          </div>

          <div className="sitemap-page__grid">

            {/* ── Main Pages ── */}
            <section className="sitemap-section">
              <h2 className="sitemap-section__heading">Main Pages</h2>
              <ul className="sitemap-list">
                {mainPages.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="sitemap-list__link">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Counties ── */}
            <section className="sitemap-section">
              <h2 className="sitemap-section__heading">
                Counties
                <span className="sitemap-section__count">{counties.length}</span>
              </h2>
              <ul className="sitemap-list">
                {counties.map((c) => (
                  <li key={c._id}>
                    <Link href={`/counties/${c.slug.current}`} className="sitemap-list__link">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Communities ── */}
            <section className="sitemap-section">
              <h2 className="sitemap-section__heading">
                Communities
                <span className="sitemap-section__count">{sortedCommunities.length}</span>
              </h2>
              <ul className="sitemap-list">
                {sortedCommunities.map((c) => (
                  <li key={c._id}>
                    <Link href={`/communities/${c.slug.current}`} className="sitemap-list__link">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Blog Posts ── */}
            <section className="sitemap-section sitemap-section--blog">
              <h2 className="sitemap-section__heading">
                Blog Posts
                <span className="sitemap-section__count">{posts.length}</span>
              </h2>
              <ul className="sitemap-list sitemap-list--blog">
                {posts.map((p) => (
                  <li key={p._id}>
                    <Link href={`/blog/${p.slug.current}`} className="sitemap-list__link">
                      {p.title}
                    </Link>
                    <span className="sitemap-list__meta">
                      {formatDate(p.publishedAt)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
