import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const SRC = '/home/ubuntu/jessica-shauffer-git/src/app/(site)';

function walk(dir) {
  const results = [];
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) results.push(...walk(full));
    else if (f === 'page.tsx') results.push(full);
  }
  return results;
}

const pages = walk(SRC);

const titleRe = /title[:\s]*[`'"]([^`'"]{10,})[`'"]/g;
const descRe = /description[:\s]*[`'"]([^`'"]{20,})[`'"]/g;

const MAX_TITLE = 60;
const MAX_DESC = 160;

console.log('PAGE | TYPE | LENGTH | STATUS | TEXT');
console.log('-----|------|--------|--------|-----');

for (const p of pages) {
  const content = readFileSync(p, 'utf8');
  const slug = p.replace('/home/ubuntu/jessica-shauffer-git/src/app/(site)', '').replace('/page.tsx', '') || '/';

  // Extract fallback title/desc from generateMetadata
  const metaBlock = content.match(/generateMetadata[\s\S]{0,3000}?return \{[\s\S]{0,2000}?\}/)?.[0] || '';

  const titles = new Set();
  const descs = new Set();

  let m;
  titleRe.lastIndex = 0;
  while ((m = titleRe.exec(metaBlock)) !== null) {
    const t = m[1].trim();
    if (t.length > 10 && !t.includes('${') && !t.includes('page?.') && !t.includes('title')) titles.add(t);
  }
  descRe.lastIndex = 0;
  while ((m = descRe.exec(metaBlock)) !== null) {
    const d = m[1].trim();
    if (d.length > 20 && !d.includes('${') && !d.includes('page?.') && !d.includes('description')) descs.add(d);
  }

  for (const t of titles) {
    const len = t.length;
    const status = len > MAX_TITLE ? `OVER by ${len - MAX_TITLE}` : 'OK';
    console.log(`${slug} | TITLE | ${len} | ${status} | ${t}`);
  }
  for (const d of descs) {
    const len = d.length;
    const status = len > MAX_DESC ? `OVER by ${len - MAX_DESC}` : 'OK';
    console.log(`${slug} | DESC | ${len} | ${status} | ${d.substring(0, 120)}...`);
  }
}
