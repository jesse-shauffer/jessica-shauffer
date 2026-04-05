/**
 * ImageBand — Full-width aerial/neighborhood image stripe.
 *
 * Responsive aspect ratios are defined in globals.css (.image-band):
 *   ≤479px    (portrait mobile)   → 3:2   (tall, immersive)
 *   480–767px (landscape mobile)  → 16:9  (widescreen)
 *   768–991px (tablet)            → 21:9  (cinematic)
 *   992px+    (desktop)           → 32:9  (thin elegant stripe)
 *
 * Props:
 *   src  — image path (defaults to market-neighborhood.webp)
 *   alt  — alt text (defaults to "" for decorative use)
 */

import Image from 'next/image';

interface ImageBandProps {
  src?: string;
  alt?: string;
}

export default function ImageBand({
  src = '/assets/market-neighborhood.webp',
  alt = '',
}: ImageBandProps) {
  return (
    <div className="image-band" aria-hidden={alt === '' ? 'true' : undefined}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority={false}
      />
    </div>
  );
}
