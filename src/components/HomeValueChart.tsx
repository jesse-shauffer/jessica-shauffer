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

const labels = [
  'Q1 2018','Q2 2018','Q3 2018','Q4 2018',
  'Q1 2019','Q2 2019','Q3 2019','Q4 2019',
  'Q1 2020','Q2 2020','Q3 2020','Q4 2020',
  'Q1 2021','Q2 2021','Q3 2021','Q4 2021',
  'Q1 2022','Q2 2022','Q3 2022','Q4 2022',
  'Q1 2023','Q2 2023','Q3 2023','Q4 2023',
  'Q1 2024','Q2 2024','Q3 2024','Q4 2024',
  'Q1 2025','Q2 2025','Q3 2025','Q4 2025',
];

const townData: Record<string, { label: string; values: number[] }> = {
  easton: {
    label: 'Easton',
    values: [
      422000,430000,438000,435000,437000,448000,455000,458000,
      462000,475000,498000,520000,540000,568000,590000,602000,
      610000,625000,632000,628000,630000,638000,645000,648000,
      652000,658000,665000,662000,660000,668000,674000,663000,
    ],
  },
  'north-easton': {
    label: 'North Easton',
    values: [
      415000,422000,430000,427000,429000,440000,447000,450000,
      454000,467000,490000,512000,532000,558000,580000,592000,
      600000,615000,622000,618000,620000,628000,635000,638000,
      642000,648000,655000,652000,650000,658000,664000,655000,
    ],
  },
  'south-easton': {
    label: 'South Easton',
    values: [
      398000,406000,414000,411000,413000,424000,431000,434000,
      438000,451000,474000,496000,516000,542000,564000,576000,
      584000,599000,606000,602000,604000,612000,619000,622000,
      626000,632000,639000,636000,634000,642000,648000,639000,
    ],
  },
  canton: {
    label: 'Canton',
    values: [
      510000,520000,530000,527000,529000,542000,551000,555000,
      560000,575000,602000,628000,652000,685000,712000,728000,
      738000,756000,764000,759000,762000,772000,780000,784000,
      789000,796000,804000,800000,798000,808000,815000,804000,
    ],
  },
  sharon: {
    label: 'Sharon',
    values: [
      480000,490000,499000,496000,498000,510000,519000,523000,
      528000,542000,568000,592000,614000,645000,670000,685000,
      695000,712000,720000,715000,718000,728000,736000,740000,
      745000,752000,760000,756000,754000,764000,771000,760000,
    ],
  },
  mansfield: {
    label: 'Mansfield',
    values: [
      395000,403000,411000,408000,410000,420000,428000,431000,
      435000,447000,469000,490000,509000,535000,556000,568000,
      576000,590000,597000,593000,595000,604000,611000,614000,
      618000,624000,631000,628000,626000,634000,640000,631000,
    ],
  },
  bridgewater: {
    label: 'Bridgewater',
    values: [
      355000,362000,369000,367000,368000,377000,384000,387000,
      390000,401000,421000,440000,457000,480000,499000,510000,
      517000,530000,536000,533000,535000,543000,549000,552000,
      556000,561000,567000,564000,562000,569000,575000,567000,
    ],
  },
  hingham: {
    label: 'Hingham',
    values: [
      620000,632000,644000,640000,643000,659000,671000,675000,
      681000,699000,733000,765000,794000,835000,868000,887000,
      899000,921000,931000,925000,929000,941000,951000,956000,
      963000,972000,982000,977000,975000,987000,996000,982000,
    ],
  },
  plymouth: {
    label: 'Plymouth',
    values: [
      340000,347000,354000,351000,353000,362000,368000,371000,
      374000,384000,403000,421000,437000,459000,477000,487000,
      494000,507000,512000,509000,511000,518000,524000,527000,
      530000,535000,541000,538000,536000,543000,548000,541000,
    ],
  },
  norwood: {
    label: 'Norwood',
    values: [
      430000,439000,447000,444000,446000,457000,465000,468000,
      472000,485000,509000,532000,552000,580000,603000,616000,
      625000,640000,647000,643000,645000,654000,661000,665000,
      669000,675000,682000,679000,677000,685000,691000,682000,
    ],
  },
  stoughton: {
    label: 'Stoughton',
    values: [
      360000,367000,374000,372000,373000,383000,390000,393000,
      396000,407000,427000,446000,463000,487000,506000,517000,
      524000,537000,543000,540000,542000,550000,556000,559000,
      563000,568000,574000,571000,569000,576000,582000,574000,
    ],
  },
  westwood: {
    label: 'Westwood',
    values: [
      680000,694000,707000,703000,706000,724000,737000,742000,
      748000,768000,806000,841000,873000,918000,954000,975000,
      988000,1012000,1023000,1017000,1021000,1034000,1045000,1051000,
      1058000,1068000,1079000,1074000,1072000,1085000,1095000,1080000,
    ],
  },
  foxborough: {
    label: 'Foxborough',
    values: [
      440000,449000,457000,454000,456000,468000,476000,479000,
      483000,496000,521000,544000,565000,594000,617000,631000,
      640000,656000,663000,659000,661000,670000,677000,681000,
      685000,691000,698000,695000,693000,701000,707000,698000,
    ],
  },
  norton: {
    label: 'Norton',
    values: [
      370000,378000,385000,383000,384000,394000,401000,404000,
      407000,418000,439000,459000,477000,501000,521000,532000,
      539000,553000,559000,556000,558000,566000,572000,575000,
      579000,584000,590000,587000,585000,592000,598000,590000,
    ],
  },
  raynham: {
    label: 'Raynham',
    values: [
      380000,388000,395000,393000,394000,404000,411000,414000,
      417000,428000,450000,470000,488000,513000,533000,545000,
      552000,566000,572000,569000,571000,579000,585000,588000,
      592000,597000,603000,600000,598000,605000,611000,603000,
    ],
  },
  taunton: {
    label: 'Taunton',
    values: [
      310000,316000,322000,320000,321000,329000,335000,338000,
      340000,350000,367000,383000,398000,418000,434000,444000,
      450000,461000,466000,463000,465000,472000,477000,480000,
      483000,487000,492000,490000,488000,494000,499000,492000,
    ],
  },
  attleboro: {
    label: 'Attleboro',
    values: [
      330000,337000,343000,341000,342000,351000,357000,360000,
      363000,373000,391000,409000,425000,447000,464000,474000,
      481000,493000,498000,495000,497000,504000,509000,512000,
      516000,520000,525000,523000,521000,527000,532000,525000,
    ],
  },
  'north-attleborough': {
    label: 'North Attleborough',
    values: [
      350000,357000,364000,362000,363000,372000,379000,382000,
      385000,395000,415000,434000,451000,474000,492000,503000,
      510000,523000,529000,526000,528000,535000,541000,544000,
      548000,552000,558000,555000,553000,560000,565000,558000,
    ],
  },
  'west-bridgewater': {
    label: 'West Bridgewater',
    values: [
      360000,367000,374000,372000,373000,383000,390000,393000,
      396000,407000,427000,446000,463000,487000,506000,517000,
      524000,537000,543000,540000,542000,550000,556000,559000,
      563000,568000,574000,571000,569000,576000,582000,574000,
    ],
  },
  'east-bridgewater': {
    label: 'East Bridgewater',
    values: [
      370000,378000,385000,383000,384000,394000,401000,404000,
      407000,418000,439000,459000,477000,501000,521000,532000,
      539000,553000,559000,556000,558000,566000,572000,575000,
      579000,584000,590000,587000,585000,592000,598000,590000,
    ],
  },
  duxbury: {
    label: 'Duxbury',
    values: [
      580000,592000,603000,599000,602000,617000,628000,633000,
      638000,655000,687000,717000,744000,782000,813000,831000,
      842000,863000,872000,866000,870000,881000,890000,895000,
      901000,910000,920000,915000,913000,924000,933000,920000,
    ],
  },
  marshfield: {
    label: 'Marshfield',
    values: [
      490000,500000,510000,507000,509000,522000,531000,535000,
      540000,554000,581000,607000,630000,662000,688000,703000,
      713000,731000,739000,734000,737000,747000,755000,759000,
      765000,772000,780000,776000,774000,784000,791000,780000,
    ],
  },
  kingston: {
    label: 'Kingston',
    values: [
      420000,429000,437000,434000,436000,447000,455000,458000,
      462000,474000,498000,520000,540000,567000,589000,602000,
      610000,625000,632000,628000,630000,638000,645000,648000,
      652000,658000,665000,662000,660000,668000,674000,665000,
    ],
  },
  middleborough: {
    label: 'Middleborough',
    values: [
      340000,347000,353000,351000,352000,361000,368000,371000,
      374000,384000,403000,421000,437000,459000,477000,487000,
      494000,507000,512000,509000,511000,518000,524000,527000,
      530000,535000,541000,538000,536000,543000,548000,541000,
    ],
  },
};

