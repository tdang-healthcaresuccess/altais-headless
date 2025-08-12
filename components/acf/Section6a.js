import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * Section6a component.
 * Renders a simple, single-column content section.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object from the ACF Flexible Content layout.
 * @param {string} props.data.section_6a_testimonials - The HTML content for the section.
 */
const Section6a = ({ data }) => {
  if (!data) return null;

  const { section_6a_testimonials } = data;

  return (
    <section className="py-6 md:py-12 ">
      <div className="container mx-auto">
        <div className="block px-6 md:px-0">
          <Swiper
              modules={[Navigation, Pagination]}
              navigation={true}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={true}
              
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
    </section>
  );
};

export default Section6a;