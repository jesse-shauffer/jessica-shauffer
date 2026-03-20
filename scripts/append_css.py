#!/usr/bin/env python3
"""Appends town chart and county page CSS to globals.css"""

css = """

/* ═══════════════════════════════════════════════════════════════
   TOWN SELECTOR CHART
   ═══════════════════════════════════════════════════════════════ */
.town-chart { background: var(--white, #fff); border-radius: var(--radius-xl); border: 1px solid rgba(0,0,0,0.08); padding: var(--space-6); box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
.town-chart__controls { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-5); }
.town-selector { display: flex; flex-direction: column; gap: var(--space-3); }
.town-selector__pins { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.town-pill { font-size: var(--text-sm); font-weight: 500; color: var(--primary); background: var(--navy-50); border: 1px solid rgba(0,48,135,0.15); border-radius: var(--radius-full); padding: 0.35rem 0.85rem; cursor: pointer; transition: background 0.15s, color 0.15s; white-space: nowrap; text-decoration: none; display: inline-block; }
.town-pill:hover { background: rgba(0,48,135,0.12); }
.town-pill--active, .town-pill[aria-pressed="true"] { background: var(--primary); color: #fff; border-color: var(--primary); }
.town-selector__dropdown-wrap { position: relative; display: inline-block; max-width: 280px; }
.town-selector__dropdown-btn { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); font-weight: 600; color: var(--primary); background: #fff; border: 1.5px solid var(--primary); border-radius: var(--radius-lg); padding: 0.5rem 1rem; cursor: pointer; width: 100%; justify-content: space-between; }
.town-selector__dropdown-btn:hover { background: var(--navy-50); }
.town-selector__caret { transition: transform 0.2s; }
.town-selector__caret.is-open { transform: rotate(180deg); }
.town-selector__dropdown-menu { position: absolute; top: calc(100% + 4px); left: 0; min-width: 260px; background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-lg); box-shadow: 0 8px 32px rgba(0,0,0,0.12); z-index: 200; max-height: 360px; overflow-y: auto; padding: var(--space-2) 0; }
.town-selector__dropdown-section { padding: 0 var(--space-2); }
.town-selector__dropdown-label { display: block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray-600); padding: var(--space-2) var(--space-2) var(--space-1); }
.town-selector__option { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.45rem var(--space-2); font-size: var(--text-sm); font-weight: 500; color: var(--color-text); background: transparent; border: none; border-radius: var(--radius-md); cursor: pointer; text-align: left; transition: background 0.12s; }
.town-selector__option:hover { background: var(--navy-50); }
.town-selector__option.is-selected { background: var(--navy-50); color: var(--primary); font-weight: 600; }
.town-selector__option-county { font-size: 0.7rem; color: var(--gray-600); font-weight: 400; margin-left: var(--space-2); white-space: nowrap; }
.metric-selector { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.metric-btn { font-size: var(--text-xs); font-weight: 600; color: var(--gray-600); background: var(--off-white); border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-full); padding: 0.3rem 0.75rem; cursor: pointer; transition: all 0.15s; }
.metric-btn:hover { border-color: var(--primary); color: var(--primary); }
.metric-btn--active { background: var(--primary); color: #fff; border-color: var(--primary); }
.town-chart__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); margin-bottom: var(--space-5); padding: var(--space-4); background: var(--off-white); border-radius: var(--radius-lg); }
.chart-stat { display: flex; flex-direction: column; gap: 0.25rem; }
.chart-stat__label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gray-600); }
.chart-stat__value { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 0.25rem; }
.chart-stat__value--up { color: #16a34a; }
.chart-stat__value--down { color: #dc2626; }
.town-chart__canvas-wrap { height: 280px; position: relative; }
.town-chart__source { font-size: var(--text-xs); color: var(--gray-600); margin-top: var(--space-3); text-align: center; }
.town-chart__source a { color: var(--primary); text-decoration: underline; }

/* ═══════════════════════════════════════════════════════════════
   COUNTY PAGES
   ═══════════════════════════════════════════════════════════════ */
.county-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.county-card { background: var(--white); border: 1px solid rgba(0,0,0,0.08); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); box-shadow: 0 2px 12px rgba(0,0,0,0.05); transition: box-shadow 0.2s, transform 0.2s; }
.county-card:hover { box-shadow: 0 8px 32px rgba(0,48,135,0.1); transform: translateY(-2px); }
.county-card__header { display: flex; align-items: flex-start; gap: var(--space-4); }
.county-card__icon { width: 48px; height: 48px; border-radius: var(--radius-lg); background: var(--navy-50); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.5rem; color: var(--primary); }
.county-card__badge { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gold); background: rgba(200,162,78,0.1); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); margin-bottom: 0.25rem; }
.county-card__title { font-size: var(--text-xl); font-weight: 700; color: var(--primary); margin: 0 0 0.25rem; }
.county-card__tagline { font-size: var(--text-sm); color: var(--gray-600); margin: 0; }
.county-card__desc { font-size: var(--text-sm); color: var(--color-text); line-height: 1.7; margin: 0; }
.county-card__towns { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.county-card__cta { margin-top: auto; align-self: flex-start; }
.community-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
.community-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: var(--radius-lg); padding: var(--space-4); transition: background 0.2s, border-color 0.2s; }
.community-card--link { text-decoration: none; display: flex; flex-direction: column; gap: 0.25rem; cursor: pointer; }
.community-card--link:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.3); }
.community-card__name { font-size: var(--text-base); font-weight: 700; color: #fff; margin: 0; }
.community-card__tagline { font-size: var(--text-xs); color: rgba(255,255,255,0.65); margin: 0; line-height: 1.5; }
.community-card__arrow { font-size: var(--text-xs); font-weight: 600; color: rgba(255,255,255,0.5); margin-top: auto; padding-top: var(--space-2); }
.highlights-list { display: flex; flex-direction: column; gap: var(--space-4); }
.highlight-item { display: flex; align-items: flex-start; gap: var(--space-3); }
.highlight-item__icon { width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--navy-50); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.25rem; color: var(--primary); }
.highlight-item__title { font-size: var(--text-base); font-weight: 700; color: var(--color-text); margin: 0 0 0.25rem; }
.highlight-item__desc { font-size: var(--text-sm); color: var(--gray-600); margin: 0; line-height: 1.6; }
.faq-list { display: flex; flex-direction: column; gap: var(--space-5); max-width: 800px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: var(--space-5); }
.faq-item:last-child { border-bottom: none; }
.faq-item__question { font-size: var(--text-lg); font-weight: 700; color: var(--primary); margin: 0 0 var(--space-3); }
.faq-item__answer { font-size: var(--text-base); color: var(--color-text); line-height: 1.75; margin: 0; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); align-items: start; }
.breadcrumbs { padding: var(--space-3) 0; }
.breadcrumbs__list { display: flex; align-items: center; gap: var(--space-2); list-style: none; margin: 0; padding: 0; font-size: var(--text-sm); color: var(--gray-600); }
.breadcrumbs__list li:not(:last-child)::after { content: '/'; margin-left: var(--space-2); color: var(--gray-600); }
.breadcrumbs__list a { color: var(--primary); text-decoration: none; }
.breadcrumbs__list a:hover { text-decoration: underline; }
.btn--outline { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
.btn--outline:hover { background: var(--primary); color: #fff; }
@media (max-width: 767px) { .town-chart__stats { grid-template-columns: repeat(2, 1fr); } .town-selector__dropdown-wrap { max-width: 100%; } .town-chart__canvas-wrap { height: 220px; } }
@media (max-width: 1023px) { .county-grid { grid-template-columns: 1fr; } .community-grid { grid-template-columns: repeat(2, 1fr); } .two-col { grid-template-columns: 1fr; gap: var(--space-8); } }
@media (max-width: 767px) { .community-grid { grid-template-columns: 1fr 1fr; } }
"""

with open('/home/ubuntu/jessica-shauffer/src/app/globals.css', 'a') as f:
    f.write(css)
print('CSS appended successfully')
