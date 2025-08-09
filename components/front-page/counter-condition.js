"use client";

import { ChevronRight } from "lucide-react";
import ConditionTreatBanner from "@/public/media/condition-treat.png";
import FindDoctorBanner from "@/public/media/find-doctor-banner.png";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function CounterCondition() {
  return (
    <section className="block py-[60px] px-6 md:px-0">
      <div className="container mx-auto">
        <div className="block w-full">
          <ul className="flex flex-wrap gap-10 justify-center items-start w-full pb-10">
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
            <li className="countlist px-5 md:px-0">
              <h3 className="countlist-h3">30+</h3>
              <p className="countlist-p">Hospitals + Centers of Excellence</p>
            </li>
          </ul>

          <div className="w-full h-[1px] bg-[#00888980] mb-[85px]"></div>

          <div className="flex flex-col md:flex-row border border-primary rounded-[5px] mb-10 md:mb-[45px]">
            <div className="flex flex-col justify-between w-full md:w-[30%] p-7 max-w-full md:max-w-[298px] order-2 md:order-1">
              <h3 className="text-[#083D78] text-[26px] sm:text-[18px] md:text-[18px] lg:text-[26px] md:leading-[20px] lg:leading-[36px] font-light mb-12">
                <b className="font-medium">Conditions We Treat</b>
                <br /> Patient Resources & Health Information
              </h3>
              <Link
                href="/#"
                className="pt-4 flex font-medium justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[18px] sm:text-[15px] md:text-[12px] lg:text-[17px] leading-[24px]"
              >
                To Conditions Page
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
            <div className="block w-full order-1 md:order-2">
              <Image
                src={ConditionTreatBanner}
                alt="banner"
                className="w-full rounded-tr-[4px] rounded-tl-[4px] md:rounded-tl-[0px] rounded-br-[0px]"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row border border-primary rounded-[5px] mb-[45px]">
            <div className="block w-full">
              <Image
                src={FindDoctorBanner}
                alt="banner"
                className="w-full rounded-tl-[4px] rounded-bl-[0px] rounded-tr-[4px] md:rounded-tr-[0px]"
              />
            </div>
            <div className="flex flex-col justify-between w-full md:w-[30%] p-7 max-w-full md:max-w-[298px]">
              <h3 className="text-[#083D78] text-[26px] sm:text-[18px] md:text-[24px] lg:-[26px] leading-[36px] font-light mb-12">
                <b className="font-medium">Find a Doctor</b>
                <br /> or Clinic Near You
              </h3>
              <Link
                href="/#"
                className="pt-4 flex font-medium justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[18px] sm:text-[15px] md:text-[12px] lg:text-[17px] leading-[24px]"
              >
                Find a Location Near You
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>

          {/* New Education Slider Section */}
          <div className="flex flex-col md:flex-row border border-primary rounded-[5px] p-0 md:p-7 items-start">
            <div className="flex flex-col md:flex-row gap-5 md:gap-7 w-full">
              <div className="block w-full md:max-w-[170px] min-w-[165px] order-2 md:order-1 px-7 md:px-0">
                <h3 className="text-[#083D78] text-[26px] border-b md:border-none border-[#00888980] pb-7 md:pb-0 leading-[36px] font-light">
                  <b className="font-medium"> News, Education + Insights</b>
                  <br /> from Altais
                </h3>
              </div>
              <div className="block w-full order-1 md:order-2">
                <div className="bg-half-star-slider w-full md:w-[608px] inset-0 bg-contain bg-no-repeat bg-right min-h-[350px] md:min-h-[148px] bg-[#111638] rounded-bl-[0px] md:rounded-bl-[5px] rounded-br-[0px] md:rounded-br-[5px] rounded-[5px] p-7 pr-[100px]">
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true} 
                  >
                    <SwiperSlide>
                      <div className="block md:flex justify-center items-start swiper-parent">
                        {/* Left Column */}
                        <div className="flex justify-start md:justify-end">
                          <h3 className="flex flex-col font-light text-[15px] md:text-xl leading-[25%] text-left max-w-[250px] text-[#84d0d2]">
                            <b className="font-medium">Featured Blogs</b>
                          </h3>
                        </div>

                        {/* Vertical Separator */}
                        <div className="hidden md:block w-full md:w-[1px] h-[1px] md:h-[88px] bg-[#84d0d2] my-6 md:my-0 max-0 md:mx-10"></div>

                        {/* Right Column */}
                        <div className="block max-w-full md:max-w-[540px]">
                          <p className="text-white text-2xl md:text-xl leading-[36px] font-normal text-left">
                            Leveraging Digital Health Tools to Enhance Outcomes
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="block md:flex justify-center items-start swiper-parent">
                        {/* Left Column */}
                        <div className="flex justify-start md:justify-end">
                          <h3 className="flex flex-col font-light text-[15px] md:text-xl leading-[25%] text-left max-w-[250px] text-[#84d0d2]">
                            <b className="font-medium">Featured Blogs</b>
                          </h3>
                        </div>

                        {/* Vertical Separator */}
                        <div className="hidden md:block w-full md:w-[1px] h-[1px] md:h-[88px] bg-[#84d0d2] my-6 md:my-0 max-0 md:mx-10"></div>

                        {/* Right Column */}
                        <div className="block max-w-full md:max-w-[540px]">
                          <p className="text-white text-2xl md:text-xl leading-[36px] font-normal text-left">
                            Leveraging Digital Health Tools to Enhance Outcomes
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="block md:flex justify-center items-start swiper-parent">
                        {/* Left Column */}
                        <div className="flex justify-start md:justify-end">
                          <h3 className="flex flex-col font-light text-[15px] md:text-xl leading-[25%] text-left max-w-[250px] text-[#84d0d2]">
                            <b className="font-medium">Featured Blogs</b>
                          </h3>
                        </div>

                        {/* Vertical Separator */}
                        <div className="hidden md:block w-full md:w-[1px] h-[1px] md:h-[88px] bg-[#84d0d2] my-6 md:my-0 max-0 md:mx-10"></div>

                        {/* Right Column */}
                        <div className="block max-w-full md:max-w-[540px]">
                          <p className="text-white text-2xl md:text-xl leading-[36px] font-normal text-left">
                            Leveraging Digital Health Tools to Enhance Outcomes
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="block w-full md:w-[30%] order-3 md:order-3 pt-5 md:pt-0 pb-12 md:pb-0">
              <ul className="pl-7">
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
