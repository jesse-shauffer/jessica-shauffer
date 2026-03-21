'use client';

import Link from 'next/link';

interface Town {
  slug: string;
  name: string;
  tagline: string;
  county: string;
  image: string;
}

interface Props {
  towns: Town[];
}

export default function CommunitiesHoverList({ towns }: Props) {
  return (
    <div className="communities-hover-list">
      <div className="communities-hover-list__list">
        {towns.map((town, i) => (
          <Link
            key={town.slug}
            href={`/communities/${town.slug}`}
            className="communities-hover-list__row"
          >
            {/* Number */}
            <span className="communities-hover-list__num">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Inline thumbnail */}
            <span className="communities-hover-list__thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={town.image}
                alt={town.name}
                loading={i < 8 ? 'eager' : 'lazy'}
              />
            </span>

            {/* Town name */}
            <span className="communities-hover-list__name">{town.name}</span>

            {/* County badge */}
            <span className="communities-hover-list__county">{town.county}</span>

            {/* Tagline — hidden on mobile/tablet */}
            <span className="communities-hover-list__tagline">{town.tagline}</span>

            {/* Arrow */}
            <span className="communities-hover-list__arrow">
              <i className="ph ph-arrow-right"></i>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
