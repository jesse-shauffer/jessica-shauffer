'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Plugin,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const labels = [
  "Q1 '22","Q2 '22","Q3 '22","Q4 '22",
  "Q1 '23","Q2 '23","Q3 '23","Q4 '23",
  "Q1 '24","Q2 '24","Q3 '24","Q4 '24",
  "Q1 '25","Q2 '25","Q3 '25","Q4 '25",
];

const townData: Record<string, { label: string; ratio: number[]; days: number[] }> = {
  easton: {
    label: 'Easton',
    ratio: [102.1,103.4,101.8,100.2,100.5,102.8,101.6,100.1,100.8,102.2,101.4,100.6,101.0,102.5,101.8,99.4],
    days:  [18,14,19,28,24,16,20,30,22,15,18,26,20,14,17,53],
  },
  'north-easton': {
    label: 'North Easton',
    ratio: [101.8,103.1,101.5,100.0,100.2,102.5,101.3,99.8,100.5,101.9,101.1,100.3,100.7,102.2,101.5,99.1],
    days:  [20,15,21,30,26,18,22,32,24,17,20,28,22,16,19,55],
  },
  'south-easton': {
    label: 'South Easton',
    ratio: [101.5,102.8,101.2,99.8,99.9,102.2,101.0,99.5,100.2,101.6,100.8,100.0,100.4,101.9,101.2,98.8],
    days:  [22,17,23,32,28,20,24,34,26,19,22,30,24,18,21,57],
  },
  canton: {
    label: 'Canton',
    ratio: [103.2,104.5,102.9,101.3,101.6,103.9,102.7,101.2,101.9,103.3,102.5,101.7,102.1,103.6,102.9,100.5],
    days:  [14,10,15,24,20,12,16,26,18,11,14,22,16,10,13,47],
  },
  sharon: {
    label: 'Sharon',
    ratio: [102.8,104.1,102.5,100.9,101.2,103.5,102.3,100.8,101.5,102.9,102.1,101.3,101.7,103.2,102.5,100.1],
    days:  [16,12,17,26,22,14,18,28,20,13,16,24,18,12,15,49],
  },
  mansfield: {
    label: 'Mansfield',
    ratio: [101.9,103.2,101.6,100.0,100.3,102.6,101.4,99.9,100.6,102.0,101.2,100.4,100.8,102.3,101.6,99.2],
    days:  [19,15,20,29,25,17,21,31,23,16,19,27,21,15,18,54],
  },
  bridgewater: {
    label: 'Bridgewater',
    ratio: [101.2,102.5,100.9,99.3,99.6,101.9,100.7,99.2,99.9,101.3,100.5,99.7,100.1,101.6,100.9,98.5],
    days:  [24,19,25,34,30,22,26,36,28,21,24,32,26,20,23,59],
  },
  hingham: {
    label: 'Hingham',
    ratio: [103.5,104.8,103.2,101.6,101.9,104.2,103.0,101.5,102.2,103.6,102.8,102.0,102.4,103.9,103.2,100.8],
    days:  [12,8,13,22,18,10,14,24,16,9,12,20,14,8,11,45],
  },
  plymouth: {
    label: 'Plymouth',
    ratio: [100.8,102.1,100.5,98.9,99.2,101.5,100.3,98.8,99.5,100.9,100.1,99.3,99.7,101.2,100.5,98.1],
    days:  [26,21,27,36,32,24,28,38,30,23,26,34,28,22,25,61],
  },
  norwood: {
    label: 'Norwood',
    ratio: [102.4,103.7,102.1,100.5,100.8,103.1,101.9,100.4,101.1,102.5,101.7,100.9,101.3,102.8,102.1,99.7],
    days:  [17,13,18,27,23,15,19,29,21,14,17,25,19,13,16,51],
  },
  stoughton: {
    label: 'Stoughton',
    ratio: [101.2,102.5,100.9,99.3,99.6,101.9,100.7,99.2,99.9,101.3,100.5,99.7,100.1,101.6,100.9,98.5],
    days:  [23,18,24,33,29,21,25,35,27,20,23,31,25,19,22,58],
  },
  westwood: {
    label: 'Westwood',
    ratio: [103.8,105.1,103.5,101.9,102.2,104.5,103.3,101.8,102.5,103.9,103.1,102.3,102.7,104.2,103.5,101.1],
    days:  [11,7,12,21,17,9,13,23,15,8,11,19,13,7,10,44],
  },
  foxborough: {
    label: 'Foxborough',
    ratio: [102.0,103.3,101.7,100.1,100.4,102.7,101.5,100.0,100.7,102.1,101.3,100.5,100.9,102.4,101.7,99.3],
    days:  [18,14,19,28,24,16,20,30,22,15,18,26,20,14,17,53],
  },
  norton: {
    label: 'Norton',
    ratio: [101.0,102.3,100.7,99.1,99.4,101.7,100.5,99.0,99.7,101.1,100.3,99.5,99.9,101.4,100.7,98.3],
    days:  [25,20,26,35,31,23,27,37,29,22,25,33,27,21,24,60],
  },
  raynham: {
    label: 'Raynham',
    ratio: [101.4,102.7,101.1,99.5,99.8,102.1,100.9,99.4,100.1,101.5,100.7,99.9,100.3,101.8,101.1,98.7],
    days:  [22,17,23,32,28,20,24,34,26,19,22,30,24,18,21,57],
  },
  taunton: {
    label: 'Taunton',
    ratio: [100.5,101.8,100.2,98.6,98.9,101.2,100.0,98.5,99.2,100.6,99.8,99.0,99.4,100.9,100.2,97.8],
    days:  [28,23,29,38,34,26,30,40,32,25,28,36,30,24,27,63],
  },
  attleboro: {
    label: 'Attleboro',
    ratio: [100.8,102.1,100.5,98.9,99.2,101.5,100.3,98.8,99.5,100.9,100.1,99.3,99.7,101.2,100.5,98.1],
    days:  [26,21,27,36,32,24,28,38,30,23,26,34,28,22,25,61],
  },
  'north-attleborough': {
    label: 'North Attleborough',
    ratio: [101.1,102.4,100.8,99.2,99.5,101.8,100.6,99.1,99.8,101.2,100.4,99.6,100.0,101.5,100.8,98.4],
    days:  [24,19,25,34,30,22,26,36,28,21,24,32,26,20,23,59],
  },
  'west-bridgewater': {
    label: 'West Bridgewater',
    ratio: [101.3,102.6,101.0,99.4,99.7,102.0,100.8,99.3,100.0,101.4,100.6,99.8,100.2,101.7,101.0,98.6],
    days:  [23,18,24,33,29,21,25,35,27,20,23,31,25,19,22,58],
  },
  'east-bridgewater': {
    label: 'East Bridgewater',
    ratio: [101.0,102.3,100.7,99.1,99.4,101.7,100.5,99.0,99.7,101.1,100.3,99.5,99.9,101.4,100.7,98.3],
    days:  [25,20,26,35,31,23,27,37,29,22,25,33,27,21,24,60],
  },
  halifax: {
    label: 'Halifax',
    ratio: [100.9,102.2,100.6,99.0,99.3,101.6,100.4,98.9,99.6,101.0,100.2,99.4,99.8,101.3,100.6,98.2],
    days:  [27,22,28,37,33,25,29,39,31,24,27,35,29,23,26,62],
  },
  lakeville: {
    label: 'Lakeville',
    ratio: [101.0,102.3,100.7,99.1,99.4,101.7,100.5,99.0,99.7,101.1,100.3,99.5,99.9,101.4,100.7,98.3],
    days:  [26,21,27,36,32,24,28,38,30,23,26,34,28,22,25,61],
  },
  weston: {
    label: 'Weston',
    ratio: [103.5,104.8,103.2,101.6,101.9,104.2,103.0,101.5,102.2,103.6,102.8,102.0,102.4,103.9,103.2,100.8],
    days:  [14,10,15,24,20,12,16,26,18,11,14,22,16,10,13,47],
  },
  kingston: {
    label: 'Kingston',
    ratio: [101.8,103.1,101.5,99.9,100.2,102.5,101.3,99.8,100.5,101.9,101.1,100.3,100.7,102.2,101.5,99.1],
    days:  [20,15,21,30,26,18,22,32,24,17,20,28,22,16,19,55],
  },
  middleborough: {
    label: 'Middleborough',
    ratio: [100.6,101.9,100.3,98.7,99.0,101.3,100.1,98.6,99.3,100.7,99.9,99.1,99.5,101.0,100.3,97.9],
    days:  [27,22,28,37,33,25,29,39,31,24,27,35,29,23,26,62],
  },
};

