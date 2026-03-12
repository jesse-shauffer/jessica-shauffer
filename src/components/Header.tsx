'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  function isActive(page: string) {
    if (page === 'neighborhoods') {
      return pathname.startsWith('/neighborhoods') ? 'is-active' : '';
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
              <Link href="/neighborhoods" className={isActive('neighborhoods')}>Neighborhoods <i className="ph ph-caret-down"></i></Link>
              <div className="nav-dropdown__menu">
                <Link href="/neighborhoods/north-easton" className={pathname === '/neighborhoods/north-easton' ? 'is-active' : ''}>North Easton</Link>
                <Link href="/neighborhoods/south-easton" className={pathname === '/neighborhoods/south-easton' ? 'is-active' : ''}>South Easton</Link>
                <Link href="/neighborhoods/five-corners" className={pathname === '/neighborhoods/five-corners' ? 'is-active' : ''}>Five Corners</Link>
                <Link href="/neighborhoods/furnace-village" className={pathname === '/neighborhoods/furnace-village' ? 'is-active' : ''}>Furnace Village</Link>
                <Link href="/neighborhoods/eastondale" className={pathname === '/neighborhoods/eastondale' ? 'is-active' : ''}>Eastondale</Link>
                <Link href="/neighborhoods/unionville" className={pathname === '/neighborhoods/unionville' ? 'is-active' : ''}>Unionville</Link>
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
              href="/neighborhoods"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              Neighborhoods <i className="ph ph-caret-down" style={{ fontSize: '0.75rem', transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : '' }}></i>
            </a>
            {dropdownOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                <Link href="/neighborhoods/north-easton" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>North Easton</Link>
                <Link href="/neighborhoods/south-easton" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>South Easton</Link>
                <Link href="/neighborhoods/five-corners" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>Five Corners</Link>
                <Link href="/neighborhoods/furnace-village" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>Furnace Village</Link>
                <Link href="/neighborhoods/eastondale" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>Eastondale</Link>
                <Link href="/neighborhoods/unionville" onClick={closeMobile} style={{ fontSize: 'var(--text-base)', borderBottom: 'none' }}>Unionville</Link>
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
