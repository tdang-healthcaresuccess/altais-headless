import Image from "next/image";
import NetworkMedia from "@/public/media/altais-network.png";
import Link from "next/link";

export default function AltaisNetwork() {
  return (
    <div className="block pt-[50px] md:pt-[75px] pb-[80px] md:pb-[70px] px-6 md:px-0">
      <div className="container mx-auto">
        <div className="block md:flex flex-wrap gap-[70px]">
          <div className="block w-full md:w-[calc(38%-35px)]">
            <div className="block pb-10 md:pb-0">
              <Image
                src={NetworkMedia}
                alt="Altais Network"
                className="rounded-[5px] border border-primary"
              />
            </div>
            <Link
              href="/#"
              className="hidden md:flex justify-center items-center bg-custom-gradient text-white btn-md !w-full rounded-[5px] mt-[50px]"
            >
              Explore the Altais Network
            </Link>
          </div>
          <div className="block w-full md:w-[calc(62%-35px)]">
            <h3 className="text-[22px] leading-[32px] text-[#083D78] mb-8">A Network Bringing High-quality and Affordable Care to All</h3>
            <p className="text-[18px] leading-[32px] text-[#3d3d3d] mb-8">
              Altais is more than a single organization — we are a growing
              network of physician-led medical groups, independent practice
              associations, and care delivery partners working together to raise
              the standard of care.
            </p>
            <p className="text-[18px] leading-[32px] text-[#3d3d3d] mb-8">
              Across our network, we support doctors with the tools, services,
              and technology they need to deliver compassionate, connected care
              — from primary care and preventive services to specialty and
              complex care
            </p>
            <p className="text-[18px] leading-[32px] text-[#3d3d3d] mb-8">
              Together, we’re creating a more sustainable and people-centered
              healthcare experience — one that’s built on trusted relationships,
              clinical excellence, and a deep commitment to the communities we
              serve.
            </p>
            <Link
              href="/#"
              className="md:hidden bg-custom-gradient text-white btn-md flex-center !w-full rounded-[5px] mt-[50px]"
            >
              Explore the Altais Network
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
