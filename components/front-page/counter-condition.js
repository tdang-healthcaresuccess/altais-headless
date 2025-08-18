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
import CounterArea from "../common/counter-area";

export default function CounterCondition() {
  return (
    <section className="block py-[60px]">
      <div className="container mx-auto">
        <div className="block w-full">
          <CounterArea />

          <div className="w-full h-[1px] bg-lightPrimary mb-[85px]"></div>

          <div className="flex flex-col md:flex-row border border-primary rounded-normal mb-10 md:mb-[45px]">
            <div className="flex flex-col justify-between w-full md:w-[30%] p-7 max-w-full md:max-w-[298px] order-2 md:order-1">
              <h3 className="text-bluePrimary text-[26px] sm:text-[18px] md:text-[18px] lg:text-[26px] md:leading-[20px] lg:leading-[36px] font-light mb-12">
                <b className="font-medium">Conditions We Treat</b>
                <br /> Patient Resources & Health Information
              </h3>
              <Link
                href="/conditions/"
                className="pt-4 flex font-medium justify-end md:justify-start gap-1 btn-link-secondary border-t border-lightPrimary text-[18px] sm:text-[15px] md:text-[12px] lg:text-[17px] leading-[24px]"
              >
                To Conditions Page
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
            <div className="block w-full order-1 md:order-2">
              <Image
                src={ConditionTreatBanner}
                alt="banner"
                priority
                className="w-full rounded-tr-[4px] rounded-tl-[4px] md:rounded-tl-[0px] rounded-br-[0px]"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row border border-primary rounded-normal mb-[45px]">
            <div className="block w-full">
              <Image
                src={FindDoctorBanner}
                alt="banner"
                className="w-full rounded-tl-[4px] rounded-bl-[0px] rounded-tr-[4px] md:rounded-tr-[0px]"
              />
            </div>
            <div className="flex flex-col justify-between w-full md:w-[30%] p-7 max-w-full md:max-w-[298px]">
              <h3 className="text-bluePrimary text-[26px] sm:text-[18px] md:text-[24px] lg:-[26px] leading-[36px] font-light mb-12">
                <b className="font-medium">Find a Doctor</b>
                <br /> or Clinic Near You
              </h3>
              <Link
                href="/find-care"
                className="pt-4 flex font-medium justify-end md:justify-start gap-1 btn-link-secondary border-t border-lightPrimary text-[18px] sm:text-[15px] md:text-[12px] lg:text-[17px] leading-[24px]"
              >
                Find a Location Near You
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>

          {/* New Education Slider Section */}
          <div className="flex flex-col lg:flex-row border border-primary rounded-normal p-0 md:p-7 lg:p-7 items-start">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-7 w-full">
              <div className="block w-full lg:max-w-[170px] min-w-[165px] order-2 lg:order-1 px-7 md:px-0">
                <h3 className="text-bluePrimary text-[26px] border-b md:border-none border-lightPrimary pb-7 md:pb-0 leading-[36px] font-light">
                  <b className="font-medium"> News, Education + Insights</b>
                  <br /> from Altais
                </h3>
              </div>
              <div className="block w-full order-1 md:order-2">
                <div className="bg-half-star-slider w-full md:w-[608px] inset-0 bg-contain bg-no-repeat bg-right h-[350px] md:h-[148px] bg-[#111638] rounded-bl-[0px] md:rounded-bl-[5px] rounded-br-[0px] md:rounded-br-[5px] rounded-normal p-7 pr-[100px]">
                  <Swiper
                    modules={[Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true} 
                    autoHeight={true}
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
                        <div className="block max-w-full md:max-w-[540px] pb-10 mb:pb-2">
                          <p className="text-white text-2xl md:text-xl leading-[36px] font-normal text-left pb-10 md:pb-0">
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
                        <div className="block max-w-full md:max-w-[540px] pb-10 mb:pb-2">
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
                          <h3 className="flex flex-col font-light text-[15px] lg:text-xl leading-[25%] text-left max-w-[250px] text-[#84d0d2]">
                            <b className="font-medium">Featured Blogs</b>
                          </h3>
                        </div>

                        {/* Vertical Separator */}
                        <div className="hidden lg:block w-full lg:w-[1px] h-[1px] lg:h-[88px] bg-[#84d0d2] my-6 lg:my-0 max-0 lg:mx-10"></div>

                        {/* Right Column */}
                        <div className="block max-w-full md:max-w-[540px] pb-10 mb:pb-2">
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
            <div className="block w-full lg:w-[30%] order-3 lg:order-3 pb-12 lg:pb-0">
              <ul className="pl-7 md:pl-0 lg:pl-7 pt-4 md:pt-0">
                <li>
                  <Link href="/blog" className="list-items1 btn-link-secondary">
                    <ChevronRight className="w-[20px] h-[20px]" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="list-items1 btn-link-secondary">
                    <ChevronRight className="w-[20px] h-[20px]" />
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link href="/patient-education" className="list-items1 btn-link-secondary">
                    <ChevronRight className="w-[20px] h-[20px]" />
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
