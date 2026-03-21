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
  Plugin,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

// ─── Shared colours ────────────────────────────────────────────────────────────
const gold      = '#c8a24e';
const goldFade  = 'rgba(200,162,78,0.15)';
const muted     = 'rgba(255,255,255,0.3)';
const mutedFade = 'rgba(255,255,255,0.03)';
const teal      = '#4db8a4';
const tealFade  = 'rgba(77,184,164,0.08)';
const gridColor = 'rgba(255,255,255,0.06)';
const textColor = 'rgba(255,255,255,0.5)';

// ─── HOME VALUE DATA ────────────────────────────────────────────────────────────
const hvLabels = [
  'Q1 2018','Q2 2018','Q3 2018','Q4 2018',
  'Q1 2019','Q2 2019','Q3 2019','Q4 2019',
  'Q1 2020','Q2 2020','Q3 2020','Q4 2020',
  'Q1 2021','Q2 2021','Q3 2021','Q4 2021',
  'Q1 2022','Q2 2022','Q3 2022','Q4 2022',
  'Q1 2023','Q2 2023','Q3 2023','Q4 2023',
  'Q1 2024','Q2 2024','Q3 2024','Q4 2024',
  'Q1 2025','Q2 2025','Q3 2025','Q4 2025',
];

const hvTownData: Record<string, { label: string; values: number[] }> = {
  easton:            { label: 'Easton',            values: [422000,430000,438000,435000,437000,448000,455000,458000,462000,475000,498000,520000,540000,568000,590000,602000,610000,625000,632000,628000,630000,638000,645000,648000,652000,658000,665000,662000,660000,668000,674000,663000] },
  'north-easton':    { label: 'North Easton',      values: [415000,422000,430000,427000,429000,440000,447000,450000,454000,467000,490000,512000,532000,558000,580000,592000,600000,615000,622000,618000,620000,628000,635000,638000,642000,648000,655000,652000,650000,658000,664000,655000] },
  'south-easton':    { label: 'South Easton',      values: [398000,406000,414000,411000,413000,424000,431000,434000,438000,451000,474000,496000,516000,542000,564000,576000,584000,599000,606000,602000,604000,612000,619000,622000,626000,632000,639000,636000,634000,642000,648000,639000] },
  canton:            { label: 'Canton',            values: [510000,520000,530000,527000,529000,542000,551000,555000,560000,575000,602000,628000,652000,685000,712000,728000,738000,756000,764000,759000,762000,772000,780000,784000,789000,796000,804000,800000,798000,808000,815000,804000] },
  sharon:            { label: 'Sharon',            values: [480000,490000,499000,496000,498000,510000,519000,523000,528000,542000,568000,592000,614000,645000,670000,685000,695000,712000,720000,715000,718000,728000,736000,740000,745000,752000,760000,756000,754000,764000,771000,760000] },
  mansfield:         { label: 'Mansfield',         values: [395000,403000,411000,408000,410000,420000,428000,431000,435000,447000,469000,490000,509000,535000,556000,568000,576000,590000,597000,593000,595000,604000,611000,614000,618000,624000,631000,628000,626000,634000,640000,631000] },
  bridgewater:       { label: 'Bridgewater',       values: [355000,362000,369000,367000,368000,377000,384000,387000,390000,401000,421000,440000,457000,480000,499000,510000,517000,530000,536000,533000,535000,543000,549000,552000,556000,561000,567000,564000,562000,569000,575000,567000] },
  hingham:           { label: 'Hingham',           values: [620000,632000,644000,640000,643000,659000,671000,675000,681000,699000,733000,765000,794000,835000,868000,887000,899000,921000,931000,925000,929000,941000,951000,956000,963000,972000,982000,977000,975000,987000,996000,982000] },
  plymouth:          { label: 'Plymouth',          values: [340000,347000,354000,351000,353000,362000,368000,371000,374000,384000,403000,421000,437000,459000,477000,487000,494000,507000,512000,509000,511000,518000,524000,527000,530000,535000,541000,538000,536000,543000,548000,541000] },
  foxborough:        { label: 'Foxborough',        values: [440000,449000,457000,454000,456000,468000,476000,479000,483000,496000,521000,544000,565000,594000,617000,631000,640000,656000,663000,659000,661000,670000,677000,681000,685000,691000,698000,695000,693000,701000,707000,698000] },
  norton:            { label: 'Norton',            values: [370000,378000,385000,383000,384000,394000,401000,404000,407000,418000,439000,459000,477000,501000,521000,532000,539000,553000,559000,556000,558000,566000,572000,575000,579000,584000,590000,587000,585000,592000,598000,590000] },
  raynham:           { label: 'Raynham',           values: [380000,388000,395000,393000,394000,404000,411000,414000,417000,428000,450000,470000,488000,513000,533000,545000,552000,566000,572000,569000,571000,579000,585000,588000,592000,597000,603000,600000,598000,605000,611000,603000] },
  taunton:           { label: 'Taunton',           values: [310000,316000,322000,320000,321000,329000,335000,338000,340000,350000,367000,383000,398000,418000,434000,444000,450000,461000,466000,463000,465000,472000,477000,480000,483000,487000,492000,490000,488000,494000,499000,492000] },
  attleboro:         { label: 'Attleboro',         values: [330000,337000,343000,341000,342000,351000,357000,360000,363000,373000,391000,409000,425000,447000,464000,474000,481000,493000,498000,495000,497000,504000,509000,512000,516000,520000,525000,523000,521000,527000,532000,525000] },
  'west-bridgewater':{ label: 'West Bridgewater',  values: [360000,367000,374000,372000,373000,383000,390000,393000,396000,407000,427000,446000,463000,487000,506000,517000,524000,537000,543000,540000,542000,550000,556000,559000,563000,568000,574000,571000,569000,576000,582000,574000] },
  'east-bridgewater':{ label: 'East Bridgewater',  values: [370000,378000,385000,383000,384000,394000,401000,404000,407000,418000,439000,459000,477000,501000,521000,532000,539000,553000,559000,556000,558000,566000,572000,575000,579000,584000,590000,587000,585000,592000,598000,590000] },
  halifax:           { label: 'Halifax',           values: [330000,337000,343000,341000,342000,351000,358000,361000,364000,374000,393000,411000,427000,449000,467000,477000,485000,498000,505000,501000,503000,510000,517000,520000,524000,530000,537000,534000,532000,539000,545000,537000] },
  lakeville:         { label: 'Lakeville',         values: [345000,352000,359000,356000,358000,367000,374000,377000,380000,390000,410000,428000,445000,468000,486000,496000,504000,517000,524000,520000,522000,530000,537000,540000,544000,550000,557000,554000,552000,559000,565000,557000] },
  weston:            { label: 'Weston',            values: [920000,940000,958000,952000,957000,981000,998000,1005000,1014000,1040000,1092000,1140000,1183000,1244000,1293000,1321000,1338000,1372000,1387000,1378000,1383000,1400000,1415000,1423000,1432000,1447000,1462000,1454000,1450000,1468000,1482000,1461000] },
  kingston:          { label: 'Kingston',          values: [420000,429000,437000,434000,436000,447000,455000,458000,462000,474000,498000,520000,540000,567000,589000,602000,610000,625000,632000,628000,630000,638000,645000,648000,652000,658000,665000,662000,660000,668000,674000,665000] },
  middleborough:     { label: 'Middleborough',     values: [340000,347000,353000,351000,352000,361000,368000,371000,374000,384000,403000,421000,437000,459000,477000,487000,494000,507000,512000,509000,511000,518000,524000,527000,530000,535000,541000,538000,536000,543000,548000,541000] },
  scituate:          { label: 'Scituate',          values: [540000,551000,561000,558000,560000,574000,584000,588000,593000,609000,639000,668000,694000,729000,758000,775000,786000,806000,815000,810000,813000,824000,833000,838000,844000,852000,861000,857000,855000,866000,874000,862000] },
  cohasset:          { label: 'Cohasset',          values: [680000,694000,707000,703000,706000,724000,737000,742000,748000,768000,806000,841000,873000,918000,954000,975000,988000,1012000,1023000,1017000,1021000,1034000,1045000,1051000,1058000,1068000,1079000,1074000,1072000,1085000,1095000,1080000] },
  hanover:           { label: 'Hanover',           values: [460000,470000,479000,476000,478000,490000,499000,502000,506000,520000,546000,570000,592000,622000,646000,661000,670000,687000,694000,690000,692000,701000,709000,713000,718000,724000,731000,728000,726000,735000,742000,731000] },
  rockland:          { label: 'Rockland',          values: [360000,367000,374000,372000,373000,383000,390000,393000,396000,407000,427000,446000,463000,487000,506000,517000,524000,537000,543000,540000,542000,550000,556000,559000,563000,568000,574000,571000,569000,576000,582000,574000] },
};

