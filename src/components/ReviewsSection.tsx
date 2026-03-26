import { getReviews } from '@/lib/sanity';
import ReviewCarousel from './ReviewCarousel';

interface ReviewsSectionProps {
  /** Override the eyebrow label. Defaults to "Client Success Stories" */
  label?: string;
  /** Override the heading. Defaults to "What Jessica's Clients Say" */
  heading?: string;
}

/**
 * Shared server component — fetches reviews from Sanity, picks 9 at random,
 * and renders the full testimonials section with stars summary + carousel.
 *
 * Drop `<ReviewsSection />` on any page. Edit this one file to update the
 * section across the entire site.
 */
export default async function ReviewsSection({
  label = 'Client Success Stories',
  heading = "What Jessica's Clients Say",
}: ReviewsSectionProps) {
  const reviews = await getReviews();
  const reviewCount = reviews.length || 19;

  // Randomly pick 9 reviews on each server render — keeps carousel fresh
  const displayReviews = [...reviews].sort(() => Math.random() - 0.5).slice(0, 9);

  return (
    <section className="section section--testimonials" id="reviews">
      <div className="container">
        <div className="section__header">
          <p className="section__label">{label}</p>
          <h2 className="section__title">{heading}</h2>
          <div className="reviews-summary">
            <div className="reviews-summary__stars">
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
              <i className="ph-fill ph-star" aria-hidden="true"></i>
            </div>
            <span className="reviews-summary__text">
              5.0 &middot; {reviewCount} Google Reviews
            </span>
          </div>
        </div>
        <ReviewCarousel reviews={displayReviews} />
      </div>
    </section>
  );
}
