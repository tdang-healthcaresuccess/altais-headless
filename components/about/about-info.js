export default function AboutInfo() {
  return (
    <section className="block pt-[50px] bg-white md:pt-14 pb-[73px] md:pb-15 px-4 md:px-0 box-shadow-custom3">
      <div className="container mx-auto">
        <div className="block md:flex justify-center items-start">
          {/* Left Column */}
          <div className="flex justify-center md:justify-end">
            <h3 className="flex flex-col font-medium tetx-[22px] leading-[32px] text-center md:text-left max-w-[250px] text-[#083D78]">
              Learn More About <br /> Altais
            </h3>
          </div>

          {/* Vertical Separator */}
          <div className="w-full md:w-[1px] h-[1px] md:h-[146px] bg-[#c75327] my-6 md:my-0 max-0 md:mx-10"></div>

          {/* Right Column */}
          <div className="block max-w-full md:max-w-[540px]">
            <p className="text-[#3D3D3D] text-lg leading-[32px] font-normal text-center md:text-left">
              At Altais, we believe high-quality care starts by supporting the people who deliver it. That’s why we’re building a new kind of healthcare experience — one where physicians are empowered and patients feel truly cared for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
