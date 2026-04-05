'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 8 pinned core towns (in order), then alphabetical remainder
const FEATURED_COMMUNITIES = [
  { name: 'Easton', slug: 'easton' },
  { name: 'North Easton', slug: 'north-easton' },
  { name: 'South Easton', slug: 'south-easton' },
  { name: 'Mansfield', slug: 'mansfield' },
  { name: 'Bridgewater', slug: 'bridgewater' },
  { name: 'West Bridgewater', slug: 'west-bridgewater' },
  { name: 'Norton', slug: 'norton' },
  { name: 'Raynham', slug: 'raynham' },
];

const COUNTIES = [
  { name: 'Bristol County', slug: 'bristol-county' },
  { name: 'Norfolk County', slug: 'norfolk-county' },
  { name: 'Plymouth County', slug: 'plymouth-county' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const [countiesOpen, setCountiesOpen] = useState(false);
  const pathname = usePathname();

  function isActive(page: string) {
    if (page === 'communities') return pathname.startsWith('/communities') ? 'is-active' : '';
    if (page === 'counties') return pathname.startsWith('/counties') ? 'is-active' : '';
    if (page === 'testimonials') return pathname.startsWith('/testimonials') ? 'is-active' : '';
    if (page === 'blog') return pathname.startsWith('/blog') ? 'is-active' : '';
    if (page === 'calculators') return pathname.startsWith('/calculators') ? 'is-active' : '';
    return pathname === `/${page}` ? 'is-active' : '';
  }

  function closeMobile() {
    setMobileOpen(false);
    setCommunitiesOpen(false);
    setCountiesOpen(false);
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

            {/* Counties dropdown */}
            <div className="nav-dropdown">
              <Link href="/counties" className={isActive('counties')}>
                Counties <i className="ph ph-caret-down"></i>
              </Link>
              <div className="nav-dropdown__menu">
                {COUNTIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/counties/${c.slug}`}
                    className={pathname === `/counties/${c.slug}` ? 'is-active' : ''}
                  >
                    {c.name}
                  </Link>
                ))}
                <div className="nav-dropdown__divider"></div>
                <Link href="/counties" className="nav-dropdown__view-all">
                  All Counties →
                </Link>
              </div>
            </div>

            {/* Communities dropdown */}
            <div className="nav-dropdown">
              <Link href="/communities" className={isActive('communities')}>
                Communities <i className="ph ph-caret-down"></i>
              </Link>
              <div className="nav-dropdown__menu">
                {FEATURED_COMMUNITIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/communities/${c.slug}`}
                    className={pathname === `/communities/${c.slug}` ? 'is-active' : ''}
                  >
                    {c.name}
                  </Link>
                ))}
                <div className="nav-dropdown__divider"></div>
                <Link href="/communities" className="nav-dropdown__view-all">
                  View All Communities →
                </Link>
              </div>
            </div>

            <Link href="/blog" className={isActive('blog')}>Blog</Link>
            {/* Calculator nav link hidden until launch */}
            <Link href="/contact" className={isActive('contact')}>Contact</Link>
          </nav>
          <Link href="#consultation" className="btn btn--primary btn--sm header__cta">Free Consultation</Link>
          <button className="header__menu-btn" aria-label="Open menu" onClick={openMobile}>
            <i className="ph ph-list"></i>
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className={`mobile-nav${mobileOpen ? ' is-open' : ''}`} id="mobileNav" aria-hidden={!mobileOpen}>
        <div className="mobile-nav__inner">
          <button className="mobile-nav__close" aria-label="Close menu" onClick={closeMobile}>
            <i className="ph ph-x"></i>
          </button>
          <nav className="mobile-nav__links">
            <Link href="/" onClick={closeMobile}>Home</Link>
            <Link href="/about" onClick={closeMobile}>About</Link>
            <Link href="/market" onClick={closeMobile}>Market</Link>
            <Link href="/buyers" onClick={closeMobile}>Buyers</Link>
            <Link href="/sellers" onClick={closeMobile}>Sellers</Link>

            {/* Mobile Counties */}
            <a
              href="/counties"
              onClick={(e) => { e.preventDefault(); setCountiesOpen(!countiesOpen); }}
            >
              Counties <i className="ph ph-caret-down" style={{ fontSize: '0.75rem', transition: 'transform 0.2s', transform: countiesOpen ? 'rotate(180deg)' : '' }}></i>
            </a>
            {countiesOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                {COUNTIES.map((c) => (
                  <Link key={c.slug} href={`/counties/${c.slug}`} onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>{c.name}</Link>
                ))}
                <Link href="/counties" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none', fontWeight: 600 }}>All Counties →</Link>
              </div>
            )}

            {/* Mobile Communities */}
            <a
              href="/communities"
              onClick={(e) => { e.preventDefault(); setCommunitiesOpen(!communitiesOpen); }}
            >
              Communities <i className="ph ph-caret-down" style={{ fontSize: '0.75rem', transition: 'transform 0.2s', transform: communitiesOpen ? 'rotate(180deg)' : '' }}></i>
            </a>
            {communitiesOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                {FEATURED_COMMUNITIES.map((c) => (
                  <Link key={c.slug} href={`/communities/${c.slug}`} onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>{c.name}</Link>
                ))}
                <Link href="/communities" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none', fontWeight: 600 }}>View All Communities →</Link>
              </div>
            )}

            <Link href="/blog" onClick={closeMobile}>Blog</Link>
            {/* Calculator nav link hidden until launch */}
            <Link href="/contact" onClick={closeMobile}>Contact</Link>
          </nav>
          <Link href="#consultation" className="btn btn--primary" onClick={closeMobile}>Free Consultation</Link>
        </div>
      </div>
    </>
  );
}
