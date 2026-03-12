import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Jessica Shauffer — Easton, MA Real Estate Agent',
  description: 'Learn about Jessica Shauffer, Coldwell Banker Presidents Circle agent serving Easton, MA. UMass graduate, 10+ designations, and a passion for helping families.',
  openGraph: {
    title: 'About Jessica Shauffer — Easton, MA Real Estate Agent',
    description: 'Learn about Jessica Shauffer, Coldwell Banker Presidents Circle agent serving Easton, MA. UMass graduate, 10+ designations, and a passion for helping families.',
    images: ['/assets/jessica.jpg'],
  },
  alternates: { canonical: '/about' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jessica Shauffer',
  jobTitle: 'Real Estate Agent',
  worksFor: { '@type': 'Organization', name: 'Weinstein Keach, Coldwell Banker Realty' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Massachusetts' },
  knowsAbout: ['Real Estate', 'Easton MA', 'Home Buying', 'Home Selling', 'Market Analysis'],
  url: 'https://jessicashauffer.com/about',
  image: 'https://jessicashauffer.com/assets/jessica.jpg',
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />

      <section className="page-hero">
        <div className="page-hero__bg">
          <Image src="/assets/hero.webp" alt="Easton Massachusetts neighborhood aerial view" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">About Jessica</p>
          <h1 className="page-hero__title">Your Trusted Easton Real Estate Expert</h1>
          <p className="page-hero__desc">Coldwell Banker Presidents Circle member and local market authority with a passion for helping families find their perfect home.</p>
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

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Image src="/assets/jessica-portrait-02.webp" alt="Jessica Shauffer, Real Estate Agent" width={1024} height={1024} className="agent-portrait" />
            </div>
            <div className="split__content">
              <p className="section__label">Meet Jessica Shauffer</p>
              <h2 className="section__title">A People-First Approach to Real Estate</h2>
              <p className="agent-subtitle">Weinstein Keach Group | Coldwell Banker Realty</p>
              <p>Jessica is a seasoned, top-producing real estate professional with an outgoing personality and a detail-focused mindset. As a member of the Coldwell Banker Presidents Circle — placing her in the top 3% of agents globally — she brings unmatched expertise to every transaction.</p>
              <p>With a UMass degree in Sociology and Education, Jessica has a natural ability to connect with people and guide them through complex decisions. She studies market trends daily and offers invaluable insights on neighborhoods, schools, and community amenities throughout Easton and the surrounding areas.</p>
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

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="content-block__header" style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', marginBottom: 'var(--space-12)' }}>
            <h2>Why Work with Jessica</h2>
            <p>Clients choose Jessica for her responsiveness, integrity, and tenacious negotiation skills. Here&apos;s what sets her apart.</p>
          </div>
          <div className="info-grid">
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-handshake"></i></div><h3>Relentless Advocacy</h3><p>Jessica negotiates fiercely on your behalf — whether securing below-asking for buyers or maximizing sale price for sellers. She&apos;s won deals others thought impossible.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-chats-circle"></i></div><h3>Clear Communication</h3><p>You&apos;ll never be left wondering what&apos;s happening. Jessica keeps you informed at every step with prompt responses and straightforward guidance.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-map-pin"></i></div><h3>Local Market Mastery</h3><p>A deep knowledge of Easton&apos;s neighborhoods, schools, pricing trends, and upcoming developments means you always make an informed decision.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-users-three"></i></div><h3>Trusted Network</h3><p>From mortgage lenders to home inspectors and contractors, Jessica connects you with the best local professionals for a seamless experience.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-heart"></i></div><h3>Genuine Care</h3><p>This isn&apos;t just a transaction — Jessica cares about finding the right fit for your family and continues checking in long after closing day.</p></div>
            <div className="info-card"><div className="info-card__icon"><i className="ph ph-chart-line-up"></i></div><h3>Proven Results</h3><p>19 five-star Google reviews and consistent Presidents Circle recognition speak to a track record of exceptional client outcomes.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <p className="section__label">Professional Designations</p>
              <h2 className="section__title">Credentials That Count</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>Jessica holds over 10 professional real estate designations, each representing specialized training and expertise in different areas of the industry.</p>
              <div className="designation-badges">
                {['CNRLS','CBR','CRRS','CRA','CSR','ERS','MRP','SCRP'].map(d => <span key={d} className="designation-badge">{d}</span>)}
              </div>
            </div>
            <div>
              <p className="section__label">Education</p>
              <h2 className="section__title">Background</h2>
              <div className="timeline">
                <div className="timeline__item"><h4>Coldwell Banker Presidents Circle</h4><p>Top 3% of Coldwell Banker agents worldwide — sustained excellence in production and client service.</p></div>
                <div className="timeline__item"><h4>Weinstein Keach Group</h4><p>Part of an award-winning team at Coldwell Banker Realty, serving Easton and the greater South Shore area.</p></div>
                <div className="timeline__item"><h4>University of Massachusetts</h4><p>B.S. in Sociology and Education — the foundation for Jessica&apos;s people-first approach to real estate.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Get Started?</h2>
            <p>Whether you&apos;re buying, selling, or just exploring your options, Jessica is here to help with expert guidance and no pressure.</p>
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Book a Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
