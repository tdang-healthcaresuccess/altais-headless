import { useQuery } from "@apollo/client";
import { GET_ABOUT_PAGE } from "@/queries/AboutQuery";
import AltaisNetwork from "@/components/about/altais-network";
import CounterProvider from "@/components/about/counter-provider";
import MeetOurTeam from "@/components/about/meet-our-team";
import OurValues from "@/components/about/our-values";
import ContactJourney from "@/components/common/contact-journey";
import HeroJourney from "@/components/common/hero-journey";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";
import styles from "@/styles/about.module.css";

const schemaMarkup = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "name": "Altais Healthcare",
      "description": "Altais is a physician-led healthcare provider network offering compassionate, affordable, and connected care across California. Find care today",
      "url": "https://altais.com/",
      "@id": "https://altais.com/#MedicalOrganization",
      "logo": "https://altais.com/_next/static/media/altais-logo.cdbbf984.svg",
      "telephone": "800-225-5637",
      "sameAs": [
        "https://www.linkedin.com/company/altaishealth/",
        "https://www.facebook.com/profile.php?id=100054693853136",
        "https://twitter.com/AltaisHealth",
        "https://www.linkedin.com/company/altaishealth/"
      ],
      "isAcceptingNewPatients": "True",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://altais.com/find-care?specialty={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Healthcare Delivery Network",
      "provider": {
        "@type": "MedicalOrganization",
        "name": "Altais Healthcare",
        "url": "https://altais.com/",
        "@id": "https://altais.com/#MedicalOrganization"
      },
      "areaServed": {
        "@type": "State",
        "name": "California"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Healthcare Delivery Network",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Find a Doctor",
            "url": "https://altais.com/find-care/",
            "@id": "https://altais.com/find-care/"
          },
          {
            "@type": "OfferCatalog",
            "name": "Patient Healthcare Services",
            "url": "https://altais.com/services/",
            "@id": "https://altais.com/services/",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Primary Care Services", "@id": "https://altais.com/services/primary-care/", "url": "https://altais.com/services/primary-care/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Urgent Care", "@id": "https://altais.com/services/urgent-care/", "url": "https://altais.com/services/urgent-care/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Seamless Hospital and Lab Services", "@id": "https://altais.com/services/hospitals-labs/", "url": "https://altais.com/services/hospitals-labs/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Comprehensive OB-GYN Services", "@id": "https://altais.com/services/ob-gyn/", "url": "https://altais.com/services/ob-gyn/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Men’s Health Services", "@id": "https://altais.com/services/mens-health/", "url": "https://altais.com/services/mens-health/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Mental Health Services", "@id": "https://altais.com/services/mental-health/", "url": "https://altais.com/services/mental-health/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Pediatric Care", "@id": "https://altais.com/services/pediatric-care/", "url": "https://altais.com/services/pediatric-care/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Whole-Person Senior Health Care", "@id": "https://altais.com/services/senior-health/", "url": "https://altais.com/services/senior-health/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Care Management", "@id": "https://altais.com/services/care-management/", "url": "https://altais.com/services/care-management/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Vaccination Services for All Ages", "@id": "https://altais.com/services/vaccinations/", "url": "https://altais.com/services/vaccinations/"}}
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Health Conditions Treated",
            "@id": "https://altais.com/conditions/",
            "url": "https://altais.com/conditions/",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Treating General Health Conditions", "@id": "https://altais.com/conditions/general/", "url": "https://altais.com/conditions/general/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Expert Care for Musculoskeletal Conditions", "@id": "https://altais.com/conditions/musculoskeletal/", "url": "https://altais.com/conditions/musculoskeletal/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Respiratory Conditions Treatments", "@id": "https://altais.com/conditions/respiratory/", "url": "https://altais.com/conditions/respiratory/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Personalized Care for Neurological Conditions", "@id": "https://altais.com/conditions/neurological/", "url": "https://altais.com/conditions/neurological/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Comprehensive Care for Endocrine and Metabolic Conditions", "@id": "https://altais.com/conditions/endocrine-metabolic/", "url": "https://altais.com/conditions/endocrine-metabolic/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Treatments for Cardiovascular Conditions", "@id": "https://altais.com/conditions/cardiovascular/", "url": "https://altais.com/conditions/cardiovascular/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": " Infectious Diseases Treatment", "@id": "https://altais.com/conditions/infectious-diseases/", "url": "https://altais.com/conditions/infectious-diseases/"}}
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Providers Partner",
            "@id": "https://altais.com/for-providers/",
            "url": "https://altais.com/for-providers/",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Provider Services and Solutions", "@id": "https://altais.com/for-providers/service-solutions/", "url": "https://altais.com/for-providers/service-solutions/"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Practice Administration & Support"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Revenue Cycle Management: Improve cash flow and simplify billing."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Practice Accounting Services: Financial tracking and reporting made easy."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "EHR Solutions & Integration: Seamless tools that enhance care coordination and documentation."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Practice Solutions & Enablement: Operational support to keep your practice running smoothly."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Data & Analytics: Actionable insights for population health and performance management."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "24/7 Nurse Line (After Hours): Around-the-clock support for your patients."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Chronic Care & Transitional Care Management: Coordinated programs to manage at-risk populations."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Remote Patient Monitoring: Stay connected with patients between visits."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Collaborative Care Program: Support for patients with mental health needs through integrated behavioral health."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Healthcare Technology Tools"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "EHR Integration & Support: Simplify workflows with systems that work the way you do."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Population Health Solutions: Identify care gaps and manage at-risk patients with robust analytics."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Patient Engagement Technology: Improve communication, adherence, and satisfaction."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Secure Provider & Patient Portals: Streamlined access for referrals, authorizations, lab results, and more."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Support at Every Stage"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Provider Onboarding & Credentialing: Reduce onboarding time and simplify contracting."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Consultative Services: Guidance to help your practice adapt to value-based care."}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Ongoing Tech & Administrative Support: Always-on assistance to keep your operations running smoothly."}}
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Value-Based Care Solutions for Providers & Partners",
            "@id": "https://altais.com/for-providers/service-solutions/value-based-care/",
            "url": "https://altais.com/for-providers/service-solutions/value-based-care/"
          },
          {
            "@type": "OfferCatalog",
            "name": "AMG Locations for Providers",
            "@id": "https://altais.com/for-providers/amg-locations/",
            "url": "https://altais.com/for-providers/amg-locations/"
          },
          {
            "@type": "OfferCatalog",
            "name": "Healthcare Partnerships",
            "alternateName": "B2B Services and Solutions for Payers and Strategic Partners",
            "@id": "https://altais.com/for-partners/",
            "url": "https://altais.com/for-partners/",
            "itemListElement": [
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Performance Analytics and Reporting"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Risk Adjustment and Quality Programs"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Care Delivery Network Enablement"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Population Health and Preventive Care Initiatives"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Proven Results in Value-Based Models"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Integrated Data and Technology Platforms"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Deep Provider Relationships"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Medicare Advantage and Medi-Cal Collaborations"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Solutions for Employers and Health Plans"}},
              {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Scalable Support for Health Systems"}}
            ]
          }
        ]
      }
    }
  ]
});

