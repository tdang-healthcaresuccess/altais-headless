import { getNextStaticProps } from "@faustwp/core";
import { useQuery } from "@apollo/client";
import { LEADERSHIP_QUERY } from "../queries/LeadershipQuery";
import Layout from "@/components/Layout";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Breadcrumb from "@/components/common/breadcrumb";
import { useState } from "react";
import Image from "next/image";
import CollapseIcon from "@/public/icons/collapse.png";
import ExpandIcon from "@/public/icons/expand.png";
import LeadershipEmpty from "@/public/icons/leadership_empty.png";
import ContactJourney from "@/components/common/contact-journey";
export default function ArchiveLeadership(props) {
  const [expandedId, setExpandedId] = useState(null);
  
  // Loading state
  if (props.loading) {
    return <>Loading...</>;
  }

  const { data } = useQuery(LEADERSHIP_QUERY);
  const leadershipList = data?.leadership?.nodes || [];
  const leadershipSettings = data?.leadershipSettings?.leadershipOptions || {};
  
  const {
    leadershipFeatureImage,
    leadershipIntro,
    leadershipIntroImage,
    executiveIntro
  } = leadershipSettings;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout
      siteTitle="Leadership | Altais"
      siteDescription="Meet our leadership team"
      
    >
      {/* Inner Page Banner - Using leadershipFeatureImage if available */}
      <InnerPageBanner
        heading="Leadership"
        desktopImageUrl={leadershipFeatureImage?.node?.sourceUrl}
        mobileImageUrl={leadershipFeatureImage?.node?.sourceUrl}
        useDefaultImage={!leadershipFeatureImage?.node?.sourceUrl}
        DesktopBanner="bg-services-landing-banner"
        MobileBanner="bg-services-landing-banner-mobile"
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "About", link: "/about" },
          { label: "Leadership at Altais" }
        ]}
      />

      {/* Main Content */}
      <main className="block">
        {/* Leadership Intro Section with Shadow */}
        {(leadershipIntroImage || leadershipIntro) && (
          <section 
            className="py-12" 
            style={{ boxShadow: '0px 2px 3px 1px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="container mx-auto">
              <div className="leadership-intro-section flex flex-col md:flex-row gap-6">
                {/* Intro Image - Left Side */}
                {leadershipIntroImage?.node?.sourceUrl && (
                  <div className="w-full md:w-auto flex-shrink-0">
                    <Image
                      src={leadershipIntroImage.node.sourceUrl}
                      alt="Leadership Introduction"
                      width={360}
                      height={292}
                      className="w-full md:w-auto h-auto object-cover"
                    />
                  </div>
                )}
                
                {/* Intro Text - Right Side */}
                {leadershipIntro && (
                  <div className={`flex-grow ${leadershipIntroImage ? '' : 'w-full'}`}>
                    <div 
                      className="prose max-w-none text-[#3D3D3D] text-lg font-normal leading-8 [&>p]:text-[#3D3D3D] [&>p]:text-lg [&>p]:font-normal [&>p]:leading-8 [&_strong]:text-[#083D78] [&_strong]:font-bold [&_b]:text-[#083D78] [&_b]:font-bold"
                      dangerouslySetInnerHTML={{ __html: leadershipIntro }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Leadership Accordion Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <h3 
              className="text-center text-[32px] font-medium leading-8 mb-8"
              style={{ color: '#083D78' }}
            >
              Executive Leadership
            </h3>
            
            {/* Executive Intro */}
            {executiveIntro && (
              <div className="mb-12">
                <div 
                  className="text-center prose max-w-none text-[#3D3D3D] text-lg font-normal leading-8 [&>p]:text-[#3D3D3D] [&>p]:text-lg [&>p]:font-normal [&>p]:leading-8 [&_strong]:text-[#083D78] [&_strong]:font-bold [&_b]:text-[#083D78] [&_b]:font-bold"
                  dangerouslySetInnerHTML={{ __html: executiveIntro }}
                />
                {/* Separator Line */}
                <div className="border-b border-[#008889] mt-8" />
              </div>
            )}
            
            {/* Leadership Accordion */}
            <div className="leadership-accordion">
            {leadershipList.map((leader) => {
              const isExpanded = expandedId === leader.id;
              const featuredImage = leader.featuredImage?.node?.sourceUrl;
              const leaderTitle = leader.title;
              const acfTitle = leader.leadership?.title;
              const quote = leader.leadership?.quote;
              const content = leader.content;

              return (
                <div key={leader.id} className="leadership-item">
                  {/* Collapsed View */}
                  <div 
                    className="leadership-header flex items-center py-6 cursor-pointer"
                    onClick={() => toggleExpand(leader.id)}
                  >
                    {/* Feature Image - Circular */}
                    <div className="flex-shrink-0" style={{ marginRight: '20px' }}>
                      <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={featuredImage || LeadershipEmpty}
                          alt={leaderTitle}
                          width={100}
                          height={100}
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>

                    {/* Title and ACF Title */}
                    <div className="flex-grow">
                      <h3 
                        className="text-[22px] font-medium leading-8"
                        style={{ color: '#083D78' }}
                      >
                        {leaderTitle}
                      </h3>
                      {acfTitle && (
                        <p 
                          className="text-base font-medium leading-normal mt-1"
                          style={{ color: '#008889' }}
                        >
                          {acfTitle}
                        </p>
                      )}
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div className="flex-shrink-0 ml-6">
                      <Image
                        src={isExpanded ? CollapseIcon : ExpandIcon}
                        alt={isExpanded ? "Collapse" : "Expand"}
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isExpanded && (
                    <div className="leadership-content flex flex-col md:flex-row md:items-start pb-6 gap-6">
                      {/* Quote - Left Side with Border */}
                      {quote && (
                        <div 
                          className="w-full md:w-72 md:flex-shrink-0 pb-6 md:pb-0 sm:border-b-2 md:border-b-0"
                          style={{ borderColor: '#C75327' }}
                        >
                          <blockquote 
                            className="text-lg italic font-medium"
                            style={{ color: '#083D78', lineHeight: '30px' }}
                          >
                            "{quote}"
                          </blockquote>
                        </div>
                      )}

                      {/* Content - Right Side */}
                      <div 
                        className="flex-grow"
                        style={quote ? { 
                          borderTop: '2px solid #C75327',
                          paddingTop: '24px'
                        } : {}}
                      >
                        <style jsx>{`
                          @media (min-width: 768px) {
                            .flex-grow {
                              border-top: none !important;
                              padding-top: 0 !important;
                              border-left: 2px solid #C75327;
                              padding-left: 20px;
                            }
                          }
                        `}</style>
                        <div 
                          className="prose max-w-none [&>p]:text-base [&>p]:font-normal [&>p]:leading-8"
                          style={{ color: '#3D3D3D', fontSize: '16px', fontWeight: 400, lineHeight: '32px' }}
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Separator Line */}
                  <div className="border-b border-[#008889]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
       {/* Lets Redefine Start */}
              <ContactJourney
                heading="Let's Redefine"
                subheading="What Care Feels Like"
                description="Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care."
              />
              {/* Lets Redefine End */}
    </main>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: ArchiveLeadership,
    revalidate: 60,
  });
}

ArchiveLeadership.queries = [
  {
    query: LEADERSHIP_QUERY,
  },
];
