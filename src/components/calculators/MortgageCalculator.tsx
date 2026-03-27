'use client';

import { useState, useMemo } from 'react';

// ─── Utilities ────────────────────────────────────────────────────────────────

function fmt(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmt2(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatWithCommas(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-US');
}

function parseCommas(formatted: string): number {
  const digits = formatted.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

// ─── Tab definitions ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'mortgage',      label: 'Mortgage Payment' },
  { id: 'interest',      label: 'Interest Savings' },
  { id: 'closing',       label: 'Closing Costs' },
  { id: 'amortization',  label: 'Amortization Schedule' },
] as const;

type TabId = typeof TABS[number]['id'];

// ─── Tab 1 — Mortgage Payment ─────────────────────────────────────────────────

function MortgageTab() {
  const [homePrice, setHomePrice] = useState(500000);
  const [homePriceDisplay, setHomePriceDisplay] = useState('500,000');
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
      monthlyPI = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 calc-body" style={{ padding: 'var(--space-8)' }}>
      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div className="form-group">
          <label htmlFor="mp-home-price">Home Price ($)</label>
          <input
            type="text" inputMode="numeric" id="mp-home-price"
            value={homePriceDisplay}
            onChange={(e) => {
              const formatted = formatWithCommas(e.target.value);
              setHomePriceDisplay(formatted);
              setHomePrice(parseCommas(e.target.value));
            }}
            placeholder="500,000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mp-down-pct">Down Payment (%)</label>
          <input type="number" id="mp-down-pct" min={3} max={50} step={1}
            value={downPaymentPct} onChange={(e) => setDownPaymentPct(Number(e.target.value))} />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
            = ${fmt(results.downPaymentAmt)} down &middot; ${fmt(results.principal)} loan
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="mp-rate">Interest Rate (%)</label>
          <input type="number" id="mp-rate" min={1} max={20} step={0.05}
            value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label htmlFor="mp-term">Loan Term</label>
          <select id="mp-term" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
            <option value={15}>15 Years</option>
            <option value={20}>20 Years</option>
            <option value={30}>30 Years</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="lg:mt-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
        <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
          <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)', maxWidth: 'none' }}>
            Estimated Monthly Payment
          </p>
          <p style={{ lineHeight: 1, marginBottom: 'var(--space-2)', maxWidth: 'none' }}>
            <span style={{ color: 'var(--gold)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800 }}>
              ${fmt(results.total)}
            </span>
            <span style={{ color: 'var(--navy-100)', fontSize: 'var(--text-lg)', fontWeight: 400 }}>/mo</span>
          </p>
          <p style={{ color: 'var(--gray-400)', fontSize: 'var(--text-xs)', maxWidth: 'none' }}>
            ${fmt(results.principal)} loan &middot; {loanTerm}-yr fixed
          </p>
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)', maxWidth: 'none' }}>
            Payment Breakdown
          </p>
          <div>
            {breakdown.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', maxWidth: 'none' }}>{label}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gray-800)', maxWidth: 'none', whiteSpace: 'nowrap' }}>${fmt(value)}/mo</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-400)', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
            Estimates only. Property tax based on 1.25% annual rate. Insurance estimated at $150/mo. PMI applies when down payment is below 20%.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2 — Interest Savings ─────────────────────────────────────────────────

function InterestSavingsTab() {
  const [loanDisplay, setLoanDisplay] = useState('650,000');
  const [loanAmt, setLoanAmt] = useState(650000);
  const [currentRate, setCurrentRate] = useState(7.0);
  const [newRate, setNewRate] = useState(6.0);
  const [term, setTerm] = useState(30);

  const results = useMemo(() => {
    const n = term * 12;
    const calcTotal = (rate: number) => {
      const r = rate / 100 / 12;
      if (r === 0) return loanAmt;
      const pmt = (loanAmt * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      return pmt * n;
    };
    const totalCurrent = calcTotal(currentRate);
    const totalNew = calcTotal(newRate);
    const interestCurrent = totalCurrent - loanAmt;
    const interestNew = totalNew - loanAmt;
    const savings = interestCurrent - interestNew;
    const monthlyDiff = (totalCurrent - totalNew) / n;
    return { interestCurrent, interestNew, savings, monthlyDiff };
  }, [loanAmt, currentRate, newRate, term]);

  const saving = results.savings > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 calc-body" style={{ padding: 'var(--space-8)' }}>
      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div className="form-group">
          <label htmlFor="is-loan">Loan Amount ($)</label>
          <input type="text" inputMode="numeric" id="is-loan"
            value={loanDisplay}
            onChange={(e) => {
              setLoanDisplay(formatWithCommas(e.target.value));
              setLoanAmt(parseCommas(e.target.value));
            }}
            placeholder="650,000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="is-current-rate">Current Rate (APR %)</label>
          <input type="number" id="is-current-rate" min={1} max={20} step={0.125}
            value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label htmlFor="is-new-rate">New / Comparison Rate (APR %)</label>
          <input type="number" id="is-new-rate" min={1} max={20} step={0.125}
            value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label htmlFor="is-term">Loan Term</label>
          <select id="is-term" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
            <option value={15}>15 Years</option>
            <option value={20}>20 Years</option>
            <option value={30}>30 Years</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="lg:mt-0" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
        <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', textAlign: 'center' }}>
          <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)', maxWidth: 'none' }}>
            {saving ? 'Total Interest Saved' : 'Additional Interest Cost'}
          </p>
          <p style={{ lineHeight: 1, marginBottom: 'var(--space-2)', maxWidth: 'none' }}>
            <span style={{ color: saving ? 'var(--gold)' : '#f87171', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
              {saving ? '+' : '-'}${fmt(Math.abs(results.savings))}
            </span>
          </p>
          <p style={{ color: 'var(--gray-400)', fontSize: 'var(--text-xs)', maxWidth: 'none' }}>
            {saving ? 'saved' : 'extra cost'} over {term} years &middot; ${fmt(Math.abs(results.monthlyDiff))}/mo difference
          </p>
        </div>
        <div>
          {[
            { label: `Total Interest at ${currentRate}%`, value: results.interestCurrent },
            { label: `Total Interest at ${newRate}%`, value: results.interestNew },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--gray-200)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', maxWidth: 'none' }}>{label}</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gray-800)', maxWidth: 'none' }}>${fmt(value)}</span>
            </div>
          ))}
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-400)', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
            Estimates based on fixed-rate amortization. Contact Jessica for current rate quotes from trusted local lenders.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3 — Closing Costs ────────────────────────────────────────────────────

