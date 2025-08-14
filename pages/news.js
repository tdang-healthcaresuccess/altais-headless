// blog.js
import React, { useState } from 'react';
import Head from "next/head";
import { gql, useQuery } from '@apollo/client';
import GridLayout from 'components/common/grid-layout';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

// The GraphQL query is updated to include a `where` clause to filter by categoryName.
const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int!, $after: String, $last: Int, $before: String, $categoryName: String) {
    posts(first: $first, after: $after, last: $last, before: $before, where: {categoryName: $categoryName}) {
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

export default function News() {
  const POSTS_PER_PAGE = 4;
  const [paginationState, setPaginationState] = useState({
    after: null,
    before: null,
  });

  // The useQuery hook is updated to pass the `categoryName` variable.
  const { data, loading, error } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: POSTS_PER_PAGE,
      after: paginationState.after,
      last: paginationState.before ? POSTS_PER_PAGE : null,
      before: paginationState.before,
      categoryName: "News", // This is the new filter
    },
  });

  const posts = data?.posts?.nodes || [];
  const pageInfo = data?.posts?.pageInfo;

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage) {
      setPaginationState({
        after: pageInfo.endCursor,
        before: null,
      });
    }
  };

  const handlePreviousPage = () => {
    if (pageInfo?.hasPreviousPage) {
      setPaginationState({
        after: null,
        before: pageInfo.startCursor,
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>News</title>
      </Head>

      <div className="block">
        <InnerPageBanner
          DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading="News"
        />
        <Breadcrumb
          items={[{ label: "Home", link: "/" }, { label: "News" }]}
        />
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
          <div className="container mx-auto">
            {loading ? (
              <p className="text-center text-gray-600">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-500">Failed to load posts: {error.message}</p>
            ) : (
              <GridLayout posts={posts} />
            )}
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                onClick={handlePreviousPage}
                disabled={!pageInfo?.hasPreviousPage}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              
              <button
                onClick={handleNextPage}
                disabled={!pageInfo?.hasNextPage}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
