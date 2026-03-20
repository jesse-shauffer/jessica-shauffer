'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ── Town Data ──────────────────────────────────────────────────────────────
// Placeholder market data — replaced monthly by the GitHub Actions pipeline
// Each entry: [medianPrice, daysOnMarket, saleToListPct, pricePerSqFt]
const TOWN_DATA: Record<string, {
  label: string;
  county: string;
  medianPrice: number[];
  daysOnMarket: number[];
  saleToList: number[];
  pricePerSqFt: number[];
  months: string[];
}> = {
  easton: {
    label: 'Easton',
    county: 'Bristol County',
    medianPrice: [510000, 525000, 540000, 535000, 555000, 570000, 580000, 575000, 565000, 560000, 545000, 550000],
    daysOnMarket: [22, 18, 15, 14, 12, 11, 13, 15, 18, 20, 24, 26],
    saleToList: [100.2, 101.5, 102.8, 103.1, 104.2, 104.8, 103.9, 103.2, 102.1, 101.4, 100.8, 100.5],
    pricePerSqFt: [248, 252, 258, 261, 268, 274, 271, 268, 264, 261, 255, 257],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  'north-easton': {
    label: 'North Easton',
    county: 'Bristol County',
    medianPrice: [495000, 510000, 525000, 520000, 540000, 555000, 560000, 555000, 545000, 540000, 530000, 535000],
    daysOnMarket: [24, 20, 17, 15, 13, 12, 14, 16, 19, 22, 25, 27],
    saleToList: [99.8, 101.0, 102.2, 102.8, 103.9, 104.5, 103.6, 102.9, 101.8, 101.1, 100.4, 100.2],
    pricePerSqFt: [241, 245, 251, 254, 261, 267, 264, 261, 257, 254, 248, 250],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  'south-easton': {
    label: 'South Easton',
    county: 'Bristol County',
    medianPrice: [480000, 495000, 510000, 505000, 520000, 535000, 540000, 535000, 525000, 520000, 510000, 515000],
    daysOnMarket: [25, 21, 18, 16, 14, 13, 15, 17, 20, 23, 26, 28],
    saleToList: [99.5, 100.8, 101.9, 102.5, 103.6, 104.2, 103.3, 102.6, 101.5, 100.8, 100.1, 99.9],
    pricePerSqFt: [235, 239, 245, 248, 254, 260, 257, 254, 250, 247, 242, 244],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  mansfield: {
    label: 'Mansfield',
    county: 'Bristol County',
    medianPrice: [530000, 545000, 560000, 555000, 575000, 590000, 600000, 595000, 585000, 580000, 565000, 570000],
    daysOnMarket: [20, 16, 13, 12, 10, 9, 11, 13, 16, 18, 22, 24],
    saleToList: [100.8, 102.1, 103.4, 103.9, 105.0, 105.6, 104.7, 104.0, 102.9, 102.2, 101.5, 101.2],
    pricePerSqFt: [258, 262, 268, 271, 278, 284, 281, 278, 274, 271, 265, 267],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  bridgewater: {
    label: 'Bridgewater',
    county: 'Bristol County',
    medianPrice: [420000, 435000, 448000, 443000, 460000, 472000, 478000, 474000, 465000, 460000, 450000, 454000],
    daysOnMarket: [28, 24, 20, 18, 16, 15, 17, 19, 22, 25, 29, 31],
    saleToList: [99.2, 100.5, 101.6, 102.1, 103.2, 103.8, 102.9, 102.2, 101.1, 100.4, 99.7, 99.5],
    pricePerSqFt: [218, 222, 227, 230, 236, 241, 238, 235, 231, 228, 223, 225],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  'west-bridgewater': {
    label: 'West Bridgewater',
    county: 'Bristol County',
    medianPrice: [410000, 425000, 438000, 433000, 450000, 462000, 468000, 464000, 455000, 450000, 440000, 444000],
    daysOnMarket: [29, 25, 21, 19, 17, 16, 18, 20, 23, 26, 30, 32],
    saleToList: [99.0, 100.3, 101.4, 101.9, 103.0, 103.6, 102.7, 102.0, 100.9, 100.2, 99.5, 99.3],
    pricePerSqFt: [213, 217, 222, 225, 231, 236, 233, 230, 226, 223, 218, 220],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  norton: {
    label: 'Norton',
    county: 'Bristol County',
    medianPrice: [400000, 415000, 428000, 423000, 440000, 452000, 458000, 454000, 445000, 440000, 430000, 434000],
    daysOnMarket: [30, 26, 22, 20, 18, 17, 19, 21, 24, 27, 31, 33],
    saleToList: [98.8, 100.1, 101.2, 101.7, 102.8, 103.4, 102.5, 101.8, 100.7, 100.0, 99.3, 99.1],
    pricePerSqFt: [208, 212, 217, 220, 226, 231, 228, 225, 221, 218, 213, 215],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  raynham: {
    label: 'Raynham',
    county: 'Bristol County',
    medianPrice: [415000, 430000, 443000, 438000, 455000, 467000, 473000, 469000, 460000, 455000, 445000, 449000],
    daysOnMarket: [27, 23, 19, 17, 15, 14, 16, 18, 21, 24, 28, 30],
    saleToList: [99.4, 100.7, 101.8, 102.3, 103.4, 104.0, 103.1, 102.4, 101.3, 100.6, 99.9, 99.7],
    pricePerSqFt: [215, 219, 224, 227, 233, 238, 235, 232, 228, 225, 220, 222],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  attleboro: {
    label: 'Attleboro',
    county: 'Bristol County',
    medianPrice: [380000, 395000, 408000, 403000, 420000, 432000, 438000, 434000, 425000, 420000, 410000, 414000],
    daysOnMarket: [32, 28, 24, 22, 20, 19, 21, 23, 26, 29, 33, 35],
    saleToList: [98.5, 99.8, 100.9, 101.4, 102.5, 103.1, 102.2, 101.5, 100.4, 99.7, 99.0, 98.8],
    pricePerSqFt: [198, 202, 207, 210, 216, 221, 218, 215, 211, 208, 203, 205],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  canton: {
    label: 'Canton',
    county: 'Norfolk County',
    medianPrice: [580000, 598000, 615000, 610000, 632000, 648000, 655000, 650000, 638000, 632000, 618000, 622000],
    daysOnMarket: [18, 14, 11, 10, 8, 7, 9, 11, 14, 16, 20, 22],
    saleToList: [101.5, 102.8, 104.1, 104.6, 105.7, 106.3, 105.4, 104.7, 103.6, 102.9, 102.2, 101.9],
    pricePerSqFt: [278, 283, 289, 292, 299, 305, 302, 299, 295, 292, 286, 288],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  sharon: {
    label: 'Sharon',
    county: 'Norfolk County',
    medianPrice: [560000, 578000, 595000, 590000, 612000, 628000, 635000, 630000, 618000, 612000, 598000, 602000],
    daysOnMarket: [19, 15, 12, 11, 9, 8, 10, 12, 15, 17, 21, 23],
    saleToList: [101.2, 102.5, 103.8, 104.3, 105.4, 106.0, 105.1, 104.4, 103.3, 102.6, 101.9, 101.6],
    pricePerSqFt: [272, 277, 283, 286, 293, 299, 296, 293, 289, 286, 280, 282],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  norwood: {
    label: 'Norwood',
    county: 'Norfolk County',
    medianPrice: [520000, 538000, 555000, 550000, 572000, 588000, 595000, 590000, 578000, 572000, 558000, 562000],
    daysOnMarket: [21, 17, 14, 13, 11, 10, 12, 14, 17, 19, 23, 25],
    saleToList: [100.5, 101.8, 103.1, 103.6, 104.7, 105.3, 104.4, 103.7, 102.6, 101.9, 101.2, 100.9],
    pricePerSqFt: [255, 259, 265, 268, 275, 281, 278, 275, 271, 268, 262, 264],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  westwood: {
    label: 'Westwood',
    county: 'Norfolk County',
    medianPrice: [720000, 742000, 765000, 758000, 785000, 805000, 815000, 808000, 792000, 785000, 768000, 773000],
    daysOnMarket: [15, 11, 8, 7, 5, 4, 6, 8, 11, 13, 17, 19],
    saleToList: [102.2, 103.5, 104.8, 105.3, 106.4, 107.0, 106.1, 105.4, 104.3, 103.6, 102.9, 102.6],
    pricePerSqFt: [335, 340, 347, 350, 358, 364, 361, 358, 353, 350, 344, 346],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  stoughton: {
    label: 'Stoughton',
    county: 'Norfolk County',
    medianPrice: [450000, 465000, 478000, 473000, 490000, 502000, 508000, 504000, 495000, 490000, 480000, 484000],
    daysOnMarket: [26, 22, 18, 16, 14, 13, 15, 17, 20, 23, 27, 29],
    saleToList: [99.8, 101.1, 102.2, 102.7, 103.8, 104.4, 103.5, 102.8, 101.7, 101.0, 100.3, 100.1],
    pricePerSqFt: [228, 232, 237, 240, 246, 251, 248, 245, 241, 238, 233, 235],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  foxborough: {
    label: 'Foxborough',
    county: 'Norfolk County',
    medianPrice: [490000, 505000, 518000, 513000, 530000, 542000, 548000, 544000, 535000, 530000, 520000, 524000],
    daysOnMarket: [24, 20, 16, 14, 12, 11, 13, 15, 18, 21, 25, 27],
    saleToList: [100.1, 101.4, 102.5, 103.0, 104.1, 104.7, 103.8, 103.1, 102.0, 101.3, 100.6, 100.4],
    pricePerSqFt: [242, 246, 251, 254, 260, 265, 262, 259, 255, 252, 247, 249],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  weston: {
    label: 'Weston',
    county: 'Norfolk County',
    medianPrice: [1100000, 1135000, 1170000, 1160000, 1200000, 1230000, 1245000, 1235000, 1210000, 1200000, 1175000, 1182000],
    daysOnMarket: [28, 24, 20, 18, 15, 14, 16, 19, 22, 25, 30, 32],
    saleToList: [98.5, 99.8, 100.9, 101.4, 102.5, 103.1, 102.2, 101.5, 100.4, 99.7, 99.0, 98.8],
    pricePerSqFt: [415, 422, 430, 434, 444, 452, 448, 444, 438, 434, 426, 428],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  plymouth: {
    label: 'Plymouth',
    county: 'Plymouth County',
    medianPrice: [480000, 495000, 510000, 505000, 525000, 540000, 548000, 543000, 532000, 525000, 512000, 516000],
    daysOnMarket: [25, 21, 17, 15, 13, 12, 14, 16, 19, 22, 26, 28],
    saleToList: [99.5, 100.8, 101.9, 102.4, 103.5, 104.1, 103.2, 102.5, 101.4, 100.7, 100.0, 99.8],
    pricePerSqFt: [238, 242, 247, 250, 256, 261, 258, 255, 251, 248, 243, 245],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  hingham: {
    label: 'Hingham',
    county: 'Plymouth County',
    medianPrice: [780000, 805000, 830000, 822000, 852000, 874000, 885000, 877000, 860000, 852000, 833000, 838000],
    daysOnMarket: [16, 12, 9, 8, 6, 5, 7, 9, 12, 14, 18, 20],
    saleToList: [101.8, 103.1, 104.4, 104.9, 106.0, 106.6, 105.7, 105.0, 103.9, 103.2, 102.5, 102.2],
    pricePerSqFt: [355, 361, 368, 371, 379, 385, 382, 379, 374, 371, 365, 367],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  kingston: {
    label: 'Kingston',
    county: 'Plymouth County',
    medianPrice: [460000, 475000, 488000, 483000, 500000, 512000, 518000, 514000, 505000, 500000, 490000, 494000],
    daysOnMarket: [27, 23, 19, 17, 15, 14, 16, 18, 21, 24, 28, 30],
    saleToList: [99.3, 100.6, 101.7, 102.2, 103.3, 103.9, 103.0, 102.3, 101.2, 100.5, 99.8, 99.6],
    pricePerSqFt: [232, 236, 241, 244, 250, 255, 252, 249, 245, 242, 237, 239],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  halifax: {
    label: 'Halifax',
    county: 'Plymouth County',
    medianPrice: [390000, 405000, 418000, 413000, 430000, 442000, 448000, 444000, 435000, 430000, 420000, 424000],
    daysOnMarket: [31, 27, 23, 21, 19, 18, 20, 22, 25, 28, 32, 34],
    saleToList: [98.7, 100.0, 101.1, 101.6, 102.7, 103.3, 102.4, 101.7, 100.6, 99.9, 99.2, 99.0],
    pricePerSqFt: [203, 207, 212, 215, 221, 226, 223, 220, 216, 213, 208, 210],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  lakeville: {
    label: 'Lakeville',
    county: 'Plymouth County',
    medianPrice: [400000, 415000, 428000, 423000, 440000, 452000, 458000, 454000, 445000, 440000, 430000, 434000],
    daysOnMarket: [30, 26, 22, 20, 18, 17, 19, 21, 24, 27, 31, 33],
    saleToList: [98.9, 100.2, 101.3, 101.8, 102.9, 103.5, 102.6, 101.9, 100.8, 100.1, 99.4, 99.2],
    pricePerSqFt: [208, 212, 217, 220, 226, 231, 228, 225, 221, 218, 213, 215],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  middleborough: {
    label: 'Middleborough',
    county: 'Plymouth County',
    medianPrice: [375000, 390000, 403000, 398000, 415000, 427000, 433000, 429000, 420000, 415000, 405000, 409000],
    daysOnMarket: [33, 29, 25, 23, 21, 20, 22, 24, 27, 30, 34, 36],
    saleToList: [98.4, 99.7, 100.8, 101.3, 102.4, 103.0, 102.1, 101.4, 100.3, 99.6, 98.9, 98.7],
    pricePerSqFt: [196, 200, 205, 208, 214, 219, 216, 213, 209, 206, 201, 203],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  'east-bridgewater': {
    label: 'East Bridgewater',
    county: 'Bristol County',
    medianPrice: [405000, 420000, 433000, 428000, 445000, 457000, 463000, 459000, 450000, 445000, 435000, 439000],
    daysOnMarket: [29, 25, 21, 19, 17, 16, 18, 20, 23, 26, 30, 32],
    saleToList: [99.1, 100.4, 101.5, 102.0, 103.1, 103.7, 102.8, 102.1, 101.0, 100.3, 99.6, 99.4],
    pricePerSqFt: [211, 215, 220, 223, 229, 234, 231, 228, 224, 221, 216, 218],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  taunton: {
    label: 'Taunton',
    county: 'Bristol County',
    medianPrice: [360000, 375000, 388000, 383000, 400000, 412000, 418000, 414000, 405000, 400000, 390000, 394000],
    daysOnMarket: [34, 30, 26, 24, 22, 21, 23, 25, 28, 31, 35, 37],
    saleToList: [98.2, 99.5, 100.6, 101.1, 102.2, 102.8, 101.9, 101.2, 100.1, 99.4, 98.7, 98.5],
    pricePerSqFt: [190, 194, 199, 202, 208, 213, 210, 207, 203, 200, 195, 197],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
  'north-attleborough': {
    label: 'North Attleborough',
    county: 'Bristol County',
    medianPrice: [420000, 435000, 448000, 443000, 460000, 472000, 478000, 474000, 465000, 460000, 450000, 454000],
    daysOnMarket: [28, 24, 20, 18, 16, 15, 17, 19, 22, 25, 29, 31],
    saleToList: [99.3, 100.6, 101.7, 102.2, 103.3, 103.9, 103.0, 102.3, 101.2, 100.5, 99.8, 99.6],
    pricePerSqFt: [218, 222, 227, 230, 236, 241, 238, 235, 231, 228, 223, 225],
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  },
};

// ── Town Selector Order ────────────────────────────────────────────────────
const PINNED_TOWNS = [
  'easton', 'north-easton', 'south-easton', 'mansfield',
  'bridgewater', 'west-bridgewater', 'norton', 'raynham',
];

const ALL_TOWNS = Object.keys(TOWN_DATA).sort((a, b) => {
  const aPinned = PINNED_TOWNS.indexOf(a);
  const bPinned = PINNED_TOWNS.indexOf(b);
  if (aPinned !== -1 && bPinned !== -1) return aPinned - bPinned;
  if (aPinned !== -1) return -1;
  if (bPinned !== -1) return 1;
  return TOWN_DATA[a].label.localeCompare(TOWN_DATA[b].label);
});

// ── Chart Colors ───────────────────────────────────────────────────────────
const CB_BLUE = '#003087';
const CB_BLUE_LIGHT = 'rgba(0, 48, 135, 0.12)';

type ChartMetric = 'medianPrice' | 'daysOnMarket' | 'saleToList' | 'pricePerSqFt';

const METRIC_CONFIG: Record<ChartMetric, { label: string; prefix: string; suffix: string; type: 'bar' | 'line' }> = {
  medianPrice:   { label: 'Median Sale Price',       prefix: '$', suffix: '',  type: 'bar' },
  daysOnMarket:  { label: 'Avg. Days on Market',     prefix: '',  suffix: ' days', type: 'line' },
  saleToList:    { label: 'Sale-to-List Ratio',      prefix: '',  suffix: '%', type: 'line' },
  pricePerSqFt:  { label: 'Price per Sq Ft',         prefix: '$', suffix: '',  type: 'bar' },
};

function formatValue(val: number, metric: ChartMetric): string {
  const { prefix, suffix } = METRIC_CONFIG[metric];
  if (metric === 'medianPrice') return `${prefix}${val.toLocaleString()}`;
  if (metric === 'pricePerSqFt') return `${prefix}${val.toLocaleString()}`;
  return `${prefix}${val}${suffix}`;
}

interface Props {
  defaultTown?: string;
  showMetricSelector?: boolean;
}

export default function TownSelectorChart({ defaultTown = 'easton', showMetricSelector = true }: Props) {
  const [selectedTown, setSelectedTown] = useState(defaultTown);
  const [selectedMetric, setSelectedMetric] = useState<ChartMetric>('medianPrice');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const townData = TOWN_DATA[selectedTown] || TOWN_DATA['easton'];
  const metricConfig = METRIC_CONFIG[selectedMetric];
  const values = townData[selectedMetric] as number[];
  const latestValue = values[values.length - 1];
  const prevValue = values[values.length - 2];
  const change = latestValue - prevValue;
  const changePct = ((change / prevValue) * 100).toFixed(1);
  const isUp = change >= 0;

  const chartData = {
    labels: townData.months,
    datasets: [
      {
        label: metricConfig.label,
        data: values,
        backgroundColor: CB_BLUE_LIGHT,
        borderColor: CB_BLUE,
        borderWidth: 2,
        borderRadius: metricConfig.type === 'bar' ? 4 : 0,
        fill: metricConfig.type === 'line',
        tension: 0.4,
        pointBackgroundColor: CB_BLUE,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => ` ${formatValue(ctx.parsed.y, selectedMetric)}`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: {
          callback: (val: number | string) => {
            const n = typeof val === 'number' ? val : parseFloat(val);
            if (selectedMetric === 'medianPrice') return `$${(n / 1000).toFixed(0)}k`;
            if (selectedMetric === 'pricePerSqFt') return `$${n}`;
            if (selectedMetric === 'saleToList') return `${n}%`;
            return `${n}d`;
          },
        },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="town-chart">
      {/* Town Selector */}
      <div className="town-chart__controls">
        <div className="town-selector">
          {/* Pinned town pills */}
          <div className="town-selector__pins">
            {PINNED_TOWNS.map((slug) => (
              <button
                key={slug}
                className={`town-pill${selectedTown === slug ? ' town-pill--active' : ''}`}
                onClick={() => setSelectedTown(slug)}
                aria-pressed={selectedTown === slug}
              >
                {TOWN_DATA[slug]?.label}
              </button>
            ))}
          </div>

          {/* Full dropdown for all 25 towns */}
          <div className="town-selector__dropdown-wrap">
            <button
              className="town-selector__dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <i className="ph ph-map-pin" aria-hidden="true"></i>
              {townData.label}
              <i className={`ph ph-caret-down town-selector__caret${dropdownOpen ? ' is-open' : ''}`} aria-hidden="true"></i>
            </button>
            {dropdownOpen && (
              <div className="town-selector__dropdown-menu" role="listbox">
                <div className="town-selector__dropdown-section">
                  <span className="town-selector__dropdown-label">Core Towns</span>
                  {PINNED_TOWNS.map((slug) => (
                    <button
                      key={slug}
                      role="option"
                      aria-selected={selectedTown === slug}
                      className={`town-selector__option${selectedTown === slug ? ' is-selected' : ''}`}
                      onClick={() => { setSelectedTown(slug); setDropdownOpen(false); }}
                    >
                      {TOWN_DATA[slug]?.label}
                      <span className="town-selector__option-county">{TOWN_DATA[slug]?.county}</span>
                    </button>
                  ))}
                </div>
                <div className="town-selector__dropdown-section">
                  <span className="town-selector__dropdown-label">All Communities</span>
                  {ALL_TOWNS.filter(s => !PINNED_TOWNS.includes(s)).map((slug) => (
                    <button
                      key={slug}
                      role="option"
                      aria-selected={selectedTown === slug}
                      className={`town-selector__option${selectedTown === slug ? ' is-selected' : ''}`}
                      onClick={() => { setSelectedTown(slug); setDropdownOpen(false); }}
                    >
                      {TOWN_DATA[slug]?.label}
                      <span className="town-selector__option-county">{TOWN_DATA[slug]?.county}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metric Selector */}
        {showMetricSelector && (
          <div className="metric-selector">
            {(Object.keys(METRIC_CONFIG) as ChartMetric[]).map((metric) => (
              <button
                key={metric}
                className={`metric-btn${selectedMetric === metric ? ' metric-btn--active' : ''}`}
                onClick={() => setSelectedMetric(metric)}
              >
                {METRIC_CONFIG[metric].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="town-chart__stats">
        <div className="chart-stat">
          <span className="chart-stat__label">Latest ({townData.months[townData.months.length - 1]})</span>
          <span className="chart-stat__value">{formatValue(latestValue, selectedMetric)}</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat__label">Month-over-Month</span>
          <span className={`chart-stat__value chart-stat__value--${isUp ? 'up' : 'down'}`}>
            <i className={`ph ph-trend-${isUp ? 'up' : 'down'}`} aria-hidden="true"></i>
            {isUp ? '+' : ''}{changePct}%
          </span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat__label">County</span>
          <span className="chart-stat__value">{townData.county}</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat__label">Data Updated</span>
          <span className="chart-stat__value">Monthly</span>
        </div>
      </div>

      {/* Chart */}
      <div className="town-chart__canvas-wrap">
        {metricConfig.type === 'bar' ? (
          <Bar data={chartData} options={chartOptions as Parameters<typeof Bar>[0]['options']} />
        ) : (
          <Line data={chartData} options={chartOptions as Parameters<typeof Line>[0]['options']} />
        )}
      </div>

      <p className="town-chart__source">
        Data sourced from Zillow Research &amp; Redfin Data Center. Updated monthly. For the most current figures, <a href="/contact#consultation">contact Jessica Shauffer</a>.
      </p>
    </div>
  );
}
