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
            {/* Display an image for posts, or a placeholder for pages */}
            {type === 'post' && result.featuredImage?.node?.sourceUrl ? (
              <img
                src={result.featuredImage.node.sourceUrl}
                alt={result.featuredImage.node.altText || result.title}
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-lg"
                onError={(e) => { e.target.src = 'https://placehold.co/400x200/E5E7EB/4B5563?text=No+Image'; }}
              />
            ) : (
              <div className="bg-gray-100 min-h-[170px] w-full flex items-center justify-center rounded-lg text-gray-500">
                <p>Page Result</p>
              </div>
            )}
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
  query GetPages($search: String, $first: Int, $after: String, $last: Int, $before: String) {
    pages(where: { search: $search }, first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      nodes {
        id
        title
        uri
      }
    }
  }
`;

// GraphQL query for posts, including pagination fields
const GET_POSTS_QUERY = gql`
  query GetPosts($search: String, $first: Int, $after: String, $last: Int, $before: String) {
    posts(where: { search: $search }, first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
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

  const RESULTS_PER_PAGE = 4;

  const [pagePagination, setPagePagination] = useState({
    first: RESULTS_PER_PAGE,
    after: null,
  });
  const [postPagination, setPostPagination] = useState({
    first: RESULTS_PER_PAGE,
    after: null,
  });

  // Fetch pages
  const { data: pagesData, loading: pagesLoading, error: pagesError } = useQuery(GET_PAGES_QUERY, {
    variables: { search: searchQuery, ...pagePagination },
    skip: !searchQuery,
  });

  // Fetch posts
  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_POSTS_QUERY, {
    variables: { search: searchQuery, ...postPagination },
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

  const hasResults = pages.length > 0 || posts.length > 0;

  return (
    <Layout>
       <Head>
        
      </Head>


        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading={`Searching for "${searchQuery}"`}
        />

 
     
      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[{ label: "Home", link: "/" }, { label: "Search" }]}
      />
      {/* Breadcrumb End */}
         <main className="block">
            <div className="acf-flexible-content">
     

      {!hasResults && (
        <p className="text-center text-gray-600">No results found.</p>
      )}

      {/* Display pages first */}
      {pages.length > 0 && (
        <div className='container mx-auto'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services & Helpful Articles</h2>
          <GridLayout results={pages} type="page" />
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePreviousPagePages}
              disabled={!pageInfoPages?.hasPreviousPage}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button
              onClick={handleNextPagePages}
              disabled={!pageInfoPages?.hasNextPage}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Display posts second */}
      {posts.length > 0 && (
        <div className='container mx-auto'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blog</h2>
          <GridLayout results={posts} type="post" />
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePreviousPagePosts}
              disabled={!pageInfoPosts?.hasPreviousPage}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button
              onClick={handleNextPagePosts}
              disabled={!pageInfoPosts?.hasNextPage}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      )}
      </div>
      </main>
    </Layout>
  );
}
