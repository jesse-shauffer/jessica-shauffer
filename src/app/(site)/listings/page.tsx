import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Listings — Jessica Shauffer',
  description: 'Search MLS listings with Jessica Shauffer, Coldwell Banker Realty.',
  robots: 'noindex, nofollow',
};

export default function ListingsPage() {
  return (
    <div
      style={{
        paddingTop: '72px', // account for fixed header
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <iframe
        src="https://search.jessicashauffer.com/search"
        title="Search MLS Listings"
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          minHeight: '600px',
        }}
        allowFullScreen
      />
    </div>
  );
}
