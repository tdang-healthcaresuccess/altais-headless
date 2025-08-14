import DocAvailability from "@/components/clinics/doc-availability";
import LocationInfo from "@/components/clinics/location-info";
import Breadcrumb from "@/components/common/breadcrumb";
import HeadlineContent from "@/components/common/headline-content";
import InnerPageBanner from "@/components/common/inner-page-banner";
import SimpleContent from "@/components/common/simple-content";
import Layout from "@/components/Layout";
import MediaBanner from "@/public/media/clinic/banner-2.png";

export default function ClinicSingleDetails() {
  const InfoContent =
    "We’re excited to announce the opening of our new clinic in Monterey County, conveniently located in the Salinas community. At Altais Medical Group Salinas, we provide top-tier healthcare services to all community members, including eligible staff and dependents of MCSIG (Municipalities Colleges Schools Insurance Group) and CVT (California’s Valued Trust). Our clinic offers a wide variety of medical services tailored to meet your needs.";
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-clinics-landing-banner"
          MobileBanner="bg-clinics-landing-banner-mobile"
          heading="Altais Medical Group Salinas"
        />
        {/* Inner Page Banner End */}

        {/* Breadcrumb Start */}
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Our Clinics", link: "/clinics" },
            { label: "Altais Medical Group Salinas" },
          ]}
        />
        {/* Breadcrumb End */}

        {/* Simple Content Area Start */}
        <SimpleContent
          media={true}
          banner={MediaBanner}
          content={InfoContent}
        />
        {/* Simple Content Area End */}

        {/* Location Info Start */}
        <LocationInfo />
        {/* Location Info End */}

        {/* Headline Content Start */}
        <HeadlineContent
          headline="Practice physicians"
          content="Our physicians are passionate about primary care and treating you as a person, not just a diagnosis. We think about your health comprehensively and partner with you to help you reach and maintain your optimal wellness."
        />
        {/* Headline Content End */}

        {/* Doctor Availability on Specific Location Start */}
        <DocAvailability />
        {/* Doctor Availability on Specific Location End */}
        
      </div>
    </Layout>
  );
}