function ClosingCostsTab() {
  const [priceDisplay, setPriceDisplay] = useState('500,000');
  const [price, setPrice] = useState(500000);
  const [side, setSide] = useState<'buyer' | 'seller'>('buyer');

  const results = useMemo(() => {
    if (side === 'buyer') {
      const loanAmt = price * 0.8; // assume 20% down
      return [
        { label: 'Loan Origination Fee (1%)', value: loanAmt * 0.01 },
        { label: 'Appraisal Fee', value: 600 },
        { label: 'Home Inspection', value: 550 },
        { label: 'Title Search & Insurance', value: price * 0.005 },
        { label: 'Attorney Fee', value: 1200 },
        { label: 'Recording Fees', value: 250 },
        { label: 'Prepaid Property Tax (2 mo)', value: (price * 0.0125) / 12 * 2 },
        { label: 'Prepaid Homeowners Insurance', value: 1500 },
        { label: 'Mortgage Points (est.)', value: loanAmt * 0.005 },
      ];
    } else {
      return [
        { label: "Realtor Commission (5–6%)", value: price * 0.055 },
        { label: 'MA Deed Excise Tax ($4.56/$1,000)', value: Math.floor(price / 1000) * 4.56 },
        { label: 'Attorney Fee', value: 1200 },
        { label: 'Title Search', value: 400 },
        { label: 'Recording Fees', value: 250 },
        { label: 'Prorated Property Tax', value: (price * 0.0125) / 12 * 3 },
        { label: 'Home Warranty (optional)', value: 600 },
      ];
    }
  }, [price, side]);

  const total = results.reduce((sum, r) => sum + r.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 calc-body" style={{ padding: 'var(--space-8)' }}>
      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div className="form-group">
          <label htmlFor="cc-price">Home Sale Price ($)</label>
          <input type="text" inputMode="numeric" id="cc-price"
            value={priceDisplay}
            onChange={(e) => {
              setPriceDisplay(formatWithCommas(e.target.value));
              setPrice(parseCommas(e.target.value));
            }}
            placeholder="500,000"
          />
        </div>
        <div className="form-group">
          <label>I am the</label>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-1)' }}>
            {(['buyer', 'seller'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                style={{
                  flex: 1,
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid',
                  borderColor: side === s ? 'var(--gold)' : 'var(--gray-300)',
                  background: side === s ? 'var(--gold)' : 'transparent',
                  color: side === s ? 'var(--primary)' : 'var(--gray-600)',
                  fontWeight: 600,
                  fontSize: 'var(--text-sm)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', lineHeight: 1.6, maxWidth: 'none' }}>
            Estimates based on typical Massachusetts closing costs. Actual costs vary by lender, attorney, and transaction details. Contact Jessica for a precise estimate.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:mt-0" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
        <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', textAlign: 'center', marginBottom: 'var(--space-2)' }}>
          <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-1)', maxWidth: 'none' }}>
            Estimated {side === 'buyer' ? 'Buyer' : 'Seller'} Closing Costs
          </p>
          <span style={{ color: 'var(--gold)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800 }}>
            ${fmt(total)}
          </span>
          <p style={{ color: 'var(--gray-400)', fontSize: 'var(--text-xs)', maxWidth: 'none', marginTop: 'var(--space-1)' }}>
            approx. {((total / price) * 100).toFixed(1)}% of sale price
          </p>
        </div>
        <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
          {results.map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--gray-200)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', maxWidth: 'none' }}>{label}</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gray-800)', maxWidth: 'none', whiteSpace: 'nowrap' }}>${fmt(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 4 — Amortization Schedule ───────────────────────────────────────────

function AmortizationTab() {
  const [loanDisplay, setLoanDisplay] = useState('650,000');
  const [loanAmt, setLoanAmt] = useState(650000);
  const [rate, setRate] = useState(6.375);
  const [term, setTerm] = useState(30);
  const [showAll, setShowAll] = useState(false);

  const schedule = useMemo(() => {
    const n = term * 12;
    const r = rate / 100 / 12;
    if (r === 0 || loanAmt <= 0) return [];
    const pmt = (loanAmt * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const rows = [];
    let balance = loanAmt;
    let totalInterest = 0;
    let totalPayments = 0;
    for (let i = 1; i <= n; i++) {
      const interestPmt = balance * r;
      const principalPmt = pmt - interestPmt;
      balance -= principalPmt;
      totalInterest += interestPmt;
      totalPayments += pmt;
      rows.push({
        num: i,
        payment: pmt,
        interest: totalInterest,
        totalPayments,
        balance: Math.max(0, balance),
      });
    }
    return rows;
  }, [loanAmt, rate, term]);

  const displayRows = showAll ? schedule : schedule.slice(0, 24);

  return (
    <div style={{ padding: 'var(--space-8)' }}>
      {/* Inputs row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="form-group">
          <label htmlFor="am-loan">Loan Amount ($)</label>
          <input type="text" inputMode="numeric" id="am-loan"
            value={loanDisplay}
            onChange={(e) => {
              setLoanDisplay(formatWithCommas(e.target.value));
              setLoanAmt(parseCommas(e.target.value));
            }}
            placeholder="650,000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="am-rate">Rate (APR %)</label>
          <input type="number" id="am-rate" min={1} max={20} step={0.125}
            value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label htmlFor="am-term">Loan Term</label>
          <select id="am-term" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
            <option value={15}>15 Years</option>
            <option value={20}>20 Years</option>
            <option value={30}>30 Years</option>
          </select>
        </div>
      </div>

      {/* Summary bar */}
      {schedule.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          {[
            { label: 'Monthly Payment', value: `$${fmt2(schedule[0].payment)}` },
            { label: 'Total Interest', value: `$${fmt(schedule[schedule.length - 1].interest)}` },
            { label: 'Total Paid', value: `$${fmt(schedule[schedule.length - 1].totalPayments)}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', textAlign: 'center' }}>
              <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)', maxWidth: 'none' }}>{label}</p>
              <p style={{ color: 'var(--gold)', fontSize: 'var(--text-lg)', fontWeight: 800, maxWidth: 'none' }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ background: 'var(--primary)', color: 'var(--white)' }}>
              {['#', 'Payment Amt.', 'Total Interest', 'Total Payments', 'Balance'].map((h) => (
                <th key={h} style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'right', fontWeight: 600, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, i) => (
              <tr key={row.num} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--off-white)' }}>
                <td style={{ padding: 'var(--space-2) var(--space-4)', textAlign: 'right', color: 'var(--gray-500)' }}>{row.num}</td>
                <td style={{ padding: 'var(--space-2) var(--space-4)', textAlign: 'right', fontWeight: 600, color: 'var(--gray-800)' }}>${fmt2(row.payment)}</td>
                <td style={{ padding: 'var(--space-2) var(--space-4)', textAlign: 'right', color: 'var(--gray-700)' }}>${fmt(row.interest)}</td>
                <td style={{ padding: 'var(--space-2) var(--space-4)', textAlign: 'right', color: 'var(--gray-700)' }}>${fmt(row.totalPayments)}</td>
                <td style={{ padding: 'var(--space-2) var(--space-4)', textAlign: 'right', color: 'var(--gray-700)' }}>${fmt(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 24 && (
        <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            style={{
              background: 'transparent',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--radius-full)',
              padding: 'var(--space-2) var(--space-6)',
              fontSize: 'var(--text-sm)',
              color: 'var(--gray-600)',
              cursor: 'pointer',
            }}
          >
            {showAll ? 'Show Less' : `Show All ${schedule.length} Payments`}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Tab descriptions ─────────────────────────────────────────────────────────

const TAB_DESC: Record<TabId, string> = {
  mortgage:     'Estimate your monthly payment based on purchase price and loan details.',
  interest:     'Compare two interest rates and see how much you save over the life of the loan.',
  closing:      'Estimate buyer or seller closing costs for a Massachusetts real estate transaction.',
  amortization: 'See your full payment schedule — principal, interest, and remaining balance each month.',
};

// ─── Main export ──────────────────────────────────────────────────────────────

export default function MortgageCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>('mortgage');

  return (
    <section style={{ background: 'var(--off-white)', padding: 'var(--space-16) 0' }}>
      <div className="container" style={{ maxWidth: '64rem' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>

          {/* ── Header with tab nav ── */}
          <div style={{ background: 'var(--primary)', padding: 'var(--space-8)' }}>
            {/* Tab pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: 'var(--space-1) var(--space-4)',
                      borderRadius: 'var(--radius-full)',
                      border: '2px solid',
                      borderColor: active ? 'var(--gold)' : 'rgba(255,255,255,0.25)',
                      background: active ? 'var(--gold)' : 'transparent',
                      color: active ? 'var(--primary)' : 'rgba(255,255,255,0.75)',
                      fontWeight: 400,
                      fontSize: 'var(--text-xs)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active tab title + description */}
            <h2 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <p style={{ color: 'var(--navy-100)', fontSize: 'var(--text-sm)', maxWidth: 'none' }}>
              {TAB_DESC[activeTab]}
            </p>
          </div>

          {/* ── Tab content ── */}
          {activeTab === 'mortgage'     && <MortgageTab />}
          {activeTab === 'interest'     && <InterestSavingsTab />}
          {activeTab === 'closing'      && <ClosingCostsTab />}
          {activeTab === 'amortization' && <AmortizationTab />}
        </div>
      </div>
    </section>
  );
}
