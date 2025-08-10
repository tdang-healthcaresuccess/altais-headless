import InnerPageBanner from "@/components/common/inner-page-banner";
import DoctorSearchResults from "@/components/find-doc/doctor-search-result";
import DocSearchForm from "@/components/find-doc/search-form";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function FindDoctor() {
  const [showLayoutGrid, setShowLayoutGrid] = useState(false);
  const handleToggleLayout = () => setShowLayoutGrid(!showLayoutGrid);
  const [activeLayout, setActiveLayout] = useState("grid");
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
        <DocSearchForm activeLayout={activeLayout} setActiveLayout={setActiveLayout} handleToggleLayout={handleToggleLayout} showLayoutGrid={showLayoutGrid} setShowLayoutGrid={setShowLayoutGrid} />
        {/* Doc. Search Form End */}

        {/* Doctor Search Result */}
        <DoctorSearchResults activeLayout={activeLayout} />
        {/* Doctor Search Result */}
      </div>
    </Layout>
  );
}
