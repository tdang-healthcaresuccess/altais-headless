import Section1a from "@/components/acf/Section1a";
import Section2a from "@/components/acf/Section2a";
import Section3a from "@/components/acf/Section3a";
import Section4a from "@/components/acf/Section4a";
import Section5a from "@/components/acf/Section5a";
import Breadcrumb from "@/components/common/breadcrumb";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";
import { PAGE_QUERY } from "@/wp-templates/pageQuery";
import { useQuery } from "@apollo/client";

export default function TemplateA() {
  const { loading, error, data } = useQuery(PAGE_QUERY, {
    variables: { databaseId: "/template-a", idType: "URI", asPreview: false },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const page = data?.page;
  const templateSelection = page?.contentTemplates?.templateSelection;
  const templateAContent = page?.contentTemplates?.templateA;
  console.log(templateSelection);
  
  return (
    <Layout>
      <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-services-landing-banner"
          MobileBanner="bg-services-landing-banner-mobile"
          heading="H1: Lorem ipsum dolor sit amet consectetur"
        />
      </div>

      {/* Breadcrumb Start */}
      <Breadcrumb
        items={[{ label: "Home", link: "/" }, { label: "Template A" }]}
      />
      {/* Breadcrumb End */}

      {/* Template A Start */}
      {templateSelection === "Template 1A" && templateAContent && (
        <div className="acf-flexible-content">
          {/* Iterate through templateA layouts */}
          {templateAContent.map((layout, index) => {
            const fieldGroupName = layout.fieldGroupName;
            // Render components based on fieldGroupName
            switch (fieldGroupName) {
              case "ContentTemplatesTemplateASection1aLayout":
                return <Section1a key={index} data={layout} />;
              case "ContentTemplatesTemplateASection2aLayout":
                return <Section2a key={index} data={layout} />;
              case "ContentTemplatesTemplateASection3aLayout":
                return <Section3a key={index} data={layout} />;
              case "ContentTemplatesTemplateASection4aLayout":
                return <Section4a key={index} data={layout} />;
              case "ContentTemplatesTemplateASection5aLayout":
                return <Section5a key={index} data={layout} />;
              default:
                return null;
            }
          })}
        </div>
      )}
      {/* Template A End */}
    </Layout>
  );
}
