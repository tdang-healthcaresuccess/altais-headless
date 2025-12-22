import { gql } from "@apollo/client";
import { useFaustQuery } from "@faustwp/core";
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
import Section6a from "../components/acf/Section6a";
import Section7a from "../components/acf/Section7a";
import HubSpotForm from "@/components/acf/HubSpotForm";


const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
              parent {
                node {
                  ... on Page {
                    title
                    uri
                  }
                }
              }
      metaD {
        metaDescription
        titleTag
      }
      seo {
        title
        description
        canonicalUrl
      }
      seomarkup {
        fieldGroupName
        schemaMarkup
      }
      heroBanner {
        enableHeroGradient
        heroBannerImage {
          node {
            sourceUrl
          }
        }
        heroBannerImageMobile {
          node {
            sourceUrl
          }
        }
      }
      contentTemplates {
        templateSelection
        templateC
        templateA {
          ... on ContentTemplatesTemplateASection1aLayout {
            fieldGroupName
            section1aContent
            section1aLineBreak
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
            section2aLineBreak
            sectionBackgroundColor
            fieldGroupName
            wrapUpList
          }
          ... on ContentTemplatesTemplateASection3aLayout {
            fieldGroupName
            section3aLineBreak
            columnSelection
            section3aCards {
              cardContent
              cardHeadline
              cardOptions
              cardContentCollapse
              fieldGroupName
              lineBreak
              cardImage {
                node {
                  sourceUrl
                  uri
                }
              }
                cardIcon {
              node {
                sourceUrl
              }
            }
            }
          }
          fieldGroupName
          ... on ContentTemplatesTemplateASection4aLayout {
            ctaButtonText
            ctaButtonUrl
            enableCta
            fieldGroupName
            section4aLineBreak
            section4aAdditionalHeadline
            section4aDescription
            section4aAdditionalHeadlineOption
            section4aAdditionalDescription
            section4aHeadline
            section4aImage {
              node {
                 sourceUrl
                uri
              }
            }
          }
          ... on ContentTemplatesTemplateASection5aLayout {
            fieldGroupName
            section5aLineBreak
            section5aContent
          }
          ... on ContentTemplatesTemplateASection6aTestimonialsLayout {
            fieldGroupName
            section6aLineBreak
            section6aTestimonials {
              reviewerName
              reviewerDescription
            }
          }
          ... on ContentTemplatesTemplateAHubspotFormLayout {
          fieldGroupName
          hubspotFormId
          hubspotPortalId
          hubspotRegion
        }
          ... on ContentTemplatesTemplateASection7aAccordionLayout {
            fieldGroupName
            accordionTitle
            accordionSubHeader
            accordionLeftContent
            accordionContent
            accordionImage {
              node {
                sourceUrl
                uri
              }
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

  const contentQuery = useFaustQuery(PAGE_QUERY) || {};
  const siteDataQuery = useFaustQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useFaustQuery(HEADER_MENU_QUERY) || {};

  if (!contentQuery?.page) {
    return <p>No pages have been published</p>;
  }


  const siteData = siteDataQuery?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, metaD, contentTemplates, heroBanner, seomarkup } = contentQuery?.page || {};
  const parentPage = contentQuery?.page?.parent?.node;
  const heroDesktop = heroBanner?.heroBannerImage?.node?.sourceUrl;
  const heroMobile = heroBanner?.heroBannerImageMobile?.node?.sourceUrl;
  const enableHeroGradient = heroBanner?.enableHeroGradient || false;
  const templateSelection = contentTemplates?.templateSelection?.[0];
  const templateAContent = contentTemplates?.templateA;
  const templateCContent = contentTemplates?.templateC;
  const useDefaultImage = !heroDesktop;
  const desktopImageUrl = heroDesktop;
  const mobileImageUrl = heroMobile ;
  return (
    <Layout
      siteTitle={contentQuery.page.seo?.title || title}
      siteDescription={contentQuery.page.seo?.description || siteDescription}
      metaD={{
        titleTag: contentQuery.page.seo?.title || metaD?.titleTag,
        metaDescription: contentQuery.page.seo?.description || metaD?.metaDescription,
        canonicalUrl: contentQuery.page.seo?.canonicalUrl || undefined
      }}
      schemaMarkup={seomarkup?.schemaMarkup}
    >
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          desktopImageUrl={desktopImageUrl}
          mobileImageUrl={mobileImageUrl}
          useDefaultImage={useDefaultImage}
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading={title}
          enableHeroGradient={enableHeroGradient}
        />
      </div>
      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          parentPage ? { label: parentPage.title, link: parentPage.uri } : null,
          { label: title }
        ].filter(Boolean)}
      />
      {/* Breadcrumb End */}
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
                  return <Section3a key={index} data={layout} columnSelection={layout.columnSelection[0]} imageSource={layout.cardImage?.node?.sourceUrl} cardIcon={layout.cardIcon?.node?.sourceUrl} />;
                case "ContentTemplatesTemplateASection4aLayout":
                  return <Section4a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection5aLayout":
                  return <Section5a key={index} data={layout} />;
                case "ContentTemplatesTemplateASection6aTestimonialsLayout":
                  return <Section6a key={index} data={layout} />;
                case "ContentTemplatesTemplateAHubspotFormLayout":
                  return <HubSpotForm key={index} data={layout} />;
                case "ContentTemplatesTemplateASection7aAccordionLayout":
                  return <Section7a key={index} data={layout} />;
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
