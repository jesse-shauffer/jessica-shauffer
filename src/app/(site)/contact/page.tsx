import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ConsultationForm from '@/components/ConsultationForm';

export const metadata: Metadata = {
  title: 'Contact Jessica Shauffer — Easton, MA Real Estate Agent',
  description: 'Book a free consultation with Jessica Shauffer, Coldwell Banker Presidents Circle agent. Call (617) 949-1046 or schedule online.',
  openGraph: {
    title: 'Contact Jessica Shauffer — Easton, MA Real Estate Agent',
    description: 'Book a free consultation with Jessica Shauffer, Coldwell Banker Presidents Circle agent. Call (617) 949-1046 or schedule online.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/contact' },
};

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

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/consultation.webp" alt="Real estate consultation" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Get in Touch</p>
          <h1 className="page-hero__title">Contact Jessica Shauffer</h1>
          <p className="page-hero__desc">Ready to make a move? Let&apos;s talk. Book a free consultation or reach out directly.</p>
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
              <h3>Call Jessica</h3>
              <a href="tel:+16179491046">(617) 949-1046</a><br />
              <a href="tel:+15082302544">Office: (508) 230-2544</a>
            </div>
            <div className="contact-info-card">
              <i className="ph ph-envelope-simple"></i>
              <h3>Email</h3>
              <a href="mailto:Jessica.Shauffer@nemoves.com">Jessica.Shauffer@nemoves.com</a>
            </div>
            <div className="contact-info-card">
              <i className="ph ph-map-pin"></i>
              <h3>Office</h3>
              <p>159 Belmont St #1175<br />South Easton, MA 02375</p>
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
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
