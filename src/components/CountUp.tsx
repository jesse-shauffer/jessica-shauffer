'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string;
  className?: string;
}

export default function CountUp({ value, className }: CountUpProps) {
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

  return <span className={className} ref={ref}>{value}</span>;
}

function animateCountUp(el: HTMLElement, raw: string) {
  let prefix = '';
  let suffix = '';
  let numStr = raw.trim();

  // Extract prefix characters
  if (numStr.startsWith('$')) { prefix = '$'; numStr = numStr.substring(1); }
  if (numStr.startsWith('+')) { prefix = prefix + '+'; numStr = numStr.substring(1); }

  // Extract suffix (e.g. "K", "%", " Days")
  const trailingMatch = numStr.match(/(\s*[A-Za-z%]+)$/);
  if (trailingMatch) {
    suffix = trailingMatch[1];
    numStr = numStr.slice(0, -trailingMatch[1].length);
  }

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
