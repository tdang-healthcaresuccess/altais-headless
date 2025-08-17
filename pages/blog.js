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

export async function getServerSideProps(context) {
  const POSTS_PER_PAGE = 4;
  const page = parseInt(context.query.page) || 1;
  const after = context.query.after || null;

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
      after: data.posts.pageInfo.endCursor || null,
    },
  };
}

export default function Blog({ posts, pageInfo, page, after }) {
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
              {pageInfo?.hasNextPage && (
                <a
                  href={`/blog?page=${page + 1}&after=${pageInfo.endCursor}`}
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
