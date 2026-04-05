'use client';

import { useEffect } from 'react';

/**
 * TocObserver — highlights the active TOC link as the user scrolls.
 * Uses IntersectionObserver to watch all heading anchors in the article
 * and applies `is-active` to the matching `.post-toc__nav a` link.
 */
export default function TocObserver() {
  useEffect(() => {
    const nav = document.querySelector('.post-toc__nav');
    if (!nav) return;

    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('.blog-post__body h2[id], .blog-post__body h3[id], .blog-post__body h4[id]')
    );
    if (headings.length === 0) return;

    let activeId = '';

    function setActive(id: string) {
      if (id === activeId) return;
      activeId = id;
      nav!.querySelectorAll('a').forEach((a) => {
        const href = a.getAttribute('href');
        if (href === `#${id}`) {
          a.classList.add('is-active');
        } else {
          a.classList.remove('is-active');
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive((visible[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));

    // Set first heading active on mount
    if (headings[0]?.id) setActive(headings[0].id);

    return () => observer.disconnect();
  }, []);

  return null;
}
