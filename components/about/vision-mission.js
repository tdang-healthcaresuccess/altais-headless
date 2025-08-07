import Image from "next/image";
import VisionMissionMedia from "@/public/media/vision-mission-media.png";

export default function VisionMission() {
  return (
    <section className="block pt-[50px] bg-white md:pt-14 pb-[73px] md:pb-15 px-4 md:px-0 box-shadow-custom3">
      <div className="container mx-auto">
        <div className="block md:flex justify-between items-start gap-[75px]">
          {/* Left Column */}
          <div className="flex justify-center md:justify-end min-w-full md:min-w-[425px]">
            <Image
              src={VisionMissionMedia}
              alt="Vision Mission"
              className="w-full border border-[#008889] rounded-[5px]"
            />
          </div>

          {/* Right Column */}
          <div className="block w-full">
            <div className="block">
              <h4 className="text-[22px] leading-[32px] text-[#083D78] mb-2">
                Our Mission
              </h4>
              <p className="text-[18px] leading-[32px] text-[#3d3d3d]">
                To ignite an exceptional healthcare system that cultivates the
                health and well-being of physicians, patients, and the clinical
                community.
              </p>
            </div>
            {/* Vertical Separator */}
            <div className="w-full h-[1px]  bg-[#008889] my-12"></div>
            <div className="block">
              <h4 className="text-[22px] leading-[32px] text-[#083D78] mb-2">
                Our Vision
              </h4>
              <p className="text-[18px] leading-[32px] text-[#3d3d3d]">
                We envision a future where every person receives exceptional
                care — led by supported physicians, connected by innovative
                technology, and rooted in trust, compassion, and community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
