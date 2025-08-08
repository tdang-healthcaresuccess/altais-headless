import Image from "next/image";
import Doctor1 from "@/public/media/doctor1.png"
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocSearchList() {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="block border border-primary rounded-[5px] p-3 w-[calc(50%-12px)]">
        <div className="flex pb-6 gap-6">
          <div className="block border border-lightPrimary rounded-[5px] w-[30%] min-w-[133px] h-[140px]">
            <Image src={Doctor1} alt="John Doe" className="rounded-[5px] image-responsive" />
          </div>
          <div className="block">
            <h3 className="font-semibold text-bluePrimary text-lg">John Doe</h3>
            <h3 className="font-normal text-bluePrimary text-lg pb-3">
              MD, PhD
            </h3>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Specialties
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Internal Medicine & Pediatrics, Child and Adolescent Psychiatry,
              Behavioral Medicine
            </p>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Location
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Altais Medical Group Riverside <br />
              4646 Brockton Avenue <br />
              Suites 201 & 202 <br />
              Riverside, CA 92506
            </p>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <button
            type="button"
            className="btn-md btn-outline-secondary font-semibold rounded-[5px] flex-1"
          >
            View Profile
          </button>
          <button
            type="button"
            className="btn-md btn-outline-secondary rounded-[5px] font-semibold flex-1"
          >
            Click to Call
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div className="block border border-primary rounded-[5px] p-3 w-[calc(50%-12px)]">
        <div className="flex pb-6 gap-6">
          <div className="block border border-lightPrimary rounded-[5px] w-[30%] min-w-[133px] h-[140px]">
            <Image src={Doctor1} alt="John Doe" className="rounded-[5px] image-responsive" />
          </div>
          <div className="block">
            <h3 className="font-semibold text-bluePrimary text-lg">John Doe</h3>
            <h3 className="font-normal text-bluePrimary text-lg pb-3">
              MD, PhD
            </h3>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Specialties
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Internal Medicine & Pediatrics, Child and Adolescent Psychiatry,
              Behavioral Medicine
            </p>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Location
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Altais Medical Group Riverside <br />
              4646 Brockton Avenue <br />
              Suites 201 & 202 <br />
              Riverside, CA 92506
            </p>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <button
            type="button"
            className="btn-md btn-outline-secondary font-semibold rounded-[5px] flex-1"
          >
            View Profile
          </button>
          <button
            type="button"
            className="btn-md btn-outline-secondary rounded-[5px] font-semibold flex-1"
          >
            Click to Call
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div className="block border border-primary rounded-[5px] p-3 w-[calc(50%-12px)]">
        <div className="flex pb-6 gap-6">
          <div className="block border border-lightPrimary rounded-[5px] w-[30%] min-w-[133px] h-[140px]">
            <Image src={Doctor1} alt="John Doe" className="rounded-[5px] image-responsive" />
          </div>
          <div className="block">
            <h3 className="font-semibold text-bluePrimary text-lg">John Doe</h3>
            <h3 className="font-normal text-bluePrimary text-lg pb-3">
              MD, PhD
            </h3>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Specialties
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Internal Medicine & Pediatrics, Child and Adolescent Psychiatry,
              Behavioral Medicine
            </p>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Location
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Altais Medical Group Riverside <br />
              4646 Brockton Avenue <br />
              Suites 201 & 202 <br />
              Riverside, CA 92506
            </p>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <button
            type="button"
            className="btn-md btn-outline-secondary font-semibold rounded-[5px] flex-1"
          >
            View Profile
          </button>
          <button
            type="button"
            className="btn-md btn-outline-secondary rounded-[5px] font-semibold flex-1"
          >
            Click to Call
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div className="block border border-primary rounded-[5px] p-3 w-[calc(50%-12px)]">
        <div className="flex pb-6 gap-6">
          <div className="block border border-lightPrimary rounded-[5px] w-[30%] min-w-[133px] h-[140px]">
            <Image src={Doctor1} alt="John Doe" className="rounded-[5px] image-responsive" />
          </div>
          <div className="block">
            <h3 className="font-semibold text-bluePrimary text-lg">John Doe</h3>
            <h3 className="font-normal text-bluePrimary text-lg pb-3">
              MD, PhD
            </h3>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Specialties
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Internal Medicine & Pediatrics, Child and Adolescent Psychiatry,
              Behavioral Medicine
            </p>
            <p className="text-primary text-[10px] font-semibold pb-1">
              Location
            </p>
            <p className="text-grey3d text-[10px] pb-2">
              Altais Medical Group Riverside <br />
              4646 Brockton Avenue <br />
              Suites 201 & 202 <br />
              Riverside, CA 92506
            </p>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <button
            type="button"
            className="btn-md btn-outline-secondary font-semibold rounded-[5px] flex-1"
          >
            View Profile
          </button>
          <button
            type="button"
            className="btn-md btn-outline-secondary rounded-[5px] font-semibold flex-1"
          >
            Click to Call
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div className="flex justify-end w-full">
        <ul className="flex gap-3">
            <li className="pagination-li pag-action"><ChevronLeft className="w-[20px] h-[20px] text-secondary" /> Previous Page</li>
            <li className="pagination-li active">1</li>
            <li className="pagination-li">2</li>
            <li className="pagination-li">3</li>
            <li className="pagination-li">4</li>
            <li className="pagination-li pag-action">Next Page <ChevronRight className="w-[20px] h-[20px] text-secondary" /></li>
        </ul>
      </div>
    </div>
  );
}
