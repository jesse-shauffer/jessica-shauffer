import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Mortgage Calculators | Jessica Shauffer',
  description: 'Use free mortgage calculators to estimate your monthly payment, affordability, and more. Tools to help you plan your home purchase in South Shore and MetroWest MA.',
  openGraph: {
    title: 'Mortgage Calculators | Jessica Shauffer',
    description: 'Use free mortgage calculators to estimate your monthly payment, affordability, and more. Tools to help you plan your home purchase in South Shore and MetroWest MA.',
    url: 'https://www.jessicashauffer.com/calculators',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculators | Jessica Shauffer',
    description: 'Use free mortgage calculators to estimate your monthly payment, affordability, and more. Tools to help you plan your home purchase in South Shore and MetroWest MA.',
  },
  alternates: { canonical: '/calculators' },
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
      <JsonLd data={breadcrumbSchema} />

      <section className="page-hero">
        <div className="page-hero__bg" style={{ background: 'var(--color-navy)' }} />
        <div className="page-hero__content">
          <p className="page-hero__label">Tools</p>
          <h1 className="page-hero__title">Financial Calculators</h1>
          <p className="page-hero__desc">Estimate your mortgage payment, buying power, and more with these free financial calculators.</p>
        </div>
      </section>

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link href="/">Home</Link></li>
            <li>Calculators</li>
          </ol>
        </nav>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-8)' }}>
        <div className="container">
          <iframe
            src="https://search.jessicashauffer.com/financial-calculators"
            className="w-full border-0"
            style={{ minHeight: '900px' }}
            title="Financial Calculators"
            allow="fullscreen"
          />
        </div>
      </section>
    </>
  );
}
