"use client";

import LeadershipTeamMedia from "@/public/media/leadership-team.png"
import LeadershipTeamMobileMedia from "@/public/media/leadership-team-mobile.png"
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export default function MeetOurTeam({ headline, content, buttonText, buttonUrl, buttonTarget, image }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  return (
    <section className="block py-12 bg-[#d9d9d926]">
      <div className="container mx-auto">
        <div className="block">
            <div className="flex flex-col md:flex-row border border-primary rounded-normal mb-[45px]">
            <div className="block w-full">
              <Image
                src={image || (isMobile ? LeadershipTeamMobileMedia : LeadershipTeamMedia)}
                alt={headline || "Meet Our Leadership Team"}
                className="h-[350px] md:h-auto object-cover w-full rounded-tl-[4px] rounded-bl-[0px] rounded-tr-[4px] md:rounded-tr-[0px]"
                width={800}
                height={350}
              />
            </div>
            <div className="flex flex-col justify-between w-full md:w-[30%] p-7 max-w-full md:max-w-[298px]">
              <div 
                className="text-bluePrimary text-[26px] sm:text-base md:text-[24px] lg:text-[26px] !leading-[36px] font-light mb-12"
                dangerouslySetInnerHTML={{ __html: headline 
                  ? `<b class="font-medium">${headline}</b>${content ? `<br /> ${content}` : ''}` 
                  : '<b class="font-medium">Meet Our Leadership Team</b><br /> Discover the decision-makers behind Altais' 
                }}
              />
              <Link
                href={buttonUrl || "/about/leadership"}
                target={buttonTarget || "_self"}
                className="pt-4 flex font-medium justify-end md:justify-start gap-1 btn-link-secondary border-t border-lightPrimary text-base sm:text-[15px] md:text-[12px] lg:text-[17px] leading-[24px]"
              >
                {buttonText || "Meet Our Team"}
                <ChevronRight className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
