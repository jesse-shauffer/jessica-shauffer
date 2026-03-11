'use client';

import { useRef, useEffect, useState } from 'react';

interface ReviewCardProps {
  body: string;
  author: string;
  role: string;
  date: string;
}

export default function ReviewCard({ body, author, role, date }: ReviewCardProps) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [clamped, setClamped] = useState(true);
  const [needsToggle, setNeedsToggle] = useState(false);

  useEffect(() => {
    const p = pRef.current;
    if (!p) return;
    requestAnimationFrame(() => {
      if (p.scrollHeight > p.clientHeight + 2) {
        setNeedsToggle(true);
      } else {
        setClamped(false);
      }
    });
  }, []);

  return (
    <blockquote className="testimonial" itemScope itemType="https://schema.org/Review">
      <div className="testimonial__stars" aria-label="5 stars">
        <i className="ph-fill ph-star"></i>
        <i className="ph-fill ph-star"></i>
        <i className="ph-fill ph-star"></i>
        <i className="ph-fill ph-star"></i>
        <i className="ph-fill ph-star"></i>
      </div>
      <p
        ref={pRef}
        itemProp="reviewBody"
        className={clamped ? 'is-clamped' : ''}
      >
        &ldquo;{body}&rdquo;
      </p>
      {needsToggle && (
        <button
          className="testimonial__toggle"
          aria-expanded={!clamped}
          onClick={() => setClamped(!clamped)}
        >
          {clamped ? 'Read More' : 'Read Less'}
        </button>
      )}
      <footer>
        <strong itemProp="author">{author}</strong>
        <span>{role}</span>
      </footer>
      <meta itemProp="datePublished" content={date} />
      <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
        <meta itemProp="ratingValue" content="5" />
        <meta itemProp="bestRating" content="5" />
      </div>
    </blockquote>
  );
}
