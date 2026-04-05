import Link from 'next/link';

const FEATURES = [
  { icon: 'ph-calculator',  label: 'Mortgage Payment',      desc: 'Monthly P&I, taxes, insurance & PMI' },
  { icon: 'ph-trend-down',  label: 'Interest Savings',       desc: 'See how extra payments reduce total cost' },
  { icon: 'ph-receipt',     label: 'Closing Costs',          desc: 'Estimate upfront costs before you close' },
  { icon: 'ph-chart-line',  label: 'Amortization Schedule',  desc: 'Full year-by-year payoff breakdown' },
];

export default function MortgageCalculatorPromo() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className="split">
          <div className="split__content">
            <p className="section__label section__label--light">Free Tool</p>
            <h2 className="section__title section__title--light">Estimate Your Monthly Payment</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 'var(--space-8)' }}>
              Use our free mortgage calculator to estimate your monthly payment, total interest, closing costs, and full amortization schedule — before you start your search.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link href="/calculators" className="btn btn--primary">Open Calculator</Link>
              <Link href="#consultation" className="btn btn--ghost">Talk to Jessica</Link>
            </div>
          </div>
          <div className="split__media" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {FEATURES.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                <div style={{ background: 'rgba(200,162,78,0.15)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', flexShrink: 0 }}>
                  <i className={`ph ${item.icon}`} style={{ fontSize: '1.25rem', color: 'var(--gold)' }} />
                </div>
                <div>
                  <strong style={{ color: 'var(--white)', display: 'block', marginBottom: '0.25rem' }}>{item.label}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
