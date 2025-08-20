"use client";

export default function HeroJourney({ heading, heading2, description }) {
  return (
    <section className="block pt-0 md:pt-14 pb-[70px] md:pb-15 px-6 md:px-0 box-shadow-custom3">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-11">
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
          </div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[580px] pt-6 md:pt-0 md:pl-9 border-t md:border-t-0 md:border-l border-secondary">
            <p className="text-grey3d text-lg font-normal text-left">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
