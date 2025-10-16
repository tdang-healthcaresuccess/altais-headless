import Head from "next/head";
import Layout from "@/components/Layout";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { GET_FRONT_PAGE_CONTENT } from "../queries/FrontPageQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LandingBanner from "@/components/front-page/landing-banner";
import RibbonBanner from "@/components/front-page/ribbon-banner";
import ContactJourney from "@/components/common/contact-journey";
import CounterCondition from "@/components/front-page/counter-condition";
import OurServices from "@/components/common/our-services";
import OurResources from "@/components/front-page/our-resources";
import SearchDoctor from "@/components/front-page/search-doctor";

const ContactSummaryDescription =
  "Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care.";
export default function FrontPage(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};
  const frontPageDataQuery = useQuery(GET_FRONT_PAGE_CONTENT) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const frontPageData = frontPageDataQuery?.data?.contentNode || {};
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <Layout
      metaD={{
        titleTag: siteTitle || "Altais: Shaping the Future of Healthcare",
        metaDescription: siteDescription || "Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today.",
      }}
    >
      <main className="block">
        {/* Landing Page Banner Start */}
        <LandingBanner frontPageData={frontPageData} />
        {/* Landing Page Banner End */}

        {/* Search Doctor Start */}
        <SearchDoctor frontPageData={frontPageData} />
        {/* Search Doctor End */}

        {/* Our Resources Start */}
        <OurResources frontPageData={frontPageData} />
        {/* Our Resources End */}

        {/* Ribbon Banner Start */}
        <RibbonBanner frontPageData={frontPageData} />
        {/* Ribbon Banner End */}

        {/* Our Services Start */}
        <OurServices frontPageData={frontPageData} />
        {/* Our Services End */}

        {/* Counter Condition Start */}
        <CounterCondition frontPageData={frontPageData} />
        {/* Counter Condition End */}

        {/* Lets Redefine Start */}
        <ContactJourney
          heading="Let's Redefine"
          subheading="What Care Feels Like"
          description={ContactSummaryDescription}
          linkUrl={"/find-care/"}
        />
        {/* Lets Redefine End */}
      </main>
    </Layout>
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
  {
    query: GET_FRONT_PAGE_CONTENT,
  },
];
