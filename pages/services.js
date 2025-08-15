import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import SearchServices from "@/components/common/search-services";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
import ContactJourney from "@/components/common/contact-journey";
import HeroJourney from "@/components/common/hero-journey";
import OurServices from "@/components/common/our-services";
export default function FrontPage(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;

  const ContactSummaryDescription = "From preventive checkups to specialty support, our network of healthcare providers delivers high-quality, compassionate care tailored to your life — wherever it leads."

  const HeroJourneyDescription = "With more than 10K highly skilled professionals dedicated to delivering high-quality care with compassion, Altais is ready to honor every healthcare journey."

  return (
    <>
      <Layout>
        {/* Landing Page Banner Start */}
        <InnerPageBanner
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading="Compassionate, Affordable Care"
        />
        {/* Landing Page Banner End */}

        {/* Hero Journey Start */}
        <HeroJourney heading="Our Patient Services" heading2={false} description={HeroJourneyDescription} />
        {/* Hero Journey End */}

        {/* Search Services Start */}
        <SearchServices />
        {/* Search Services End */}

        {/* Our Services Start */}
        <OurServices hideViewAll={false} />
        {/* Our Services End */}

        {/* Lets Redefine Start */}
  <ContactJourney heading="Care That Covers" subheading="the Whole You" description={ContactSummaryDescription} linkUrl={"/find-care"} />
        {/* Lets Redefine End */}
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: FrontPage,
    revalidate: 60,
  });
}

FrontPage.queries = [
  {
    query: SITE_DATA_QUERY,
  },
  {
    query: HEADER_MENU_QUERY,
  },
];
