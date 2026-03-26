'use client';

import { useState, useMemo } from 'react';

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const results = useMemo(() => {
    const downPaymentAmt = homePrice * (downPaymentPct / 100);
    const principal = homePrice - downPaymentAmt;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let monthlyPI = 0;
    if (monthlyRate === 0) {
      monthlyPI = principal / numPayments;
    } else {
      monthlyPI =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const propertyTax = (homePrice * 0.0125) / 12;
    const insurance = 150;
    const pmi = downPaymentPct < 20 ? (homePrice * 0.005) / 12 : 0;
    const total = monthlyPI + propertyTax + insurance + pmi;

    return { monthlyPI, propertyTax, insurance, pmi, total, downPaymentAmt, principal };
  }, [homePrice, downPaymentPct, interestRate, loanTerm]);

  const breakdown = [
    { label: 'Principal & Interest', value: results.monthlyPI },
    { label: 'Est. Property Tax', value: results.propertyTax },
    { label: 'Homeowners Insurance', value: results.insurance },
    ...(results.pmi > 0 ? [{ label: 'PMI (< 20% down)', value: results.pmi }] : []),
  ];

  return (
    <section style={{ background: 'var(--off-white)', padding: 'var(--space-16) 0' }}>
      <div className="container">
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ background: 'var(--primary)', padding: 'var(--space-8)' }}>
            <h2
              style={{
                color: 'var(--white)',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                marginBottom: 'var(--space-1)',
              }}
            >
              Mortgage Payment Calculator
            </h2>
            <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-sm)', maxWidth: 'none' }}>
              Estimate your monthly payment based on purchase price and loan details.
            </p>
          </div>

          {/* Body — two columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 calc-body" style={{ padding: 'var(--space-8)' }}>

            {/* ── Inputs ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

              <div className="form-group">
                <label htmlFor="calc-home-price">Home Price ($)</label>
                <input
                  type="number"
                  id="calc-home-price"
                  min={50000}
                  max={5000000}
                  step={5000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="calc-down-payment">Down Payment (%)</label>
                <input
                  type="number"
                  id="calc-down-payment"
                  min={3}
                  max={50}
                  step={1}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                  = ${formatCurrency(results.downPaymentAmt)} down &middot; ${formatCurrency(results.principal)} loan
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="calc-interest-rate">Interest Rate (%)</label>
                <input
                  type="number"
                  id="calc-interest-rate"
                  min={1}
                  max={20}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="calc-loan-term">Loan Term</label>
                <select
                  id="calc-loan-term"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                >
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>

            {/* ── Results ── */}
            <div className="lg:mt-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>

              {/* Total payment card */}
              <div
                style={{
                  background: 'var(--primary)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    color: 'var(--navy-100)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 'var(--space-2)',
                    maxWidth: 'none',
                  }}
                >
                  Estimated Monthly Payment
                </p>
                <p style={{ lineHeight: 1, marginBottom: 'var(--space-2)', maxWidth: 'none' }}>
                  <span
                    style={{
                      color: 'var(--gold)',
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      fontWeight: 800,
                    }}
                  >
                    ${formatCurrency(results.total)}
                  </span>
                  <span
                    style={{
                      color: 'var(--navy-100)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 400,
                    }}
                  >
                    /mo
                  </span>
                </p>
                <p style={{ color: 'var(--gray-400)', fontSize: 'var(--text-xs)', maxWidth: 'none' }}>
                  ${formatCurrency(results.principal)} loan &middot; {loanTerm}-yr fixed
                </p>
              </div>

              {/* Breakdown list */}
              <div>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--gray-500)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--space-3)',
                    maxWidth: 'none',
                  }}
                >
                  Payment Breakdown
                </p>
                <div>
                  {breakdown.map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'var(--space-2) 0',
                        borderBottom: '1px solid var(--gray-200)',
                      }}
                    >
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', maxWidth: 'none' }}>
                        {label}
                      </span>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gray-800)', maxWidth: 'none', whiteSpace: 'nowrap' }}>
                        ${formatCurrency(value)}/mo
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--gray-400)',
                    marginTop: 'var(--space-4)',
                    lineHeight: 1.6,
                  }}
                >
                  Estimates only. Property tax based on 1.25% annual rate. Insurance estimated at $150/mo.
                  PMI applies when down payment is below 20%. Contact Jessica for lender recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
