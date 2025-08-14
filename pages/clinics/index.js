import ClinicsList from "@/components/clinics/clinics-list";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";
import SimpleContent from "@/components/common/simple-content";
import Layout from "@/components/Layout";



export default function OurClinics() {
  const InfoContent =
    "Altais Medical Group physicians care for patients with conditions from common illnesses to chronic conditions. But primary care isn’t just for when you’re sick — we’re also here to help you prevent illness and maintain your best health.";
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-clinics-landing-banner"
          MobileBanner="bg-clinics-landing-banner-mobile"
          heading="Our Clinics"
        />
        {/* Inner Page Banner End */}

        {/* Breadcrumb Start */}
        <Breadcrumb
          items={[{ label: "Home", link: "/" }, { label: "Our Clinics" }]}
        />
        {/* Breadcrumb End */}

        {/* Simple Content Start */}
        <SimpleContent content={InfoContent} />
        {/* Simple Content End */}

        {/* Clinics List Start */}
        <ClinicsList />
        {/* Clinics List End */}
      </div>
    </Layout>
  );
}
