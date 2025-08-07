import AboutInfo from "@/components/about/about-info";
import AltaisNetwork from "@/components/about/altais-network";
import MeetOurTeam from "@/components/about/meet-our-team";
import VisionMission from "@/components/about/vision-mission";
import ContactJourney from "@/components/common/contact-journey";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

export default function AboutUs() {
  const ContactSummaryDescription =
    "Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care.";
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner heading="Shaping the future of healthcare." />
        {/* Inner Page Banner End */}

        {/* About Us Short Info Start */}
        <AboutInfo />
        {/* About Us Short Info End */}

        {/* Vision Mission Start */}
        <VisionMission />
        {/* Vision Mission End */}

        {/* Meet Our Team Start */}
        <MeetOurTeam />
        {/* Meet Our Team End */}

        {/* Altais Network Start */}
        <AltaisNetwork />
        {/* Altais Network End */}

        {/* Lets Redefine Start */}
        <ContactJourney
          heading="Let’s Redefine"
          subheading="What Care Feels Like"
          description={ContactSummaryDescription}
        />
        {/* Lets Redefine End */}
      </div>
    </Layout>
  );
}
