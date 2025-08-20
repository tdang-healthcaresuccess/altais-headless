
import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import Head from 'next/head';
import Layout from '@/components/Layout';


const GET_SITEMAP_QUERY = gql`
  query GetSitemap($pagesAfter: String, $postsAfter: String, $doctorsAfter: String, $specialitiesAfter: String) {
    pages(first: 100, after: $pagesAfter) {
      nodes { id title uri }
      pageInfo { hasNextPage endCursor }
    }
    posts(first: 100, after: $postsAfter) {
      nodes { id title uri }
      pageInfo { hasNextPage endCursor }
    }
    doctor(first: 100, after: $doctorsAfter) {
      nodes { id title uri }
      pageInfo { hasNextPage endCursor }
    }
    specialities(first: 100, after: $specialitiesAfter) {
      nodes { id title uri }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export default function SitemapPage() {
  const client = useApolloClient();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [pages, setPages] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [specialities, setSpecialities] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchAll(category, after = null, items = []) {
      const vars = {
        pagesAfter: category === 'pages' ? after : null,
        postsAfter: category === 'posts' ? after : null,
        doctorsAfter: category === 'doctor' ? after : null,
        specialitiesAfter: category === 'specialities' ? after : null,
      };
      try {
        const { data } = await client.query({
          query: GET_SITEMAP_QUERY,
          variables: vars,
        });
        const conn = data[category];
        const newItems = [...items, ...(conn?.nodes || [])];
        if (conn?.pageInfo?.hasNextPage && conn.pageInfo.endCursor) {
          return fetchAll(category, conn.pageInfo.endCursor, newItems);
        }
        return newItems;
      } catch (err) {
        setError(err);
        return items;
      }
    }
    async function fetchAllCategories() {
      setLoading(true);
      try {
        const [allPages, allPosts, allDoctors, allSpecialities] = await Promise.all([
          fetchAll('pages'),
          fetchAll('posts'),
          fetchAll('doctor'),
          fetchAll('specialities'),
        ]);
        if (isMounted) {
          setPages(allPages);
          setPosts(allPosts);
          setDoctors(allDoctors);
          setSpecialities(allSpecialities);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchAllCategories();
    return () => { isMounted = false; };
  }, [client]);

  if (loading) {
    return <Layout><div className="container mx-auto py-20">Loading sitemap...</div></Layout>;
  }
  if (error) {
    return <Layout><div className="container mx-auto py-20 text-red-500">Error loading sitemap: {error.message}</div></Layout>;
  }

  return (
    <Layout>
      <Head>
        <title>Sitemap</title>
      </Head>
      <div className="container mx-auto py-20">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Pages</h2>
          <ul className="space-y-2">
            {pages.map(item => (
              <li key={item.id}>
                <a href={item.uri} className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
          <ul className="space-y-2">
            {posts.map(item => (
              <li key={item.id}>
                <a href={item.uri} className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Doctor Profiles</h2>
          <ul className="space-y-2">
            {doctors.map(item => (
              <li key={item.id}>
                <a href={item.uri} className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Specialties</h2>
          <ul className="space-y-2">
            {specialities.map(item => (
              <li key={item.id}>
                <a href={item.uri} className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}