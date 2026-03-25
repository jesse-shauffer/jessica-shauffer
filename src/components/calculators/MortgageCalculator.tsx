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

  return (
    <section className="bg-stone-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ backgroundColor: '#0c2340' }}>
            <h2 className="text-2xl font-bold text-white">Mortgage Payment Calculator</h2>
            <p className="text-stone-300 mt-1 text-sm">Estimate your monthly payment based on purchase price and loan details.</p>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Home Price */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-medium">$</span>
                  <input
                    type="number"
                    min={50000}
                    max={5000000}
                    step={5000}
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 text-stone-800"
                    style={{ '--tw-ring-color': '#c4a052' } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  Down Payment — {downPaymentPct}% (${formatCurrency(results.downPaymentAmt)})
                </label>
                <input
                  type="range"
                  min={3}
                  max={50}
                  step={1}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-yellow-600"
                  style={{ accentColor: '#c4a052' }}
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>3%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  Interest Rate — {interestRate}%
                </label>
                <input
                  type="range"
                  min={2}
                  max={12}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: '#c4a052' }}
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>2%</span>
                  <span>12%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  Loan Term
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none text-stone-800 bg-white"
                >
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center">
              {/* Total */}
              <div className="rounded-xl p-6 mb-6 text-center" style={{ backgroundColor: '#0c2340' }}>
                <p className="text-stone-300 text-sm font-medium uppercase tracking-wide mb-1">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold" style={{ color: '#c4a052' }}>
                  ${formatCurrency(results.total)}
                  <span className="text-lg font-normal text-stone-300">/mo</span>
                </p>
                <p className="text-stone-400 text-xs mt-2">
                  Loan amount: ${formatCurrency(results.principal)} · {loanTerm}-year fixed
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Payment Breakdown</p>
                {[
                  { label: 'Principal & Interest', value: results.monthlyPI },
                  { label: 'Est. Property Tax', value: results.propertyTax },
                  { label: 'Homeowners Insurance', value: results.insurance },
                  ...(results.pmi > 0 ? [{ label: 'PMI (< 20% down)', value: results.pmi }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-sm text-stone-600">{label}</span>
                    <span className="text-sm font-semibold text-stone-800">${formatCurrency(value)}/mo</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-stone-400 mt-4 leading-relaxed">
                Estimates only. Property tax based on 1.25% annual rate. Insurance estimated at $150/mo.
                PMI applies when down payment is below 20%. Contact Jessica for lender recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
