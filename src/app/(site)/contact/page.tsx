import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';
import { getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact');
  const title = page?.metaTitle || 'Contact Jessica Shauffer — Easton, MA Real Estate Agent';
  const description = page?.metaDescription || 'Book a free consultation with Jessica Shauffer, Coldwell Banker Presidents Circle agent. Call (617) 949-1046 or schedule online.';
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    openGraph: { title, description, images: [ogImage] },
    alternates: { canonical: '/contact' },
  };
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Jessica Shauffer',
  telephone: '(617) 949-1046',
  email: 'Jessica.Shauffer@nemoves.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '159 Belmont St #1175',
    addressLocality: 'South Easton',
    addressRegion: 'MA',
    postalCode: '02375',
    addressCountry: 'US',
  },
  url: 'https://JessicaShauffer.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '19',
  },
};

export default async function ContactPage() {
  const page = await getPageBySlug('contact');
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);
  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src={heroSrc} alt={page?.heroTitle || 'Real estate consultation'} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Get in Touch</p>
          <h1 className="page-hero__title">{page?.heroTitle || 'Contact Jessica Shauffer'}</h1>
          <p className="page-hero__desc">{page?.heroDesc || "Ready to make a move? Let's talk. Book a free consultation or reach out directly."}</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Contact</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <i className="ph ph-phone"></i>
              <h2>Call Jessica</h2>
              <a href="tel:+16179491046">(617) 949-1046</a>
            </div>
            <div className="contact-info-card">
              <i className="ph ph-envelope-simple"></i>
              <h2>Email</h2>
              <a href="mailto:Jessica.Shauffer@nemoves.com">Jessica.Shauffer@nemoves.com</a>
            </div>
            <div className="contact-info-card">
              <i className="ph ph-map-pin"></i>
              <h2>Office</h2>
              <a href="https://www.google.com/maps/place/Jessica+Shauffer+%E2%80%93+Weinstein+Keach,+Coldwell+Banker+Realty/@42.0556882,-71.0717385,17z/data=!4m8!3m7!1s0x89e485762d91504d:0xa1d3cddd7b582786!8m2!3d42.0556882!4d-71.0717385!9m1!1b1!16s%2Fg%2F11h5qq5tp7?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">159 Belmont Street #1175<br />South Easton, MA 02375</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--form" id="consultation" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>Whether you&apos;re ready to make a move or just exploring — a quick conversation with Jessica can save you time, money, and stress. No pressure, just expert advice from a top 3% agent.</p>
              <div className="form-benefits">
                <div className="form-benefit">
                  <i className="ph ph-clock"></i>
                  <div>
                    <strong>15-Minute Call</strong>
                    <span>Quick, focused, and tailored to you</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-currency-dollar-simple"></i>
                  <div>
                    <strong>100% Free</strong>
                    <span>No cost, no obligation, no strings</span>
                  </div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-shield-check"></i>
                  <div>
                    <strong>Local Expertise</strong>
                    <span>Nearly a decade of Easton market knowledge</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-split__form">
              <ConsultationForm source="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
