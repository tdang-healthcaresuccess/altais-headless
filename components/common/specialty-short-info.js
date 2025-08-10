import Image from "next/image";
import SpecialtyBanner from "@/public/media/specialty-banner.png";

export default function SpecialityShortInfo() {
  return (
    <section className="block pt-8 md:pt-[36px] pb-6 border-b border-bluePrimaryLite">
      <div className="block md:flex justify-between items-start gap-12">
        {/* Left Column */}
        <div className="flex justify-center md:justify-end min-w-full md:min-w-[360px] mb-10 md:mb-0">
          <Image
            src={SpecialtyBanner}
            alt="Specialty"
            className="w-full border border-primary rounded-normal"
          />
        </div>

        {/* Right Column */}
        <div className="block w-full">
          <div className="block">
            <h4 className="text-[22px] leading-[32px] text-bluePrimary mb-2">
              Specialty Name etc etc
            </h4>
            <p className="text-[18px] leading-[32px] text-grey3d">
              Lorem ipsum dolor sit amet consectetur. Faucibus imperdiet sed
              vitae sed diam mauris. Consequat purus augue amet tellus id ornare
              cursus molestie massa. Amet integer sit dignissim massa ut
              senectus tortor odio quisque. Nullam venenatis scelerisque montes
              vitae tristique ut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
