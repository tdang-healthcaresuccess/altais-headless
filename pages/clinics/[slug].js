import LocationInfo from "@/components/clinics/location-info";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";
import SimpleContent from "@/components/common/simple-content";
import Layout from "@/components/Layout";
import MediaBanner from "@/public/media/clinic/banner-2.png"

export default function ClinicSingleDetails() {
    const InfoContent = "We’re excited to announce the opening of our new clinic in Monterey County, conveniently located in the Salinas community. At Altais Medical Group Salinas, we provide top-tier healthcare services to all community members, including eligible staff and dependents of MCSIG (Municipalities Colleges Schools Insurance Group) and CVT (California’s Valued Trust). Our clinic offers a wide variety of medical services tailored to meet your needs."
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
        <SimpleContent media={true} banner={MediaBanner} content={InfoContent} />
        {/* Simple Content Area End */}

        {/* Location Info Start */}
        <LocationInfo />
        {/* Location Info End */}

      </div>
    </Layout>
  );
}
