import DocSearchList from "../common/doctor-list";

export default function DocAvailability() {
  return (
    <div className="block pb-[132px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-9 md:gap-8 lg:gap-[70px]">
              <div className="block w-full md:w-[calc(30%-16px)] lg:w-[calc(25%-35px)]">
            <h4 className="text-bluePrimary font-medium text-base !leading-[19px] pb-2">Location</h4>
            <p className="text-secondary font-normal text-xs">Salinas, CA</p>
          </div>
          <div className="block w-full md:w-[calc(70%-16px)] lg:w-[calc(75%-35px)]">
            <DocSearchList />
          </div>
        </div>
      </div>
    </div>
  );
}
