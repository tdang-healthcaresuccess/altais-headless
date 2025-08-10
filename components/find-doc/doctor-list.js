import Image from "next/image";
import Doctor1 from "@/public/media/doctor1.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DocSearchList({ activeLayout }) {
  console.log(activeLayout);
  return (
    <div
      className={
        activeLayout == "grid"
          ? "flex flex-col md:flex-row flex-wrap gap-6"
          : "flex flex-col flex-wrap gap-6"
      }
    >
      <div
        className={
          activeLayout == "grid"
            ? "block border border-primary rounded-normal p-3 w-full md:w-full lg:w-[calc(50%-12px)]"
            : "block border border-primary rounded-normal p-3 w-full"
        }
      >
        <div className="flex pb-6 gap-6">
          <div
            className={
              activeLayout == "grid"
                ? "block border border-lightPrimary rounded-normal w-[30%] min-w-[118px] md:min-w-[133px] h-[124px] md:h-[140px]"
                : "block border border-lightPrimary rounded-normal min-w-[200px] md:min-w-[200px] h-[200px] w-[200px]"
            }
          >
            <Image
              src={Doctor1}
              alt="John Doe"
              className={
                activeLayout == "grid"
                  ? "rounded-normal image-responsive"
                  : "rounded-normal image-responsive !w-[200px] !h-[200px]"
              }
            />
          </div>
          <div className="block">
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <h3 className="font-semibold text-bluePrimary text-lg">
                John Doe
              </h3>
              <h3 className="font-normal text-bluePrimary text-lg pb-3">
                MD, PhD
              </h3>
            </div>
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Specialties
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Internal Medicine & Pediatrics, Child and Adolescent
                  Psychiatry, Behavioral Medicine
                </p>
              </div>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Location
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Altais Medical Group Riverside <br />
                  4646 Brockton Avenue <br />
                  Suites 201 & 202 <br />
                  Riverside, CA 92506
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <Link
            href="/provider-details"
            type="button"
            className="btn-md btn-outline-secondary flex-center !w-50 !px-1 font-semibold rounded-normal flex-1"
          >
            View Profile
          </Link>
          <button
            type="button"
            className="btn-md btn-outline-ternery !w-50 !px-1 rounded-normal font-semibold flex-1"
          >
            {activeLayout == "grid" ? "Click to Call" : "Schedule Now"}
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div
        className={
          activeLayout == "grid"
            ? "block border border-primary rounded-normal p-3 w-full md:w-full lg:w-[calc(50%-12px)]"
            : "block border border-primary rounded-normal p-3 w-full"
        }
      >
        <div className="flex pb-6 gap-6">
          <div
            className={
              activeLayout == "grid"
                ? "block border border-lightPrimary rounded-normal w-[30%] min-w-[118px] md:min-w-[133px] h-[124px] md:h-[140px]"
                : "block border border-lightPrimary rounded-normal min-w-[200px] md:min-w-[200px] h-[200px] w-[200px]"
            }
          >
            <Image
              src={Doctor1}
              alt="John Doe"
              className={
                activeLayout == "grid"
                  ? "rounded-normal image-responsive"
                  : "rounded-normal image-responsive !w-[200px] !h-[200px]"
              }
            />
          </div>
          <div className="block">
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <h3 className="font-semibold text-bluePrimary text-lg">
                John Doe
              </h3>
              <h3 className="font-normal text-bluePrimary text-lg pb-3">
                MD, PhD
              </h3>
            </div>
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Specialties
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Internal Medicine & Pediatrics, Child and Adolescent
                  Psychiatry, Behavioral Medicine
                </p>
              </div>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Location
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Altais Medical Group Riverside <br />
                  4646 Brockton Avenue <br />
                  Suites 201 & 202 <br />
                  Riverside, CA 92506
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <Link
            href="/provider-details"
            type="button"
            className="btn-md btn-outline-secondary flex-center !w-50 !px-1 font-semibold rounded-normal flex-1"
          >
            View Profile
          </Link>
          <button
            type="button"
            className="btn-md btn-outline-ternery !w-50 !px-1 rounded-normal font-semibold flex-1"
          >
            {activeLayout == "grid" ? "Click to Call" : "Schedule Now"}
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div
        className={
          activeLayout == "grid"
            ? "block border border-primary rounded-normal p-3 w-full md:w-full lg:w-[calc(50%-12px)]"
            : "block border border-primary rounded-normal p-3 w-full"
        }
      >
        <div className="flex pb-6 gap-6">
          <div
            className={
              activeLayout == "grid"
                ? "block border border-lightPrimary rounded-normal w-[30%] min-w-[118px] md:min-w-[133px] h-[124px] md:h-[140px]"
                : "block border border-lightPrimary rounded-normal min-w-[200px] md:min-w-[200px] h-[200px] w-[200px]"
            }
          >
            <Image
              src={Doctor1}
              alt="John Doe"
              className={
                activeLayout == "grid"
                  ? "rounded-normal image-responsive"
                  : "rounded-normal image-responsive !w-[200px] !h-[200px]"
              }
            />
          </div>
          <div className="block">
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <h3 className="font-semibold text-bluePrimary text-lg">
                John Doe
              </h3>
              <h3 className="font-normal text-bluePrimary text-lg pb-3">
                MD, PhD
              </h3>
            </div>
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Specialties
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Internal Medicine & Pediatrics, Child and Adolescent
                  Psychiatry, Behavioral Medicine
                </p>
              </div>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Location
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Altais Medical Group Riverside <br />
                  4646 Brockton Avenue <br />
                  Suites 201 & 202 <br />
                  Riverside, CA 92506
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <Link
            href="/provider-details"
            type="button"
            className="btn-md btn-outline-secondary flex-center !w-50 !px-1 font-semibold rounded-normal flex-1"
          >
            View Profile
          </Link>
          <button
            type="button"
            className="btn-md btn-outline-ternery !w-50 !px-1 rounded-normal font-semibold flex-1"
          >
            {activeLayout == "grid" ? "Click to Call" : "Schedule Now"}
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div
        className={
          activeLayout == "grid"
            ? "block border border-primary rounded-normal p-3 w-full md:w-full lg:w-[calc(50%-12px)]"
            : "block border border-primary rounded-normal p-3 w-full"
        }
      >
        <div className="flex pb-6 gap-6">
          <div
            className={
              activeLayout == "grid"
                ? "block border border-lightPrimary rounded-normal w-[30%] min-w-[118px] md:min-w-[133px] h-[124px] md:h-[140px]"
                : "block border border-lightPrimary rounded-normal min-w-[200px] md:min-w-[200px] h-[200px] w-[200px]"
            }
          >
            <Image
              src={Doctor1}
              alt="John Doe"
              className={
                activeLayout == "grid"
                  ? "rounded-normal image-responsive"
                  : "rounded-normal image-responsive !w-[200px] !h-[200px]"
              }
            />
          </div>
          <div className="block">
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <h3 className="font-semibold text-bluePrimary text-lg">
                John Doe
              </h3>
              <h3 className="font-normal text-bluePrimary text-lg pb-3">
                MD, PhD
              </h3>
            </div>
            <div className={activeLayout == "grid" ? "block" : "flex gap-2"}>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Specialties
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Internal Medicine & Pediatrics, Child and Adolescent
                  Psychiatry, Behavioral Medicine
                </p>
              </div>
              <div className="block flex-1">
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-primary text-[10px] font-semibold pb-1"
                      : "text-primary text-base font-semibold pb-1"
                  }
                >
                  Location
                </p>
                <p
                  className={
                    activeLayout == "grid"
                      ? "text-grey3d text-[10px] pb-2"
                      : "text-grey3d text-base pb-2"
                  }
                >
                  Altais Medical Group Riverside <br />
                  4646 Brockton Avenue <br />
                  Suites 201 & 202 <br />
                  Riverside, CA 92506
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 border-t border-lightPrimary pt-3">
          <Link
            href="/provider-details"
            type="button"
            className="btn-md btn-outline-secondary flex-center !w-50 !px-1 font-semibold rounded-normal flex-1"
          >
            View Profile
          </Link>
          <button
            type="button"
            className="btn-md btn-outline-ternery !w-50 !px-1 rounded-normal font-semibold flex-1"
          >
            {activeLayout == "grid" ? "Click to Call" : "Schedule Now"}
          </button>
        </div>
      </div>
      {/* Doc 1 */}
      <div className="flex justify-end w-full">
        <ul className="flex gap-3">
          {/* <li className="pagination-li pag-action"><ChevronLeft className="w-[20px] h-[20px] text-secondary" /> Previous Page</li> */}
          <li className="pagination-li active">1</li>
          <li className="pagination-li">2</li>
          <li className="pagination-li">3</li>
          <li className="pagination-li">4</li>
          <li className="pagination-li pag-action">
            Next Page{" "}
            <ChevronRight className="w-[20px] h-[20px] text-secondary" />
          </li>
        </ul>
      </div>
    </div>
  );
}
