'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostCard {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  topic: string;
  secondaryTopic?: string;
  excerpt: string;
  author: string;
  heroImageUrl: string;
  heroImageAlt: string;
}

interface Props {
  posts: BlogPostCard[];
  topicLabels: Record<string, string>;
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Date (Newest)' },
  { value: 'date-asc',  label: 'Date (Oldest)' },
  { value: 'title-asc', label: 'Name (A to Z)' },
  { value: 'title-desc',label: 'Name (Z to A)' },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogFilterClient({ posts, topicLabels }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [sortOpen, setSortOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sortOpen]);

  // Build unique topic list from posts
  const topics = useMemo(() => {
    const seen = new Set<string>();
    posts.forEach((p) => {
      if (p.topic) seen.add(p.topic);
      if (p.secondaryTopic) seen.add(p.secondaryTopic);
    });
    return Array.from(seen).sort((a, b) =>
      (topicLabels[a] || a).localeCompare(topicLabels[b] || b)
    );
  }, [posts, topicLabels]);

  const filtered = useMemo(() => {
    let result = [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }

    if (activeTopic !== 'all') {
      result = result.filter(
        (p) => p.topic === activeTopic || p.secondaryTopic === activeTopic
      );
    }

    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return result;
  }, [posts, searchQuery, activeTopic, sortBy]);

  const clearSearch = () => {
    setSearchQuery('');
    searchRef.current?.focus();
  };

  const clearAll = () => {
    setSearchQuery('');
    setActiveTopic('all');
    setSortBy('date-desc');
  };

  const hasActiveFilters = searchQuery.trim() || activeTopic !== 'all';
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Sort By';

  return (
    <div>
      {/* ── Controls box ─────────────────────────────────────────── */}
      <div className="blog-controls-box">
        <div className="blog-controls">
          {/* Search bar */}
          <div className="blog-search">
            <i className="ph ph-magnifying-glass blog-search__icon" aria-hidden="true" />
            <input
              ref={searchRef}
              type="text"
              className="blog-search__input"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blog posts"
            />
            {searchQuery && (
              <button
                className="blog-search__clear"
                onClick={clearSearch}
                aria-label="Clear search"
                type="button"
              >
                <i className="ph ph-x" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Custom sort dropdown */}
          <div className="blog-sort" ref={sortRef}>
            <button
              className={`blog-sort__trigger${sortOpen ? ' is-open' : ''}`}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((v) => !v)}
            >
              <span>{currentSortLabel}</span>
              <i className={`ph ${sortOpen ? 'ph-caret-up' : 'ph-caret-down'} blog-sort__caret`} aria-hidden="true" />
            </button>

            {sortOpen && (
              <ul className="blog-sort__panel" role="listbox" aria-label="Sort options">
                {SORT_OPTIONS.map((opt) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    className={`blog-sort__option${sortBy === opt.value ? ' is-selected' : ''}`}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                  >
                    {opt.value === sortBy && (
                      <i className="ph ph-check" aria-hidden="true" style={{ marginRight: '0.4rem', color: 'var(--gold)' }} />
                    )}
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Reset button */}
          <button
            className="blog-reset-btn"
            onClick={clearAll}
            type="button"
            aria-label="Reset all filters"
            title="Reset all filters"
          >
            <i className="ph ph-arrow-counter-clockwise" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Topic filter pills ───────────────────────────────────── */}
      <div className="blog-topics">
        <button
          className={`blog-topic-btn${activeTopic === 'all' ? ' is-active' : ''}`}
          onClick={() => setActiveTopic('all')}
          type="button"
        >
          All Posts
          <span className="blog-topic-count">{posts.length}</span>
        </button>
        {topics.map((t) => (
          <button
            key={t}
            className={`blog-topic-btn${activeTopic === t ? ' is-active' : ''}`}
            onClick={() => setActiveTopic(t)}
            type="button"
          >
            {topicLabels[t] || t}
            <span className="blog-topic-count">
              {posts.filter((p) => p.topic === t || p.secondaryTopic === t).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Active filter tags ───────────────────────────────────── */}
      {hasActiveFilters && (
        <div className="blog-active-filters">
          {searchQuery.trim() && (
            <button className="blog-active-tag" onClick={clearSearch} type="button">
              {searchQuery.trim()}
              <i className="ph ph-x" aria-hidden="true" />
            </button>
          )}
          {activeTopic !== 'all' && (
            <button className="blog-active-tag" onClick={() => setActiveTopic('all')} type="button">
              {topicLabels[activeTopic] || activeTopic}
              <i className="ph ph-x" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* ── Results counter ──────────────────────────────────────── */}
      <p className="blog-results-count">
        Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''} of <strong>{posts.length}</strong> article{posts.length !== 1 ? 's' : ''}
      </p>

      {/* ── Grid ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="blog-empty">
          <i className="ph ph-article blog-empty__icon" aria-hidden="true" />
          <p>No articles match your search. <button className="blog-empty__reset" onClick={clearAll} type="button">Clear filters</button></p>
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <article key={post._id} className="blog-card">
              {/* Image block with hover arrow circle */}
              <Link href={`/blog/${post.slug}`} className="blog-card__image-link" tabIndex={-1} aria-hidden="true">
                <div className="blog-card__image-wrap">
                  <Image
                    src={post.heroImageUrl}
                    alt={post.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Arrow circle overlay — appears on hover */}
                  <div className="blog-card__arrow-circle" aria-hidden="true">
                    <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                      <path d="M13.0003 5.00586L11.5316 6.47461L17.3441 12.2975H4.66699V14.3809H17.3441L11.5316 20.2038L13.0003 21.6725L21.3337 13.3392L13.0003 5.00586Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card body */}
              <div className="blog-card__body">
                {/* Category pills */}
                <div className="blog-card__cats">
                  {post.topic && (
                    <button
                      className="blog-card__cat"
                      onClick={() => setActiveTopic(post.topic)}
                      title={`Filter by ${topicLabels[post.topic] || post.topic}`}
                      type="button"
                    >
                      {topicLabels[post.topic] || post.topic}
                    </button>
                  )}
                  {post.secondaryTopic && post.secondaryTopic !== post.topic && (
                    <button
                      className="blog-card__cat"
                      onClick={() => setActiveTopic(post.secondaryTopic!)}
                      title={`Filter by ${topicLabels[post.secondaryTopic] || post.secondaryTopic}`}
                      type="button"
                    >
                      {topicLabels[post.secondaryTopic] || post.secondaryTopic}
                    </button>
                  )}
                </div>

                {/* Title */}
                <h2 className="blog-card__title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Date + Read more row */}
                <div className="blog-card__footer">
                  <time className="blog-card__date" dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <Link href={`/blog/${post.slug}`} className="blog-card__cta" aria-label={`Read ${post.title}`}>
                    Read Article
                    <i className="ph ph-arrow-right" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
