import Image from "next/image";
import NetworkMedia from "@/public/media/altais-network.png";
import Link from "next/link";

export default function AltaisNetwork() {
  return (
    <div className="block py-[75px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-[70px]">
          <div className="block w-[calc(38%-35px)]">
            <div className="block">
              <Image
                src={NetworkMedia}
                alt="Altais Network"
                className="rounded-[5px] border border-[#008889]"
              />
            </div>
            <Link
              href="/#"
              className="bg-custom-gradient text-white btn-md flex-center !w-full rounded-[5px] mt-[50px]"
            >
              Explore the Altais Network
            </Link>
          </div>
          <div className="block w-[calc(62%-35px)]">
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
          </div>
        </div>
      </div>
    </div>
  );
}
