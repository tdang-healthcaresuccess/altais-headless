import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
// Import your components for each layout
import Section1a from "../components/acf/Section1a";
import Section2a from "../components/acf/Section2a";
import Section3a from "../components/acf/Section3a";
import Section4a from "../components/acf/Section4a";
import Section5a from "../components/acf/Section5a";
import TemplateC from "@/components/acf/TemplateC";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";
import Section6a from "@/components/acf/Section6a";

const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      contentTemplates {
        templateSelection
        templateC
        templateA {
          ... on ContentTemplatesTemplateASection1aLayout {
            fieldGroupName
            section1aContent
            section1aImg {
              node {
                sourceUrl
                uri
              }
            }
          }
          ... on ContentTemplatesTemplateASection2aLayout {
            content2a
            headline2a
            sectionBackgroundColor
            fieldGroupName
          }
          ... on ContentTemplatesTemplateASection3aLayout {
            fieldGroupName
            section3aCards {
              cardContent
              cardHeadline
              cardOptions
              fieldGroupName
              cardImage {
                node {
                  uri
                }
              }
            }
          }
          fieldGroupName
          ... on ContentTemplatesTemplateASection4aLayout {
            ctaButtonText
            ctaButtonTextCopy
            enableCta
            fieldGroupName
            section4aAdditionalHeadline
            section4aAdditionalHeadlineOption
            section4aHeadline
            section4aImage {
              node {
                uri
              }
            }
          }
          ... on ContentTemplatesTemplateASection5aLayout {
            fieldGroupName
            section5aContent
          }
          ... on ContentTemplatesTemplateASection6aLayout {
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
`;

export default function SinglePage(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const databaseId = props.__SEED_NODE__.databaseId;
  const asPreview = props.__SEED_NODE__.asPreview;

  const {
    data,
    loading = true,
    error,
  } = useQuery(PAGE_QUERY, {
    variables: {
      databaseId: databaseId,
      asPreview: asPreview,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  if (loading && !data)
    return (
      <div className="container-main flex justify-center py-20">Loading...</div>
    );

  if (error) return <p>Error! {error.message}</p>;

  if (!data?.page) {
    return <p>No pages have been published</p>;
  }

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content, contentTemplates } = data?.page || {};

  const templateSelection = contentTemplates?.templateSelection?.[0];
  const templateAContent = contentTemplates?.templateA;
  const templateCContent = contentTemplates?.templateC;

  return (
    <Layout>
      <Head>
        <title>{`${title} - ${siteTitle}`}</title>
      </Head>

      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading={title}
        />
      </div>

      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[{ label: "Home", link: "/" }, { label: "Template A" }]}
      />
      {/* Breadcrumb End */}
      {/* Landing Page Banner Start */}
      {/* Landing Page Banner End */}
      <main className="block">
        {/* Conditional rendering based on templateSelection */}
        {templateSelection === "Template 1A" && templateAContent && (
          <div className="acf-flexible-content">
            {/* Iterate through templateA layouts */}
            {templateAContent.map((layout, index) => {
              const fieldGroupName = layout.fieldGroupName;
              // Render components based on fieldGroupName
              switch (fieldGroupName) {
                case "ContentTemplatesTemplateASection1aLayout":
                  return <Section1a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection2aLayout":
                  return <Section2a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection3aLayout":
                  return <Section3a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection4aLayout":
                  return <Section4a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection5aLayout":
                  return <Section5a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection6aLayout":
                  return <Section6a key={index} data={layout} />;
                default:
                  return null;
              }
            })}
          </div>
        )}
        {templateSelection === "Template 1C" && templateCContent && (
          <TemplateC bodyContent={templateCContent} />
        )}
      </main>
    </Layout>
  );
}

SinglePage.queries = [
  {
    query: PAGE_QUERY,
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
