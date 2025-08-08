import Values1 from "@/public/media/values/1.png";
import Values2 from "@/public/media/values/2.png";
import Values3 from "@/public/media/values/3.png";
import Values4 from "@/public/media/values/4.png";
import Values5 from "@/public/media/values/5.png";
import Image from "next/image";

const values = [
  {
    icon: Values1,
    title: "Compassion",
    description: (
      <>
        <span className="font-medium text-[#008889]">We act with empathy</span>{" "}
        and a deep respect for the challenges faced by physicians and their
        patients. Our work is driven by a genuine commitment to improving lives
        and ensuring that care is delivered with dignity, understanding, and
        humanity.
      </>
    ),
  },
  {
    icon: Values2,
    title: "Community",
    description: (
      <>
        <span className="font-medium text-[#008889]">
          We foster a culture of collaboration
        </span>{" "}
        with physicians, patients across the healthcare ecosystem, and among our
        teams. By building strong, trusted relationships, we create a unified
        community focused on advancing patient care and physician well-being.
      </>
    ),
  },
  {
    icon: Values3,
    title: "Leadership",
    description: (
      <>
        <span className="font-medium text-[#008889]">
          We lead with integrity and vision,
        </span>{" "}
        setting the standard for excellence in physician support and healthcare
        innovation. Through collaboration and expertise, we empower others to
        lead, drive change, and shape the future of care.
      </>
    ),
  },
  {
    icon: Values4,
    title: "Excellence",
    description: (
      <>
        <span className="font-medium text-[#008889]">
          We are relentlessly focused,
        </span>{" "}
        results-driven, and accountable for delivering measurable value to
        physicians and the patients they serve. Our high standards reflect our
        commitment to excellence, operational discipline, and continuous
        improvement.
      </>
    ),
  },
  {
    icon: Values5,
    title: "Agility",
    description: (
      <>
        <span className="font-medium text-[#008889]">
          We embrace change as a constant
        </span>{" "}
        and respond swiftly to the evolving needs of the healthcare industry.
        With flexibility and forward-thinking, we adapt, innovate, and act
        decisively to keep physicians at the forefront.
      </>
    ),
  },
];

export default function OurValues() {
  return (
    <section className="block pt-0 md:pt-[75px] pb-[75px] md:]pb-[100px] bg-white box-shadow-custom3 px-6 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Static Box */}
          <div className="p-8 rounded-xl text-white flex items-center justify-start min-h-[280px] bg-arc2 inset-0 bg-cover bg-center">
            <h2 className="text-[50px] leading-[55px] font-medium">
              Our
              <br />
              Values
            </h2>
          </div>

          {/* Dynamic Boxes */}
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white flex flex-col gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-[40px] h-[40px] flex-center rounded-full border border-[#008889]">
                  <Image src={item.icon} alt="values" className="w-full h-full p-2 object-contain" />
                </div>
                <h3 className="text-[18px] leading-[32px] text-[#083D78] font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="text-[#3D3D3D] text-lg leading-[32px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
