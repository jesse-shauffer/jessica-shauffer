import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import {
  getNeighborhoodBySlug,
  getAllNeighborhoodSlugs,
  getOtherNeighborhoods,
} from '@/lib/sanity';

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateStaticParams() {
  const slugs = await getAllNeighborhoodSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const n = await getNeighborhoodBySlug(params.slug);
  if (!n) return {};
  return {
    title: n.metaTitle,
    description: n.metaDescription,
    openGraph: {
      title: n.metaTitle,
      description: n.metaDescription,
      images: ['/assets/jessica.jpg'],
    },
    alternates: { canonical: `/neighborhoods/${n.slug.current}` },
  };
}

export default async function NeighborhoodPage({ params }: { params: { slug: string } }) {
  const n = await getNeighborhoodBySlug(params.slug);
  if (!n) notFound();

  const others = await getOtherNeighborhoods(params.slug);

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${n.name}, Easton, MA`,
    description: n.description[0],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Easton',
      addressRegion: 'MA',
      postalCode: n.zipCode || '02356',
      addressCountry: 'US',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jessicashauffer.com/' },
      { '@type': 'ListItem', position: 2, name: 'Neighborhoods', item: 'https://jessicashauffer.com/neighborhoods' },
      { '@type': 'ListItem', position: 3, name: n.name, item: `https://jessicashauffer.com/neighborhoods/${n.slug.current}` },
    ],
  };

  return (
    <>
      <JsonLd data={placeSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={n.heroImage} alt={`${n.name}, Easton MA`} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">{n.name}</p>
          <h1 className="page-hero__title">{n.heroTitle}</h1>
          <p className="page-hero__desc">{n.heroDesc}</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/neighborhoods">Neighborhoods</Link></li>
            <li>{n.name}</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__content">
              <p className="section__label">Overview</p>
              <h2 className="section__title">About {n.name}</h2>
              {n.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="split__media">
              <Image src={n.heroImage} alt={`${n.name} neighborhood in Easton MA`} width={600} height={450} style={{ borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>What Makes {n.name} Special</h2>
            <p>Discover the highlights that make {n.name} a unique community within Easton.</p>
          </div>
          <div className="highlight-grid">
            {n.highlights.map((h, i) => (
              <div key={i} className="highlight-card">
                <i className={`ph ${h.icon}`}></i>
                <div>
                  <h4>{h.title}</h4>
                  <p>{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Interested in {n.name}?</h2>
            <p>Jessica knows every street, school, and hidden gem in {n.name}. Let her help you find your perfect home.</p>
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Book a Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Explore Other Neighborhoods</h2>
            <p>Easton has six distinct communities, each with its own character.</p>
          </div>
          <div className="neighborhood-grid">
            {others.map((other) => (
              <Link key={other.slug} href={`/neighborhoods/${other.slug}`} className="neighborhood-card">
                <div className="neighborhood-card__bg">
                  <Image src={other.image} alt={other.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="neighborhood-card__arrow"><i className="ph ph-arrow-right"></i></div>
                <div className="neighborhood-card__content">
                  <h3>{other.name}</h3>
                  <p>{other.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
