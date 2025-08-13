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

 */
const Section6a = ({ data }) => {
  if (!data) return null;

  const testimonials = data.section6aTestimonials || [];
  return (
    <section className="py-6 md:py-12 ">
      <div className="container mx-auto">
        <div className="block testimonials-block px-6 md:px-0">
          {console.log(testimonials)}
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-xl leading-[32px] pb-12 font-normal">{testimonial.reviewerDescription}</h3>
                  <p className="text-secondary font-bold text-[15px] leading-[25px]">{testimonial.reviewerName}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Section6a;