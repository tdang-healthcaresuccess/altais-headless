"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ServicesMedia1 from "@/public/media/services-1.png";

export default function OurServices() {
  return (
    <section className="block pt-[50px] md:pt-[75px] pb-[73px] md:pb-[95px] px-4 md:px-0 shadow-[inset_0px_2px_4px_0px_#3D3D3D]">
      <div className="flex">
        <div className="block border border-[#008889] rounded-[5px]">
          <Image
            src={ServicesMedia1}
            alt="primary care"
            className="object-cover max-h-[170px]"
          />
        </div>
        <div className="block">
          <h3 className="text-[22px] leading-[32px] text-[#083D78]">
            Primary Care
          </h3>
          <p className="text-lg leading-[32px] text-[#3D3D3D] mb-7">
            Your first stop for personalized care from physicians you know and
            trust — focused on prevention, long-term health, and everyday needs.
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
      <div className="flex-center">
        <Link href="/#">See All Services</Link>
      </div>
    </section>
  );
}
