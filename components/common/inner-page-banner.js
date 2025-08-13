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

        {/* Content container over the image */}
        <div className="container mx-auto relative z-10 h-full pt-6 md:pt-0">
          <div className="md:p-0 md:w-[40%] h-full flex flex-col justify-center px-6 md:px-0">
            <h1 className="font-poppins text-[32px] md:text-[45px] leading-[45px] md:leading-[65px] text-bluePrimary">
              {heading}
              {heading2 && (
                <>
                  <br /> {heading2}
                </>
              )}
            </h1>
            {/* Vertical Separator */}
            <div className="flex md:hidden w-full md:w-[1px] h-[1px] md:h-[113px] bg-secondary my-7 md:my-0 max-0 md:mx-10"></div>
          </div>
        </div>
        {/* StarBreak image container */}
        <div
          className={clsx(
            "absolute top-0 right-0 z-20 w-[180px] md:w-[260px] bg-no-repeat bg-cover bg-right pointer-events-none",
            isMobile ? "min-h-[400px]" : "h-full"
          )}
          style={{
            backgroundImage: "url('/media/StarBreak_RegularCombo3.png')",
          }}
        ></div>
      </div>
    </section>
  );
}