const massMedian = [
  385000,395000,400000,398000,400000,410000,418000,420000,
  425000,435000,455000,472000,490000,510000,530000,545000,
  555000,568000,572000,565000,560000,570000,578000,585000,
  590000,600000,610000,615000,620000,630000,637000,637000,
];

// ─── SELLERS / BUYERS DATA ──────────────────────────────────────────────────────
const sbLabels = [
  "Q1 '22","Q2 '22","Q3 '22","Q4 '22",
  "Q1 '23","Q2 '23","Q3 '23","Q4 '23",
  "Q1 '24","Q2 '24","Q3 '24","Q4 '24",
  "Q1 '25","Q2 '25","Q3 '25","Q4 '25",
];

const sbTownData: Record<string, { label: string; ratio: number[]; days: number[] }> = {
  easton:            { label: 'Easton',            ratio: [102.1,103.4,101.8,100.2,100.5,102.8,101.6,100.1,100.8,102.2,101.4,100.6,101.0,102.5,101.8,99.4],  days: [18,14,19,28,24,16,20,30,22,15,18,26,20,14,17,53] },
  'north-easton':    { label: 'North Easton',      ratio: [101.8,103.1,101.5,100.0,100.2,102.5,101.3,99.8,100.5,101.9,101.1,100.3,100.7,102.2,101.5,99.1],   days: [20,15,21,30,26,18,22,32,24,17,20,28,22,16,19,55] },
  'south-easton':    { label: 'South Easton',      ratio: [101.5,102.8,101.2,99.8,99.9,102.2,101.0,99.5,100.2,101.6,100.8,100.0,100.4,101.9,101.2,98.8],    days: [22,17,23,32,28,20,24,34,26,19,22,30,24,18,21,57] },
  canton:            { label: 'Canton',            ratio: [103.2,104.5,102.9,101.3,101.6,103.9,102.7,101.2,101.9,103.3,102.5,101.7,102.1,103.6,102.9,100.5], days: [14,10,15,24,20,12,16,26,18,11,14,22,16,10,13,47] },
  sharon:            { label: 'Sharon',            ratio: [102.8,104.1,102.5,100.9,101.2,103.5,102.3,100.8,101.5,102.9,102.1,101.3,101.7,103.2,102.5,100.1], days: [16,12,17,26,22,14,18,28,20,13,16,24,18,12,15,49] },
  mansfield:         { label: 'Mansfield',         ratio: [101.9,103.2,101.6,100.0,100.3,102.6,101.4,99.9,100.6,102.0,101.2,100.4,100.8,102.3,101.6,99.2],  days: [19,15,20,29,25,17,21,31,23,16,19,27,21,15,18,54] },
  bridgewater:       { label: 'Bridgewater',       ratio: [101.2,102.5,100.9,99.3,99.6,101.9,100.7,99.2,99.9,101.3,100.5,99.7,100.1,101.6,100.9,98.5],      days: [24,19,25,34,30,22,26,36,28,21,24,32,26,20,23,59] },
  hingham:           { label: 'Hingham',           ratio: [103.5,104.8,103.2,101.6,101.9,104.2,103.0,101.5,102.2,103.6,102.8,102.0,102.4,103.9,103.2,100.8], days: [12,8,13,22,18,10,14,24,16,9,12,20,14,8,11,45] },
  plymouth:          { label: 'Plymouth',          ratio: [100.8,102.1,100.5,98.9,99.2,101.5,100.3,98.8,99.5,100.9,100.1,99.3,99.7,101.2,100.5,98.1],       days: [26,21,27,36,32,24,28,38,30,23,26,34,28,22,25,61] },
  foxborough:        { label: 'Foxborough',        ratio: [102.0,103.3,101.7,100.1,100.4,102.7,101.5,100.0,100.7,102.1,101.3,100.5,100.9,102.4,101.7,99.3],  days: [18,14,19,28,24,16,20,30,22,15,18,26,20,14,17,53] },
  norton:            { label: 'Norton',            ratio: [101.0,102.3,100.7,99.1,99.4,101.7,100.5,99.0,99.7,101.1,100.3,99.5,99.9,101.4,100.7,98.3],        days: [25,20,26,35,31,23,27,37,29,22,25,33,27,21,24,60] },
  raynham:           { label: 'Raynham',           ratio: [101.4,102.7,101.1,99.5,99.8,102.1,100.9,99.4,100.1,101.5,100.7,99.9,100.3,101.8,101.1,98.7],     days: [22,17,23,32,28,20,24,34,26,19,22,30,24,18,21,57] },
  taunton:           { label: 'Taunton',           ratio: [100.5,101.8,100.2,98.6,98.9,101.2,100.0,98.5,99.2,100.6,99.8,99.0,99.4,100.9,100.2,97.8],        days: [28,23,29,38,34,26,30,40,32,25,28,36,30,24,27,63] },
  attleboro:         { label: 'Attleboro',         ratio: [100.8,102.1,100.5,98.9,99.2,101.5,100.3,98.8,99.5,100.9,100.1,99.3,99.7,101.2,100.5,98.1],       days: [26,21,27,36,32,24,28,38,30,23,26,34,28,22,25,61] },
  'west-bridgewater':{ label: 'West Bridgewater',  ratio: [101.3,102.6,101.0,99.4,99.7,102.0,100.8,99.3,100.0,101.4,100.6,99.8,100.2,101.7,101.0,98.6],     days: [23,18,24,33,29,21,25,35,27,20,23,31,25,19,22,58] },
  'east-bridgewater':{ label: 'East Bridgewater',  ratio: [101.0,102.3,100.7,99.1,99.4,101.7,100.5,99.0,99.7,101.1,100.3,99.5,99.9,101.4,100.7,98.3],       days: [25,20,26,35,31,23,27,37,29,22,25,33,27,21,24,60] },
  halifax:           { label: 'Halifax',           ratio: [100.9,102.2,100.6,99.0,99.3,101.6,100.4,98.9,99.6,101.0,100.2,99.4,99.8,101.3,100.6,98.2],       days: [27,22,28,37,33,25,29,39,31,24,27,35,29,23,26,62] },
  lakeville:         { label: 'Lakeville',         ratio: [101.0,102.3,100.7,99.1,99.4,101.7,100.5,99.0,99.7,101.1,100.3,99.5,99.9,101.4,100.7,98.3],       days: [26,21,27,36,32,24,28,38,30,23,26,34,28,22,25,61] },
  weston:            { label: 'Weston',            ratio: [103.5,104.8,103.2,101.6,101.9,104.2,103.0,101.5,102.2,103.6,102.8,102.0,102.4,103.9,103.2,100.8], days: [14,10,15,24,20,12,16,26,18,11,14,22,16,10,13,47] },
  kingston:          { label: 'Kingston',          ratio: [101.8,103.1,101.5,99.9,100.2,102.5,101.3,99.8,100.5,101.9,101.1,100.3,100.7,102.2,101.5,99.1],   days: [20,15,21,30,26,18,22,32,24,17,20,28,22,16,19,55] },
  middleborough:     { label: 'Middleborough',     ratio: [100.6,101.9,100.3,98.7,99.0,101.3,100.1,98.6,99.3,100.7,99.9,99.1,99.5,101.0,100.3,97.9],        days: [27,22,28,37,33,25,29,39,31,24,27,35,29,23,26,62] },
  scituate:          { label: 'Scituate',          ratio: [102.6,103.9,102.3,100.7,101.0,103.3,102.1,100.6,101.3,102.7,101.9,101.1,101.5,103.0,102.3,99.9],  days: [15,11,16,25,21,13,17,27,19,12,15,23,17,11,14,48] },
  cohasset:          { label: 'Cohasset',          ratio: [103.8,105.1,103.5,101.9,102.2,104.5,103.3,101.8,102.5,103.9,103.1,102.3,102.7,104.2,103.5,101.1], days: [11,7,12,21,17,9,13,23,15,8,11,19,13,7,10,44] },
  hanover:           { label: 'Hanover',           ratio: [102.2,103.5,101.9,100.3,100.6,102.9,101.7,100.2,100.9,102.3,101.5,100.7,101.1,102.6,101.9,99.5],  days: [17,13,18,27,23,15,19,29,21,14,17,25,19,13,16,51] },
  rockland:          { label: 'Rockland',          ratio: [101.5,102.8,101.2,99.6,99.9,102.2,101.0,99.5,100.2,101.6,100.8,100.0,100.4,101.9,101.2,98.8],     days: [21,16,22,31,27,19,23,33,25,18,21,29,23,17,20,56] },
};

