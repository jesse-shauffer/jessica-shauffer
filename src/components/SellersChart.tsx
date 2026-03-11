'use client';

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

const chartData = {
  labels: [
    "Q1 '22","Q2 '22","Q3 '22","Q4 '22",
    "Q1 '23","Q2 '23","Q3 '23","Q4 '23",
    "Q1 '24","Q2 '24","Q3 '24","Q4 '24",
    "Q1 '25","Q2 '25","Q3 '25","Q4 '25",
  ],
  ratio: [102.1,103.4,101.8,100.2,100.5,102.8,101.6,100.1,100.8,102.2,101.4,100.6,101.0,102.5,101.8,99.4],
  days: [18,14,19,28,24,16,20,30,22,15,18,26,20,14,17,53],
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
  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Sale-to-List Ratio',
                data: chartData.ratio,
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
                data: chartData.days,
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
                max: 60,
              },
            },
            animation: { duration: 1400, easing: 'easeOutQuart' },
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
