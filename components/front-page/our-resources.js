"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PatientsMedia from "@/public/media/patients-home.png";
import ProvidersMedia from "@/public/media/providers-home.png";
import PartnersMedia from "@/public/media/partners-home.png";

export default function OurResources() {
  return (
    <section className="block pt-12 md:pt-14 pb-[73px] md:pb-[75px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-7">
          <div className="flex flex-1 mb-4 md:mb-12 gap-6">
            <div className="block">
              <Image
                src={PatientsMedia}
                alt="Patients"
                className="rounded-normal border border-secondary w-[130px] min-w-[130px] h-[130px]"
              />
            </div>
            <div className="block w-full md:w-auto">
              <h3 className="text-[22px] leading-[36px] text-bluePrimary mb-3">
                Patients
              </h3>
              <ul>
                <li>
                  <Link
                    href="/patient-resources/"
                    className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                  >
                    <ChevronRight className="w-[20px] h-[20px]" /> Patient
                    Resources
                  </Link>
                </li>
                <div className="w-full h-[1px] bg-lightPrimary my-3"></div>
                <li>
                  <Link
                    href="/insurance-accepted/"
                    className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                  >
                    <ChevronRight className="w-[20px] h-[20px]" /> Accepted
                    Insurance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* 1 */}
          <div className="flex flex-1 mb-4 md:mb-12 gap-6">
            <div className="block">
              <Image
                src={ProvidersMedia}
                alt="Providers"
                className="rounded-normal border border-secondary w-[130px] min-w-[130px] h-[130px]"
              />
            </div>
            <div className="block w-full md:w-auto">
              <h3 className="text-[22px] leading-[36px] text-bluePrimary mb-3">
                Providers
              </h3>
              <ul>
                <li>
                  <Link
                    href="/for-providers/service-solutions/"
                    className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                  >
                    <ChevronRight className="w-[20px] h-[20px]" /> Provider
                    Resources
                  </Link>
                </li>
                <div className="w-full h-[1px] bg-lightPrimary my-3"></div>
                <li>
                  <Link
                    href="/join-us/"
                    className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                  >
                    <ChevronRight className="w-[20px] h-[20px]" /> Join Our Care
                    Network
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-1 mb-[75px] md:mb-12 gap-6">
            <div className="block">
              <Image
                src={PartnersMedia}
                alt="Partners"
                className="rounded-normal border border-secondary w-[130px] min-w-[130px] h-[130px]"
              />
            </div>
            <div className="block w-full md:w-auto">
              <h3 className="text-[22px] leading-[36px] text-bluePrimary mb-3">
                Partners
              </h3>
              <ul>
                <li>
                  <Link
                    href="/for-providers/amg-locations/"
                    className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                  >
                    <ChevronRight className="w-[20px] h-[20px]" /> Locations
                  </Link>
                </li>
                <div className="w-full h-[1px] bg-lightPrimary my-3"></div>
                <li>
                  <Link
                    href="/for-partners/services-and-solutions/"
                    className="text-base leading-[24px] font-medium btn-link-secondary flex gap-1"
                  >
                    <ChevronRight className="w-[20px] h-[20px]" /> Services &
                    Solutions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* 3 */}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="w-full h-[1px] bg-lightPrimary mb-[35px]"></div>
    <div className="flex flex-wrap gap-12 md:gap-8">
      <div className="flex flex-col justify-between w-full md:flex-1">
              <h3 className="mb-4 text-bluePrimary font-medium text-[22px] leading-[32px]">
                Compassion <br className="hidden md:block" />
                at the Core
              </h3>
              <p className="mb-6 normal-content">
                Expect care that feels personal. With more than 10K providers across California, you can find exceptional care when and where you need it.
              </p>
              <Link
                href="/find-care/"
                className="btn-outline-secondary btn-md font-semibold flex-center !w-[165px] !px-2 rounded-normal gap-1"
              >
                Find Care{" "}
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          {/* 1 */}
            <div className="flex flex-col justify-between w-full md:flex-1">
              <h3 className="mb-4 text-bluePrimary font-medium text-[22px] leading-[32px]">
                Partnerships <br className="hidden md:block" />
                that Deliver
              </h3>

              <p className="mb-6 normal-content">
                We're shaping the future of care where smarter systems,
                technology and teamwork to make care better, more affordable,
                and more accessible.
              </p>
              <Link
                href="/services"
                className="btn-outline-secondary btn-md font-semibold flex-center !w-[165px] !px-2 rounded-normal gap-1"
              >
                Our Services{" "}
                <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          {/* 2 */}
          {/* <div className="block flex-auto md:flex-1"> */}
            <div className="flex flex-col justify-between w-full md:flex-1">
              <h3 className="mb-4 text-bluePrimary font-medium text-[22px] leading-[32px]">
                Innovation <br className="hidden md:block" />
                that Anticipates Change
              </h3>

              <p className="mb-6 normal-content">
                We align our innovation with what matters most, healthier lives,
                earlier interventions and care that feels personal.
              </p>
              <Link
                href="/for-providers/service-solutions/"
                className="btn-outline-secondary btn-md font-semibold flex-center !w-[165px] !px-2 rounded-normal gap-1"
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
