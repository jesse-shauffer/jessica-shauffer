'use client';

import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
  /** Index of the item that should be open on first render. Pass -1 to start all closed. Defaults to 0 (first item open). */
  defaultOpenIndex?: number;
}

export default function FaqAccordion({ items, defaultOpenIndex = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }

  return (
    <div className="faq-accordion" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`faq-accordion__item${isOpen ? ' faq-accordion__item--open' : ''}`}
            role="listitem"
          >
            <button
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={`faq-body-${i}`}
              id={`faq-trigger-${i}`}
              onClick={() => toggle(i)}
            >
              {item.question}
              <i className="ph ph-plus faq-accordion__icon" aria-hidden="true"></i>
            </button>
            <div
              id={`faq-body-${i}`}
              className="faq-accordion__body"
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              aria-hidden={!isOpen}
            >
              <p className="faq-accordion__answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
