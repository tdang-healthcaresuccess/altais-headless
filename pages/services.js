import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import SearchServices from "@/components/common/search-services";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
import ContactJourney from "@/components/common/contact-journey";
import HeroJourney from "@/components/common/hero-journey";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServicesMedia1 from "@/public/media/services-1.png";
import ServicesMedia2 from "@/public/media/services-2.png";
import ServicesMedia3 from "@/public/media/services-3.png";
import ServicesMedia4 from "@/public/media/services-4.png";
import ServicesMedia5 from "@/public/media/services-5.png";
import ServicesMedia6 from "@/public/media/services-6.png";
import ServicesMedia7 from "@/public/media/services-7.png";
import ServicesMedia8 from "@/public/media/services-8.jpg";
import ServicesMedia9 from "@/public/media/services-9.jpg";
import ServicesMedia10 from "@/public/media/services-10.jpg";
import ServicesMedia11 from "@/public/media/services-11.jpg";
import ServicesMedia12 from "@/public/media/services-12.jpg";
import ServicesMedia13 from "@/public/media/services-13.jpg";
import ServicesMedia14 from "@/public/media/services-14.jpg";

// Original hardcoded OurServices component
function OurServicesOriginal({ hideViewAll = true }) {
  return (
    <section className="block pt-12 md:pt-[75px] pb-[73px] md:pb-[95px] box-shadow-custom3">
      <div className="block container mx-auto">
        <div className="flex flex-wrap gap-10 items-stretch">
          <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia1}
                alt="primary care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
            <div className="block">
              <h3
                className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                id="primary-care"
              >
                Primary Care
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                Our primary care teams focus on prevention, early detection, and personalized care that evolves with your needs. 
              </p>
              </div>
              <Link
                href="/services/primary-care/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
           <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia7}
                alt="primary care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
            <div className="block">
              <h3
                className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                id="ob-gyn"
              >
                OB/GYN
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                From adolescence to menopause and beyond, our OB/GYN services support every stage of life with expert care that puts your comfort and choices first. 
              </p>
              </div>
              <Link
                href="/services/ob-gyn/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
                    <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia11}
                alt="mens health"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
            <div className="block">
              <h3
                className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                id="primary-care"
              >
                Men's Health
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                From preventive screenings to specialized care, our men's health services focus on your long-term wellness, performance, and quality of life.
              </p>
              </div>
              <Link
                href="/services/mens-health/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>

          {/* Services 1 */}
          <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia2}
                alt="Mental Health"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3
                  className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                  id="mental-health"
                >
                  Mental Health
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Access care that supports your mind and body. From individual counseling to psychiatry and care coordination, we're here to help you feel like yourself again. 
                </p>
              </div>
              <Link
                href="/services/mental-health/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px] relative top-[2px]" />
              </Link>
            </div>
          </div>
          {/* Services 2 */}
          <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia3}
                alt="Pediatrics"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3
                  className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                  id="pediatrics"
                >
                  Pediatrics
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Your child's health is in expert hands. Our pediatric providers offer age-appropriate care, guidance, and early intervention for every stage of development. 
                </p>
              </div>
              <Link
                href="/services/pediatric-care/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
          {/* Services 3 */}
          <div className="flex flex-col mb-5 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia4}
                alt="Senior Health Care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3
                  className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                  id="senior-health"
                >
                  Senior Health Care
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Aging well starts with the right care team. We offer compassionate, coordinated services that support healthy aging, chronic care management, and independence. 
                </p>
              </div>
              <Link
                href="/services/senior-health/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
                    {/* Urgent Care */}
          <div className="flex flex-col mb-5 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              <Image
                src={ServicesMedia6}
                alt="Urgent Care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3
                  className="text-[22px] leading-[32px] text-bluePrimary mb-3"
                  id="urgent-care"
                >
                  Urgent Care
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Receive quality urgent care when you need it most. We provide adult and pediatric urgent care services close to home.
                </p>
              </div>
              <Link
                href="/services/urgent-care/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
          {/* Coordinated Care */}
          <div className="flex flex-col mb-5 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              {/* Replace with appropriate image if available */}
              <Image
                src={ServicesMedia14}
                alt="Coordinated Care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3" id="coordinated-care">
                  Coordinated Care
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Our team works together across specialties to simplify your health journey, ensuring every provider is connected and your care plan stays on track.
                </p>
              </div>
              <Link
                href="/services/care-management/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>

          {/* Vaccinations */}
          <div className="flex flex-col mb-5 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-4 md:mb-6">
              {/* Replace with appropriate image if available */}
              <Image
                src={ServicesMedia9}
                alt="Vaccinations"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3" id="vaccinations">
                  Vaccinations
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Protect yourself and your loved ones with recommended vaccines. Our convenient services cover children, adults, and seniors at every stage of life.
                </p>
              </div>
              <Link
                href="/services/vaccinations/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>

          {/* Hospitals and Labs */}
          <div className="flex flex-col mb-5 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-0 md:mb-6">
              {/* Replace with appropriate image if available */}
              <Image
                src={ServicesMedia12}
                alt="Hospitals and Labs"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="block">
                <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3" id="hospitals-labs">
                  Hospitals and Labs
                </h3>
                <p className="text-lg leading-[32px] text-grey3d mb-7">
                  Seamless access to trusted hospitals and accredited labs ensures you get the care and testing you need, backed by accurate results and coordinated follow-up.
                </p>
              </div>
              <Link
                href="/services/hospitals-labs/"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-base"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>

        </div>
        {hideViewAll && (
          <div className="flex-center">
            <Link
              href="/services"
              className="btn-gradient btn-md flex-center gap-1 mt-0 md:mt-8 w-full md:w-[534px]"
            >
              See All Services{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

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

  const ContactSummaryDescription =
    "From preventive checkups to specialty support, our network of healthcare providers delivers high-quality, compassionate care tailored to your life — wherever it leads.";

  const HeroJourneyDescription =
    "With more than 10K highly skilled professionals dedicated to delivering high-quality care with compassion, Altais is ready to honor every healthcare journey.";

  return (
    <>
      <Layout
        siteTitle={"Supportive Patient-Centered Care | Altais Services"}
        siteDescription={
          "Altais offers a wide range of healthcare services in California, from primary care to senior care. Explore our services."
        }
      >
        {/* Landing Page Banner Start */}
        <InnerPageBanner
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading="Compassionate, Affordable Care"
        />
        {/* Landing Page Banner End */}

        {/* Hero Journey Start */}
        <HeroJourney
          heading="Our Patient Services"
          heading2={false}
          description={HeroJourneyDescription}
        />
        {/* Hero Journey End */}

        {/* Search Services Start */}
        <SearchServices />
        {/* Search Services End */}

        {/* Our Services Start - Using Original Hardcoded Content */}
        <OurServicesOriginal hideViewAll={false} />
        {/* Our Services End */}

        {/* Lets Redefine Start */}
        <ContactJourney
          heading="Care That Covers"
          subheading="the Whole You"
          description={ContactSummaryDescription}
          linkUrl={"/find-care"}
        />
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