export default function AboutUs() {
  const { loading, error, data } = useQuery(GET_ABOUT_PAGE);

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('About Page Data:', data);
    console.log('About ACF:', data?.page?.about);
    console.log('Hero Banner:', data?.page?.heroBanner);
  }

  const acf = data?.page?.about || {};
  const heroBanner = data?.page?.heroBanner || {};

  // Fallback content object
  const content = {
    // Hero Banner
    heroDesktop: heroBanner?.heroBannerImage?.node?.sourceUrl || "/media/about-landing-banner.png",
    heroMobile: heroBanner?.heroBannerImageMobile?.node?.sourceUrl || "/media/about-landing-banner-mobile.png",
    heroHeading: "Shaping the future of healthcare.",
    
    // Section 1 - Hero Journey
    section1Headline: acf.section1Headline || "Learn More About Altais",
    section1Content: acf.section1Content || "At Altais, we believe high-quality care starts by supporting the people who deliver it. That's why we're building a new kind of healthcare experience — one where physicians are empowered and patients feel truly cared for.",
    
    // Section 2 - Counter/Stats + Vision/Mission (combined)
    tickerBoxes: acf.tickerBoxes?.length > 0 ? acf.tickerBoxes : [
      { tickerNumber: "100+", tickerHeadline: "Provider Specialties" },
      { tickerNumber: "15", tickerHeadline: "APG Elite Medical Group Awards" },
      { tickerNumber: "$2.8m", tickerHeadline: "2022–2023 ACO Performance Incentive Payments" },
      { tickerNumber: "65", tickerHeadline: "Member NPS(Brown & Toland)" },
      { tickerNumber: "83%", tickerHeadline: "Altais Employed Provider Engagement" },
      { tickerNumber: "+", tickerHeadline: "2021 Healthcare ACO Summit Award" },
    ],
    statBoxes: acf.statBoxes?.length > 0 ? acf.statBoxes : [
      { stateValues: "9", statHeadlines: "HMO Plans" },
      { stateValues: "17", statHeadlines: "PPO Plans" },
      { stateValues: "9", statHeadlines: "Medicare Plans" },
      { stateValues: "2", statHeadlines: "Medi-Cal Plans" },
      { stateValues: "30", statHeadlines: "Hospitals + Centers of Excellence" },
    ],
    section2Image: acf.section2Image?.node?.sourceUrl || "/media/vision-mission-media.png",
    section2Content: acf.section2Content || `<div class="block"><h4 class="text-[22px] leading-[32px] text-bluePrimary mb-2">Our Mission</h4><p class="text-[18px] leading-[32px] text-grey3d">To ignite an exceptional healthcare system that cultivates the health and well-being of physicians, patients, and the clinical community.</p></div><div class="w-full h-[1px] bg-lightPrimary my-12"></div><div class="block"><h4 class="text-[22px] leading-[32px] text-bluePrimary mb-2">Our Vision</h4><p class="text-[18px] leading-[32px] text-grey3d">We envision a future where every person receives exceptional care — led by supported physicians, connected by innovative technology, and rooted in trust, compassion, and community.</p></div>`,
    
    // Section 3 - Our Values (Cards)
    section3Headline: acf.section3Headline || "Our Values",
    section3Cards: acf.section3Cards?.length > 0 ? acf.section3Cards : [
      {
        iconImage: { node: { sourceUrl: "/media/values/1.png" } },
        cardTitle: "Compassion",
        cardContent: '<span class="font-medium text-primary">We act with empathy</span> and a deep respect for the challenges faced by physicians and their patients. Our work is driven by a genuine commitment to improving lives and ensuring that care is delivered with dignity, understanding, and humanity.'
      },
      {
        iconImage: { node: { sourceUrl: "/media/values/2.png" } },
        cardTitle: "Community",
        cardContent: '<span class="font-medium text-primary">We foster a culture of collaboration</span> with physicians, patients across the healthcare ecosystem, and among our teams. By building strong, trusted relationships, we create a unified community focused on advancing patient care and physician well-being.'
      },
      {
        iconImage: { node: { sourceUrl: "/media/values/3.png" } },
        cardTitle: "Leadership",
        cardContent: '<span class="font-medium text-primary">We lead with integrity and vision,</span> setting the standard for excellence in physician support and healthcare innovation. Through collaboration and expertise, we empower others to lead, drive change, and shape the future of care.'
      },
      {
        iconImage: { node: { sourceUrl: "/media/values/4.png" } },
        cardTitle: "Excellence",
        cardContent: '<span class="font-medium text-primary">We are relentlessly focused,</span> results-driven, and accountable for delivering measurable value to physicians and the patients they serve. Our high standards reflect our commitment to excellence, operational discipline, and continuous improvement.'
      },
      {
        iconImage: { node: { sourceUrl: "/media/values/5.png" } },
        cardTitle: "Agility",
        cardContent: '<span class="font-medium text-primary">We embrace change as a constant</span> and respond swiftly to the evolving needs of the healthcare industry. With flexibility and forward-thinking, we adapt, innovate, and act decisively to keep physicians at the forefront.'
      }
    ],
    
    // Section 4 - Meet Our Team
    section4Headline: acf.section4TitleBold || "Meet Our Leadership Team",
    section4SubHeadline: acf.section4SubHeadline || "",
    section4Content: "Discover the decision-makers behind Altais",
    section4ButtonText: acf.section4LinkText || "Meet Our Team",
    section4ButtonUrl: acf.section4LinkUrl?.url || "/about/leadership",
    section4ButtonTarget: acf.section4LinkUrl?.target || "_self",
    section4Image: acf.section4Image?.node?.sourceUrl,
    
    // Section 5 - Altais Network
    section5SubHeadline: acf.section5SubHeadline || "The Altais Network",
    section5Headline: acf.section5Headline || "A Network Bringing High-quality and Affordable Care to All",
    section5Content: acf.section5Content || "<p class=\"mb-8\">Altais is more than a single organization — we are a growing network of physician-led medical groups, independent practice associations, and care delivery partners working together to raise the standard of care.</p><p class=\"mb-8\">Across our network, we support doctors with the tools, services, and technology they need to deliver compassionate, connected care — from primary care and preventive services to specialty and complex care</p><p class=\"mb-8\">Together, we're creating a more sustainable and people-centered healthcare experience — one that's built on trusted relationships, clinical excellence, and a deep commitment to the communities we serve.</p>",
    section5ButtonText: acf.section5ButtonText || "Explore the Altais Network",
    section5ButtonUrl: acf.section5ButtonUrl?.url || "/#",
    section5ButtonTarget: acf.section5ButtonUrl?.target || "_self",
    section5Image: acf.section5Image?.node?.sourceUrl || "/media/altais-network.png",
    
    // Contact Journey
    contactHeading: "Let's Redefine",
    contactSubheading: "What Care Feels Like",
    contactDescription: "Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care."
  };

  const ContactSummaryDescription =
    "Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care.";
  const HeroJourneyDescription =
    "At Altais, we believe high-quality care starts by supporting the people who deliver it. That's why we're building a new kind of healthcare experience — one where physicians are empowered and patients feel truly cared for.";

  if (loading) return <Layout><div className="container mx-auto py-20 text-center">Loading...</div></Layout>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <Layout><div className="container mx-auto py-20 text-center">Error loading page data</div></Layout>;
  }

  // Split headline safely
  const headlineParts = content.section1Headline.split(' ');
  const headlineFirstPart = headlineParts.slice(0, -1).join(' ');
  const headlineLastWord = headlineParts.slice(-1)[0];

  return (
    <Layout schemaMarkup={schemaMarkup}>
  <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          heading={content.heroHeading}
          desktopImageUrl={content.heroDesktop}
          mobileImageUrl={content.heroMobile}
          useDefaultImage={false}
        />
        {/* Inner Page Banner End */}

        {/* About Us Short Info Start - Section 1 */}
        <HeroJourney
          heading={headlineFirstPart}
          heading2={headlineLastWord}
          description={content.section1Content}
        />
        {/* About Us Short Info End */}

        {/* Counter Provider + Vision Mission Start - Section 2 */}
        <CounterProvider 
          tickerBoxes={content.tickerBoxes}
          statBoxes={content.statBoxes}
          visionMissionImage={content.section2Image}
          visionMissionContent={content.section2Content}
        />
        {/* Counter Provider + Vision Mission End */}

        {/* Our Values Start - Section 3 */}
        <OurValues 
          headline={content.section3Headline}
          cards={content.section3Cards}
        />
        {/* Our Values End */}

        {/* Meet Our Team Start - Section 4 */}
        <MeetOurTeam 
          headline={content.section4Headline}
          content={content.section4Content}
          buttonText={content.section4ButtonText}
          buttonUrl={content.section4ButtonUrl}
          buttonTarget={content.section4ButtonTarget}
          image={content.section4Image}
        />
        {/* Meet Our Team End */}

        {/* Altais Network Start - Section 5 */}
        <AltaisNetwork 
          subHeadline={content.section5SubHeadline}
          headline={content.section5Headline}
          content={content.section5Content}
          buttonText={content.section5ButtonText}
          buttonUrl={content.section5ButtonUrl}
          buttonTarget={content.section5ButtonTarget}
          image={content.section5Image}
        />
        {/* Altais Network End */}

        {/* Lets Redefine Start */}
        <ContactJourney
          heading={content.contactHeading}
          subheading={content.contactSubheading}
          description={content.contactDescription}
        />
        {/* Lets Redefine End */}
      </div>
    </Layout>
  );
}
