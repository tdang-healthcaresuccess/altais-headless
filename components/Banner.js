
"use client";

import { clsx } from "clsx";
import { useMediaQuery } from "react-responsive";

export default function LandingBanner({heading, subheading,description}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <section className="flex items-center">
      <div className="relative w-full h-full md:h-[400px]">
        {/* Background image */}
        <div
          className={clsx(
            "md:absolute inset-0 bg-cover bg-center",
            isMobile
              ? "bg-services-banner-mobile min-h-[400px]"
              : "bg-services-banner"
          )}
        ></div>

        {/* Content container over the image */}
        <div className="container mx-auto relative z-10 h-full">
          <div className="p-6 pb-10 md:pb-6 md:p-0 md:w-[40%] h-full flex flex-col justify-center">
                        <h1 className="font-poppins text-[32px] md:text-[45px] leading-[45px] md:leading-[65px] text-[#083D78]">
              {heading && heading.trim()
                ? heading
                : "Compassionate, Affordable CareShaping the future of healthcare."}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
