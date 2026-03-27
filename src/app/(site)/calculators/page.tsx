import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import FaqAccordion from '@/components/FaqAccordion';
import ReviewsSection from '@/components/ReviewsSection';
import ConsultationForm from '@/components/ConsultationForm';
import { getPageBySlug, resolveHeroImage } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('calculators');
  const title = page?.metaTitle || 'Mortgage Calculator | Jessica Shauffer';
  const description = page?.metaDescription || "Free mortgage calculator for South Shore MA homes. Estimate monthly payment including principal, interest, taxes, insurance & PMI.";
  const ogImage = resolveHeroImage(page?.ogImage || page?.heroImage, 1200);
  return {
    title,
    description,
    // Noindex — this page is not linked from nav/footer and should not appear in search results
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: 'https://www.jessicashauffer.com/calculators',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: '/calculators' },
  };
}

const faqItems = [
  {
    q: 'How is my monthly mortgage payment calculated?',
    a: 'Your monthly principal and interest (P&I) is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n – 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. Your total monthly payment also includes estimated property taxes, homeowners insurance, and PMI if your down payment is below 20%.',
  },
  {
    q: 'What is PMI and when do I have to pay it?',
    a: "PMI (Private Mortgage Insurance) is required by most lenders when your down payment is less than 20% of the home's purchase price. It protects the lender in case of default. PMI typically costs between 0.5%–1.5% of the loan amount per year and can be cancelled once you reach 20% equity in your home.",
  },
  {
    q: 'How much should I put down on a home in Massachusetts?',
    a: 'While a 20% down payment avoids PMI and typically secures better rates, many buyers in Massachusetts put down as little as 3%–5% through conventional or FHA loans. The right amount depends on your savings, monthly budget, and how competitive the market is. Jessica Shauffer can connect you with trusted local lenders to explore your options.',
  },
  {
    q: 'What are current mortgage rates in Massachusetts?',
    a: 'Mortgage rates change daily based on economic conditions and your personal financial profile — including credit score, loan type, and down payment. This calculator uses a default of 6.5%, but your rate may vary. For the most accurate rate quote, speak with a local lender. Jessica Shauffer works with a network of trusted mortgage professionals serving the South Shore and MetroWest.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jessicashauffer.com/' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.jessicashauffer.com/calculators' },
  ],
};

export default async function CalculatorsPage() {
  const page = await getPageBySlug('calculators');
  const heroSrc = resolveHeroImage(page?.heroImage, 1920);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero__bg">
          <Image
            src={heroSrc}
            alt={page?.heroTitle || 'Mortgage calculator for South Shore Massachusetts homes'}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="page-hero__content">
          <p className="page-hero__label">Tools</p>
          <h1 className="page-hero__title">
            {page?.heroTitle || 'Mortgage Calculator'}
          </h1>
          <p className="page-hero__desc">
            {page?.heroDesc || 'Estimate your monthly payment in seconds. Adjust home price, down payment, rate, and term to see how it affects your budget.'}
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Mortgage Calculator</li>
          </ol>
        </nav>
      </div>

      {/* Calculator */}
      <MortgageCalculator />

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '48rem' }}>
          <h2 className="section__title" style={{ marginBottom: 'var(--space-8)' }}>
            Mortgage FAQ
          </h2>
          <FaqAccordion items={faqItems.map(({ q, a }) => ({ question: q, answer: a }))} />
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection
        label="Client Success Stories"
        heading="What Jessica&apos;s Clients Say"
      />

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>
                Whether you&apos;re ready to make a move or just exploring the market across the South Shore, MetroWest, or Bristol County — a quick conversation with Jessica can save you time, money, and stress.
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
              <ConsultationForm source="calculators" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
