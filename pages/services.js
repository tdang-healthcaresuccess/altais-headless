import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/Banner";
import OurServices from "@/components/services-page/our-services";
import ContactJourney from "@/components//services-page/contact-journey";
import HeroJourney from "@/components/services-page/hero-journey";
import SearchServices from "@/components/services-page/search-services";
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
        <link srel="stylesheet"href="https://use.typekit.net/uoi7ptf.css" />
      </Head>

      <Header
        menuItems={menuItems}
      />
      
      <main className="block">
        {/* Landing Page Banner Start */}
        <Banner />
        {/* Landing Page Banner End */}

       <HeroJourney />
       <SearchServices />
        {/* Our Services Start */}
        <OurServices />
        {/* Our Services End */}

      </main>
             {/* Lets Redefine Start */}
        <ContactJourney />
        {/* Lets Redefine End */}
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
