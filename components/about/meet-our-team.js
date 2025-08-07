import LeadershipTeamMedia from "@/public/media/leadership-team.png"
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MeetOurTeam() {
  return (
    <section className="block py-12 bg-[#d9d9d926]">
      <div className="container mx-auto">
        <div className="block">
            <div className="flex flex-col md:flex-row border border-[#008889] rounded-[5px] mb-[45px]">
            <div className="block w-full">
              <Image
                src={LeadershipTeamMedia}
                alt="Meet Our Leadership Team"
                className="w-full rounded-tl-[4px] rounded-bl-[0px] rounded-tr-[4px] md:rounded-tr-[0px]"
              />
            </div>
            <div className="flex flex-col justify-between w-full md:w-[30%] p-7 max-w-full md:max-w-[298px]">
              <h3 className="text-[#083D78] text-[26px] sm:text-[18px] md:text-[24px] lg:-[26px] leading-[36px] font-light mb-12">
                <b className="font-medium">Meet Our Leadership Team</b>
                <br /> Discover the decision-makers behind Altais
              </h3>
              <Link
                href="/#"
                className="pt-4 flex font-medium justify-end md:justify-start gap-1 text-[#C75327] border-t border-[#00888980] text-[18px] sm:text-[15px] md:text-[12px] lg:text-[17px] leading-[24px]"
              >
                Meet Our Team
                <ChevronRight className="w-[20px] h-[20px] text-[#C75327]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
