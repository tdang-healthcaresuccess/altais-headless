import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GridIcon from "@/public/icon/grid-icon.png";

export default function DocSearchForm() {
  return (
    <div className="block">
      <section className="block box-shadow-custom5">
        <div className="container mx-auto">
          <div className="block pt-3 pb-6">
            <ul className="flex gap-1">
              <li className="flex gap-1">
                <Link
                  href="/"
                  className="text-bluePrimary text-xs leading-[19px]"
                >
                  Home
                </Link>
                <ChevronRight className="w-[10px] h-[10px] text-bluePrimary md:w-[18px] md:h-[18px]" />
              </li>
              <li className="text-xs leading-[19px] font-medium text-primary">
                Find a Doctor
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="flex pt-[44px] pb-[155px]">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className="block w-[25%]">
              <p className="text-[14px] text-bluePrimary leading-[19px] font-light pb-2">
                1 - 20 of 5117 results
              </p>
              <p className="text-[14px] text-bluePrimary leading-[19px] font-medium">
                Clear All Filters
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex">
                <button type="button" className="btn-md">
                  Find Primary Care
                </button>
                <button type="button" className="btn-md">
                  Find Urgent Care
                </button>
              </div>
              <div className="block">
                <button type="button" className="btn">
                  <Image src={GridIcon} alt="category" width={26} height={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
