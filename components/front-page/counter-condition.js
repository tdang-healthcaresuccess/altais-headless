"use client";

import { ChevronRight } from "lucide-react";
import ConditionTreatBanner from "@/public/media/condition-treat.png";
import Image from "next/image";
import Link from "next/link";

export default function CounterCondition() {
  return (
    <section className="block pt-[60px]">
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

          <div className="w-full h-[1px] bg-[#008889] mb-[85px]"></div>

          <div className="flex border border-[#008889] rounded-[5px] mb-[45px]">
            <div className="block w-[22%] p-8">
              <h3 className="text-[#083D78] text-[26px] leading-[36px] font-light mb-12">
                <b>Conditions We Treat</b><br /> Patient Resources & Health
                Information
              </h3>
              <div className="w-full h-[1px] bg-[#008889] mb-[15px]"></div>
              <Link href="/#" className="flex gap-1 text-[#C75327] text-[17px] leading-[24px]">
              To Conditions Page 
              <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
            <div className="block">
              <Image src={ConditionTreatBanner} alt="banner" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
