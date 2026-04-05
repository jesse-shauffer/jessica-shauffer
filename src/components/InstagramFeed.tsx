import Script from 'next/script';

interface InstagramFeedProps {
  /** Background color token. Defaults to var(--off-white) (cream).
   *  Pass 'white' for var(--white) or 'warm' for var(--warm-gray). */
  bg?: 'cream' | 'white' | 'warm';
}

const bgMap: Record<string, string> = {
  cream: 'var(--off-white)',
  white: 'var(--white)',
  warm:  'var(--warm-gray)',
};

/**
 * Instagram feed section powered by Elfsight.
 * Drop `<InstagramFeed />` on any page and control the background via the `bg` prop.
 * Edit this one file to update the section across all pages.
 */
export default function InstagramFeed({ bg = 'cream' }: InstagramFeedProps) {
  const background = bgMap[bg] ?? bgMap.cream;

  return (
    <section className="section" style={{ background }}>
      <div className="container">
        <div className="section__header" style={{ textAlign: 'center' }}>
          <p className="section__label">Follow Along</p>
          <h2 className="section__title">Follow Me on Instagram</h2>
          <p className="section__desc">
            Stay up to date with the latest listings, market updates, and South Shore real estate tips.
          </p>
        </div>
        <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-89aa0776-ad9c-4a4c-ae56-ef0f9e421d5f"></div>
      </div>
    </section>
  );
}
