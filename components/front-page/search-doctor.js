"use client";

export default function SearchDoctor() {
  return (
    <section className="block pt-[50px] md:pt-14 pb-[73px] md:pb-15 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="block w-full md:w-[40%] max-w-[470px]">
            <p className="text-lg leading-[35px]">
              <b className="text-[#1D3F76]">Everyone deserves care that's compassionate, </b>
              <br /> connected, and rooted in the communities they call home.
              Altais is the healthcare provider that makes this possible by
              supporting physicians and care teams—so you can get high-quality
              care, when and where you need it.
            </p>
          </div>
          {/* Vertical Separator */}
          <div className="w-full md:w-[1px] h-[1px] md:h-[155px] bg-[#C75327] my-6 md:my-0 max-0 md:mx-10"></div>

          <div className="block">
            <h2 className="text-[26px] leading-[36px] text-[#083D78]">Search Doctors</h2>

          </div>
        </div>
      </div>
    </section>
  );
}
