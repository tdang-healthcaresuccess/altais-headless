import AltaisNetwork from "@/components/about/altais-network";
import CounterProvider from "@/components/about/counter-provider";
import MeetOurTeam from "@/components/about/meet-our-team";
import OurValues from "@/components/about/our-values";
import VisionMission from "@/components/about/vision-mission";
import ContactJourney from "@/components/common/contact-journey";
import HeroJourney from "@/components/common/hero-journey";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

export default function AboutUs() {
  const ContactSummaryDescription =
    "Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care.";
  const HeroJourneyDescription =
    "At Altais, we believe high-quality care starts by supporting the people who deliver it. That’s why we’re building a new kind of healthcare experience — one where physicians are empowered and patients feel truly cared for.";
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-about-landing-banner"
          MobileBanner="bg-about-landing-banner-mobile"
          heading="Shaping the future of healthcare."
        />
        {/* Inner Page Banner End */}

        {/* About Us Short Info Start */}
        <HeroJourney
          heading="Learn More About"
          heading2="Altais"
          description={HeroJourneyDescription}
        />
        {/* About Us Short Info End */}

        {/* Counter Provider Start */}
        <CounterProvider />
        {/* Counter Provider End */}

        {/* Vision Mission Start */}
        <VisionMission />
        {/* Vision Mission End */}

        {/* Our Values Start */}
        <OurValues />
        {/* Our Values End */}

        {/* Meet Our Team Start */}
        <MeetOurTeam />
        {/* Meet Our Team End */}

        {/* Altais Network Start */}
        <AltaisNetwork />
        {/* Altais Network End */}

        {/* Lets Redefine Start */}
        <ContactJourney
          heading="Let's Redefine"
          subheading="What Care Feels Like"
          description={ContactSummaryDescription}
        />
        {/* Lets Redefine End */}
      </div>
    </Layout>
  );
}
