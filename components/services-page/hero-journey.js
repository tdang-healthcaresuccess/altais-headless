"use client";



export default function HeroJourney() {
  return (
    <section className="block pt-[50px] md:pt-14 pb-[73px] md:pb-15 px-4 md:px-0 ">
      <div className="container mx-auto">
        <div className="block md:flex justify-center items-start">
          {/* Left Column */}
          <div className="flex justify-center md:justify-end">
            <h3 className="flex flex-col font-medium text-[22px] leading-[32px] text-left max-w-full md:max-w-[250px] text-[#083D78] mb-3 md:mb-0">
              Our Patient Services
            </h3>
          </div>

          {/* Vertical Separator */}
          <div className="w-full md:w-[1px] h-[1px] md:h-[113px] bg-[#C75327] my-6 md:my-0 max-0 md:mx-10"></div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[540px]">
            <p className="text-grey3d text-lg font-normal text-center md:text-left">
              With more than 10K highly skilled professionals dedicated to
              delivering high-quality care with compassion, Altais is ready to
              honor every healthcare journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
