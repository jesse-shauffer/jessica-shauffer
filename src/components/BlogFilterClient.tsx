'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostCard {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  topic: string;
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
  const searchRef = useRef<HTMLInputElement>(null);

  // Build unique topic list from posts
  const topics = useMemo(() => {
    const seen = new Set<string>();
    posts.forEach((p) => { if (p.topic) seen.add(p.topic); });
    return Array.from(seen).sort((a, b) =>
      (topicLabels[a] || a).localeCompare(topicLabels[b] || b)
    );
  }, [posts, topicLabels]);

  const filtered = useMemo(() => {
    let result = [...posts];

    // Text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }

    // Topic filter
    if (activeTopic !== 'all') {
      result = result.filter((p) => p.topic === activeTopic);
    }

    // Sort
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

  return (
    <div>
      {/* ── Controls row ─────────────────────────────────────────── */}
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

        {/* Sort selector */}
        <div className="blog-sort">
          <select
            id="blog-sort-select"
            className="blog-sort__select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort posts"
          >
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
          </select>
          <i className="ph ph-caret-down blog-sort__caret" aria-hidden="true" />
        </div>

        {/* Reset all button — always visible inside box */}
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
              {posts.filter((p) => p.topic === t).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Active filter tags ───────────────────────────────────── */}
      {hasActiveFilters && (
        <div className="blog-active-filters">
          {searchQuery.trim() && (
            <button
              className="blog-active-tag"
              onClick={clearSearch}
              type="button"
            >
              {searchQuery.trim()}
              <i className="ph ph-x" aria-hidden="true" />
            </button>
          )}
          {activeTopic !== 'all' && (
            <button
              className="blog-active-tag"
              onClick={() => setActiveTopic('all')}
              type="button"
            >
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
              <Link href={`/blog/${post.slug}`} className="blog-card__image-link" tabIndex={-1} aria-hidden="true">
                <div className="blog-card__image-wrap">
                  <Image
                    src={post.heroImageUrl}
                    alt={post.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </Link>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  {post.topic && (
                    <button
                      className="blog-card__topic"
                      onClick={() => setActiveTopic(post.topic)}
                      title={`Filter by ${topicLabels[post.topic] || post.topic}`}
                      type="button"
                    >
                      {topicLabels[post.topic] || post.topic}
                    </button>
                  )}
                  <time className="blog-card__date" dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <h2 className="blog-card__title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="blog-card__cta">
                  Read Article <i className="ph ph-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
