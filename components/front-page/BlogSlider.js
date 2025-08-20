
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

const BLOG_POSTS_QUERY = gql`
  query GetLatestBlogPosts {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

export default function BlogSlider() {
  const { data, loading, error } = useQuery(BLOG_POSTS_QUERY);
  const posts = data?.posts?.nodes || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog posts.</div>;

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      autoHeight={true}
    >
      {posts.map((post, idx) => (
        <SwiperSlide key={post.id || idx}>
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
              <Link href={`/blog/${post.slug}`}>
                <p className="text-white text-2xl md:text-xl leading-[36px] font-normal text-left pb-10 md:pb-0 hover:underline line-clamp-3">
                  {post.title}
                </p>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
