import Image from 'next/image';
import Link from 'next/link';

/**
 * AgentAbout — shared "Meet Jessica Shauffer" section.
 * Used on the homepage and at the bottom of every blog post page.
 */
export default function AgentAbout() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="split">
          <div className="split__media split__media--portrait">
            <Image
              src="/assets/jessica-portrait-01.webp"
              alt="Jessica Shauffer — Top Real Estate Agent, South Shore MA"
              width={600}
              height={600}
              className="agent-portrait"
              style={{ borderRadius: 'var(--radius-lg)' }}
            />
          </div>
          <div className="split__content">
            <p className="section__label">Meet Jessica Shauffer</p>
            <h2 className="section__title">Unwavering Integrity. Proven Results.</h2>
            <p>
              As a top-producing agent on the award-winning Weinstein Keach Group at Coldwell Banker Realty, Jessica Shauffer is accustomed to delivering exceptional results. She is a member of the esteemed Coldwell Banker® Presidents Circle — an honor reserved for the top 3% of agents globally — and one of the highest-performing agents on a team.
            </p>
            <p>
              Buyers, sellers, and renters across the South Shore, MetroWest, and Bristol County benefit from Jessica&apos;s experience, local knowledge, and relentless drive to help clients achieve their real estate goals. Whether you need a luxury home, vacation property, investment property, or your very first house, Jessica works tirelessly on your behalf.
            </p>
            <p>
              She studies market trends daily and offers invaluable insights on communities, schools, and amenities from Easton to Plymouth, Canton to Hingham, and everywhere in between.
            </p>
            <div className="about-pills">
              <span className="about-pill"><i className="ph ph-trophy" aria-hidden="true"></i> Presidents Circle</span>
              <span className="about-pill"><i className="ph-fill ph-star" aria-hidden="true"></i> 5.0 Google Rating</span>
              <span className="about-pill"><i className="ph ph-certificate" aria-hidden="true"></i> 10+ Designations</span>
              <span className="about-pill"><i className="ph ph-graduation-cap" aria-hidden="true"></i> UMass Graduate</span>
            </div>
            <Link href="/about" className="btn btn--primary" style={{ marginTop: 'var(--space-6)' }}>
              Learn More About Jessica
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
