'use client';

interface TownData {
  name: string;
  price: number;
}

function fmtK(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  return `$${Math.round(value / 1000)}K`;
}

const COUNTY_DATA: Record<string, { towns: TownData[]; median: number }> = {
  'bristol-county': {
    median: 567000,
    towns: [
      { name: 'Easton',            price: 680000 },
      { name: 'North Easton',      price: 665000 },
      { name: 'South Easton',      price: 640000 },
      { name: 'Mansfield',         price: 635000 },
      { name: 'Norton',            price: 530000 },
      { name: 'Raynham',           price: 575000 },
      { name: 'Bridgewater',       price: 580000 },
      { name: 'West Bridgewater',  price: 520000 },
      { name: 'Taunton',           price: 395000 },
      { name: 'Attleboro',         price: 415000 },
      { name: 'North Attleborough',price: 480000 },
    ],
  },
  'norfolk-county': {
    median: 672000,
    towns: [
      { name: 'Canton',      price: 830000 },
      { name: 'Sharon',      price: 790000 },
      { name: 'Norwood',     price: 685000 },
      { name: 'Walpole',     price: 700000 },
      { name: 'Stoughton',   price: 455000 },
      { name: 'Foxborough',  price: 680000 },
      { name: 'Millis',      price: 560000 },
      { name: 'Medfield',    price: 800000 },
      { name: 'Norfolk',     price: 650000 },
      { name: 'Plainville',  price: 510000 },
    ],
  },
  'plymouth-county': {
    median: 654000,
    towns: [
      { name: 'Hingham',        price: 1020000 },
      { name: 'Duxbury',        price: 920000 },
      { name: 'Marshfield',     price: 760000 },
      { name: 'Scituate',       price: 800000 },
      { name: 'Hanover',        price: 695000 },
      { name: 'Pembroke',       price: 595000 },
      { name: 'Kingston',       price: 590000 },
      { name: 'Plymouth',       price: 470000 },
      { name: 'Middleborough',  price: 370000 },
      { name: 'East Bridgewater', price: 490000 },
    ],
  },
};

export default function CountyPriceChart({ county }: { county: string }) {
  const data = COUNTY_DATA[county];
  if (!data) return null;

  const { towns, median } = data;
  const sorted = [...towns].sort((a, b) => b.price - a.price);
  const maxPrice = Math.max(...sorted.map((t) => t.price));

  // Axis ticks
  const tickStep = maxPrice > 900000 ? 100000 : 50000;
  const maxTick = Math.ceil(maxPrice / tickStep) * tickStep;
  const ticks: number[] = [];
  for (let v = 0; v <= maxTick; v += tickStep) ticks.push(v);

  const medianPct = (median / maxTick) * 100;

  return (
    <section className="section section--dark">
      <div className="container">
        <div style={{
          background: 'var(--primary)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-lg)',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <p style={{ color: 'var(--gold)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-1)', maxWidth: 'none' }}>
              Market Data
            </p>
            <h2 style={{ color: 'var(--white)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, maxWidth: 'none' }}>
              Median Home Prices by Town
            </h2>
          </div>

          {/* Chart area */}
          <div style={{ position: 'relative', overflowX: 'auto' }}>
            <div style={{ minWidth: '480px' }}>

              {/* County median label */}
              <div style={{ position: 'relative', height: '24px', marginBottom: 'var(--space-2)', marginLeft: '160px' }}>
                <div style={{
                  position: 'absolute',
                  left: `${medianPct}%`,
                  transform: 'translateX(-50%)',
                  color: 'var(--gold)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  County Median {fmtK(median)}
                </div>
              </div>

              {/* Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {sorted.map((town) => {
                  const pct = (town.price / maxTick) * 100;
                  const aboveMedian = town.price >= median;
                  return (
                    <div key={town.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      {/* Town name */}
                      <div style={{ width: '150px', flexShrink: 0, textAlign: 'right', color: 'var(--gray-300)', fontSize: 'var(--text-sm)', paddingRight: 'var(--space-2)' }}>
                        {town.name}
                      </div>
                      {/* Bar track */}
                      <div style={{ flex: 1, position: 'relative', height: '28px' }}>
                        {/* Median dashed line */}
                        <div style={{
                          position: 'absolute',
                          left: `${medianPct}%`,
                          top: 0,
                          bottom: 0,
                          width: '1px',
                          borderLeft: '2px dashed rgba(255,255,255,0.2)',
                          zIndex: 2,
                        }} />
                        {/* Bar */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '4px',
                          height: '20px',
                          width: `${pct}%`,
                          background: aboveMedian ? 'var(--gold)' : 'rgba(148,163,184,0.5)',
                          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          paddingRight: 'var(--space-2)',
                          transition: 'width 0.6s ease',
                        }}>
                          <span style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: 700,
                            color: aboveMedian ? 'var(--primary)' : 'var(--white)',
                            whiteSpace: 'nowrap',
                          }}>
                            {fmtK(town.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis ticks */}
              <div style={{ display: 'flex', marginLeft: '160px', marginTop: 'var(--space-4)', position: 'relative' }}>
                {ticks.map((tick) => (
                  <div key={tick} style={{
                    position: 'absolute',
                    left: `${(tick / maxTick) * 100}%`,
                    transform: 'translateX(-50%)',
                    color: 'var(--gray-400)',
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                  }}>
                    {fmtK(tick)}
                  </div>
                ))}
                <div style={{ height: '20px' }} />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-8)', justifyContent: 'center' }}>
            {[
              { color: 'var(--gold)', label: 'Above County Median' },
              { color: 'rgba(148,163,184,0.5)', label: 'Below County Median' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ color: 'var(--gray-300)', fontSize: 'var(--text-xs)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
