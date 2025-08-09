"use client";

import { clsx } from "clsx";
import { useMediaQuery } from "react-responsive";

export default function InnerPageBanner({
  heading,
  DesktopBanner,
  MobileBanner,
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <section className="flex items-center">
      <div className="relative w-full h-full md:h-[400px]">
        {/* Background image */}
        <div
          className={clsx(
            "md:absolute inset-0 bg-cover bg-right",
            isMobile ? `${MobileBanner} min-h-[400px]` : DesktopBanner
          )}
        ></div>

        {/* Content container over the image */}
        <div className="container mx-auto relative z-10 h-full pt-6 md:pt-0">
          <div className="md:p-0 md:w-[40%] h-full flex flex-col justify-center">
            <h1 className="font-poppins text-[32px] md:text-[45px] leading-[45px] md:leading-[65px] text-[#083D78]">
              {heading}
            </h1>
          </div>
          {/* Vertical Separator */}
          <div className="flex md:hidden w-full md:w-[1px] h-[1px] md:h-[113px] bg-[#C75327] my-7 md:my-0 max-0 md:mx-10"></div>
        </div>
      </div>
    </section>
  );
}
