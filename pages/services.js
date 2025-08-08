import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import OurServices from "@/components/services-page/our-services";
import ContactJourney from "@/components//services-page/contact-journey";
import HeroJourney from "@/components/services-page/hero-journey";
import SearchServices from "@/components/services-page/search-services";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
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
        <HeroJourney />
        {/* Hero Journey End */}

        {/* Search Services Start */}
        <SearchServices />
        {/* Search Services End */}

        {/* Our Services Start */}
        <OurServices />
        {/* Our Services End */}

        {/* Lets Redefine Start */}
        <ContactJourney />
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
