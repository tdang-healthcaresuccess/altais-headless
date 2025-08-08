export default function AboutInfo() {
  return (
    <section className="block pt-0 md:pt-[50px] bg-white pb-[73px] md:pb-15 px-4 md:px-0 shadow-[0px_2px_3px_1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto">
        <div className="block md:flex justify-center items-start">
          {/* Vertical Separator */}
          <div className="block md:hidden w-full md:w-[1px] h-[1px] md:h-[146px] bg-[#c75327] my-6 md:my-0 max-0 md:mx-10"></div>
          {/* Left Column */}
          <div className="flex justify-start md:justify-end">
            <h3 className="flex flex-col font-medium text-[22px] leading-[32px] text-left max-w-full md:max-w-[250px] text-[#083D78] mb-3 md:mb-0">
              Learn More About <br className="hidden md:block" /> Altais
            </h3>
          </div>

          {/* Vertical Separator */}
          <div className="hidden md:block w-full md:w-[1px] h-[1px] md:h-[146px] bg-[#c75327] my-6 md:my-0 max-0 md:mx-10"></div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[540px]">
            <p className="text-[#3D3D3D] text-lg leading-[32px] font-normal text-left">
              At Altais, we believe high-quality care starts by supporting the people who deliver it. That’s why we’re building a new kind of healthcare experience — one where physicians are empowered and patients feel truly cared for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
