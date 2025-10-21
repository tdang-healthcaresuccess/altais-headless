import InnerPageBanner from "@/components/common/inner-page-banner";
import LayoutLp from "@/components/LayoutLp";
import { clsx } from "clsx";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/public/media/altais-logo.svg";

export default function ForProviders() {
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
  return (
    <LayoutLp>
    <div className="block">
      <section className="flex items-center">
      <div className="relative w-full h-full md:h-[400px] sm:h-[400px] ">
        {/* Background image */}
        <div
          className={clsx(
            "md:absolute inset-0 bg-cover bg-center h-[400px]",
            isMobile
              ? "bg-landing-banner-mobile min-h-[400px]"
              : "bg-landing-banner"
          )}
          style={{
            backgroundImage: isMobile 
              ? `url('/media/landing-page/medicare_mobile.png')`
              : `url('/media/landing-page/medicare.png')`
          }}
        ></div>

        {/* Content container */}
        <div className="container mx-auto relative z-10 h-full">
          <div className="pt-6 md:pt-0 md:w-[40%] h-full flex flex-col justify-center">
            <h1 className="font-poppins text-[32px] md:text-[45px] leading-[45px] md:leading-[65px] text-bluePrimary">
              {"Medicare Open Enrollment is October 5th to December 7th"}
            </h1>
            {/* <a href={"/find-care/"}>
              <button className="btn-gradient btn-md w-full md:w-[250px] flex-center gap-1 mt-8 md:mt-15">
                {"Find Care"} <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </button>
            </a> */}
          </div>
        </div>
      </div>
    </section>
     {/* Medicare Journey Section - Full Width Gradient */}
    <section 
      className="w-full py-16 md:py-20"
      style={{
        background: 'linear-gradient(to right, #008889, #083D78)'
      }}
    >
      <div className="container mx-auto text-center text-white">
        {/* Headlines */}
      
        <h2 className="mb-4" style={{ color: '#FFF', fontSize: '40px', fontStyle: 'normal', fontWeight: '400', lineHeight: '50px' }}>
          Your Medicare Journey Starts Here
        </h2>
          <p className="text-[16px] font-normal mb-2 flex items-center gap-2 justify-center text-center w-full" style={{ color: '#FFF' }}>
          <span>Annual Enrollment Period Opens:<br /> October 15, 2025</span>
          <span className="mx-2 text-[20px]">&bull;</span>
          <span>Annual Enrollment Period Closes: <br />December 7, 2025</span>
          <span className="mx-2 text-[20px]">&bull;</span>
          <span>Benefits Begin:<br /> January 1, 2026</span>
          <span className="mx-2 text-[20px]">&bull;</span>
          <span>MA Open Enrollment Period:<br /> January 1 – March 31, 2026</span>
        </p>
        <p className="mb-12 mt-10 md:mb-16" style={{ fontSize: '20px', fontStyle: 'normal', fontWeight: '500' }}>
          3 Easy Steps with Altais
        </p>

        {/* Three Connected Boxes */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 max-w-6xl mx-auto">
          {/* Box 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="border-2 btn-hover border-white flex items-center justify-center px-4 py-6" style={{ minWidth: '353px', height: '133.564px', width: '100%', maxWidth: '400px' }}>
              <span className="text-white text-lg md:text-xl font-medium text-center">
                <a href="/find-care">Find a doctor you can trust</a>
              </span>
            </div>
          </div>

          {/* Connecting Line 1 */}
          <div className="flex items-center justify-center">
            <div className="w-px h-8 md:w-16 md:h-px bg-white"></div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="border-2 btn-hover border-white flex items-center justify-center px-4 py-6" style={{ minWidth: '353px', height: '133.564px', width: '100%', maxWidth: '400px' }}>
              <span className="text-white text-lg md:text-xl font-medium text-center">
                <a href="#rsvp-events">RSVP for an upcoming event</a>
              </span>
            </div>
          </div>

          {/* Connecting Line 2 */}
          <div className="flex items-center justify-center">
            <div className="w-px h-8 md:w-16 md:h-px bg-white"></div>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="border-2 btn-hover border-white flex items-center justify-center px-4 py-6" style={{ minWidth: '353px', height: '133.564px', width: '100%', maxWidth: '400px' }}>
              <span className="text-white text-lg md:text-xl font-medium text-center">
                <a href="https://www.medicare.gov">Explore resources on Medicare.gov</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>          
    {/* Section4a-style CTA Section with swapped layout */}
    <section className="template-wrapper py-6 md:py-12 md:pt-[75px]" style={{ boxShadow: '0 2px 3px 1px rgba(0, 0, 0, 0.10)' }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[74px]">
          {/* Left Column - Image with larger container (60%) */}
          <div className="w-full lg:w-3/5 flex-shrink-0">
            <div className="w-full">
              <Image
                src="/media/landing-page/navigate_medicare.png"
                alt="Medicare Information"
                width={715}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>
            
            {/* Two column text under image with orange border */}
            <div className="flex mt-6 gap-4 items-stretch">
              {/* Left column */}
              <div className="flex-1 text-left flex items-center md:max-w-[232px]">
                <p className="text-[18px] leading-[28px] font-normal" style={{ color: '#3D3D3D' }}>
                  For more details,<br/> visit <a href="https://www.medicare.gov">Medicare.gov's</a> <br/>official guides.
                </p>
              </div>
              
              {/* Orange border separator - full height */}
              <div className="w-px bg-[#C85103] flex-shrink-0 self-stretch"></div>
              
              {/* Right column - 3 rows vertically */}
              <div className="flex-1 flex flex-col justify-center pl-[35px]">
                <div className="text-[18px] leading-[32px] font-medium mb-[12px]" style={{ color: '#C85103' }}><a href="https://www.medicare.gov/medicare-and-you">Medicare & You</a></div>
                <div className="text-[18px] leading-[32px] font-medium mb-[12px]" style={{ color: '#C85103' }}><a href="https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/your-coverage-options/compare-original-medicare-medicare-advantage">Medicare Advantage Plans</a></div>
                <div className="text-[18px] leading-[32px] font-medium" style={{ color: '#C85103' }}><a href="https://www.medicare.gov/health-drug-plans/medigap">Medigap Policies</a></div>
              </div>
            </div>
          </div>

          {/* Right Column - Content with smaller container (40%) */}
          <div className="w-full lg:w-2/5 text-left">
            {/* Main Headline */}
            <div className="block mb-6">
              <h2 className="text-[22px] leading-[32px] font-medium mb-4" style={{ color: '#083D78' }}>
                Understanding Medicare, One Step at a Time
              </h2>
              <p className="text-[18px] leading-[26px] font-normal mb-6" style={{ color: '#3D3D3D' }}>
                Medicare can feel overwhelming—but it doesn't have to be. Here's a quick look at the basics:
              </p>
            </div>

            {/* 4 sections with icons and text */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
                  <Image
                    src="/media/landing-page/circle.svg"
                    alt="Circle"
                    width={75}
                    height={75}
                    className="absolute inset-0 w-full h-full"
                  />
                  <span className="relative text-center text-[28px] leading-[32px] font-medium tracking-tight" style={{ color: '#083D78' }}>
                    A<span className="font-light">+</span>B
                  </span>
                </div>
                <div>
                  <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>Original Medicare (Parts A & B)</h4>
                  <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Hospital insurance and medical insurance provided by the federal government.</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
                  <Image
                    src="/media/landing-page/circle.svg"
                    alt="Circle"
                    width={75}
                    height={75}
                    className="absolute inset-0 w-full h-full"
                  />
                  <span className="relative text-center text-[28px] leading-[32px] font-medium" style={{ color: '#083D78' }}>C</span>
                </div>
                <div>
                  <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>Medicare Advantage (Part C)</h4>
                  <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>All-in-one plans offered by private insurers, often including drug coverage and extra benefits.</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
                  <Image
                    src="/media/landing-page/circle.svg"
                    alt="Circle"
                    width={75}
                    height={75}
                    className="absolute inset-0 w-full h-full"
                  />
                  <span className="relative text-center text-[28px] leading-[32px] font-medium" style={{ color: '#083D78' }}>D</span>
                </div>
                <div>
                  <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>Prescription Drug Coverage (Part D)</h4>
                  <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Helps cover the cost of medications.</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative w-[75px] h-[75px] flex items-center justify-center">
                  <Image
                    src="/media/landing-page/circle.svg"
                    alt="Circle"
                    width={75}
                    height={75}
                    className="absolute inset-0 w-full h-full"
                  />
                  <span className="relative text-center text-[55px] leading-[32px] font-light" style={{ color: '#083D78' }}>+</span>
                </div>
                <div>
                  <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>Medigap (Supplement Insurance)</h4>
                  <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Optional coverage that helps pay costs not included in Original Medicare.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section4a-style CTA Section with image on right */}
    <section className="template-wrapper py-6 md:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[74px]">
          {/* Mobile Image - Shows first on mobile */}
          <div className="w-full lg:hidden mb-6">
            <Image
              src="/media/landing-page/help.png"
              alt="Medicare Support"
              width={595}
              height={450}
              className="w-full rounded-normal border border-lightPrimary object-cover"
            />
          </div>

          {/* Left Column - Content with smaller container (40%) */}
          <div className="w-full lg:w-2/5 text-left">
            {/* Main Headline */}
            <div className="block mb-6">
              <h2 className="text-[22px] leading-[32px] font-medium mb-4" style={{ color: '#083D78' }}>
                No Matter Where You're Starting, We're Here to Help
              </h2>
            </div>

            {/* 3 sections with content */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div>
                <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>New to Medicare (Turning 65?)</h4>
                <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Learn what happens when you first become eligible and how to enroll.</p>
              </div>

              {/* Section 2 */}
              <div>
                <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>Retirement and Medicare</h4>
                <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Understand how Medicare works with your retirement benefits.</p>
              </div>

              {/* Section 3 */}
              <div>
                <h4 className="text-[18px] leading-[26px] font-semibold mb-1" style={{ color: '#008889' }}>Choosing the Right Plan</h4>
                <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Compare your options with guidance from our trusted partners.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image with larger container (60%) - Hidden on mobile */}
          <div className="hidden lg:flex w-full lg:w-3/5 flex-shrink-0 justify-end">
            <div className="w-full max-w-[595px]">
              <Image
                src="/media/landing-page/help.png"
                alt="Medicare Support"
                width={595}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  {/* Stay Healthy Section - Full Width Background with Right Content */}
    <section className="w-full">
      {/* Desktop Layout */}
      <div 
        className="hidden md:block w-full py-16 md:py-20"
        style={{
          backgroundImage: `url('/media/landing-page/stayhealthy.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto">
          <div className="flex justify-end">
            {/* Right Content - 40% width */}
            <div className="w-full md:w-2/5 text-white">
              <h2 style={stayHealthyStyles.heading} className="mb-6">
                Stay Healthy,<br /> Stay Confident
              </h2>
              <p style={stayHealthyStyles.text} className="mb-8">
                Medicare isn't just about coverage—it's about wellness. Altais doctors are your partners in preventative care with:
              </p>
              
              {/* Bullet points */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                  <span style={stayHealthyStyles.text}>Annual wellness visits</span>
                </li>
                <li className="flex items-start">
                  <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                  <span style={stayHealthyStyles.text}>Screenings and vaccinations</span>
                </li>
                <li className="flex items-start">
                  <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                  <span style={stayHealthyStyles.text}>Support for chronic conditions</span>
                </li>
                <li className="flex items-start">
                  <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                  <span style={stayHealthyStyles.text}>Resources to help you stay active and independent</span>
                </li>
              </ul>
              
              {/* White border button */}
              <Link href="/patient-resources/annual-health-and-wellness/">
                <button 
                  className="btn-hover border-2 border-white bg-transparent px-6 py-3 rounded-normal hover:text-bluePrimary transition-colors duration-300"
                  style={stayHealthyStyles.button}
                >
                  Explore Preventative Care with Altais
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
            src="/media/landing-page/stayhealthymobile.png"
            alt="Stay Healthy"
            width={400}
            height={300}
            className="w-full object-cover"
          />
        </div>
        
        {/* Mobile Content with Gradient */}
        <div 
          className="w-full py-8 px-4"
          style={{
            background: 'linear-gradient(to bottom, #008889, #083D78)'
          }}
        >
          <div className="text-white">
            <h2 style={stayHealthyStyles.heading} className="mb-6">
              Stay Healthy,<br /> Stay Confident
            </h2>
            <p style={stayHealthyStyles.text} className="mb-8">
              Medicare isn't just about coverage—it's about wellness. Altais doctors are your partners in preventative care with:
            </p>
            
            {/* Bullet points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                <span style={stayHealthyStyles.text}>Annual wellness visits</span>
              </li>
              <li className="flex items-start">
                <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                <span style={stayHealthyStyles.text}>Screenings and vaccinations</span>
              </li>
              <li className="flex items-start">
                <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                <span style={stayHealthyStyles.text}>Support for chronic conditions</span>
              </li>
              <li className="flex items-start">
                <span style={stayHealthyStyles.bullet} className="mr-3">+</span>
                <span style={stayHealthyStyles.text}>Resources to help you stay active and independent</span>
              </li>
            </ul>
            
            {/* White border button */}
            <Link href="https://altais.com/patient-resources/annual-health-and-wellness/">
              <button 
                className="border-2 border-white bg-transparent px-6 py-3 rounded-normal hover:text-bluePrimary transition-colors duration-300 w-full"
                style={stayHealthyStyles.button}
              >
                Explore Preventative Care with Altais
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>

   
  {/* 2A Section4a-style CTA Section with image on right */}
    <section className="template-wrapper py-6 md:py-12" id="rsvp-events">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[74px]">
          {/* Mobile Image - Shows first on mobile */}
          <div className="w-full lg:hidden mb-6">
            <Image
              src="/media/landing-page/stayConnected.png"
              alt="Medicare Support"
              width={595}
              height={450}
              className="w-full rounded-normal border border-lightPrimary object-cover"
            />
          </div>

          {/* Left Column - Content with smaller container (40%) */}
          <div className="w-full lg:w-2/5 text-left">
            {/* Main Headline */}
            <div className="block mb-6">
              <h2 className="text-[22px] leading-[32px] font-medium mb-4" style={{ color: '#083D78' }}>
                Learn More. Stay Connected.
              </h2>
            </div>

            {/* 3 sections with content */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div>
                 <p className="text-[18px] leading-[26px] font-normal mb-0 py-0 pb-0" style={{ color: '#3D3D3D', paddingBottom: '0', margin: '0' }}>Join us for upcoming:</p>

                 {/* List with custom styled bullets */}
                 <ul className="space-y-2 mt-4 mb-0 pl-0" style={{ paddingLeft: '0', listStyle: 'none' }}>
                   <li className="flex items-start">
                     <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                     <span style={learnMoreStyles.text}>Medicare Information Sessions</span>
                   </li>
                   <li className="flex items-start">
                     <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                     <span style={learnMoreStyles.text}>Community Wellness Workshops</span>
                   </li>
                   <li className="flex items-start">
                     <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                     <span style={learnMoreStyles.text}>Preventative Screenings</span>
                   </li>
                 </ul>
                 
                <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>These events are designed to answer your questions, connect you with resources, and support your health.</p>
                
                {/* View Events Button */}
                <div className="mt-6">
                  <Link href="https://blackpointinsurance.my.site.com/SUMOScheduler/s/eventregister?regId=a0bPe00000LNAvwIAH&isIframe=false" target="_blank">
                    <button 
                      style={learnMoreStyles.button}
                      className="w-full max-w-[450px] transition-colors duration-300 hover:!bg-[rgb(199,83,39)] hover:!text-white hover:!border-[rgb(199,83,39)]"
                    >
                      View Events & RSVP Today For Blackpoint Events (Bay Area)
                    </button>
                  </Link>
                </div>
                <div className="mt-6">
                  <Link href=" https://www.boomers-insurance.com/locations" target="_blank">
                    <button 
                      style={learnMoreStyles.button}
                      className="w-full max-w-[450px] transition-colors duration-300 hover:!bg-[rgb(199,83,39)] hover:!text-white hover:!border-[rgb(199,83,39)]"
                    >
                      View Events & RSVP Today For Boomer Events (Southern California and Oakland)

                    </button>
                  </Link>
                </div>
              </div>            
            </div>
          </div>

          {/* Right Column - Image with larger container (60%) - Hidden on mobile */}
          <div className="hidden lg:flex w-full lg:w-3/5 flex-shrink-0 justify-end">
            <div className="w-full max-w-[595px]">
              <Image
                src="/media/landing-page/stayConnected.png"
                alt="Medicare Support"
                width={595}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trusted Doctors Section - Full Width with Image to Edge */}
    <section className="w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:block py-6 md:py-8 max-h-[580px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch h-[480px] max-h-[580px]">
          {/* Left Column - Image (50% full width to edge) */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-full">
              <Image
                src="/media/landing-page/trust.png"
                alt="Trusted Doctors"
                width={600}
                height={400}
                className="w-full h-full object-cover object-left-top"
              />
            </div>
          </div>

          {/* Right Column - Content (50% with container alignment) */}
          <div className="w-full lg:w-1/2 flex items-center" style={{ background: '#f9f9f9' }}>
            <div className="container mx-auto">
              <div className="py-6 lg:py-8 px-4 lg:px-8 pl-[50px] text-left" style={{ paddingLeft: '50px' }}>
                {/* Main Headline */}
                <h2 className="text-[22px] leading-[32px] font-medium mb-4" style={{ color: '#083D78' }}>
                  Trusted Doctors. Connected Care.
                </h2>
                
                {/* Introductory paragraph */}
                <p className="text-[18px] leading-[26px] font-normal mb-6" style={{ color: '#3D3D3D' }}>
                  With Altais, you'll find:
                </p>

                {/* Bullet points list */}
                <ul className="space-y-3 mb-8" style={{ paddingLeft: '0', listStyle: 'none' }}>
                  <li className="flex items-start">
                    <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                    <span style={learnMoreStyles.text}>A network of nearly 10,000 local providers</span>
                  </li>
                  <li className="flex items-start">
                    <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                    <span style={learnMoreStyles.text}>Access to top hospitals and specialists</span>
                  </li>
                  <li className="flex items-start">
                    <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                    <span style={learnMoreStyles.text}>Coordinated care, when and where you need it</span>
                  </li>
                  <li className="flex items-start">
                    <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                    <span style={learnMoreStyles.text}>A focus on keeping you healthy, not just treating illness</span>
                  </li>
                </ul>

                {/* Gradient Button */}
                <Link href="/find-care">
                  <button 
                    className="px-6 py-3 text-white rounded-[5px] border border-[#008889] w-full max-w-[465px] btn-gradient"
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #008889',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: '600'
                    }}
                  >
                    Find a Doctor Near You
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
            src="/media/landing-page/trust.png"
            alt="Trusted Doctors"
            width={600}
            height={400}
            className="w-full object-cover object-left-top"
          />
        </div>

        {/* Mobile Content */}
        <div className="w-full px-4 py-8" style={{ background: '#f9f9f9' }}>
          {/* Main Headline */}
          <h2 className="text-[22px] leading-[32px] font-medium mb-4" style={{ color: '#083D78' }}>
            Trusted Doctors. Connected Care.
          </h2>
          
          {/* Introductory paragraph */}
          <p className="text-[18px] leading-[26px] font-normal mb-6" style={{ color: '#3D3D3D' }}>
            With Altais, you'll find:
          </p>

          {/* Bullet points list */}
          <ul className="space-y-3 mb-8" style={{ paddingLeft: '0', listStyle: 'none' }}>
            <li className="flex items-start">
              <span style={learnMoreStyles.bullet} className="mr-3">+</span>
              <span style={learnMoreStyles.text}>A network of nearly 10,000 local providers</span>
            </li>
            <li className="flex items-start">
              <span style={learnMoreStyles.bullet} className="mr-3">+</span>
              <span style={learnMoreStyles.text}>Access to top hospitals and specialists</span>
            </li>
            <li className="flex items-start">
              <span style={learnMoreStyles.bullet} className="mr-3">+</span>
              <span style={learnMoreStyles.text}>Coordinated care, when and where you need it</span>
            </li>
            <li className="flex items-start">
              <span style={learnMoreStyles.bullet} className="mr-3">+</span>
              <span style={learnMoreStyles.text}>A focus on keeping you healthy, not just treating illness</span>
            </li>
          </ul>

          {/* Gradient Button */}
          <Link href="/find-care">
            <button 
              className="px-6 py-3 text-white rounded-[5px] border border-[#008889] w-full btn-gradient"
              style={{
                borderRadius: '5px',
                border: '1px solid #008889',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '600'
              }}
            >
              Find a Doctor Near You
            </button>
          </Link>
        </div>
      </div>
    </section>
{/* 2A Section4a-style CTA Section with image on right */}
    <section className="template-wrapper py-6 md:py-12 pt-[75px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-[70px]">
          {/* Mobile Image - Shows first on mobile */}
          <div className="w-full lg:hidden mb-6">
            <Image
              src="/media/landing-page/guidance.png"
              alt="Medicare Support"
              width={595}
              height={450}
              className="w-full rounded-normal border border-lightPrimary object-cover"
            />
          </div>

          {/* Left Column - Content with smaller container (45%) */}
          <div className="w-full lg:w-[45%] text-left">
            {/* Main Headline */}
            <div className="block mb-6">
              <h2 className="text-[22px] leading-[32px] font-medium mb-4" style={{ color: '#083D78' }}>
                Personal Guidance, Every Step of the Way
              </h2>
            </div>

            {/* 3 sections with content */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div>
                 <p className="text-[18px] leading-[26px] font-normal mb-0 py-0 pb-0" style={{ color: '#3D3D3D', paddingBottom: '0', margin: '0' }}>Altais partners with independent brokers who can answer your Medicare questions and make choosing a plan easier. They'll:</p>

                 {/* List with custom styled bullets */}
                 <ul className="space-y-2 mt-4 mb-0 pl-0" style={{ paddingLeft: '0', listStyle: 'none' }}>
                   <li className="flex items-start">
                     <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                     <span style={learnMoreStyles.text}>Answer your questions about coverage</span>
                   </li>
                   <li className="flex items-start">
                     <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                     <span style={learnMoreStyles.text}>Help you compare plans side-by-side</span>
                   </li>
                   <li className="flex items-start">
                     <span style={learnMoreStyles.bullet} className="mr-3">+</span>
                     <span style={learnMoreStyles.text}>Guide you through enrollment</span>
                   </li>
                 </ul>
                 
                <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>These events are designed to answer your questions, connect you with resources, and support your health.</p>
                
                {/* View Events Button */}
                <div className="mt-0">
                  <p className="text-[18px] leading-[26px] font-normal" style={{ color: '#3D3D3D' }}>Connect with a Medicare Specialist (Altais is not affiliated with these independent brokers)</p>
<p><a target="_blank" href="https://www.blackpointinsurance.com/">BlackPoint (Bay Area)</a> or <a target="_blank" href="https://www.boomers-insurance.com/locations">Boomers (Northern and Southern California)</a> <a href="tel:1-800-815-1943">1-800-815-1943</a></p>

                </div>
              </div>            
            </div>
          </div>

          {/* Right Column - Image with larger container (55%) - Hidden on mobile */}
          <div className="hidden lg:flex w-full lg:w-[55%] flex-shrink-0 justify-end">
            <div className="w-full max-w-[595px]">
              <Image
                src="/media/landing-page/guidance.png"
                alt="Medicare Support"
                width={595}
                height={450}
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>


 {/* Medicare Journey Section - Full Width Gradient */}
    <section 
      className="w-full py-16 md:py-20"
      style={{
        background: 'linear-gradient(to right, #008889, #083D78)'
      }}
    >
      <div className="container mx-auto text-center text-white">
        {/* Headlines */}
      
        <h2 className="mb-4" style={{ color: '#FFF', fontSize: '40px', fontStyle: 'normal', fontWeight: '400', lineHeight: '50px' }}>
          Your Medicare Journey Starts Here
        </h2>
          <p className="text-[16px] font-normal mb-2 flex items-center gap-2 justify-center text-center w-full" style={{ color: '#FFF' }}>
          <span>Annual Enrollment Period Opens:<br /> October 15, 2025</span>
          <span className="mx-2 text-[20px]">&bull;</span>
          <span>Annual Enrollment Period Closes: <br />December 7, 2025</span>
          <span className="mx-2 text-[20px]">&bull;</span>
          <span>Benefits Begin:<br /> January 1, 2026</span>
          <span className="mx-2 text-[20px]">&bull;</span>
          <span>MA Open Enrollment Period:<br /> January 1 – March 31, 2026</span>
        </p>
        <p className="mb-12 mt-10 md:mb-16" style={{ fontSize: '20px', fontStyle: 'normal', fontWeight: '500' }}>
          3 Easy Steps with Altais
        </p>

        {/* Three Connected Boxes */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 max-w-6xl mx-auto">
          {/* Box 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="border-2 btn-hover border-white flex items-center justify-center px-4 py-6" style={{ minWidth: '353px', height: '133.564px', width: '100%', maxWidth: '400px' }}>
              <span className="text-white text-lg md:text-xl font-medium text-center">
                <a href="/find-care">Find a doctor you can trust</a>
              </span>
            </div>
          </div>

          {/* Connecting Line 1 */}
          <div className="flex items-center justify-center">
            <div className="w-px h-8 md:w-16 md:h-px bg-white"></div>
          </div>

          {/* Box 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="border-2 btn-hover border-white flex items-center justify-center px-4 py-6" style={{ minWidth: '353px', height: '133.564px', width: '100%', maxWidth: '400px' }}>
              <span className="text-white text-lg md:text-xl font-medium text-center">
                <a href="#rsvp-events">RSVP for an upcoming event</a>
              </span>
            </div>
          </div>

          {/* Connecting Line 2 */}
          <div className="flex items-center justify-center">
            <div className="w-px h-8 md:w-16 md:h-px bg-white"></div>
          </div>

          {/* Box 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="border-2 btn-hover border-white flex items-center justify-center px-4 py-6" style={{ minWidth: '353px', height: '133.564px', width: '100%', maxWidth: '400px' }}>
              <span className="text-white text-lg md:text-xl font-medium text-center">
                <a href="https://www.medicare.gov">Explore resources on Medicare.gov</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Compliance/Disclaimer Section - Based on Section2a format */}
    <section
      className="template-wrapper pt-12 md:pt-[60px] pb-[73px] md:pb-[54px]"
    >
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
            <h2 className="text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] text-bluePrimary mb-6">
              Compliance / Disclaimer
            </h2>
            <div className="text-lg leading-[32px] text-grey3d space-y-4">
              <p>
We are not endorsed by or affiliated with the federal Medicare program. BlackPoint and Boomers Insurance Services are independent insurance agents that work with other providers and health plans. BlackPoint and Boomers Insurance Services are not affiliated with Altais. 
              </p>
            
            </div>
          </div>
        </div> 
      </div>
    </section>

   


      </div>
    </LayoutLp>
  );
}