const massMedian = [
  385000,395000,400000,398000,400000,410000,418000,420000,
  425000,435000,455000,472000,490000,510000,530000,545000,
  555000,568000,572000,565000,560000,570000,578000,585000,
  590000,600000,610000,615000,620000,630000,637000,637000,
];

const gold = '#c8a24e';
const goldFade = 'rgba(200,162,78,0.15)';
const muted = 'rgba(255,255,255,0.3)';
const mutedFade = 'rgba(255,255,255,0.03)';
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = 'rgba(255,255,255,0.5)';

type RangeKey = 'all' | '5y' | '3y' | '1y';

export default function HomeValueChart() {
  const chartRef = useRef<ChartJS<'line'>>(null);
  const [activeRange, setActiveRange] = useState<RangeKey>('5y');
  const [activeTown, setActiveTown] = useState<string>('easton');

  function getSliceStart(range: RangeKey) {
    if (range === '1y') return labels.length - 4;
    if (range === '3y') return labels.length - 12;
    if (range === '5y') return labels.length - 20;
    return 0;
  }

  const sliceStart = getSliceStart(activeRange);
  const slicedLabels = labels.slice(sliceStart);
  const townValues = townData[activeTown].values.slice(sliceStart);
  const massValues = massMedian.slice(sliceStart);
  const townLabel = townData[activeTown].label;

  const allVisible = [...townValues, ...massValues];
  const minVal = Math.min(...allVisible);
  const maxVal = Math.max(...allVisible);
  const padding = (maxVal - minVal) * 0.15;

  return (
    <div className="chart-container">
      {/* Town selector row */}
      <div className="chart-town-row">
        <label htmlFor="hvc-town-select" className="chart-town-label">
          <i className="ph ph-map-pin" style={{ marginRight: '0.375rem' }}></i>
          Town
        </label>
        <div className="chart-town-select-wrapper">
          <select
            id="hvc-town-select"
            className="chart-town-select"
            value={activeTown}
            onChange={(e) => setActiveTown(e.target.value)}
          >
            {Object.entries(townData).map(([key, t]) => (
              <option key={key} value={key}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Time range buttons */}
      <div className="chart-controls">
        {(['all', '5y', '3y', '1y'] as RangeKey[]).map((r) => (
          <button
            key={r}
            className={`chart-btn${activeRange === r ? ' is-active' : ''}`}
            onClick={() => setActiveRange(r)}
          >
            {r === 'all' ? 'All Time' : r === '5y' ? '5 Years' : r === '3y' ? '3 Years' : '1 Year'}
          </button>
        ))}
      </div>

      <div className="chart-wrapper">
        <Line
          ref={chartRef}
          data={{
            labels: slicedLabels,
            datasets: [
              {
                label: `${townLabel} Avg. Home Value`,
                data: townValues,
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
                data: massValues,
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
                suggestedMin: minVal - padding,
                suggestedMax: maxVal + padding,
              },
            },
            animation: { duration: 800, easing: 'easeOutQuart' },
          }}
        />
      </div>
      <div className="chart-legend">
        <span className="chart-legend__item">
          <span className="chart-legend__dot chart-legend__dot--primary"></span>
          {townLabel} Avg. Home Value
        </span>
        <span className="chart-legend__item">
          <span className="chart-legend__dot chart-legend__dot--muted"></span>
          Massachusetts Median
        </span>
      </div>
    </div>
  );
}
