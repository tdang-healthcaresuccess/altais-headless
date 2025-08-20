// blog.js
import React from 'react';
import Head from "next/head";
import { gql } from '@apollo/client';
import { initializeApollo } from '@/lib/apolloClient';
import GridLayout from 'components/common/grid-layout';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

const GET_POSTS_QUERY = gql`
  query GetPosts($first: Int!, $after: String, $categoryName: String) {
    posts(first: $first, after: $after, where: {categoryName: $categoryName}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        
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

export async function getServerSideProps(context) {
  const POSTS_PER_PAGE = 20;
  const page = parseInt(context.query.page) || 1;
  let after = null;

  // If not first page, fetch cursors up to the requested page
  if (page > 1) {
    const apolloClient = initializeApollo();
    const { data: allData } = await apolloClient.query({
      query: gql`
        query GetCursors($first: Int!) {
          posts(first: $first, where: {categoryName: "News"}) {
            pageInfo {
              endCursor
              totalCount
            }
          }
        }
      `,
      variables: {
        first: POSTS_PER_PAGE * (page - 1),
      },
    });
    after = allData.posts.pageInfo.endCursor;
  }

  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_POSTS_QUERY,
    variables: {
      first: POSTS_PER_PAGE,
      after,
      categoryName: "News",
    },
  });

  return {
    props: {
      posts: data.posts.nodes,
      pageInfo: data.posts.pageInfo,
      page,
    },
  };
}

export default function News({ posts, pageInfo, page }) {
  const POSTS_PER_PAGE = 20;
  const totalCount = pageInfo?.totalCount || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));
  const NUMERIC_RANGE = 5;
  let startPage = Math.max(1, page - NUMERIC_RANGE);
  let endPage = Math.min(totalPages, page + NUMERIC_RANGE);
  return (
    <Layout>
      <Head>
        <title>News</title>
      </Head>
      <div className="block">
        <InnerPageBanner
          DesktopBanner="bg-landing-common-banner"
          MobileBanner="bg-landing-common-banner-mobile"
          heading="News"
        />
        <Breadcrumb
          items={[{ label: "Home", link: "/" }, { label: "News" }]}
        />
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
          <div className="container mx-auto">
            <GridLayout posts={posts} />
            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-12 gap-4">
              {page > 1 && (
                <a
                  href={`/news?page=${page - 1}`}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 transition-colors flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </a>
              )}
              {/* Numeric Pagination */}
              {(() => {
                const NUMERIC_RANGE = 5;
                let startPage = Math.max(1, page - NUMERIC_RANGE);
                let endPage = page + NUMERIC_RANGE;
                if (!pageInfo?.hasNextPage) {
                  endPage = page;
                }
                return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
                  <a
                    key={p}
                    href={`/news?page=${p}`}
                    className={`px-4 py-2 border border-gray-300 rounded-full shadow-sm mx-1 font-medium ${p === page ? "bg-bluePrimary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                  >
                    {p}
                  </a>
                ));
              })()}
              {pageInfo?.hasNextPage && (
                <a
                  href={`/news?page=${page + 1}`}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 transition-colors flex items-center"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
// ...existing code...
