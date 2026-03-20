'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FEATURED_COMMUNITIES = [
  { name: 'Easton', slug: 'easton' },
  { name: 'Canton', slug: 'canton' },
  { name: 'Sharon', slug: 'sharon' },
  { name: 'Plymouth', slug: 'plymouth' },
  { name: 'Hingham', slug: 'hingham' },
  { name: 'Norwood', slug: 'norwood' },
  { name: 'Westwood', slug: 'westwood' },
  { name: 'Mansfield', slug: 'mansfield' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  function isActive(page: string) {
    if (page === 'communities') {
      return pathname.startsWith('/communities') ? 'is-active' : '';
    }
    return pathname === `/${page}` ? 'is-active' : '';
  }

  function closeMobile() {
    setMobileOpen(false);
    setDropdownOpen(false);
    document.body.style.overflow = '';
  }

  function openMobile() {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <>
      <header className="header" id="header">
        <div className="header__inner">
          <Link href="/" className="header__logo" aria-label="Jessica Shauffer Real Estate">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/coldwell-banker-logo-nav.svg" alt="Coldwell Banker Realty" className="header__logo-img" />
          </Link>
          <nav className="header__nav" aria-label="Main navigation">
            <Link href="/about" className={isActive('about')}>About</Link>
            <Link href="/market" className={isActive('market')}>Market</Link>
            <Link href="/buyers" className={isActive('buyers')}>Buyers</Link>
            <Link href="/sellers" className={isActive('sellers')}>Sellers</Link>
            <div className="nav-dropdown">
              <Link href="/communities" className={isActive('communities')}>Communities <i className="ph ph-caret-down"></i></Link>
              <div className="nav-dropdown__menu">
                {FEATURED_COMMUNITIES.map((c) => (
                  <Link key={c.slug} href={`/communities/${c.slug}`} className={pathname === `/communities/${c.slug}` ? 'is-active' : ''}>{c.name}</Link>
                ))}
                <Link href="/communities" style={{ fontWeight: 600, borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '0.25rem', paddingTop: '0.5rem' }}>View All Communities →</Link>
              </div>
            </div>
            <Link href="/contact" className={isActive('contact')}>Contact</Link>
          </nav>
          <Link href="/contact#consultation" className="btn btn--primary btn--sm header__cta">Free Consultation</Link>
          <button className="header__menu-btn" aria-label="Open menu" onClick={openMobile}>
            <i className="ph ph-list"></i>
          </button>
        </div>
      </header>

      <div className={`mobile-nav${mobileOpen ? ' is-open' : ''}`} id="mobileNav" aria-hidden={!mobileOpen}>
        <div className="mobile-nav__inner">
          <button className="mobile-nav__close" aria-label="Close menu" onClick={closeMobile}>
            <i className="ph ph-x"></i>
          </button>
          <nav className="mobile-nav__links">
            <Link href="/about" onClick={closeMobile}>About</Link>
            <Link href="/market" onClick={closeMobile}>Market</Link>
            <Link href="/buyers" onClick={closeMobile}>Buyers</Link>
            <Link href="/sellers" onClick={closeMobile}>Sellers</Link>
            <a
              href="/communities"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              Communities <i className="ph ph-caret-down" style={{ fontSize: '0.75rem', transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : '' }}></i>
            </a>
            {dropdownOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                {FEATURED_COMMUNITIES.map((c) => (
                  <Link key={c.slug} href={`/communities/${c.slug}`} onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>{c.name}</Link>
                ))}
                <Link href="/communities" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none', fontWeight: 600 }}>View All Communities →</Link>
              </div>
            )}
            <Link href="/contact" onClick={closeMobile}>Contact</Link>
          </nav>
          <Link href="/contact#consultation" className="btn btn--primary" onClick={closeMobile}>Free Consultation</Link>
        </div>
      </div>
    </>
  );
}
