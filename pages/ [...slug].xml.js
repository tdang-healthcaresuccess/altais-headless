import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(ctx) {
  // Pass the full URL, including the query string, to the Faust utility.
  return getSitemapProps(ctx, {
    frontendUrl: process.env.NEXT_PUBLIC_SITE_URL,
    // The utility will handle the sitemap logic based on the URL.
  });
}