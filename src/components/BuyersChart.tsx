'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Plugin,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// Per-county data: towns with their median home prices
const countyData: Record<string, { label: string; towns: string[]; prices: number[]; median: number }> = {
  bristol: {
    label: 'Bristol County',
    towns: ['Easton', 'North Easton', 'South Easton', 'Mansfield', 'Norton', 'Raynham', 'Bridgewater', 'West Bridgewater', 'Taunton', 'Attleboro', 'North Attleborough'],
    prices: [663000, 655000, 639000, 631000, 548000, 567000, 567000, 541000, 410000, 425000, 490000],
    median: 567000,
  },
  norfolk: {
    label: 'Norfolk County',
    towns: ['Canton', 'Sharon', 'Norwood', 'Walpole', 'Stoughton', 'Foxborough', 'Millis', 'Medfield', 'Norfolk', 'Plainville'],
    prices: [804000, 760000, 682000, 695000, 548000, 672000, 598000, 782000, 635000, 572000],
    median: 672000,
  },
  plymouth: {
    label: 'Plymouth County',
    towns: ['Hingham', 'Duxbury', 'Marshfield', 'Scituate', 'Hanover', 'Pembroke', 'Kingston', 'Plymouth', 'Middleborough', 'East Bridgewater'],
    prices: [982000, 895000, 748000, 812000, 695000, 612000, 598000, 541000, 468000, 548000],
    median: 654000,
  },
};

const gold = '#c8a24e';
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = 'rgba(255,255,255,0.5)';

function makeMedianLinePlugin(townMedian: number): Plugin<'bar'> {
  return {
    id: 'medianLine',
    afterDraw(chart) {
      const xScale = chart.scales.x;
      if (!xScale) return;
      const xPos = xScale.getPixelForValue(townMedian);
      const ctx = chart.ctx;
      const area = chart.chartArea;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = 'rgba(200,162,78,0.5)';
      ctx.lineWidth = 1.5;
      ctx.moveTo(xPos, area.top);
      ctx.lineTo(xPos, area.bottom);
      ctx.stroke();
      ctx.fillStyle = 'rgba(200,162,78,0.7)';
      ctx.font = '600 10px Satoshi, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('County Median $' + (townMedian / 1000) + 'K', xPos, area.top - 8);
      ctx.restore();
    },
  };
}

export default function BuyersChart() {
  const [activeCounty, setActiveCounty] = useState<string>('bristol');
  const county = countyData[activeCounty];
  const { towns, prices, median } = county;

  const barColors = prices.map((p) => (p >= median ? gold : 'rgba(255,255,255,0.2)'));
  const barHoverColors = prices.map((p) => (p >= median ? '#d4b262' : 'rgba(255,255,255,0.35)'));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const axisMin = Math.floor((minPrice - 50000) / 50000) * 50000;
  const axisMax = Math.ceil((maxPrice + 50000) / 50000) * 50000;

  const medianPlugin = makeMedianLinePlugin(median);

  return (
    <div className="chart-container">
      <div className="chart-town-row">
        <label htmlFor="buyers-county-select" className="chart-town-label">
          <i className="ph ph-map-pin" style={{ marginRight: '0.375rem' }}></i>
          County
        </label>
        <div className="chart-town-select-wrapper">
          <select
            id="buyers-county-select"
            className="chart-town-select"
            value={activeCounty}
            onChange={(e) => setActiveCounty(e.target.value)}
          >
            {Object.entries(countyData).map(([key, c]) => (
              <option key={key} value={key}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart-wrapper" style={{ height: `${Math.max(280, towns.length * 44)}px` }}>
        <Bar
          key={activeCounty}
          data={{
            labels: towns,
            datasets: [
              {
                label: 'Median Home Price',
                data: prices,
                backgroundColor: barColors,
                hoverBackgroundColor: barHoverColors,
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
              },
            ],
          }}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(22,42,82,0.95)',
                titleColor: '#fff',
                bodyColor: 'rgba(255,255,255,0.85)',
                borderColor: 'rgba(200,162,78,0.3)',
                borderWidth: 1,
                padding: 14,
                cornerRadius: 10,
                titleFont: { family: "'Cabinet Grotesk', sans-serif", size: 13, weight: 'bold' },
                bodyFont: { family: "'Satoshi', sans-serif", size: 12 },
                callbacks: {
                  label: (ctx) => ' Median: $' + (ctx.parsed.x ?? 0).toLocaleString(),
                  afterLabel: (ctx) => {
                    const diff = (ctx.parsed.x ?? 0) - median;
                    if (diff > 0) return ' +' + Math.round(diff / 1000) + 'K above county median';
                    if (diff < 0) return ' ' + Math.round(diff / 1000) + 'K below county median';
                    return ' At county median';
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { color: gridColor, drawTicks: false },
                ticks: {
                  color: textColor,
                  font: { family: "'Satoshi', sans-serif", size: 11 },
                  callback: (v) => '$' + (Number(v) / 1000) + 'K',
                },
                border: { display: false },
                min: axisMin,
                max: axisMax,
              },
              y: {
                grid: { display: false },
                ticks: {
                  color: 'rgba(255,255,255,0.7)',
                  font: { family: "'Cabinet Grotesk', sans-serif", size: 13, weight: 'bold' as const },
                  padding: 8,
                },
                border: { display: false },
              },
            },
            animation: { duration: 800, easing: 'easeOutQuart' },
          }}
          plugins={[medianPlugin]}
        />
      </div>
      <div className="chart-legend">
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--primary"></span> Above County Median</span>
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--muted"></span> Below County Median</span>
      </div>
    </div>
  );
}
