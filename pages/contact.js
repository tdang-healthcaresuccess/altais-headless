import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

export default function AboutUs() {
  
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-contact-landing-banner"
          MobileBanner="bg-contact-landing-banner-mobile"
          heading="We’re Here to"
          heading2="Help"
        />
        {/* Inner Page Banner End */}

      </div>
    </Layout>
  );
}
