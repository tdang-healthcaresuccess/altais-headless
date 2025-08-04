"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServicesMedia1 from "@/public/media/services-1.png";
import ServicesMedia2 from "@/public/media/services-2.png";
import ServicesMedia3 from "@/public/media/services-3.png";
import ServicesMedia4 from "@/public/media/services-4.png";

export default function OurServices() {
  return (
    <section className="block pt-[50px] md:pt-[75px] pb-[73px] md:pb-[95px] px-4 md:px-0 shadow-[inset_0px_2px_4px_0px_#3D3D3D]">
      <div className="block container mx-auto">
        <div className="flex flex-wrap gap-10">
          <div className="block mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-[#008889] rounded-[5px] mb-6">
              <Image
                src={ServicesMedia1}
                alt="primary care"
                className="object-cover max-h-[170px]"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-[#083D78] mb-3">
                Primary Care
              </h3>
              <p className="text-lg leading-[32px] text-[#3D3D3D] mb-7">
                Your first stop for personalized care from physicians you know
                and trust — focused on prevention, long-term health, and
                everyday needs.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[17px] leading-[24px]"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>
          {/* Services 1 */}
          <div className="block mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-[#008889] rounded-[5px] mb-6">
              <Image
                src={ServicesMedia2}
                alt="Mental Health"
                className="object-cover max-h-[170px]"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-[#083D78] mb-3">
                Mental Health
              </h3>
              <p className="text-lg leading-[32px] text-[#3D3D3D] mb-7">
                Compassionate, whole-person support for emotional wellness by
                trusted care providers.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[17px] leading-[24px]"
              >
                See Mental Health Services
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>
          {/* Services 2 */}
          <div className="block mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-[#008889] rounded-[5px] mb-6">
              <Image
                src={ServicesMedia3}
                alt="Pediatrics"
                className="object-cover max-h-[170px]"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-[#083D78] mb-3">
                Pediatrics
              </h3>
              <p className="text-lg leading-[32px] text-[#3D3D3D] mb-7">
                Compassionate, whole-person support for emotional wellness by
                trusted care providers.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[17px] leading-[24px]"
              >
                Learn About Pediatric Care
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>
          {/* Services 3 */}
          <div className="block mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-[#008889] rounded-[5px] mb-6">
              <Image
                src={ServicesMedia4}
                alt="Senior Health Care"
                className="object-cover max-h-[170px]"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-[#083D78] mb-3">
                Senior Health Care
              </h3>
              <p className="text-lg leading-[32px] text-[#3D3D3D] mb-7">
                Stay well and active with care programs to support you at every step, from Medicare Advantage plans to Annual Wellness exams.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[17px] leading-[24px]"
              >
                Explore Senior Services
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>
          {/* Services 4 */}
        </div>
        <div className="flex-center">
          <Link
            href="/our-services"
            className="btn-gradient btn-md flex-center gap-1 mt-8 w-full md:w-[534px]"
          >
            See All Services{" "}
            <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
