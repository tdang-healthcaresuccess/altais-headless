"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServicesMedia1 from "@/public/media/services-1.png";
import ServicesMedia2 from "@/public/media/services-2.png";
import ServicesMedia3 from "@/public/media/services-3.png";
import ServicesMedia4 from "@/public/media/services-4.png";

export default function OurServices({ hideViewAll = true }) {
  return (
    <section className="block pt-[50px] md:pt-[75px] pb-[73px] md:pb-[95px] px-4 md:px-0 shadow-custom">
      <div className="block container mx-auto">
        <div className="flex flex-wrap gap-10 items-stretch">
          <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-6">
              <Image
                src={ServicesMedia1}
                alt="primary care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3">
                Primary Care
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                Your first stop for personalized care from physicians you know
                and trust — focused on prevention, long-term health, and
                everyday needs.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-[17px] leading-[24px]"
              >
                Learn More
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
          {/* Services 1 */}
          <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-6">
              <Image
                src={ServicesMedia2}
                alt="Mental Health"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3">
                Mental Health
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                Compassionate, whole-person support for emotional wellness by
                trusted care providers.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-[17px] leading-[24px]"
              >
                See Mental Health Services
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
          {/* Services 2 */}
          <div className="flex flex-col mb-6 md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-6">
              <Image
                src={ServicesMedia3}
                alt="Pediatrics"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3">
                Pediatrics
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                Compassionate, whole-person support for emotional wellness by
                trusted care providers.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-[17px] leading-[24px]"
              >
                Learn About Pediatric Care
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
          {/* Services 3 */}
          <div className="flex flex-col mb-[60px] md:mb-[75px] w-full md:w-[calc(50%-20px)]">
            <div className="block border border-primary rounded-normal mb-6">
              <Image
                src={ServicesMedia4}
                alt="Senior Health Care"
                className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
              />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3">
                Senior Health Care
              </h3>
              <p className="text-lg leading-[32px] text-grey3d mb-7">
                Stay well and active with care programs to support you at every
                step, from Medicare Advantage plans to Annual Wellness exams.
              </p>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 font-medium btn-link-secondary border-t border-lightPrimary text-[17px] leading-[24px]"
              >
                Explore Senior Services
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
          {/* Services 4 */}
        </div>
        {hideViewAll && (
          <div className="flex-center">
            <Link
              href="/services"
              className="btn-gradient btn-md flex-center gap-1 mt-0 md:mt-8 w-full md:w-[534px]"
            >
              See All Services{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
