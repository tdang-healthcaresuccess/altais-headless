import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CounterArea from "../common/counter-area";

export default function CounterProvider() {
  return (
    <section className="block pt-[50px] px-6 md:px-0 box-shadow-custom2">
      <div className="container mx-auto">
        <div className="block w-full border-b border-lightPrimary">
          <CounterArea />

          <div className="w-full h-[1px] bg-lightPrimary mb-[85px]"></div>
          <div className="block pb-6 about-slider-algo">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={true}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
                1280: {
                  slidesPerView: 7, // ✅ Show 7 slides on large screens
                },
              }}
            >
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">100+</h4>
                  <p className="countlist-p1">Provider Specialties</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">15</h4>
                  <p className="countlist-p1">APG Elite Medical Group Awards</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">$2.8m</h4>
                  <p className="countlist-p1">2022–2023 ACO Performance Incentive Payments</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">87%</h4>
                  <p className="countlist-p1">Medicare Advantage MLR</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">65</h4>
                  <p className="countlist-p1">Member NPS(Brown & Toland)</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">83%</h4>
                  <p className="countlist-p1">Altais Employed Provider Engagement</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="block">
                  <h4 className="countlist-h4">+</h4>
                  <p className="countlist-p1">2021 Healthcare ACO Summit Award</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}