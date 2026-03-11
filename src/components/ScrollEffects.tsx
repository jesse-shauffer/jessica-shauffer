'use client';

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    const header = document.getElementById('header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const fadeTargets = document.querySelectorAll(
      '.stat-card, .split__media, .split__content, .community-card, .testimonial, .form-split__content, .form-split__form, .info-card, .process-step, .neighborhood-card, .highlight-card, .market-highlight, .contact-info-card, .feature-item'
    );

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      fadeTargets.forEach((el) => {
        (el as HTMLElement).style.opacity = '0';
        observer.observe(el);
      });

      return () => observer.disconnect();
    }
  }, []);

  return null;
}
