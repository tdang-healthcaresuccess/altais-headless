"use client";

export default function HeroJourney({ heading, heading2, description }) {
  return (
    <section className="block pt-0 md:pt-14 pb-[70px] md:pb-15 box-shadow-custom3">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-11 pt-6 md:pb-0">
          {/* Left Column */}
          <div className="flex justify-start md:justify-end w-full md:w-auto">
            <h3 className="flex flex-col font-medium text-[22px] leading-[32px] text-left max-w-full md:max-w-[250px] text-bluePrimary">
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
          <div className="block max-w-full flex-1 md:max-w-[580px] md:pl-9 md:border-t-0 md:border-l border-secondary">
            <p className="text-grey3d text-lg !leading-[35px] font-normal text-left">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
