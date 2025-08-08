import InnerPageBanner from "@/components/common/inner-page-banner";
import DoctorSearchResults from "@/components/find-doc/doctor-search-result";
import DocSearchForm from "@/components/find-doc/search-form";
import Layout from "@/components/Layout";

export default function FindDoctor() {
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-findDoc-landing-banner"
          MobileBanner="bg-findDoc-landing-banner-mobile"
          heading="Find a Doctor"
        />
        {/* Inner Page Banner End */}

        {/* Doc Search Form Start*/}
        <DocSearchForm />
        {/* Doc. Search Form End */}

        {/* Doctor Search Result */}
        <DoctorSearchResults />
        {/* Doctor Search Result */}
      </div>
    </Layout>
  );
}
