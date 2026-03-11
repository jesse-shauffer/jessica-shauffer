import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: 'noindex',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: '100dvh', overflow: 'auto' }}>
      {children}
    </div>
  );
}
