import Head from "next/head";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ChevronRight } from "lucide-react";
import LandingBanner from "@/components/front-page/landing-banner";
import RibbonBanner from "@/components/front-page/ribbon-banner";
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

        {/* Lets Redefine */}
        <section className="block bg-[#d9d9d926] shadow-[inset_0px_2px_4px_0px_#3D3D3D] pt-13 md:pt-14 pb-19 md:pb-15 px-4 md:px-0">
          <div className="container mx-auto">
            <div className="block md:grid grid-cols-[1fr_auto_1fr] items-start">
              {/* Left Column */}
              <div className="flex justify-center md:justify-end">
                <h3 className="flex flex-col font-light text-center md:text-left max-w-[250px] text-[#083D78]">
                  <b>Let’s Redefine</b> What Care Feels Like
                </h3>
              </div>

              {/* Vertical Separator */}
              <div className="w-full md:w-[1px] h-[1px] md:h-[155px] bg-[#008889] my-6 md:my-0 max-0 md:mx-10"></div>

              {/* Right Column */}
              <div className="block max-w-[540px]">
                <p className="text-[#3D3D3D] text-lg font-normal text-center md:text-left">
                  Wherever you are in your health journey, Altais connects you
                  to the care you deserve — delivered by doctors who listen to
                  provide personalized care.
                </p>
                <button className="btn-gradient btn-sm flex-center gap-1 mt-8">
                  Find Care{" "}
                  <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </section>
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
