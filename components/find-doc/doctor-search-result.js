import DocSearchList from "./doctor-list";
import DocSearchFilterSidebar from "./search-filter-sidebar";

export default function DoctorSearchResults() {
  return (
    <div className="block gap-[70px] pb-[155px] pt-[40px]">
      <div className="container mx-auto">
        <div className="flex gap-[70px]">
          <div className="block w-[calc(25%-35px)]">
            <DocSearchFilterSidebar />
          </div>
          <div className="block w-[calc(75%-35px)]">
            <DocSearchList />
          </div>
        </div>
      </div>
    </div>
  );
}
