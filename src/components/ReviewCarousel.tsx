'use client';

import { useState, useEffect, useCallback } from 'react';
import ReviewCard from './ReviewCard';

interface Review {
  _id: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalReviews = reviews.length;

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const goBack = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused || totalReviews <= 3) return;
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [isPaused, advance, totalReviews]);

  // Get visible reviews (3 on desktop, wrapping around)
  const getVisibleReviews = () => {
    const visible: Review[] = [];
    for (let i = 0; i < Math.min(3, totalReviews); i++) {
      visible.push(reviews[(currentIndex + i) % totalReviews]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <div
      className="review-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonials-grid">
        {visibleReviews.map((review) => (
          <ReviewCard
            key={review._id}
            body={review.text}
            author={review.author}
            role={review.role || 'Client'}
            date={review.date}
          />
        ))}
      </div>

      {totalReviews > 3 && (
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={goBack}
            aria-label="Previous reviews"
          >
            <i className="ph ph-caret-left" aria-hidden="true"></i>
          </button>

          <div className="carousel-dots">
            {Array.from({ length: totalReviews }).map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === currentIndex ? ' carousel-dot--active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="carousel-btn"
            onClick={advance}
            aria-label="Next reviews"
          >
            <i className="ph ph-caret-right" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </div>
  );
}
