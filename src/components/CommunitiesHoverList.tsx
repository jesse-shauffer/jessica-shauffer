'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const imgInnerRef = useRef<HTMLImageElement>(null);
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
    const imgInner = imgInnerRef.current;
    if (!imgEl || !imgInner) return;

    // Show the floating image
    gsap.killTweensOf(imgEl);
    gsap.to(imgEl, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    // Clip reveal — scale inner from 1.15 to 1
    gsap.fromTo(imgInner, { scale: 1.15 }, { scale: 1, duration: 0.45, ease: 'power2.out' });
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
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              transition: 'opacity 0.2s ease',
            }}
            className={`communities-hover-list__img-frame`}
            data-index={i}
          >
            <Image
              src={town.image}
              alt={town.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="320px"
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
            onMouseEnter={() => {
              handleRowEnter(i);
              // Show correct image frame
              const frames = containerRef.current?.querySelectorAll('.communities-hover-list__img-frame');
              frames?.forEach((f, fi) => {
                (f as HTMLElement).style.opacity = fi === i ? '1' : '0';
              });
            }}
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