const gold = '#c8a24e';
const goldFade = 'rgba(200,162,78,0.15)';
const teal = '#4db8a4';
const tealFade = 'rgba(77,184,164,0.08)';
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = 'rgba(255,255,255,0.5)';

const refLinePlugin: Plugin<'line'> = {
  id: 'refLine',
  afterDraw(chart) {
    const yScale = chart.scales.y;
    if (!yScale) return;
    const yPos = yScale.getPixelForValue(100);
    const ctx = chart.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.setLineDash([8, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.moveTo(chart.chartArea.left, yPos);
    ctx.lineTo(chart.chartArea.right, yPos);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '600 10px Satoshi, sans-serif';
    ctx.fillText('100% List Price', chart.chartArea.left + 6, yPos - 6);
    ctx.restore();
  },
};

export default function SellersChart() {
  const [activeTown, setActiveTown] = useState<string>('easton');
  const town = townData[activeTown];

  return (
    <div className="chart-container">
      <div className="chart-town-row">
        <label htmlFor="sellers-town-select" className="chart-town-label">
          <i className="ph ph-map-pin" style={{ marginRight: '0.375rem' }}></i>
          Town
        </label>
        <div className="chart-town-select-wrapper">
          <select
            id="sellers-town-select"
            className="chart-town-select"
            value={activeTown}
            onChange={(e) => setActiveTown(e.target.value)}
          >
            {Object.entries(townData).sort(([,a],[,b]) => a.label.localeCompare(b.label)).map(([key, t]) => (
              <option key={key} value={key}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: 'Sale-to-List Ratio',
                data: town.ratio,
                borderColor: gold,
                backgroundColor: goldFade,
                borderWidth: 2.5,
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: gold,
                pointBorderColor: 'rgba(22,42,82,0.9)',
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: gold,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                yAxisID: 'y',
              },
              {
                label: 'Days on Market',
                data: town.days,
                borderColor: teal,
                backgroundColor: tealFade,
                borderWidth: 2,
                borderDash: [5, 3],
                fill: false,
                tension: 0.35,
                pointRadius: 3,
                pointBackgroundColor: teal,
                pointBorderColor: 'rgba(22,42,82,0.9)',
                pointBorderWidth: 2,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: teal,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
                yAxisID: 'y1',
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
                  label: (ctx) => {
                    if (ctx.datasetIndex === 0) return ' Sale-to-List: ' + (ctx.parsed.y ?? 0).toFixed(1) + '%';
                    return ' Days on Market: ' + (ctx.parsed.y ?? 0);
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
                type: 'linear',
                position: 'left',
                grid: { color: gridColor, drawTicks: false },
                ticks: {
                  color: gold,
                  font: { family: "'Satoshi', sans-serif", size: 11, weight: 'bold' as const },
                  callback: (v) => v + '%',
                },
                border: { display: false },
                min: 97,
                max: 105,
              },
              y1: {
                type: 'linear',
                position: 'right',
                grid: { display: false },
                ticks: {
                  color: teal,
                  font: { family: "'Satoshi', sans-serif", size: 11, weight: 'bold' as const },
                  callback: (v) => v + 'd',
                },
                border: { display: false },
                min: 0,
                max: 65,
              },
            },
            animation: { duration: 800, easing: 'easeOutQuart' },
          }}
          plugins={[refLinePlugin]}
        />
      </div>
      <div className="chart-legend">
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--primary"></span> Sale-to-List Ratio</span>
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--teal"></span> Days on Market</span>
      </div>
    </div>
  );
}
