import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://jessicashauffer.com'),
  title: {
    default: 'Jessica Shauffer — Easton, MA Real Estate | Coldwell Banker Realty',
    template: '%s | Jessica Shauffer',
  },
  description: 'Buy or sell your home in Easton, MA with Jessica Shauffer — Coldwell Banker Presidents Circle, 5.0-star rated agent with 19 reviews. Free consultation.',
  openGraph: {
    type: 'website',
    images: ['/assets/jessica.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/fill/style.css" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-VRV956B9XP" />
      </body>
    </html>
  );
}
