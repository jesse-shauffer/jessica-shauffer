'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface Town {
  slug: string;
  name: string;
  tagline: string;
  county: string;
  image: string;
}

interface Props {
  towns: Town[];
}

export default function CommunitiesHoverList({ towns }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number>(-1);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imgEl = imgRef.current;
    if (!container || !imgEl) return;

    // Smooth cursor follow loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let curX = 0, curY = 0;

    const tick = () => {
      curX = lerp(curX, mousePos.current.x, 0.12);
      curY = lerp(curY, mousePos.current.y, 0.12);
      gsap.set(imgEl, { x: curX, y: curY });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left + 32,
        y: e.clientY - rect.top - 120,
      };
    };
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleRowEnter = (index: number) => {
    activeIndexRef.current = index;
    const imgEl = imgRef.current;
    if (!imgEl) return;
    // Switch visible frame first
    const frames = imgEl.querySelectorAll<HTMLElement>('.communities-hover-list__img-frame');
    frames.forEach((f, fi) => {
      f.style.opacity = fi === index ? '1' : '0';
    });
    // Show the floating container
    gsap.killTweensOf(imgEl);
    gsap.to(imgEl, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
  };

  const handleRowLeave = () => {
    activeIndexRef.current = -1;
    const imgEl = imgRef.current;
    if (!imgEl) return;
    gsap.killTweensOf(imgEl);
    gsap.to(imgEl, { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' });
  };

  return (
    <div ref={containerRef} className="communities-hover-list" style={{ position: 'relative' }}>
      {/* Floating image */}
      <div
        ref={imgRef}
        className="communities-hover-list__img"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 320,
          height: 220,
          pointerEvents: 'none',
          zIndex: 10,
          opacity: 0,
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(10,23,48,0.25)',
          willChange: 'transform',
        }}
      >
        {towns.map((town, i) => (
          <div
            key={town.slug}
            className="communities-hover-list__img-frame"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              transition: 'opacity 0.15s ease',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={town.image}
              alt={town.name}
              loading={i < 6 ? 'eager' : 'lazy'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

      {/* Town list */}
      <div className="communities-hover-list__list">
        {towns.map((town, i) => (
          <Link
            key={town.slug}
            href={`/communities/${town.slug}`}
            className="communities-hover-list__row"
            onMouseEnter={() => handleRowEnter(i)}
            onMouseLeave={handleRowLeave}
          >
            <span className="communities-hover-list__num">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="communities-hover-list__name">{town.name}</span>
            <span className="communities-hover-list__county">{town.county}</span>
            <span className="communities-hover-list__tagline">{town.tagline}</span>
            <span className="communities-hover-list__arrow">
              <i className="ph ph-arrow-right"></i>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
