import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ClinicMedia1 from "@/public/media/clinic/1.png";
import CardLink from "../common/card-link";

export default function ClinicCard({ title , description}) {
  return (
    <div className="flex flex-1 flex-col mb-4 w-full md:w-[calc(50%-16px)]">
      <div className="block border border-primary rounded-normal mb-6">
        <Image
          src={ClinicMedia1}
          alt="primary care"
          className="object-cover min-h-[170px] w-full max-h-[170px] rounded-normal"
        />
      </div>
      <div className="block">
        <h3 className="text-[22px] leading-[32px] text-bluePrimary mb-3">
          {title}
        </h3>
        <p className="text-lg leading-[32px] text-grey3d mb-7">{description}</p>
        <CardLink
          linkTheme="secondary"
          link="/clinics/altias-medical"
          linkText="Continue Reading"
        />
      </div>
    </div>
  );
}
