import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LandingBanner from "@/components/front-page/landing-banner";
import RibbonBanner from "@/components/front-page/ribbon-banner";
import ContactJourney from "@/components/front-page/contact-journey";
import CounterCondition from "@/components/front-page/counter-condition";
import OurServices from "@/components/front-page/our-services";
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
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header />

      <main className="block">
        {/* Landing Page Banner Start */}
        <LandingBanner />
        {/* Landing Page Banner End */}

        {/* Ribbon Banner Start */}
        <RibbonBanner />
        {/* Ribbon Banner End */}
        
        {/* Our Services Start */}
        <OurServices />
        {/* Our Services End */}

        {/* Counter Condition Start */}
        <CounterCondition />
        {/* Counter Condition End */}

        {/* Lets Redefine Start */}
        <ContactJourney />
        {/* Lets Redefine End */}
      </main>

      <Footer />
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
