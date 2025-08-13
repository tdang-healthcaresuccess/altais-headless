"use client";

export default function HeroJourney({ heading, heading2, description }) {
  return (
    <section className="block pt-0 md:pt-14 pb-[70px] md:pb-15 px-6 md:px-0 ">
      <div className="container mx-auto">
        <div className="block md:flex justify-center items-start">
          {/* Left Column */}
          <div className="flex justify-start md:justify-end">
            <h3 className="flex flex-col font-medium text-[22px] leading-[32px] text-left max-w-full md:max-w-[250px] text-bluePrimary mb-3 md:mb-0">
              {heading}
              {heading2 && (
                <>
                  <br className="hidden md:block" />
                  {heading2}
                </>
              )}
            </h3>
            {/* Vertical Separator */}
            <div className="hidden md:flex w-full md:w-[1px] h-[1px] md:h-[113px] bg-secondary my-6 md:my-0 max-0 md:mx-10"></div>
          </div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[540px]">
            <p className="text-grey3d text-lg font-normal text-left">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
