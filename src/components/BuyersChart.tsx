'use client';

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

const neighborhoods = ['North Easton', 'South Easton', 'Five Corners', 'Furnace Village', 'Eastondale', 'Unionville'];
const prices = [725000, 610000, 680000, 585000, 545000, 620000];
const townMedian = 663000;
const gold = '#c8a24e';
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = 'rgba(255,255,255,0.5)';

const barColors = prices.map((p) => (p >= townMedian ? gold : 'rgba(255,255,255,0.2)'));
const barHoverColors = prices.map((p) => (p >= townMedian ? '#d4b262' : 'rgba(255,255,255,0.35)'));

const medianLinePlugin: Plugin<'bar'> = {
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
    ctx.fillText('Town Median $' + (townMedian / 1000) + 'K', xPos, area.top - 8);
    ctx.restore();
  },
};

export default function BuyersChart() {
  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Bar
          data={{
            labels: neighborhoods,
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
                    const diff = (ctx.parsed.x ?? 0) - townMedian;
                    if (diff > 0) return ' +' + Math.round(diff / 1000) + 'K above town median';
                    if (diff < 0) return ' ' + Math.round(diff / 1000) + 'K below town median';
                    return ' At town median';
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
                min: 400000,
                max: 800000,
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
            animation: { duration: 1200, easing: 'easeOutQuart' },
          }}
          plugins={[medianLinePlugin]}
        />
      </div>
      <div className="chart-legend">
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--primary"></span> Above Town Median</span>
        <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--muted"></span> Below Town Median</span>
      </div>
    </div>
  );
}
