"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function OurResources() {
  return (
    <section className="block pt-[50px] md:pt-14 pb-[73px] md:pb-9 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="w-full h-[1px] bg-[#00888980] mb-[35px]"></div>
        <div className="flex gap-7">
          <div className="block flex-1">
            <h3 className="mb-4 text-[#083D78] font-medium">
              Compassion <br />
              at the Core
            </h3>
            <p className="mb-6 text-[#3d3d3d]">
              Expect care that feels personal. With more than 10K providers
              across California, you can find exceptional care when and where
              you need it.
            </p>
            <Link
              href="/#"
              className="btn-outline-primary btn-sm flex-center !w-[165px] gap-1 mt-8"
            >
              Find Care{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
          {/* 1 */}
          <div className="block flex-1">
            <h3 className="mb-4 text-[#083D78] font-medium">
              Partnerships <br />
              that Deliver
            </h3>
            <p className="mb-6 text-[#3d3d3d]">
              We’re shaping the future of care where smarter systems, technology and teamwork to make care better,  more affordable, and more accessible.
            </p>
            <Link
              href="/#"
              className="btn-outline-primary btn-sm flex-center gap-1 mt-8"
            >
              Our Services{" "}
              <ChevronRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
          {/* 2 */}
          <div className="block flex-1">
            <h3 className="mb-4 text-[#083D78] font-medium">
              Innovation <br />
              that Anticipates Change
            </h3>
            <p className="mb-6 text-[#3d3d3d]">
              We align our innovation with what matters most, healthier lives,  earlier interventions and care that  feels personal.
            </p>
            <Link
              href="/#"
              className="btn-outline-primary btn-sm flex-center gap-1 mt-8"
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
