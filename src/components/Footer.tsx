import Link from 'next/link';

const gReviewUrl = "https://www.google.com/maps/place/Jessica+Shauffer+%E2%80%93+Weinstein+Keach,+Coldwell+Banker+Realty/@42.0556882,-71.0717385,17z/data=!4m8!3m7!1s0x89e485762d91504d:0xa1d3cddd7b582786!8m2!3d42.0556882!4d-71.0717385!9m1!1b1!16s%2Fg%2F11h5qq5tp7?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <Link href="/" className="header__logo" aria-label="Jessica Shauffer Real Estate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/coldwell-banker-logo-footer.svg" alt="Coldwell Banker Realty" className="footer__logo-img" />
            </Link>
            <p>Weinstein Keach Group | Coldwell Banker Realty<br />Top 3% agent serving the South Shore, MetroWest, and Bristol County, MA.</p>
          </div>
          <div className="footer__links">
            <p className="footer__col-heading">Quick Links</p>
            <Link href="/about">About</Link>
            <Link href="/market">Market</Link>
            <Link href="/buyers">Buyers</Link>
            <Link href="/sellers">Sellers</Link>
            <Link href="/counties">Counties</Link>
            <Link href="/communities">Communities</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/calculators">Mortgage Calculator</Link>
          </div>
          <div className="footer__links">
            <p className="footer__col-heading">Contact Jessica</p>
            <a href="tel:+16179491046">(617) 949-1046</a>
            <a href="mailto:Jessica.Shauffer@nemoves.com">Jessica.Shauffer@nemoves.com</a>
            <a href={gReviewUrl} target="_blank" rel="noopener noreferrer">159 Belmont Street<br />South Easton, MA 02375</a>
            <a href="https://weinsteinkeach.com/jessica-shauffer" target="_blank" rel="noopener noreferrer">weinsteinkeach.com</a>
            <a href="https://search.jessicashauffer.com/" target="_blank" rel="noopener noreferrer">Search MLS</a>
            <a href={gReviewUrl} target="_blank" rel="noopener noreferrer">See Google Reviews</a>
            <div className="footer__social">
              <a href="https://share.google/xq286yJyhfi6ZCQmD" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile"><i className="ph ph-google-logo"></i></a>
              <a href="https://www.facebook.com/JessShaufferRealEstate" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="ph ph-facebook-logo"></i></a>
              <a href="https://www.instagram.com/jessicashauffer_realtor" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="ph ph-instagram-logo"></i></a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2026 Jessica Shauffer — Weinstein Keach, Coldwell Banker Realty. All rights reserved.</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
            Serving{' '}
            {[
              { name: 'Easton',       slug: 'easton' },
              { name: 'Canton',       slug: 'canton' },
              { name: 'Sharon',       slug: 'sharon' },
              { name: 'Plymouth',     slug: 'plymouth' },
              { name: 'Hingham',      slug: 'hingham' },
              { name: 'Norwood',      slug: 'norwood' },
              { name: 'Westwood',     slug: 'westwood' },
              { name: 'Mansfield',    slug: 'mansfield' },
              { name: 'Foxborough',   slug: 'foxborough' },
              { name: 'Bridgewater',  slug: 'bridgewater' },
              { name: 'Taunton',      slug: 'taunton' },
              { name: 'Kingston',     slug: 'kingston' },
              { name: 'Halifax',      slug: 'halifax' },
              { name: 'Lakeville',    slug: 'lakeville' },
              { name: 'Stoughton',    slug: 'stoughton' },
              { name: 'Attleboro',    slug: 'attleboro' },
            ].map((town, i, arr) => (
              <span key={town.slug}>
                <Link href={`/communities/${town.slug}`} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }} className="footer__town-link">{town.name}</Link>
                {i < arr.length - 1 ? ', ' : ' '}
              </span>
            ))}
            <Link href="/communities" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }} className="footer__town-link">&amp; more</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
