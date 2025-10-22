import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Head from "next/head";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return '';
  if (typeof html !== 'string') return '';
  
  // Remove HTML tags
  const withoutTags = html.replace(/<[^>]*>/g, ' ');
  
  // Decode common HTML entities
  const decoded = withoutTags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Replace multiple spaces with single space and trim
  return decoded.replace(/\s+/g, ' ').trim();
};

// Helper function to extract all ACF content for searching
const extractACFContent = (contentTemplates) => {
  try {
    if (!contentTemplates) return '';
    
    let allContent = [];
    
    // Extract from templateC
    if (contentTemplates.templateC) {
      allContent.push(stripHtmlTags(contentTemplates.templateC));
    }
    
    // Extract from templateA sections
    if (contentTemplates.templateA && Array.isArray(contentTemplates.templateA)) {
      contentTemplates.templateA.forEach(section => {
        // Extract content from different section types
        if (section.section1aContent) allContent.push(stripHtmlTags(section.section1aContent));
        if (section.content2a) allContent.push(stripHtmlTags(section.content2a));
        if (section.headline2a) allContent.push(section.headline2a);
        if (section.wrapUpList) allContent.push(section.wrapUpList);
        if (section.section5aContent) allContent.push(stripHtmlTags(section.section5aContent));
        
        // Section 3a cards
        if (section.section3aCards && Array.isArray(section.section3aCards)) {
          section.section3aCards.forEach(card => {
            if (card.cardContent) allContent.push(stripHtmlTags(card.cardContent));
            if (card.cardHeadline) allContent.push(card.cardHeadline);
            if (card.cardOptions) allContent.push(card.cardOptions);
            if (card.cardContentCollapse) allContent.push(stripHtmlTags(card.cardContentCollapse));
          });
        }
        
        // Section 4a content
        if (section.section4aDescription) allContent.push(stripHtmlTags(section.section4aDescription));
        if (section.section4aAdditionalHeadline) allContent.push(section.section4aAdditionalHeadline);
        if (section.section4aAdditionalDescription) allContent.push(stripHtmlTags(section.section4aAdditionalDescription));
        if (section.section4aHeadline) allContent.push(section.section4aHeadline);
        if (section.ctaButtonText) allContent.push(section.ctaButtonText);
        if (section.ctaButtonUrl) allContent.push(section.ctaButtonUrl);
        
        // Section 6a testimonials
        if (section.section6aTestimonials && Array.isArray(section.section6aTestimonials)) {
          section.section6aTestimonials.forEach(testimonial => {
            if (testimonial.reviewerName) allContent.push(testimonial.reviewerName);
            if (testimonial.reviewerDescription) allContent.push(stripHtmlTags(testimonial.reviewerDescription));
          });
        }
      });
    }
    
    return allContent.join(' ');
  } catch (error) {
    console.error('Error extracting ACF content:', error);
    return '';
  }
};

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
            {/* Only render image if sourceUrl is present and not empty */}
            {result.featuredImage?.node?.sourceUrl ? (
              <img
                src={result.featuredImage.node.sourceUrl}
                alt={result.featuredImage.node.altText || result.title}
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-lg"
                onError={(e) => { e.target.src = 'https://placehold.co/400x200/E5E7EB/4B5563?text=No+Image'; }}
              />
            ) : null}
          </div>
          <div className="block flex-grow">
            <h3 className="text-2xl font-bold leading-8 text-blue-900 mb-3">
              {result.title}
            </h3>
            {/* Show excerpt for posts, or ACF content preview for pages */}
            {result.__type === 'post' && result.excerpt && (
              <p className="text-lg leading-8 text-gray-600 mb-7">
                {truncateText(result.excerpt, 150)}
              </p>
            )}
            {result.__type === 'page' && result.contentTemplates && (
              <p className="text-lg leading-8 text-gray-600 mb-7">
                {truncateText(extractACFContent(result.contentTemplates), 150)}
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

// GraphQL query for pages - fetch ALL pages to search ACF content client-side
const GET_PAGES_QUERY = gql`
  query GetPages {
    pages(first: 1000) {
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
        contentTemplates {
          templateSelection
          templateC
          templateA {
            ... on ContentTemplatesTemplateASection1aLayout {
              fieldGroupName
              section1aContent
            }
            ... on ContentTemplatesTemplateASection2aLayout {
              content2a
              headline2a
              fieldGroupName
              wrapUpList
            }
            ... on ContentTemplatesTemplateASection3aLayout {
              fieldGroupName
              section3aCards {
                cardContent
                cardHeadline
                cardOptions
                cardContentCollapse
              }
            }
            ... on ContentTemplatesTemplateASection4aLayout {
              fieldGroupName
              section4aDescription
              section4aAdditionalHeadline
              section4aAdditionalDescription
              section4aHeadline
              ctaButtonText
              ctaButtonUrl
            }
            ... on ContentTemplatesTemplateASection5aLayout {
              fieldGroupName
              section5aContent
            }
            ... on ContentTemplatesTemplateASection6aTestimonialsLayout {
              fieldGroupName
              section6aTestimonials {
                reviewerName
                reviewerDescription
              }
            }
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
        content
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

  // Fetch all pages (no search filter in GraphQL - we'll filter client-side)
  const { data: pagesData, loading: pagesLoading, error: pagesError } = useQuery(GET_PAGES_QUERY, {
    skip: !searchQuery,
  });

  // Fetch posts with search
  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_POSTS_QUERY, {
    variables: { search: searchQuery },
    skip: !searchQuery,
  });

  const pages = pagesData?.pages?.nodes || [];
  const posts = postsData?.posts?.nodes || [];

  // Filter pages to include those that match in title or ACF content
  const filteredPages = pages.filter(page => {
    if (!searchQuery) return false;
    
    const searchTerm = searchQuery.toLowerCase();
    
    // Search in title
    const titleMatch = page.title?.toLowerCase().includes(searchTerm);
    
    // Search in ACF content
    const acfContent = extractACFContent(page.contentTemplates);
    const acfMatch = acfContent.toLowerCase().includes(searchTerm);
    
    // Debug logging
    if (process.env.NODE_ENV === 'development' && acfMatch) {
      console.log(`Found match in page: ${page.title}`);
      console.log(`Search term: ${searchTerm}`);
      console.log(`ACF Content preview: ${acfContent.substring(0, 200)}...`);
    }
    
    return titleMatch || acfMatch;
  });

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
    console.error('Search errors:', { pagesError, postsError });
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results for "{searchQuery}"</h1>
          <p className="text-red-500">An error occurred while fetching search results.</p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-left bg-gray-100 p-4 rounded">
              <p><strong>Pages Error:</strong> {pagesError?.message}</p>
              <p><strong>Posts Error:</strong> {postsError?.message}</p>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // Combine all results: filtered pages first, then blogs
  const allResults = [...filteredPages.map(p => ({ ...p, __type: 'page' })), ...posts.map(p => ({ ...p, __type: 'post' }))];
  const hasResults = allResults.length > 0;
  // Single pagination for combined results
  const totalPages = Math.ceil(allResults.length / RESULTS_PER_PAGE);
  const paginatedResults = allResults.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);

  return (
    <Layout>
      <Head><title>Search</title></Head>
      {/* Inner Page Banner start */}
      <InnerPageBanner
        DesktopBanner="bg-resources-landing-banner"
        MobileBanner="bg-resources-landing-banner-mobile"
        heading={`Searching for "${searchQuery}"`}
      />
      {/* Breadcrumb Start */}
      <Breadcrumb items={[{ label: "Home", link: "/" }, { label: "Search" }]} />
      {/* Breadcrumb End */}
         <div className="p-8 min-h-screen font-sans">
          <div className="container mx-auto">
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
      </div>
      </div>  
    </Layout>
  );
}
