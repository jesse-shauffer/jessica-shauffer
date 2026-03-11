import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import StatCard from '@/components/StatCard';
import ReviewCard from '@/components/ReviewCard';
import ConsultationForm from '@/components/ConsultationForm';

const reviews = [
  { body: 'I would give Jess 10 stars if I could! As first time homebuyers, the process seemed SUPER daunting at first. After connecting with Jess, the home buying process was extremely easy for us. From day one, she has been kind, reassuring, and incredibly knowledgeable. Jess always made us feel like a priority — she was on top of every detail, super responsive, and she also cared that we got the right home for us. SERIOUSLY, THE BEST REALTOR EVER!!', author: 'Hayley McLeod', role: 'First-Time Home Buyer', date: '2026-03-03' },
  { body: "Jessica was a great realtor. We are new to the area and she patiently took us to different towns until we found a neighborhood we loved and eventually a home that was meant for us! Friendly, caring, and understanding. We couldn't have gotten in our home if it wasn't for her!!!", author: 'Faride Muawad', role: 'Relocation Buyer', date: '2025-06-10' },
  { body: 'Jessica Shauffer single handedly made the experience of selling our home seamless, streamlined, and stress free. Her experience and expertise enabled us to hone in on the best areas to improve to make sure our home was show ready.', author: 'Taryn Beuttler', role: 'Home Seller', date: '2024-03-10' },
  { body: 'We used Jessica for the sale of our first home and the purchase of our second home. Jess was phenomenal when it came to navigating the ever changing market. For the purchase of our second home, she was incredible in negotiating not only the price but also the terms we wanted.', author: 'Dianna Abrams', role: 'Buy & Sell Client', date: '2024-03-10' },
  { body: "If you are looking for a responsive, kind, knowledgeable agent that can negotiate things you didn't even know were possible to negotiate, you need Jessica. We purchased our home in the middle of the pandemic and in the middle of historically low inventory.", author: 'Sookie Noh', role: 'Home Buyer', date: '2023-03-10' },
  { body: "Jessica Shauffer was wonderful to work with — she sold our house for above asking in just a few days, and got us into the first home we wanted, with the terms we wanted. She's patient, upfront and honest and knows the business inside and out. Highly recommend.", author: 'Adina Preiss', role: 'Buy & Sell Client', date: '2023-03-10' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Jessica Shauffer',
  jobTitle: 'Real Estate Agent',
  description: 'Seasoned, top-producing agent and member of the Coldwell Banker Presidents Circle — top 3% of agents globally. Part of the award-winning Weinstein Keach Group.',
  image: 'https://jessicashauffer.com/assets/jessica.jpg',
  telephone: '(617) 949-1046',
  email: 'Jessica.Shauffer@nemoves.com',
  url: 'https://jessicashauffer.com',
  address: { '@type': 'PostalAddress', streetAddress: '159 Belmont St #1175', addressLocality: 'South Easton', addressRegion: 'MA', postalCode: '02375', addressCountry: 'US' },
  worksFor: { '@type': 'RealEstateAgent', name: 'Weinstein Keach, Coldwell Banker Realty', address: { '@type': 'PostalAddress', streetAddress: '159 Belmont St', addressLocality: 'South Easton', addressRegion: 'MA', postalCode: '02375' } },
  areaServed: { '@type': 'City', name: 'Easton', containedInPlace: { '@type': 'State', name: 'Massachusetts' } },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '19', bestRating: '5' },
  review: [
    { '@type': 'Review', author: { '@type': 'Person', name: 'Hayley McLeod' }, datePublished: '2026-03-03', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: "I would give Jess 10 stars if I could! As first time homebuyers, the process seemed SUPER daunting at first. After connecting with Jess, the home buying process was extremely easy for us. From day one, she has been kind, reassuring, and incredibly knowledgeable. If we had questions or didn't fully understand something within the process, Jess always took the time to explain things in a way that made sense. We went into every decision feeling informed and confident! Jess always made us feel like a priority- she was on top of every detail, super responsive/highly communicative, and she also cared that we got the right home for us. We are incredibly grateful for Jess with her support with buying our first home. SERIOUSLY, THE BEST REALTOR EVER!!" },
    { '@type': 'Review', author: { '@type': 'Person', name: 'David Katie Doran' }, datePublished: '2025-10-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jessica and her team were excellent to work with. We hit a few bumps in the road and it was all handled perfectly. I would recommend Jessica and her team to anyone. They make it happen no matter what the issue may be. Thanks again to all of you !!' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Faride Muawad' }, datePublished: '2025-06-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: "Jessica was a great realtor. We are new to the area and she patiently took us to different towns until we found a neighborhood we loved and eventually a home that was meant for us! Friendly, caring, and understanding. We couldn't have gotten in our home if it wasn't for her!!!" },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Kaitlyn Stone' }, datePublished: '2025-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jessica was a tremendous help in buying our home! Especially as first time home buyers in this market, her expertise and advice helped us navigate an otherwise stressful process. Jessica helped us talk through each decision to make sure we felt comfortable and confident.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Taryn Beuttler' }, datePublished: '2024-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jessica Shauffer single handedly made the experience of selling our home seamless, streamlined, and stress free. Her experience and expertise enabled us to hone in on the best areas to improve to make sure our home was show ready. Her vast network of contacts made the process quick and painless.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Dianna Abrams' }, datePublished: '2024-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'We used Jessica for the sale of our first home and the purchase of our second home. Jess was phenomenal when it came to navigating the ever changing market. For the purchase of our second home, she was incredible in negotiating not only the price but also the terms we wanted.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'J Furst' }, datePublished: '2024-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'We absolutely loved working with Jess Shauffer and fully recommend her. We worked with Jess on the purchase of our new home and the sale of our old townhouse. This has been a multi year process with the state of the housing market.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Sookie Noh' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: "If you are looking for responsive, kind, knowledgeable agent that can negotiate things you didn't even know were possible to negotiate, you need Jessica. We purchased our home in the middle of pandemic and in the middle of historically low inventory." },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Kristi Marsh' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'I knew that it was time to sell the family home but as a single mom I kept imagining the process to be overwhelming. I needed someone I felt like I could trust, share my emotions with, and reach out to with the tiniest of questions. Jess was exactly that person.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Adina Preiss' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: "Jessica Shauffer was wonderful to work with - she sold our house for above asking in just a few days, and got us into the first home we wanted, with the terms we wanted. She's patient, upfront and honest and knows the business inside and out. Highly recommend." },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Jim Shaughnessy' }, datePublished: '2024-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jessica is great. She helped me find my first home and was extremely helpful during the whole process. She is hardworking, honest, and reliable. Even after the close she continues to help and check in on how we are doing. I highly recommend working with her.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Aileen Costello' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: "My husband and I really can't say enough good things about Jessica. She was incredibly knowledgeable about the home buying/home sale process, while also very understanding of our needs as buyers/sellers." },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Janine Colombo' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jessica Shauffer went above and beyond for myself and my mother by coordinating the sale of 2 homes and purchase of another all within the same time frame. Extremely professional, punctual, and came with excellent referrals.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Kirill Bumin' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'We connected with Jessica through pure luck, by posting in a local FB group. From the moment that we connected, Jessica proved to be a huge asset. Neither I or my wife have ever lived in MA, and had very limited time to schedule viewings.' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Michael Wilson' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jess is awesome! She is great to work with. Very knowledgeable every step of the way, including connecting with high quality, local professionals for renovation work. Highly recommend!' },
    { '@type': 'Review', author: { '@type': 'Person', name: 'Joy Johnson Myatt' }, datePublished: '2023-03-10', reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, reviewBody: 'Jessica was very helpful and attentive during our home buying process. We found her to be very professional and easy to work with.' },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <Image src="/assets/hero.webp" alt="Aerial view of a charming New England neighborhood in Easton, Massachusetts at golden hour" fill priority style={{ objectFit: 'cover' }} />
          <div className="hero__overlay"></div>
        </div>
        <div className="hero__content">
          <p className="hero__badge">Coldwell Banker Presidents Circle — Top 3% Globally</p>
          <h1 className="hero__title">Your Easton Real Estate Expert</h1>
          <p className="hero__subtitle">Whether you&apos;re buying your dream home or selling for top dollar, get the results you deserve with Jessica Shauffer and the award-winning Weinstein Keach Group.</p>
          <div className="hero__trust">
            <div className="hero__rating">
              <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
              <span>5.0 from 19 Google Reviews</span>
            </div>
          </div>
          <div className="hero__ctas">
            <Link href="/contact#consultation" className="btn btn--accent btn--lg">Book a Free Consultation</Link>
            <a href="tel:+16179491046" className="btn btn--ghost btn--lg"><i className="ph ph-phone"></i> (617) 949-1046</a>
          </div>
        </div>
      </section>

      {/* AGENT INTRO */}
      <section className="section section--agent">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Image src="/assets/jessica.jpg" alt="Jessica Shauffer, Real Estate Agent — Weinstein Keach, Coldwell Banker Realty" width={500} height={600} className="agent-portrait" />
            </div>
            <div className="split__content">
              <p className="section__label">Meet Your Agent</p>
              <h2 className="section__title">Jessica Shauffer</h2>
              <p className="agent-subtitle">Weinstein Keach Group | Coldwell Banker Realty</p>
              <p>Jessica is a seasoned, top-producing agent known for her outgoing personality, excellent communication, and detail-focused mindset. A member of the Coldwell Banker Presidents Circle (top 3% globally), she&apos;s a local expert who studies market trends daily and offers invaluable insights on neighborhoods, schools, and amenities.</p>
              <p>With a UMass degree in Sociology and Education, Jessica brings a natural talent for helping people. Whether you&apos;re a first-time buyer or selling your family home, she guides every step with patience, integrity, and relentless advocacy.</p>
              <div className="agent-creds">
                <div className="agent-cred"><i className="ph ph-trophy"></i><span>Presidents Circle</span></div>
                <div className="agent-cred"><i className="ph ph-star"></i><span>5.0 Google Rating</span></div>
                <div className="agent-cred"><i className="ph ph-certificate"></i><span>10+ Designations</span></div>
              </div>
              <Link href="/about" className="btn btn--primary">Learn More About Jessica</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET STATS */}
      <section className="section section--stats" id="market">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Market Snapshot</p>
            <h2 className="section__title">Easton by the Numbers</h2>
            <p className="section__desc">A competitive market with steady appreciation — here&apos;s what you need to know right now.</p>
          </div>
          <div className="stats-grid">
            <StatCard value="$662K" label="Avg. Home Value" delta="+5% YoY" deltaType="up" />
            <StatCard value="23" label="Median Days on Market" delta="Selling Fast" deltaType="down" />
            <StatCard value="101%" label="Sale-to-List Ratio" delta="Above Asking" deltaType="up" />
            <StatCard value="$380" label="Price per Sq. Ft." delta="Steady Growth" deltaType="neutral" />
          </div>
          <p className="stats-source">Data sourced from Zillow, Redfin, and Realtor.com — updated regularly.</p>
        </div>
      </section>

      {/* BUYERS SECTION */}
      <section className="section section--split" id="buyers">
        <div className="container">
          <div className="split">
            <div className="split__media">
              <Image src="/assets/interior.webp" alt="Beautiful modern colonial interior with open kitchen and living area" width={600} height={400} />
            </div>
            <div className="split__content">
              <p className="section__label">For Buyers</p>
              <h2 className="section__title">Find Your Dream Home in Easton</h2>
              <p>Easton offers the perfect balance of suburban charm and city access. Top-rated schools, beautiful neighborhoods like North Easton Village and Tanglewood Estates, and easy commutes via Route 24 and I-495.</p>
              <ul className="check-list">
                <li><i className="ph ph-check-circle"></i> Access off-market and pre-listed properties</li>
                <li><i className="ph ph-check-circle"></i> Expert negotiation to win in a competitive market</li>
                <li><i className="ph ph-check-circle"></i> Neighborhood tours and school district guidance</li>
                <li><i className="ph ph-check-circle"></i> Mortgage pre-qualification referrals</li>
              </ul>
              <Link href="/buyers" className="btn btn--primary">Full Buyer&apos;s Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELLERS SECTION */}
      <section className="section section--dark" id="sellers">
        <div className="container">
          <div className="split split--reverse">
            <div className="split__media">
              <div className="seller-card">
                <div className="seller-card__header">
                  <i className="ph ph-chart-line-up"></i>
                  <span>Average Seller Outcome</span>
                </div>
                <div className="seller-card__stat">
                  <span className="seller-card__big">3.4%</span>
                  <span className="seller-card__sub">Year-over-year appreciation</span>
                </div>
                <div className="seller-card__divider"></div>
                <div className="seller-card__stat">
                  <span className="seller-card__big">23 Days</span>
                  <span className="seller-card__sub">Average time to sell</span>
                </div>
                <div className="seller-card__divider"></div>
                <div className="seller-card__stat">
                  <span className="seller-card__big">101%</span>
                  <span className="seller-card__sub">Of list price received</span>
                </div>
              </div>
            </div>
            <div className="split__content">
              <p className="section__label section__label--light">For Sellers</p>
              <h2 className="section__title section__title--light">Sell Smarter, Net More</h2>
              <p className="text--light">Easton homes are selling fast and at or above asking price. Jessica leverages her market analysis expertise, proven pricing strategies, innovative digital marketing, and home staging specialization to maximize your return.</p>
              <ul className="check-list check-list--light">
                <li><i className="ph ph-check-circle"></i> Complimentary home valuation</li>
                <li><i className="ph ph-check-circle"></i> Professional staging and photography</li>
                <li><i className="ph ph-check-circle"></i> Marketing across hundreds of websites and social platforms</li>
                <li><i className="ph ph-check-circle"></i> Tenacious negotiation for top dollar</li>
              </ul>
              <Link href="/sellers" className="btn btn--accent">Full Seller&apos;s Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="section" id="community">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Life in Easton</p>
            <h2 className="section__title">Why Families Love Easton</h2>
            <p className="section__desc">A tight-knit community with New England charm, natural beauty, and everything you need.</p>
          </div>
          <div className="community-grid">
            <div className="community-card community-card--featured">
              <Image src="/assets/park.webp" alt="Beautiful autumn lake scene in a New England state park" width={800} height={500} />
              <div className="community-card__overlay">
                <h3>Borderland State Park</h3>
                <p>1,800+ acres of trails, ponds, and historic beauty right in your backyard.</p>
              </div>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph ph-graduation-cap"></i></div>
              <h3>Top-Rated Schools</h3>
              <p>Oliver Ames High School rated 8/10 with strong academics and extracurriculars.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph ph-train-simple"></i></div>
              <h3>Easy Commute</h3>
              <p>Quick access to Boston via Route 24 and I-495. Suburban living, city opportunity.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph ph-tree"></i></div>
              <h3>New England Charm</h3>
              <p>Historic villages, tree-lined streets, and a genuine sense of community.</p>
            </div>
            <div className="community-card">
              <div className="community-card__icon"><i className="ph ph-house-line"></i></div>
              <h3>Growing Neighborhoods</h3>
              <p>New developments like Sawmill Village alongside established favorites like Tanglewood Estates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section--testimonials" id="reviews">
        <div className="container">
          <div className="section__header">
            <p className="section__label">Google Reviews</p>
            <h2 className="section__title">What Jessica&apos;s Clients Say</h2>
            <div className="reviews-summary">
              <div className="reviews-summary__stars">
                <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
              </div>
              <span className="reviews-summary__text">5.0 rating from 19 reviews on Google</span>
            </div>
          </div>
          <div className="testimonials-grid">
            {reviews.map((r) => (
              <ReviewCard key={r.author} body={r.body} author={r.author} role={r.role} date={r.date} />
            ))}
          </div>
          <div className="reviews-more">
            <a href="https://www.google.com/maps/place/Jessica+Shauffer" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <i className="ph ph-google-logo"></i> See All 19 Reviews on Google
            </a>
            <Link href="/contact#consultation" className="btn btn--accent" style={{ marginLeft: 'var(--space-4)' }}>Book a Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="section section--form" id="consultation">
        <div className="container">
          <div className="form-split">
            <div className="form-split__content">
              <p className="section__label">Free Consultation</p>
              <h2 className="section__title">Let&apos;s Talk About Your Goals</h2>
              <p>Whether you&apos;re ready to make a move or just exploring — a quick conversation with Jessica can save you time, money, and stress. No pressure, just expert advice from a top 3% agent.</p>
              <div className="form-benefits">
                <div className="form-benefit">
                  <i className="ph ph-clock"></i>
                  <div><strong>15-Minute Call</strong><span>Quick, focused, and tailored to you</span></div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-currency-dollar-simple"></i>
                  <div><strong>100% Free</strong><span>No cost, no obligation, no strings</span></div>
                </div>
                <div className="form-benefit">
                  <i className="ph ph-shield-check"></i>
                  <div><strong>Local Expertise</strong><span>Nearly a decade of Easton market knowledge</span></div>
                </div>
              </div>
            </div>
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
