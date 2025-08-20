import { gql } from "@apollo/client";
import Head from "next/head";
import EntryHeader from "../components/EntryHeader";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useFaustQuery } from "@faustwp/core";
import { Layout } from "lucide-react";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";

const POST_QUERY = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const contentQuery = useFaustQuery(POST_QUERY) || {};
  const siteDataQuery = useFaustQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useFaustQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content, date, author, featuredImage, categories } = contentQuery?.post || {};

  return (
    <>
      <Head>
        <title>{`${title} - ${siteTitle}`}</title>
      </Head>

      <Header
        siteTitle={title}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          useDefaultImage={true}
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading={title}
        />
      </div>
      {/* Breadcrumb Start */}
      {/* Determine hierarchy: News or Blog */}
      {(() => {
        let parentLabel = "Blog";
        let parentLink = "/blog";
        if (categories?.nodes?.some(cat => cat.slug === "news")) {
          parentLabel = "News";
          parentLink = "/news";
        }
        return (
          <Breadcrumb
            items={[{ label: "Home", link: "/" }, { label: parentLabel, link: parentLink }, { label: title }]}
          />
        );
      })()}
      {/* Breadcrumb End */}
      <main className="template-wrapper py-12 border-b border-lightPrimary">
        <div className="container mx-auto">
          <div className="block max-w-[838px] mx-auto">
            {/* Featured Image above content, styled like Section1a.js */}
            {featuredImage?.node?.sourceUrl && (
              <div className="w-full flex justify-center mb-6">
                <img
                  src={featuredImage.node.sourceUrl}
                  alt={featuredImage.node.altText || title}
                  className="w-full h-auto object-cover rounded-normal border border-primary"
                />
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

Component.queries = [
  {
    query: POST_QUERY,
    variables: ({ databaseId }, ctx) => ({
      databaseId,
      asPreview: ctx?.asPreview,
    }),
  },
  {
    query: SITE_DATA_QUERY,
  },
  {
    query: HEADER_MENU_QUERY,
  },
];
