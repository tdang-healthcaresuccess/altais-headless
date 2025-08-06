"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PatientsMedia from "@/public/media/patients-home.png"
import ProvidersMedia from "@/public/media/providers-home.png"
import PartnersMedia from "@/public/media/partners-home.png"

export default function OurResources() {
  return (
    <section className="block pt-[50px] md:pt-14 pb-[73px] md:pb-[75px] px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-7">
          <div className="flex flex-1 mb-12 gap-6">
            <div className="block">
              <Image src={PatientsMedia} alt="Patients" className="rounded-[5px] border border-[#C75327] w-[130px] min-w-[130px] h-[130px]" />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[36px] text-[#083D78] mb-3">Patients</h3>
              <ul>
                <li><Link href="/#" className="text-[16px] leading-[24px] text-[#C75327] flex gap-1"><ChevronRight className="w-[20px] h-[20px] text-[#C75327]" /> Patient Resources</Link></li>
                <div className="w-full h-[1px] bg-[#008889] my-3"></div>
                <li><Link href="/#" className="text-[16px] leading-[24px] text-[#C75327] flex gap-1"><ChevronRight className="w-[20px] h-[20px] text-[#C75327]" /> Accepted Insurance</Link></li>
              </ul>
            </div>
          </div>
          {/* 1 */}
          <div className="flex flex-1 mb-12 gap-6">
            <div className="block">
              <Image src={ProvidersMedia} alt="Providers" className="rounded-[5px] border border-[#C75327] w-[130px] min-w-[130px] h-[130px]" />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[36px] text-[#083D78] mb-3">Providers</h3>
              <ul>
                <li><Link href="/#" className="text-[16px] leading-[24px] text-[#C75327] flex gap-1"><ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />  Provider Resources</Link></li>
                <div className="w-full h-[1px] bg-[#008889] my-3"></div>
                <li><Link href="/#" className="text-[16px] leading-[24px] text-[#C75327] flex gap-1"><ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />  Join Our Care Network</Link></li>
              </ul>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-1 mb-12 gap-6">
            <div className="block">
              <Image src={PartnersMedia} alt="Partners" className="rounded-[5px] border border-[#C75327] w-[130px] min-w-[130px] h-[130px]" />
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[36px] text-[#083D78] mb-3">Partners</h3>
              <ul>
                <li><Link href="/#" className="text-[16px] leading-[24px] text-[#C75327] flex gap-1"><ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />  Locations</Link></li>
                <div className="w-full h-[1px] bg-[#008889] my-3"></div>
                <li><Link href="/#" className="text-[16px] leading-[24px] text-[#C75327] flex gap-1"><ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />  Services & Solutions</Link></li>
              </ul>
            </div>
          </div>
          {/* 3 */}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="w-full h-[1px] bg-[#00888980] mb-[35px]"></div>
        <div className="flex flex-wrap gap-12 md:gap-8">
          <div className="block flex-auto md:flex-1">
            <h3 className="mb-4 text-[#083D78] font-medium text-[22px] leading-[32px]">
              Compassion <br className="hidden md:block" />
              at the Core
            </h3>
            <p className="mb-6 text-[#3d3d3d]">
              Expect care that feels personal. With more than 10K providers
              across California, you can find exceptional care when and where
              you need it.
            </p>
            <Link
              href="/#"
              className="btn-outline-primary btn-sm flex-center !w-[165px] !px-2 rounded-[5px] gap-1 mt-8"
            >
              Find Care{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
          {/* 1 */}
          <div className="block flex-auto md:flex-1">
            <h3 className="mb-4 text-[#083D78] font-medium text-[22px] leading-[32px]">
              Partnerships <br className="hidden md:block" />
              that Deliver
            </h3>
            <p className="mb-6 text-[#3d3d3d]">
              We’re shaping the future of care where smarter systems, technology and teamwork to make care better, more affordable, and more accessible.
            </p>
            <Link
              href="/#"
              className="btn-outline-primary btn-sm flex-center !w-[165px] !px-2 rounded-[5px] gap-1 mt-8"
            >
              Our Services{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
          {/* 2 */}
          <div className="block flex-auto md:flex-1">
            <h3 className="mb-4 text-[#083D78] font-medium text-[22px] leading-[32px]">
              Innovation <br className="hidden md:block" />
              that Anticipates Change
            </h3>
            <p className="mb-6 text-[#3d3d3d]">
              We align our innovation with what matters most, healthier lives, earlier interventions and care that feels personal.
            </p>
            <Link
              href="/#"
              className="btn-outline-primary btn-sm flex-center !w-[165px] !px-2 rounded-[5px] gap-1 mt-8"
            >
              Learn More{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
          {/* 3 */} 
        </div>
      </div>
    </section>
  );
}
