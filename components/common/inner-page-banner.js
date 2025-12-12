"use client";

import { clsx } from "clsx";
import { useMediaQuery } from "react-responsive";

export default function InnerPageBanner({
  heading,
  DesktopBanner,
  MobileBanner,
  desktopImageUrl,
  mobileImageUrl,
  useDefaultImage = true,
  heading2,
  enableHeroGradient = false,
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
          style={
            useDefaultImage
              ? {}
              : {
                  backgroundImage: `url('${
                    isMobile
                      ? mobileImageUrl || desktopImageUrl
                      : desktopImageUrl
                  }')`,
                }
          }
        ></div>

        {/* White gradient overlay (left to right, 0-35%) */}
        {enableHeroGradient && (
          <div
            className="md:absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0) 65%)'
            }}
          ></div>
        )}

        {/* Content container over the image */}
        <div className="container mx-auto relative z-10 h-full">
            <div
              className={clsx(
                "w-full md:w-[60%] h-full flex flex-col justify-start pt-6 md:pt-12",
                (heading && (heading.length + (heading2 ? heading2.length : 0) > 80))
                  ? "lg:w-[65%]"
                  : "lg:w-[40%]"
              )}
            >
            <h1 className="font-poppins text-[30px] md:text-[45px] leading-[45px] md:leading-[65px] text-bluePrimary">
              {heading}
              {heading2 && (
                <>
                  <br /> {heading2}
                </>
              )}
            </h1>
            {/* Vertical Separator */}
            <div className="flex md:hidden w-full md:w-[1px] h-[1px] md:h-[113px] bg-secondary mt-7 md:mt-0 max-0 md:mx-10"></div>
          </div>
        </div>
        {/* StarBreak image container */}
        <div
          className={clsx(
            "absolute top-0 right-0 z-20 w-[180px] bg-arc-design md:w-[260px] bg-no-repeat bg-cover bg-right pointer-events-none",
            isMobile ? "min-h-[400px]" : "h-full"
          )}
        ></div>
      </div>
    </section>
  );
}
