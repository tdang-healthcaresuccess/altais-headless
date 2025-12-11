import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

function generateSitemap(urls) {
  // Add a visible comment at the top of the XML for debugging
  const breakdown = global.sitemapBreakdown || {};
  // Set site URL here if env is not available
  let SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  if (!SITE_URL || SITE_URL === 'undefined') {
    SITE_URL = 'https://altais.com';
  }
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

  // Fetch all physicians from GraphQL
  const { data: physiciansData } = await client.query({
    query: gql`
      query GetAllPhysicians {
        doctorsList(perPage: 10000) {
          items {
            slug
            specialties
          }
        }
      }
    `,
  });

  const physicians = physiciansData?.doctorsList?.items || [];

  // Generate doctor profile URLs from GraphQL data
  const doctorUrls = physicians
    .map(doc => doc.slug)
    .filter(Boolean)
    .map(slug => `/physicians/${slug}`);

  // Get all unique specialties from physicians
  const specialtySet = new Set();
  physicians.forEach(doc => {
    if (doc.specialties) {
      // Handle both array and comma-separated string formats
      const specs = Array.isArray(doc.specialties) 
        ? doc.specialties 
        : doc.specialties.split(',').map(s => s.trim());
      
      specs.forEach(spec => {
        if (spec && spec !== 'nan') {
          specialtySet.add(spec);
        }
      });
    }
  });

  const specialtyUrls = Array.from(specialtySet)
    .filter(s => s)
    .map(s => {
      // Create clean URL slug without percent encoding
      const cleanSlug = s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
        .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
      return `/specialty/${cleanSlug}`;
    });

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

export default function Sitemap() {
  // This component is not rendered directly - sitemap is generated in getServerSideProps
  return null;
}