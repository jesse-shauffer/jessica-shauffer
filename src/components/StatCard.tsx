'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  delta: string;
  deltaType: 'up' | 'down' | 'neutral';
}

export default function StatCard({ value, label, delta, deltaType }: StatCardProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            animateCountUp(el, value);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, animated]);

  return (
    <div className="stat-card">
      <span className="stat-card__value" ref={ref}>{value}</span>
      <span className="stat-card__label">{label}</span>
      <span className={`stat-card__delta stat-card__delta--${deltaType}`}>{delta}</span>
    </div>
  );
}

function animateCountUp(el: HTMLElement, raw: string) {
  let prefix = '';
  let suffix = '';
  let numStr = raw.trim();

  if (numStr.startsWith('$')) { prefix = '$'; numStr = numStr.substring(1); }
  if (numStr.startsWith('+')) { prefix = prefix + '+'; numStr = numStr.substring(1); }
  if (numStr.endsWith('K')) { suffix = 'K'; numStr = numStr.slice(0, -1); }
  else if (numStr.endsWith('%')) { suffix = '%'; numStr = numStr.slice(0, -1); }

  const target = parseFloat(numStr.replace(/,/g, ''));
  if (isNaN(target)) return;

  const hasDecimal = numStr.includes('.');
  const duration = 1600;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    if (hasDecimal) {
      el.textContent = prefix + current.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    } else {
      el.textContent = prefix + Math.round(current).toLocaleString('en-US') + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = raw;
    }
  }

  el.textContent = prefix + '0' + suffix;
  requestAnimationFrame(step);
}
