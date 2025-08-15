import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Head from "next/head";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

const GridLayout = ({ results, type }) => {
  // A helper function to strip HTML tags from excerpts
  const truncateText = (text, limit) => {
    if (!text) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    if (plainText.length <= limit) {
      return plainText;
    }
    return plainText.substring(0, limit) + '...';
  };

  return (
    <div className="flex flex-wrap gap-10 items-stretch justify-center">
      {results.map((result) => (
        <div key={result.id} className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
          <div className="block border border-gray-200 rounded-lg mb-6 overflow-hidden">
            {/* Always display an image, fallback to No Image if missing */}
            <img
              src={result.featuredImage?.node?.sourceUrl || 'https://placehold.co/400x200/E5E7EB/4B5563?text=No+Image'}
              alt={result.featuredImage?.node?.altText || result.title}
              className="object-cover min-h-[170px] w-full max-h-[170px] rounded-lg"
              onError={(e) => { e.target.src = 'https://placehold.co/400x200/E5E7EB/4B5563?text=No+Image'; }}
            />
          </div>
          <div className="block flex-grow">
            <h3 className="text-2xl font-bold leading-8 text-blue-900 mb-3">
              {result.title}
            </h3>
            {/* Show an excerpt for posts, but not for pages */}
            {type === 'post' && (
              <p className="text-lg leading-8 text-gray-600 mb-7">
                {truncateText(result.excerpt, 150)}
              </p>
            )}
          </div>
          <a
            href={result.uri}
            className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-gray-200 text-lg leading-6 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Read More
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      ))}
    </div>
  );
};

// GraphQL query for pages, including pagination fields
const GET_PAGES_QUERY = gql`
  query GetPages($search: String) {
    pages(where: { search: $search }) {
      nodes {
        id
        title
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// GraphQL query for posts, including pagination fields
const GET_POSTS_QUERY = gql`
  query GetPosts($search: String) {
    posts(where: { search: $search }) {
      nodes {
        id
        title
        excerpt
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const searchQuery = q || '';

  const RESULTS_PER_PAGE = 8;
  // Single pagination for combined results
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all pages
  const { data: pagesData, loading: pagesLoading, error: pagesError } = useQuery(GET_PAGES_QUERY, {
    variables: { search: searchQuery },
    skip: !searchQuery,
  });

  // Fetch all posts
  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_POSTS_QUERY, {
    variables: { search: searchQuery },
    skip: !searchQuery,
  });

  const pages = pagesData?.pages?.nodes || [];
  const posts = postsData?.posts?.nodes || [];

  const pageInfoPages = pagesData?.pages?.pageInfo;
  const pageInfoPosts = postsData?.posts?.pageInfo;

  const handleNextPagePages = () => {
    if (pageInfoPages?.hasNextPage) {
      setPagePagination({ first: RESULTS_PER_PAGE, after: pageInfoPages.endCursor, last: null, before: null });
    }
  };

  const handlePreviousPagePages = () => {
    if (pageInfoPages?.hasPreviousPage) {
      setPagePagination({ last: RESULTS_PER_PAGE, before: pageInfoPages.startCursor, first: null, after: null });
    }
  };

  const handleNextPagePosts = () => {
    if (pageInfoPosts?.hasNextPage) {
      setPostPagination({ first: RESULTS_PER_PAGE, after: pageInfoPosts.endCursor, last: null, before: null });
    }
  };

  const handlePreviousPagePosts = () => {
    if (pageInfoPosts?.hasPreviousPage) {
      setPostPagination({ last: RESULTS_PER_PAGE, before: pageInfoPosts.startCursor, first: null, after: null });
    }
  };

  if (!searchQuery) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search</h1>
          <p className="text-gray-600">Please enter a search term.</p>
        </div>
      </Layout>
    );
  }

  if (pagesLoading || postsLoading) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results for "{searchQuery}"</h1>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </Layout>
    );
  }

  if (pagesError || postsError) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results for "{searchQuery}"</h1>
          <p className="text-red-500">An error occurred while fetching search results.</p>
        </div>
      </Layout>
    );
  }

  // Combine all results: pages first, then blogs
  const allResults = [...pages.map(p => ({ ...p, __type: 'page' })), ...posts.map(p => ({ ...p, __type: 'post' }))];
  const hasResults = allResults.length > 0;
  // Single pagination for combined results
  const totalPages = Math.ceil(allResults.length / RESULTS_PER_PAGE);
  const paginatedResults = allResults.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);

  return (
    <Layout>
      <Head></Head>
      {/* Inner Page Banner start */}
      <InnerPageBanner
        DesktopBanner="bg-resources-landing-banner"
        MobileBanner="bg-resources-landing-banner-mobile"
        heading={`Searching for "${searchQuery}"`}
      />
      {/* Breadcrumb Start */}
      <Breadcrumb items={[{ label: "Home", link: "/" }, { label: "Search" }]} />
      {/* Breadcrumb End */}
      <main className="block">
        <div className="acf-flexible-content">
          {!hasResults && (
            <p className="text-center text-gray-600">No results found.</p>
          )}
          {hasResults && (
            <div className='container mx-auto'>
              <GridLayout
                results={paginatedResults}
                type={null}
                renderImage={(result) => (
                  <img
                    src={result.featuredImage?.node?.sourceUrl || 'https://placehold.co/400x200/E5E7EB/4B5563?text=No+Image'}
                    alt={result.featuredImage?.node?.altText || result.title}
                    className="object-cover min-h-[170px] w-full max-h-[170px] rounded-lg"
                  />
                )}
              />
              {/* Single Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>
                  <span className="mx-4 text-bluePrimary font-semibold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
