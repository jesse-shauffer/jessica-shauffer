'use client';

import { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  // First item is open by default (index 0); null = all closed
  const [openIndex, setOpenIndex] = useState<number>(0);

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
