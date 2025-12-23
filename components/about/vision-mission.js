import Image from "next/image";
import VisionMissionMedia from "@/public/media/vision-mission-media.png";

export default function VisionMission({ image, content }) {
  return (
    <section className="block pt-[75px] bg-white md:pt-[75px] box-shadow-custom3">
      <div className="container mx-auto">
        <div className="block md:flex justify-between items-start gap-[75px] pb-[75px]">
          {/* Left Column */}
          <div className="flex justify-center md:justify-end min-w-full md:min-w-[425px] mb-10 md:mb-0">
            <Image
              src={image || VisionMissionMedia}
              alt="Vision Mission"
              className="w-full border border-primary rounded-normal"
              width={425}
              height={400}
            />
          </div>

          {/* Right Column */}
          <div className="block w-full" dangerouslySetInnerHTML={{ __html: content || `<div class="block"><h4 class="text-[22px] leading-[32px] text-bluePrimary mb-2">Our Mission</h4><p class="text-[18px] leading-[32px] text-grey3d">To ignite an exceptional healthcare system that cultivates the health and well-being of physicians, patients, and the clinical community.</p></div><div class="w-full h-[1px] bg-lightPrimary my-12"></div><div class="block"><h4 class="text-[22px] leading-[32px] text-bluePrimary mb-2">Our Vision</h4><p class="text-[18px] leading-[32px] text-grey3d">We envision a future where every person receives exceptional care — led by supported physicians, connected by innovative technology, and rooted in trust, compassion, and community.</p></div>` }} />
        </div>
        <div className="hidden md:block w-full h-[1px] bg-lightPrimary"></div>
      </div>
    </section>
  );
}