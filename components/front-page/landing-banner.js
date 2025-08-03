
"use client";

import { clsx } from "clsx";
import { useMediaQuery } from "react-responsive";
import { ChevronRight } from "lucide-react";

export default function LandingBanner() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <section className="flex items-center">
      <div className="relative w-full h-full md:h-[400px]">
        {/* Background image */}
        <div
          className={clsx(
            "md:absolute inset-0 bg-cover bg-center",
            isMobile
              ? "bg-landing-banner-mobile min-h-[400px]"
              : "bg-landing-banner"
          )}
        ></div>

        {/* Content container over the image */}
        <div className="container mx-auto relative z-10 h-full">
          <div className="p-6 pb-10 md:pb-6 md:p-0 md:w-[40%] h-full flex flex-col justify-center">
            <h1 className="font-poppins text-[32px] md:text-[45px] leading-[45px] md:leading-[65px] text-[#083D78]">
              Shaping the future of healthcare.
            </h1>
            <button className="btn-gradient btn-md w-full md:w-[250px] flex-center gap-1 mt-8 md:mt-15">
              Find Care <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
