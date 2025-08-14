import { clinicArray } from "../DummyData";
import ClinicCard from "./clinic-card";

export default function ClinicsList() {
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col md:flex-row gap-[33px]">
          {clinicArray &&
            clinicArray.map((item, index) => {
              return (
                <ClinicCard
                  title={item.title}
                  index={index}
                  description={item.shortDescription}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
