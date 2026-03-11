'use client';

import { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const fullData = {
  labels: [
    'Q1 2018','Q2 2018','Q3 2018','Q4 2018',
    'Q1 2019','Q2 2019','Q3 2019','Q4 2019',
    'Q1 2020','Q2 2020','Q3 2020','Q4 2020',
    'Q1 2021','Q2 2021','Q3 2021','Q4 2021',
    'Q1 2022','Q2 2022','Q3 2022','Q4 2022',
    'Q1 2023','Q2 2023','Q3 2023','Q4 2023',
    'Q1 2024','Q2 2024','Q3 2024','Q4 2024',
    'Q1 2025','Q2 2025','Q3 2025','Q4 2025',
  ],
  easton: [
    422000,430000,438000,435000,437000,448000,455000,458000,
    462000,475000,498000,520000,540000,568000,590000,602000,
    610000,625000,632000,628000,630000,638000,645000,648000,
    652000,658000,665000,662000,660000,668000,674000,663000,
  ],
  mass: [
    385000,395000,400000,398000,400000,410000,418000,420000,
    425000,435000,455000,472000,490000,510000,530000,545000,
    555000,568000,572000,565000,560000,570000,578000,585000,
    590000,600000,610000,615000,620000,630000,637000,637000,
  ],
};

const gold = '#c8a24e';
const goldFade = 'rgba(200,162,78,0.15)';
const muted = 'rgba(255,255,255,0.3)';
const mutedFade = 'rgba(255,255,255,0.03)';
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = 'rgba(255,255,255,0.5)';

type RangeKey = 'all' | '5y' | '3y' | '1y';

export default function HomeValueChart() {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const [activeRange, setActiveRange] = useState<RangeKey>('all');

  function getSliceStart(range: RangeKey) {
    if (range === '1y') return fullData.labels.length - 4;
    if (range === '3y') return fullData.labels.length - 12;
    if (range === '5y') return fullData.labels.length - 20;
    return 0;
  }

  const sliceStart = getSliceStart(activeRange);
  const labels = fullData.labels.slice(sliceStart);
  const easton = fullData.easton.slice(sliceStart);
  const mass = fullData.mass.slice(sliceStart);

  const allVisible = [...easton, ...mass];
  const minVal = Math.min(...allVisible);
  const maxVal = Math.max(...allVisible);
  const padding = (maxVal - minVal) * 0.15;

  function handleRange(range: RangeKey) {
    setActiveRange(range);
  }

  return (
    <div className="chart-container">
      <div className="chart-controls">
        {(['all', '5y', '3y', '1y'] as RangeKey[]).map((r) => (
          <button
            key={r}
            className={`chart-btn${activeRange === r ? ' is-active' : ''}`}
            data-range={r}
            onClick={() => handleRange(r)}
          >
            {r === 'all' ? 'All Time' : r === '5y' ? '5 Years' : r === '3y' ? '3 Years' : '1 Year'}
          </button>
        ))}
      </div>
      <div className="chart-wrapper">
        <Line
          ref={chartRef}
          data={{
            labels,
            datasets: [
              {
                label: 'Easton Avg. Home Value',
                data: easton,
                borderColor: gold,
                backgroundColor: goldFade,
                borderWidth: 2.5,
                fill: true,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: gold,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
              },
              {
                label: 'Massachusetts Median',
                data: mass,
                borderColor: muted,
                backgroundColor: mutedFade,
                borderWidth: 1.5,
                borderDash: [6, 4],
                fill: true,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255,255,255,0.6)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
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
                  label: (context) => {
                    const val = context.parsed.y ?? 0;
                    return ' ' + context.dataset.label + ': $' + (val / 1000).toFixed(0) + 'K';
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
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 8,
                },
                border: { display: false },
              },
              y: {
                grid: { color: gridColor, drawTicks: false },
                ticks: {
                  color: textColor,
                  font: { family: "'Satoshi', sans-serif", size: 11 },
                  callback: (val) => '$' + (Number(val) / 1000) + 'K',
                },
                border: { display: false },
                beginAtZero: false,
                suggestedMin: activeRange === 'all' ? 350000 : minVal - padding,
                suggestedMax: activeRange === 'all' ? 720000 : maxVal + padding,
              },
            },
            animation: { duration: 1200, easing: 'easeOutQuart' },
          }}
        />
      </div>
      <div className="chart-legend">
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--primary"></span> Easton Avg. Home Value</span>
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--muted"></span> Massachusetts Median</span>
      </div>
    </div>
  );
}
