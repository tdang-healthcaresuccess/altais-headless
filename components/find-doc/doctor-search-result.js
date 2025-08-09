import Image from "next/image";
import DocSearchList from "./doctor-list";
import DocSearchFilterSidebar from "./search-filter-sidebar";
import FilterSorting from "@/public/icons/filter-sorting.svg"

export default function DoctorSearchResults() {
  return (
    <div className="block gap-[70px] pb-[155px] pt-6 md:pt-[40px] px-6 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-9 md:gap-8 lg:gap-[70px]">
          <div className="block w-full md:w-[calc(30%-16px)] lg:w-[calc(25%-35px)]">
            <div className="hidden md:block">
            <DocSearchFilterSidebar />
            </div>
            <div className="block md:hidden">
            <button type="button" className="btn-md flex-center btn-normal gap-3">
              <Image src={FilterSorting} alt="Filter" width={18} height={18} />
              Apply Filter and Sort
              </button>
            </div>
          </div>
          <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
            <DocSearchList />
          </div>
        </div>
      </div>
    </div>
  );
}