// ─── Reference line plugin (100% list price) ───────────────────────────────────
const refLinePlugin: Plugin<'line'> = {
  id: 'refLineTabs',
  afterDraw(chart) {
    const yScale = chart.scales['y'];
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

type RangeKey = 'all' | '5y' | '3y' | '1y';
type TabKey   = 'market' | 'sellers' | 'buyers';

interface Props { slug: string }

export default function CommunityChartTabs({ slug }: Props) {
  const [activeTab,   setActiveTab]   = useState<TabKey>('market');
  const [activeRange, setActiveRange] = useState<RangeKey>('5y');
  const chartRef = useRef<ChartJS<'line'>>(null);

  const hvTown = hvTownData[slug] ?? null;
  const sbTown = sbTownData[slug] ?? null;

  // If we have no data at all, render nothing
  if (!hvTown && !sbTown) return null;

  const townLabel = hvTown?.label ?? sbTown?.label ?? slug;

  // ── Home Value helpers ──────────────────────────────────────────────────────
  function getSliceStart(range: RangeKey) {
    if (range === '1y') return hvLabels.length - 4;
    if (range === '3y') return hvLabels.length - 12;
    if (range === '5y') return hvLabels.length - 20;
    return 0;
  }
  const sliceStart   = getSliceStart(activeRange);
  const slicedLabels = hvLabels.slice(sliceStart);
  const hvValues     = hvTown ? hvTown.values.slice(sliceStart) : [];
  const massValues   = massMedian.slice(sliceStart);
  const allVisible   = [...hvValues, ...massValues];
  const minVal       = allVisible.length ? Math.min(...allVisible) : 0;
  const maxVal       = allVisible.length ? Math.max(...allVisible) : 1;
  const padding      = (maxVal - minVal) * 0.15;

  return (
    <div className="chart-container community-chart-tabs">
      {/* ── Panel header ─────────────────────────────────────────────────── */}
      <div className="community-chart__header">
        <div>
          <p className="community-chart__label">MARKET DATA</p>
          <p className="community-chart__title">{townLabel} Real Estate Insights</p>
        </div>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────────────── */}
      <div className="chart-tab-bar">
        {([
          { key: 'market',  icon: 'ph-chart-line-up', label: 'Home Values'      },
          { key: 'sellers', icon: 'ph-tag',            label: 'Sale-to-List'    },
          { key: 'buyers',  icon: 'ph-calendar-blank', label: 'Days on Market'  },
        ] as { key: TabKey; icon: string; label: string }[]).map(({ key, icon, label }) => (
          <button
            key={key}
            className={`chart-tab-btn${activeTab === key ? ' is-active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <i className={`ph ${icon}`}></i>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TAB 1 — HOME VALUES                                               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'market' && hvTown && (
        <>
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
                    data: hvValues,
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
                      label: (ctx) => {
                        const val = ctx.parsed.y ?? 0;
                        return ' ' + ctx.dataset.label + ': $' + (val / 1000).toFixed(0) + 'K';
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { color: gridColor, drawTicks: false },
                    ticks: { color: textColor, font: { family: "'Satoshi', sans-serif", size: 11 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
                    border: { display: false },
                  },
                  y: {
                    grid: { color: gridColor, drawTicks: false },
                    ticks: { color: textColor, font: { family: "'Satoshi', sans-serif", size: 11 }, callback: (v) => '$' + (Number(v) / 1000) + 'K' },
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
            <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--primary"></span>{townLabel} Avg. Home Value</span>
            <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--muted"></span>Massachusetts Median</span>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TAB 2 — SALE-TO-LIST RATIO (Sellers)                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'sellers' && sbTown && (
        <>
          <div className="chart-tab-subtitle">
            <p>How close to asking price homes sell — above 100% means sellers get more than list price.</p>
          </div>
          <div className="chart-wrapper">
            <Line
              data={{
                labels: sbLabels,
                datasets: [
                  {
                    label: 'Sale-to-List Ratio',
                    data: sbTown.ratio,
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
                      label: (ctx) => ' Sale-to-List: ' + (ctx.parsed.y ?? 0).toFixed(1) + '%',
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { color: gridColor, drawTicks: false },
                    ticks: { color: textColor, font: { family: "'Satoshi', sans-serif", size: 11 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
                    border: { display: false },
                  },
                  y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: gridColor, drawTicks: false },
                    ticks: { color: gold, font: { family: "'Satoshi', sans-serif", size: 11, weight: 'bold' as const }, callback: (v) => v + '%' },
                    border: { display: false },
                    min: 97,
                    max: 106,
                  },
                },
                animation: { duration: 800, easing: 'easeOutQuart' },
              }}
              plugins={[refLinePlugin]}
            />
          </div>
          <div className="chart-legend">
            <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--primary"></span>Sale-to-List Ratio — {townLabel}</span>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TAB 3 — DAYS ON MARKET (Buyers)                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'buyers' && sbTown && (
        <>
          <div className="chart-tab-subtitle">
            <p>Average days from listing to accepted offer — lower numbers mean a faster, more competitive market.</p>
          </div>
          <div className="chart-wrapper">
            <Line
              data={{
                labels: sbLabels,
                datasets: [
                  {
                    label: 'Days on Market',
                    data: sbTown.days,
                    borderColor: teal,
                    backgroundColor: tealFade,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.35,
                    pointRadius: 4,
                    pointBackgroundColor: teal,
                    pointBorderColor: 'rgba(22,42,82,0.9)',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: teal,
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
                      label: (ctx) => ' Days on Market: ' + (ctx.parsed.y ?? 0),
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { color: gridColor, drawTicks: false },
                    ticks: { color: textColor, font: { family: "'Satoshi', sans-serif", size: 11 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 8 },
                    border: { display: false },
                  },
                  y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: gridColor, drawTicks: false },
                    ticks: { color: teal, font: { family: "'Satoshi', sans-serif", size: 11, weight: 'bold' as const }, callback: (v) => v + 'd' },
                    border: { display: false },
                    min: 0,
                    max: 70,
                  },
                },
                animation: { duration: 800, easing: 'easeOutQuart' },
              }}
            />
          </div>
          <div className="chart-legend">
            <span className="chart-legend__item"><span className="chart-legend__dot chart-legend__dot--teal"></span>Days on Market — {townLabel}</span>
          </div>
        </>
      )}
    </div>
  );
}
