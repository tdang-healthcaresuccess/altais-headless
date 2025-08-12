import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

export default function ForPatients() {
  
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-resources-landing-banner"
          MobileBanner="bg-resources-landing-banner-mobile"
          heading="Accepted Health Insurance Plans at Altais"
        />
        {/* Inner Page Banner End */}

      </div>
    </Layout>
  );
}
