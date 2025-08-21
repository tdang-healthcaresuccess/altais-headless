import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

// Import dummyDoctors for doctor and specialty URLs
import { dummyDoctors } from '../components/DummyData';

function generateSitemap(urls) {
  // Add a visible comment at the top of the XML for debugging
  const breakdown = global.sitemapBreakdown || {};
  // Set site URL here if env is not available
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://h8jbjt9da2zaacrc01tt4r5p7.js.wpenginepowered.com';
  return `<?xml version="1.0" encoding="UTF-8"?>
    <!-- Sitemap breakdown: Pages: ${breakdown.pages || 0}, Posts: ${breakdown.posts || 0}, Doctors: ${breakdown.doctors || 0}, Specialties: ${breakdown.specialties || 0}, Total: ${breakdown.total || urls.length} -->
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${SITE_URL}${url}</loc>
        </url>
      `).join('')}
    </urlset>
  `;
}

export async function getServerSideProps(ctx) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  // Fetch all pages
  let pages = [];
  let pagesAfter = null;
  let hasNextPagePages = true;
  while (hasNextPagePages) {
    const { data } = await client.query({
      query: gql`
        query GetPages($after: String) {
          pages(first: 100, after: $after) {
            nodes { uri }
            pageInfo { hasNextPage endCursor }
          }
        }
      `,
      variables: { after: pagesAfter },
    });
    pages.push(...(data.pages.nodes.map(node => node.uri)));
    hasNextPagePages = data.pages.pageInfo.hasNextPage;
    pagesAfter = data.pages.pageInfo.endCursor;
  }

  // Fetch all posts
  let posts = [];
  let postsAfter = null;
  let hasNextPagePosts = true;
  while (hasNextPagePosts) {
    const { data } = await client.query({
      query: gql`
        query GetPosts($after: String) {
          posts(first: 100, after: $after) {
            nodes { uri }
            pageInfo { hasNextPage endCursor }
          }
        }
      `,
      variables: { after: postsAfter },
    });
    posts.push(...(data.posts.nodes.map(node => node.uri)));
    hasNextPagePosts = data.posts.pageInfo.hasNextPage;
    postsAfter = data.posts.pageInfo.endCursor;
  }

  // Get all doctor profile URLs from dummyDoctors
  const doctorUrls = dummyDoctors.map(doc => doc.node.doctorData.profileurl);

  // Get all specialties from dummyDoctors
  const specialtySet = new Set();
  dummyDoctors.forEach(doc => {
    if (doc.node.doctorData.speciality) {
      specialtySet.add(doc.node.doctorData.speciality);
    }
    if (doc.node.doctorData.spec1) specialtySet.add(doc.node.doctorData.spec1);
    if (doc.node.doctorData.spec2) specialtySet.add(doc.node.doctorData.spec2);
    if (doc.node.doctorData.spec3) specialtySet.add(doc.node.doctorData.spec3);
  });
  const specialtyUrls = Array.from(specialtySet)
    .filter(s => s)
    .map(s => `/specialty/${encodeURIComponent(s.replace(/\s+/g, '-').toLowerCase())}`);

  // Combine all URLs
  const allUrls = [...pages, ...posts, ...doctorUrls, ...specialtyUrls];
  // Store breakdown for XML comment
  global.sitemapBreakdown = {
    pages: pages.length,
    posts: posts.length,
    doctors: doctorUrls.length,
    specialties: specialtyUrls.length,
    total: allUrls.length,
  };
  const sitemap = generateSitemap(allUrls);

  ctx.res.setHeader('Content-Type', 'text/xml');
  ctx.res.write(sitemap);
  ctx.res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {}