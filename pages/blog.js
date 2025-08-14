// blog.js
import React from 'react';
import Head from "next/head";
// Correct import for Apollo Client's gql and useQuery.
import { gql, useQuery } from '@apollo/client';
import GridLayout from 'components/common/grid-layout';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

// The actual GraphQL query, now tagged with 'gql'.
const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int!, $after: String, $last: Int, $before: String) {
    posts(first: $first, after: $after, last: $last, before: $before) {
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

export default function Blog() {
  const POSTS_PER_PAGE = 4;
  const [paginationState, setPaginationState] = React.useState({
    after: null,
    before: null,
  });

  // The useQuery hook from Apollo Client.
  // We pass the gql query directly and the variables.
  const { data, loading, error } = useQuery(GET_POSTS_QUERY, {
    variables: {
      first: POSTS_PER_PAGE,
      after: paginationState.after,
      last: null, // Clear 'last' when going forward
      before: null, // Clear 'before' when going forward
    },
    // This is a common pattern to ensure the cache is updated.
    // fetchPolicy: 'cache-and-network',
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
      // To go back, we use the `last` and `before` variables
      setPaginationState({
        after: null,
        before: pageInfo.startCursor,
      });
    }
  };

  // NOTE: A more advanced pagination would handle the `before` cursor and `last`
  // variable more explicitly, likely with a second useQuery call or a more complex
  // state management approach. This example provides a basic, functional implementation.

  return (

    <Layout>
      <Head>
        <title>{`${"Blog"}`}</title>
      </Head>

      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
           DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading="Blog"
        />
      
 
     
      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[{ label: "Home", link: "/" }, { label: "Blog" }]}
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
