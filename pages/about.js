import AltaisNetwork from "@/components/about/altais-network";
import CounterProvider from "@/components/about/counter-provider";
import MeetOurTeam from "@/components/about/meet-our-team";
import OurValues from "@/components/about/our-values";
import VisionMission from "@/components/about/vision-mission";
import ContactJourney from "@/components/common/contact-journey";
import HeroJourney from "@/components/common/hero-journey";
import InnerPageBanner from "@/components/common/inner-page-banner";
import Layout from "@/components/Layout";

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
  const ContactSummaryDescription =
    "Wherever you are in your health journey, Altais connects you to the care you deserve — delivered by doctors who listen to provide personalized care.";
  const HeroJourneyDescription =
    "At Altais, we believe high-quality care starts by supporting the people who deliver it. That’s why we’re building a new kind of healthcare experience — one where physicians are empowered and patients feel truly cared for.";
  return (
    <Layout schemaMarkup={schemaMarkup}>
  <div className="block">
        {/* Inner Page Banner start */}
        <InnerPageBanner
          DesktopBanner="bg-about-landing-banner"
          MobileBanner="bg-about-landing-banner-mobile"
          heading="Shaping the future of healthcare."
        />
        {/* Inner Page Banner End */}

        {/* About Us Short Info Start */}
        <HeroJourney
          heading="Learn More About"
          heading2="Altais"
          description={HeroJourneyDescription}
        />
        {/* About Us Short Info End */}

        {/* Counter Provider Start */}
        <CounterProvider />
        {/* Counter Provider End */}

        {/* Vision Mission Start */}
        <VisionMission />
        {/* Vision Mission End */}

        {/* Our Values Start */}
        <OurValues />
        {/* Our Values End */}

        {/* Meet Our Team Start */}
        <MeetOurTeam />
        {/* Meet Our Team End */}

        {/* Altais Network Start */}
        <AltaisNetwork />
        {/* Altais Network End */}

        {/* Lets Redefine Start */}
        <ContactJourney
          heading="Let's Redefine"
          subheading="What Care Feels Like"
          description={ContactSummaryDescription}
        />
        {/* Lets Redefine End */}
      </div>
    </Layout>
  );
}
