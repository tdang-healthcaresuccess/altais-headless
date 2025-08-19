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
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
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
  const POSTS_PER_PAGE = 25;
  const page = parseInt(context.query.page) || 1;
  let after = null;

  // If not first page, fetch cursors up to the requested page
  if (page > 1) {
    const apolloClient = initializeApollo();
    const { data: allData } = await apolloClient.query({
      query: gql`
        query GetCursors($first: Int!) {
          posts(first: $first) {
            pageInfo {
              endCursor
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

export default function Blog({ posts, pageInfo, page }) {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="block">
        <InnerPageBanner
          DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading="Blog"
        />
        <Breadcrumb items={[{ label: "Home", link: "/" }, { label: "Blog" }]} />
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
          <div className="container mx-auto">
            <GridLayout posts={posts} />
            <div className="flex justify-center items-center mt-12 gap-4">
              {page > 1 && (
                <a
                  href={`/blog?page=${page - 1}`}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full shadow-sm bg-white hover:bg-gray-100 transition-colors flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </a>
              )}
              {/* Numeric Pagination */}
              {(() => {
                // Calculate total pages from pageInfo and posts per page
                // Since we don't have total count, use it for more accuracy
                let totalPages = page;
                if (pageInfo?.hasNextPage) {
                  totalPages = Math.max(page + 1, 10); // At least show up to 10 if more pages exist
                }
                // Show up to 10 pages at a time, centered around current page
                let startPage = Math.max(1, page - 4);
                let endPage = Math.min(totalPages, startPage + 9);
                if (endPage - startPage < 9) {
                  startPage = Math.max(1, endPage - 9);
                }
                return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
                  <a
                    key={p}
                    href={`/blog?page=${p}`}
                    className={`px-4 py-2 border border-gray-300 rounded-full shadow-sm mx-1 font-medium ${p === page ? "bg-bluePrimary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                  >
                    {p}
                  </a>
                ));
              })()}
              {pageInfo?.hasNextPage && (
                <a
                  href={`/blog?page=${page + 1}`}
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
