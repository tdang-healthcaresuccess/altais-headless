"use client";

import { ChevronRight } from "lucide-react";
import ConditionTreatBanner from "@/public/media/condition-treat.png";
import FindDoctorBanner from "@/public/media/find-doctor-banner.png";
import Image from "next/image";
import Link from "next/link";

export default function CounterCondition() {
  return (
    <section className="block py-[60px] px-6 md:px-0">
      <div className="container mx-auto">
        <div className="block w-full">
          <ul className="block md:flex justify-center items-start w-full pb-10">
            <li className="countlist">
              <h3 className="countlist-h3">09</h3>
              <p className="countlist-p">HMO Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">17</h3>
              <p className="countlist-p">PPO Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">09</h3>
              <p className="countlist-p">Medicare Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">02</h3>
              <p className="countlist-p">Medi-Cal Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">30+</h3>
              <p className="countlist-p">Hospitals + Centers of Excellence</p>
            </li>
          </ul>

          <div className="w-full h-[1px] bg-[#00888980] mb-[85px]"></div>

          <div className="flex flex-col md:flex-row border border-[#008889] rounded-[5px] mb-10 md:mb-[45px]">
            <div className="flex flex-col justify-between w-full md:w-[28%] p-7 max-w-full md:max-w-[290px] order-2 md:order-1">
              <h3 className="text-[#083D78] text-[26px] leading-[36px] font-light mb-12">
                <b>Conditions We Treat</b>
                <br /> Patient Resources & Health Information
              </h3>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[17px] leading-[24px]"
              >
                To Conditions Page
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
            <div className="block w-full order-1 md:order-2">
              <Image
                src={ConditionTreatBanner}
                alt="banner"
                className="w-full rounded-tr-[4px] rounded-br-[4px]"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row border border-[#008889] rounded-[5px] mb-[45px]">
            <div className="block w-full">
              <Image
                src={FindDoctorBanner}
                alt="banner"
                className="w-full rounded-tl-[4px] rounded-bl-[4px]"
              />
            </div>
            <div className="flex flex-col justify-between w-full md:w-[28%] p-7 max-w-full md:max-w-[290px]">
              <h3 className="text-[#083D78] text-[26px] leading-[36px] font-light mb-12">
                <b>Find a Doctor</b>
                <br /> or Clinic Near You
              </h3>
              <Link
                href="/#"
                className="pt-4 flex justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[17px] leading-[24px]"
              >
                Find a Location Near You
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>

          {/* New Education Slider Section */}
          <div className="flex flex-col md:flex-row border border-[#008889] rounded-[5px] p-0 md:p-7 gap-5 md:gap-7 items-start">
            <div className="block w-full md:max-w-[170px] order-2 md:order-1 px-7 md:px-0">
              <h3 className="text-[#083D78] text-[26px] border-b md:border-none border-[#00888980] pb-7 md:pb-0 leading-[36px] font-light">
                <b> News, Education + Insights</b>
                <br /> from Altais
              </h3>
            </div>
            <div className="block w-full order-1 md:order-2">
              <div className="bg-half-star-slider inset-0 bg-contain bg-no-repeat bg-right min-h-[148px] bg-[#111638] rounded-bl-[0px] md:rounded-bl-[5px] rounded-br-[0px] md:rounded-br-[5px] rounded-[5px] p-7">
                sdasd
              </div>
            </div>
            <div className="block w-full md:max-w-[170px] order-3 md:order-3 px-7 md:px-0 pb-7 md:pb-0">
              <ul>
                <li>
                  <Link href="/#" className="list-items1">
                    <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="list-items1">
                    <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="list-items1">
                    <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
                    Patient Education
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
