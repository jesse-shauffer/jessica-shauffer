import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';

export const metadata: Metadata = {
  title: 'Mortgage Calculator | Jessica Shauffer — Coldwell Banker Realty',
  description: 'Estimate your monthly mortgage payment with Jessica Shauffer\'s free mortgage calculator. Calculate principal, interest, property tax, insurance, and PMI for South Shore MA homes.',
  openGraph: {
    title: 'Mortgage Calculator | Jessica Shauffer',
    description: 'Estimate your monthly mortgage payment including P&I, property tax, insurance, and PMI.',
    url: 'https://www.jessicashauffer.com/calculators',
    images: [{ url: '/assets/hero.webp', width: 1200, height: 630, alt: 'Mortgage Calculator — Jessica Shauffer Real Estate' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator | Jessica Shauffer',
    description: 'Estimate your monthly mortgage payment including P&I, property tax, insurance, and PMI.',
    images: ['/assets/hero.webp'],
  },
  alternates: { canonical: '/calculators' },
};

const faqItems = [
  {
    q: 'How is my monthly mortgage payment calculated?',
    a: 'Your monthly principal and interest (P&I) is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n – 1], where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. Your total monthly payment also includes estimated property taxes, homeowners insurance, and PMI if your down payment is below 20%.',
  },
  {
    q: 'What is PMI and when do I have to pay it?',
    a: 'PMI (Private Mortgage Insurance) is required by most lenders when your down payment is less than 20% of the home\'s purchase price. It protects the lender in case of default. PMI typically costs between 0.5%–1.5% of the loan amount per year and can be cancelled once you reach 20% equity in your home.',
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

export default function CalculatorsPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="container py-3">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li><Link href="/" className="hover:text-stone-700">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-stone-800 font-medium">Calculators</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="page-hero page-hero--short" style={{ background: '#0c2340' }}>
        <div className="page-hero__content" style={{ position: 'relative' }}>
          <p className="page-hero__label">Tools</p>
          <h1 className="page-hero__title">Mortgage Calculator</h1>
          <p className="page-hero__desc">
            Estimate your monthly payment in seconds. Adjust home price, down payment, rate, and term to see how it affects your budget.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <MortgageCalculator />

      {/* FAQ */}
      <section className="container py-16 max-w-3xl">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#0c2340' }}>Mortgage FAQ</h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }) => (
            <div key={q} className="border-b border-stone-200 pb-6">
              <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
