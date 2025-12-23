import InnerPageBanner from "@/components/common/inner-page-banner";
import LayoutLp from "@/components/LayoutLp";
import { clsx } from "clsx";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";
import { useQuery } from "@apollo/client";
import { GET_MEDICARE_PAGE } from "@/queries/MedicareQuery";
import styles from "@/styles/medicare.module.css";

export default function ForProviders() {
  // Fetch ACF data
  const { loading, error, data } = useQuery(GET_MEDICARE_PAGE);

  // Reusable styles for Stay Healthy section
  const stayHealthyStyles = {
    heading: {
      color: '#FFF',
      fontSize: '40px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '50px'
    },
    text: {
      color: '#FFF',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '32px'
    },
    bullet: {
      color: '#84D0D2',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '32px'
    },
    button: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '24px',
      letterSpacing: '1px'
    }
  };

  // Styles for Learn More section
  const learnMoreStyles = {
    bullet: {
      color: '#008889',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '32px'
    },
    text: {
      color: '#083D78',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '32px'
    },
    button: {
      borderRadius: '5px',
      border: '1px solid #008889',
      color: '#008889',
      textAlign: 'center',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: '24px',
      letterSpacing: '1px',
      backgroundColor: 'transparent',
      padding: '12px 12px',
      cursor: 'pointer'
    }
  };

  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by rendering nothing or a fallback
    return null;
  }

  if (loading) return <LayoutLp><div className="container mx-auto py-20 text-center">Loading...</div></LayoutLp>;
  if (error) return <LayoutLp><div className="container mx-auto py-20 text-center">Error loading page</div></LayoutLp>;

  const acf = data?.medicareLandingPage?.medicare || {};

  // Fallback content
  const content = {
    heroHeadline: acf.heroHeadline || "Medicare Open Enrollment is October 15th to December 7th",
    heroImage: acf.heroImage?.node?.sourceUrl || '/media/landing-page/medicare.png',
    heroImageMobile: acf.heroImageMobile?.node?.sourceUrl || '/media/landing-page/medicare_mobile.png',
    
    section1Headline: acf.section1Headline || "Your Medicare Journey Starts Here",
    section1Bullets: acf.section1Bullets?.length > 0 ? acf.section1Bullets : [
      { bulletText: "Annual Enrollment Period Opens:<br /> October 15, 2025" },
      { bulletText: "Annual Enrollment Period Closes: <br />December 7, 2025" },
      { bulletText: "Benefits Begin:<br /> January 1, 2026" }
    ],
    section1StepHeadline: acf.section1StepHeadline || "3 Easy Steps with Altais",
    stepBoxes: acf.stepBoxes?.length > 0 ? acf.stepBoxes : [
      { stepBoxText: '<span class="text-white text-lg md:text-xl font-medium text-center">Find a doctor you can trust</span>', stepBoxUrl: { url: '/find-care', target: '_self' } },
      { stepBoxText: '<span class="text-white text-lg md:text-xl font-medium text-center">RSVP for an upcoming event</span>', stepBoxUrl: { url: '#rsvp-events', target: '_self' } },
      { stepBoxText: '<span class="text-white text-lg md:text-xl font-medium text-center">Explore resources on Medicare.gov</span>', stepBoxUrl: { url: 'https://www.medicare.gov', target: '_blank' } }
    ],
    
    section2Headline: acf.section2Headline || "Understanding Medicare, One Step at a Time",
    section2SubHeadline: acf.section2SubHeadline || "Medicare can feel overwhelming—but it doesn't have to be. Here's a quick look at the basics:",
    section2Image: acf.section2Image?.node?.sourceUrl || '/media/landing-page/navigate_medicare.png',
    section2ImageAlt: acf.section2Image?.node?.altText || "Medicare Information",
    section2Content: acf.section2Content || `
      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
            <img src="/media/landing-page/circle.svg" alt="Circle" width="75" height="75" class="absolute inset-0 w-full h-full" />
            <span class="relative text-center text-[28px] leading-[32px] font-medium tracking-tight" style="color: #083D78;">A<span class="font-light">+</span>B</span>
          </div>
          <div>
            <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">Original Medicare (Parts A & B)</h4>
            <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Hospital insurance and medical insurance provided by the federal government.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
            <img src="/media/landing-page/circle.svg" alt="Circle" width="75" height="75" class="absolute inset-0 w-full h-full" />
            <span class="relative text-center text-[28px] leading-[32px] font-medium" style="color: #083D78;">C</span>
          </div>
          <div>
            <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">Medicare Advantage (Part C)</h4>
            <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">All-in-one plans offered by private insurers, often including drug coverage and extra benefits.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
            <img src="/media/landing-page/circle.svg" alt="Circle" width="75" height="75" class="absolute inset-0 w-full h-full" />
            <span class="relative text-center text-[28px] leading-[32px] font-medium" style="color: #083D78;">D</span>
          </div>
          <div>
            <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">Prescription Drug Coverage (Part D)</h4>
            <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Helps cover the cost of medications.</p>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
            <img src="/media/landing-page/circle.svg" alt="Circle" width="75" height="75" class="absolute inset-0 w-full h-full" />
            <span class="relative text-center text-[55px] leading-[32px] font-light" style="color: #083D78;">+</span>
          </div>
          <div>
            <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">Medigap (Supplement Insurance)</h4>
            <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Optional coverage that helps pay costs not included in Original Medicare.</p>
          </div>
        </div>
      </div>
    `,
    section2ImageContentLeft: acf.section2ImageContentLeft || '<p class="text-[18px] leading-[28px] font-normal" style="color: #3D3D3D;">For more details,<br/> visit <a href="https://www.medicare.gov">Medicare.gov\'s</a> <br/>official guides.</p>',
    section2ImageContentRight: acf.section2ImageContentRight || '<div class="text-[18px] leading-[32px] font-medium mb-[12px]" style="color: #C85103;"><a href="https://www.medicare.gov/medicare-and-you">Medicare & You</a></div><div class="text-[18px] leading-[32px] font-medium mb-[12px]" style="color: #C85103;"><a href="https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/your-coverage-options/compare-original-medicare-medicare-advantage">Medicare Advantage Plans</a></div><div class="text-[18px] leading-[32px] font-medium" style="color: #C85103;"><a href="https://www.medicare.gov/health-drug-plans/medigap">Medigap Policies</a></div>',
    
    section3Headline: acf.section3Headline || "No Matter Where You're Starting, We're Here to Help",
    section3Image: acf.section3Image?.node?.sourceUrl || '/media/landing-page/help.png',
    section3ImageAlt: acf.section3Image?.node?.altText || "Medicare Support",
    section3Content: acf.section3Content || `
      <div class="space-y-4">
        <div>
          <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">New to Medicare (Turning 65?)</h4>
          <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Learn what happens when you first become eligible and how to enroll.</p>
        </div>
        <div>
          <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">Retirement and Medicare</h4>
          <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Understand how Medicare works with your retirement benefits.</p>
        </div>
        <div>
          <h4 class="text-[18px] leading-[26px] font-semibold mb-1" style="color: #008889;">Choosing the Right Plan</h4>
          <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Compare your options with guidance from our trusted partners.</p>
        </div>
        <div class="mt-0">
          <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Connect with a Medicare Specialist (Altais is not affiliated with these independent brokers)</p>
          <p><a target="_blank" href="https://www.blackpointinsurance.com/">BlackPoint (Bay Area)</a> or <a target="_blank" href="https://www.boomers-insurance.com/locations">Boomers (Northern and Southern California)</a> <a href="tel:1-800-815-1943">1-800-815-1943</a></p>
        </div>
      </div>
    `,
    
    section4Headline: acf.section4Headline || "Stay Healthy,<br /> Stay Confident",
    section4Image: acf.section4Image?.node?.sourceUrl || '/media/landing-page/stayhealthy.png',
    section4ImageMobile: acf.section4ImageMobile?.node?.sourceUrl || '/media/landing-page/stayhealthymobile.png',
    section4ImageAlt: acf.section4Image?.node?.altText || "Stay Healthy",
    section4Content: acf.section4Content || `
      <p class="mb-8">Medicare isn't just about coverage—it's about wellness. Altais doctors are your partners in preventative care with:</p>
      <ul class="space-y-3 mb-8">
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Annual wellness visits</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Screenings and vaccinations</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Support for chronic conditions</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Resources to help you stay active and independent</span>
        </li>
      </ul>
    `,
    section4ButtonText: acf.section4ButonText || "Explore Preventative Care with Altais",
    section4ButtonUrl: acf.section4ButtonUrl?.url || "/patient-resources/annual-health-and-wellness/",
    section4ButtonTarget: acf.section4ButtonUrl?.target || "_self",
    
    section5Headline: acf.section5Headline || "Learn More. Stay Connected.",
    section5Image: acf.section5Image?.node?.sourceUrl || '/media/landing-page/stayConnected.png',
    section5ImageAlt: acf.section5Image?.node?.altText || "Medicare Support",
    section5Content: acf.section5Content || `
      <p class="text-[18px] leading-[26px] font-normal mb-0 py-0 pb-0" style="color: #3D3D3D; padding-bottom: 0; margin: 0;">Join us for upcoming:</p>
      <ul class="space-y-2 mt-4 mb-0 pl-0" style="padding-left: 0; list-style: none;">
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Medicare Information Sessions</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Community Wellness Workshops</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Preventative Screenings</span>
        </li>
      </ul>
      <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">These events are designed to answer your questions, connect you with resources, and support your health.</p>
    `,
    section5Button1Text: acf.section5Button1Text || "View Events & RSVP Today For Blackpoint Events (Bay Area)",
    section5Button1Url: acf.section5Button1Url?.url || "https://blackpointinsurance.my.site.com/SUMOScheduler/s/eventregister?regId=a0bPe00000LNAvwIAH&isIframe=false",
    section5Button1Target: acf.section5Button1Url?.target || "_blank",
    section5Button2Text: acf.section5Button2Text || "View Events & RSVP Today For Boomer Events (Southern California and Oakland)",
    section5Button2Url: acf.section5Button2Url?.url || "https://www.boomers-insurance.com/locations",
    section5Button2Target: acf.section5Button2Url?.target || "_blank",
    
    section6Headline: acf.section6Headline || "Trusted Doctors. Connected Care.",
    section6Image: acf.section6Image?.node?.sourceUrl || '/media/landing-page/trust.png',
    section6ImageAlt: acf.section6Image?.node?.altText || "Trusted Doctors",
    section6Content: acf.section6Content || `
      <p class="text-[18px] leading-[26px] font-normal mb-6" style="color: #3D3D3D;">With Altais, you'll find:</p>
      <ul class="space-y-3 mb-8" style="padding-left: 0; list-style: none;">
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>A network of nearly 10,000 local providers</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Access to top hospitals and specialists</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>Coordinated care, when and where you need it</span>
        </li>
        <li class="flex items-start">
          <span class="mr-3">+</span>
          <span>A focus on keeping you healthy, not just treating illness</span>
        </li>
      </ul>
    `,
    section6ButtonText: acf.section6ButtonText || "Find a Doctor Near You",
    section6ButtonUrl: acf.section6ButtonUrl?.url || "/find-care",
    section6ButtonTarget: acf.section6ButtonUrl?.target || "_self",
    
    section7Headline: acf.section7Headline || "Personal Guidance, Every Step of the Way",
    section7Image: acf.section7Image?.node?.sourceUrl || '/media/landing-page/guidance.png',
    section7ImageAlt: acf.section7Image?.node?.altText || "Medicare Support",
    section7Content: acf.section7Content || `
      <div class="space-y-4">
        <div>
          <p class="text-[18px] leading-[26px] font-normal mb-0 py-0 pb-0" style="color: #3D3D3D; padding-bottom: 0; margin: 0;">Altais partners with independent brokers who can answer your Medicare questions and make choosing a plan easier. They'll:</p>
          <ul class="space-y-2 mt-4 mb-0 pl-0" style="padding-left: 0; list-style: none;">
            <li class="flex items-start">
              <span class="mr-3">+</span>
              <span>Answer your questions about coverage</span>
            </li>
            <li class="flex items-start">
              <span class="mr-3">+</span>
              <span>Help you compare plans side-by-side</span>
            </li>
            <li class="flex items-start">
              <span class="mr-3">+</span>
              <span>Guide you through enrollment</span>
            </li>
          </ul>
          <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">These events are designed to answer your questions, connect you with resources, and support your health.</p>
          <div class="mt-0">
            <p class="text-[18px] leading-[26px] font-normal" style="color: #3D3D3D;">Connect with a Medicare Specialist (Altais is not affiliated with these independent brokers)</p>
            <p><a target="_blank" href="https://www.blackpointinsurance.com/">BlackPoint (Bay Area)</a> or <a target="_blank" href="https://www.boomers-insurance.com/locations">Boomers (Northern and Southern California)</a> <a href="tel:1-800-815-1943">1-800-815-1943</a></p>
          </div>
        </div>
      </div>
    `,
    
    section8: acf.section8 !== undefined ? acf.section8 : true,
    section8Content: acf.section8Content || "",
    
    section9Headline: acf.section9Headline || "Compliance / Disclaimer",
    section9Content: acf.section9Content || `
      <p>We are not endorsed by or affiliated with the federal Medicare program. BlackPoint and Boomers Insurance Services are independent insurance agents that work with other providers and health plans. BlackPoint and Boomers Insurance Services are not affiliated with Altais.</p>
    `
  };

  return (
    <LayoutLp>
    <div className="block">
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={clsx(styles.heroContainer, isMobile ? "h-[400px]" : "md:h-[400px]")}>
          {/* Background image */}
          <div
            className={clsx(
              styles.heroBackground,
              isMobile && "min-h-[400px]"
            )}
            style={{
              backgroundImage: isMobile 
                ? `url('${content.heroImageMobile}')`
                : `url('${content.heroImage}')`
            }}
          ></div>

          {/* Content container */}
          <div className="container mx-auto relative z-10 h-full">
            <div className={clsx(styles.heroContent, "h-full flex flex-col justify-center", !isMobile && "md:w-[40%]")}>
              <h1 className={styles.heroHeadline}>
                {content.heroHeadline}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - Medicare Journey Section */}
      <section className={styles.journeySection}>
        <div className="container mx-auto text-center text-white">
          {/* Headline */}
          <h2 className={styles.journeyHeadline}>
            {content.section1Headline}
          </h2>

          {/* Bullets */}
          <div className={styles.journeyDates}>
            {content.section1Bullets.map((bullet, index) => (
              <>
                <span key={index} dangerouslySetInnerHTML={{ __html: bullet.bulletText }} />
                {index < content.section1Bullets.length - 1 && (
                  <span className="mx-2 text-[20px]">&bull;</span>
                )}
              </>
            ))}
          </div>

          {/* Step Headline */}
          <p className={styles.journeyStepHeadline}>
            {content.section1StepHeadline}
          </p>

          {/* Step Boxes */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 max-w-6xl mx-auto">
            {content.stepBoxes.map((box, index) => (
              <>
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={styles.stepBox}>
                    {box.stepBoxUrl?.url ? (
                      <a 
                        href={box.stepBoxUrl.url}
                        target={box.stepBoxUrl.target || '_self'}
                        dangerouslySetInnerHTML={{ __html: box.stepBoxText }}
                      />
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: box.stepBoxText }} />
                    )}
                  </div>
                </div>
                {index < content.stepBoxes.length - 1 && (
                  <div className={styles.stepConnector}>
                    <div className={styles.stepConnectorLine}></div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 - Navigate Medicare */}
      <section className={clsx(styles.section2, "template-wrapper md:pt-[75px]")}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[74px]">
            {/* Left Column - Image with larger container (60%) */}
            <div className="w-full lg:w-3/5 flex-shrink-0">
              <div className="w-full">
                <Image
                  src={content.section2Image}
                  alt={content.section2ImageAlt}
                  width={715}
                  height={450}
                  className="w-full rounded-normal border border-lightPrimary object-cover"
                />
              </div>
              
              {/* Two column text under image with orange border */}
              <div className="flex mt-6 gap-4 items-stretch">
                {/* Left column */}
                <div className="flex-1 text-left flex items-center md:max-w-[232px]">
                  <div 
                    className={styles.section2ImageLeft}
                    dangerouslySetInnerHTML={{ __html: content.section2ImageContentLeft }}
                  />
                </div>
                
                {/* Orange border separator - full height */}
                <div className="w-px bg-[#C85103] flex-shrink-0 self-stretch"></div>
                
                {/* Right column */}
                <div className="flex-1 flex flex-col justify-center pl-[35px]">
                  <div 
                    className={styles.section2ImageRight}
                    dangerouslySetInnerHTML={{ __html: content.section2ImageContentRight }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Content with smaller container (40%) */}
            <div className="w-full lg:w-2/5 text-left">
              {/* Main Headline */}
              <div className="block mb-6">
                <h2 className={styles.section2Headline}>
                  {content.section2Headline}
                </h2>
                <p className={styles.section2SubHeadline}>
                  {content.section2SubHeadline}
                </p>
              </div>

              {/* Content */}
              <div 
                className={styles.section2Content}
                dangerouslySetInnerHTML={{ __html: content.section2Content }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - No Matter Where You're Starting */}
      <section className={clsx(styles.section3, "template-wrapper")}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[74px]">
            {/* Mobile Image - Shows first on mobile */}
            <div className="w-full lg:hidden mb-6">
              <Image
                src={content.section3Image}
                alt={content.section3ImageAlt}
                width={595}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>

            {/* Left Column - Content with smaller container (40%) */}
            <div className="w-full lg:w-2/5 text-left">
              <div className="block mb-6">
                <h2 className={styles.section3Headline}>
                  {content.section3Headline}
                </h2>
              </div>

              <div 
                className={styles.section3Content}
                dangerouslySetInnerHTML={{ __html: content.section3Content }}
              />
            </div>

            {/* Right Column - Image with larger container (60%) - Hidden on mobile */}
            <div className="hidden lg:flex w-full lg:w-3/5 flex-shrink-0 justify-end">
              <div className="w-full max-w-[595px]">
                <Image
                  src={content.section3Image}
                  alt={content.section3ImageAlt}
                  width={595}
                  height={450}
                  className="w-full rounded-normal border border-lightPrimary object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Stay Healthy */}
      <section className="w-full">
        {/* Desktop Layout */}
        <div 
          className={clsx(styles.section4Desktop, "hidden md:block")}
          style={{
            backgroundImage: `url('${content.section4Image}')`,
          }}
        >
          <div className="container mx-auto">
            <div className="flex justify-end">
              {/* Right Content - 40% width */}
              <div className="w-full md:w-2/5 text-white">
                <h2 className={styles.section4Headline} dangerouslySetInnerHTML={{ __html: content.section4Headline }} />
                
                <div 
                  className={styles.section4Content}
                  dangerouslySetInnerHTML={{ __html: content.section4Content }}
                />
                
                <Link href={content.section4ButtonUrl} target={content.section4ButtonTarget}>
                  <button className={clsx(styles.section4Button, "btn-hover")}>
                    {content.section4ButtonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Mobile Image */}
          <div className="w-full">
            <Image
              src={content.section4ImageMobile}
              alt={content.section4ImageAlt}
              width={400}
              height={300}
              className="w-full object-cover"
            />
          </div>
          
          {/* Mobile Content with Gradient */}
          <div className={styles.section4MobileContent}>
            <div className="text-white">
              <h2 className={styles.section4Headline} dangerouslySetInnerHTML={{ __html: content.section4Headline }} />
              
              <div 
                className={styles.section4Content}
                dangerouslySetInnerHTML={{ __html: content.section4Content }}
              />
              
              <Link href={content.section4ButtonUrl} target={content.section4ButtonTarget}>
                <button className={clsx(styles.section4Button, "w-full")}>
                  {content.section4ButtonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Learn More Stay Connected */}
      <section className={clsx(styles.section5, "template-wrapper")} id="rsvp-events">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[74px]">
            {/* Mobile Image - Shows first on mobile */}
            <div className="w-full lg:hidden mb-6">
              <Image
                src={content.section5Image}
                alt={content.section5ImageAlt}
                width={595}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>

            {/* Left Column - Content with smaller container (40%) */}
            <div className="w-full lg:w-2/5 text-left">
              <div className="block mb-6">
                <h2 className={styles.section5Headline}>
                  {content.section5Headline}
                </h2>
              </div>

              <div 
                className={styles.section5Content}
                dangerouslySetInnerHTML={{ __html: content.section5Content }}
              />

              {/* Buttons */}
              <div className="space-y-6">
                <Link href={content.section5Button1Url} target={content.section5Button1Target}>
                  <button className={styles.section5Button}>
                    {content.section5Button1Text}
                  </button>
                </Link>
                <Link href={content.section5Button2Url} target={content.section5Button2Target}>
                  <button className={styles.section5Button}>
                    {content.section5Button2Text}
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Image with larger container (60%) - Hidden on mobile */}
            <div className="hidden lg:flex w-full lg:w-3/5 flex-shrink-0 justify-end">
              <div className="w-full max-w-[595px]">
                <Image
                  src={content.section5Image}
                  alt={content.section5ImageAlt}
                  width={595}
                  height={450}
                  className="w-full rounded-normal border border-lightPrimary object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Trusted Doctors */}
      <section className="w-full">
        {/* Desktop Layout */}
        <div className={clsx(styles.section6Desktop, "hidden lg:block")}>
          <div className="flex flex-col lg:flex-row items-stretch h-[480px] max-h-[580px]">
            {/* Left Column - Image (50% full width to edge) */}
            <div className="w-full lg:w-1/2">
              <div className="w-full h-full">
                <Image
                  src={content.section6Image}
                  alt={content.section6ImageAlt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-left-top"
                />
              </div>
            </div>

            {/* Right Column - Content (50% with container alignment) */}
            <div className="w-full lg:w-1/2 flex items-center" style={{ background: '#f9f9f9' }}>
              <div className="container mx-auto">
                <div className={styles.section6Content}>
                  <h2 className={styles.section6Headline}>
                    {content.section6Headline}
                  </h2>
                  
                  <div dangerouslySetInnerHTML={{ __html: content.section6Content }} />

                  <Link href={content.section6ButtonUrl} target={content.section6ButtonTarget}>
                    <button className={clsx(styles.section6Button, "btn-gradient")}>
                      {content.section6ButtonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Mobile Image */}
          <div className="w-full">
            <Image
              src={content.section6Image}
              alt={content.section6ImageAlt}
              width={600}
              height={400}
              className="w-full object-cover object-left-top"
            />
          </div>

          {/* Mobile Content */}
          <div className="w-full px-4 py-8" style={{ background: '#f9f9f9' }}>
            <h2 className={styles.section6Headline}>
              {content.section6Headline}
            </h2>
            
            <div dangerouslySetInnerHTML={{ __html: content.section6Content }} />

            <Link href={content.section6ButtonUrl} target={content.section6ButtonTarget}>
              <button className={clsx(styles.section6Button, "btn-gradient")}>
                {content.section6ButtonText}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7 - Personal Guidance */}
      <section className={clsx(styles.section7, "template-wrapper")}>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[70px]">
            {/* Mobile Image - Shows first on mobile */}
            <div className="w-full lg:hidden mb-6">
              <Image
                src={content.section7Image}
                alt={content.section7ImageAlt}
                width={595}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>

            {/* Left Column - Content with smaller container (45%) */}
            <div className="w-full lg:w-[45%] text-left">
              <div className="block mb-6">
                <h2 className={styles.section7Headline}>
                  {content.section7Headline}
                </h2>
              </div>

              <div 
                className={styles.section7Content}
                dangerouslySetInnerHTML={{ __html: content.section7Content }}
              />
            </div>

            {/* Right Column - Image with larger container (55%) - Hidden on mobile */}
            <div className="hidden lg:flex w-full lg:w-[55%] flex-shrink-0 justify-end">
              <div className="w-full max-w-[595px]">
                <Image
                  src={content.section7Image}
                  alt={content.section7ImageAlt}
                  width={595}
                  height={450}
                  className="w-full rounded-normal border border-lightPrimary object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 - Journey Repeat OR Custom Content */}
      {content.section8 ? (
        // Repeat Section 1 if section8 is true
        <section className={styles.section8}>
          <div className="container mx-auto text-center text-white">
            {/* Headline */}
            <h2 className={styles.journeyHeadline}>
              {content.section1Headline}
            </h2>

            {/* Bullets */}
            <div className={styles.journeyDates}>
              {content.section1Bullets.map((bullet, index) => (
                <>
                  <span key={index} dangerouslySetInnerHTML={{ __html: bullet.bulletText }} />
                  {index < content.section1Bullets.length - 1 && (
                    <span className="mx-2 text-[20px]">&bull;</span>
                  )}
                </>
              ))}
            </div>

            {/* Step Headline */}
            <p className={styles.journeyStepHeadline}>
              {content.section1StepHeadline}
            </p>

            {/* Step Boxes */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 max-w-6xl mx-auto">
              {content.stepBoxes.map((box, index) => (
                <>
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className={styles.stepBox}>
                      {box.stepBoxUrl?.url ? (
                        <a 
                          href={box.stepBoxUrl.url}
                          target={box.stepBoxUrl.target || '_self'}
                          dangerouslySetInnerHTML={{ __html: box.stepBoxText }}
                        />
                      ) : (
                        <span dangerouslySetInnerHTML={{ __html: box.stepBoxText }} />
                      )}
                    </div>
                  </div>
                  {index < content.stepBoxes.length - 1 && (
                    <div className={styles.stepConnector}>
                      <div className={styles.stepConnectorLine}></div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </section>
      ) : content.section8Content ? (
        // Custom content if section8 is false and content exists
        <section className={styles.section8}>
          <div className="container mx-auto text-center text-white">
            <div dangerouslySetInnerHTML={{ __html: content.section8Content }} />
          </div>
        </section>
      ) : null}

      {/* Section 9 - Compliance */}
      <section className={clsx(styles.section9, "template-wrapper")}>
        <div className="container mx-auto">
          <div className="block md:flex justify-start items-start w-full gap-10">
            {/* Mobile Logo - Shows first on mobile */}
            <div className="flex flex-col justify-center md:hidden max-w-full min-w-full mb-6">
              <div className="flex justify-center mb-6">
                <Image
                  src={BrandLogo}
                  alt="Altais"
                  width={180}
                  height={55}
                  priority
                />
              </div>
              <div className="flex justify-center">
                <Link href="/find-care">
                  <button className="btn-gradient btn-md w-full md:w-[250px] flex-center gap-1">
                    Find Care <ChevronRight className="w-[18px] h-[18px]" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Left Column - Logo and Find Care Button - Hidden on mobile */}
            <div className="hidden md:flex flex-col justify-center md:justify-start max-w-full min-w-full md:min-w-[340px] md:max-w-[340px]">
              <div className="flex justify-center md:justify-start mb-6">
                <Image
                  src={BrandLogo}
                  alt="Altais"
                  width={180}
                  height={55}
                  priority
                />
              </div>
              <div className="flex justify-center md:justify-start">
                <Link href="/find-care">
                  <button className="btn-gradient btn-md w-full md:w-[250px] flex-center gap-1">
                    Find Care <ChevronRight className="w-[18px] h-[18px]" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Compliance/Disclaimer Content */}
            <div className="block pt-4 md:pt-0 md:pl-10 border-t md:border-t-0 md:border-l border-secondary section-content">
              <h2 className={styles.section9Headline}>
                {content.section9Headline}
              </h2>
              
              <div 
                className={styles.section9Content}
                dangerouslySetInnerHTML={{ __html: content.section9Content }}
              />
            </div>
          </div> 
        </div>
      </section>

    </div>
    </LayoutLp>
  );
}
