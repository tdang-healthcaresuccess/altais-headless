import Image from "next/image";
import NetworkMedia from "@/public/media/altais-network.png";
import Link from "next/link";

export default function AltaisNetwork({ subHeadline, headline, content, buttonText, buttonUrl, buttonTarget, image }) {
  return (
    <div className="block pt-[50px] md:pt-[75px] pb-[80px] md:pb-[70px]">
      <div className="container mx-auto">
        <div className="block md:flex flex-wrap gap-[70px]">
          <div className="block w-full md:w-[calc(38%-35px)]">
            <div className="block pb-10 md:pb-0">
              <Image
                src={image || NetworkMedia}
                alt={headline || "Altais Network"}
                className="rounded-normal border border-primary"
                width={500}
                height={400}
              />
            </div>
            <Link
              href={buttonUrl || "/#"}
              target={buttonTarget || "_self"}
              className="hidden btn-gradient md:flex justify-center items-center btn-md !w-full rounded-normal mt-12"
            >
              {buttonText || "Explore the Altais Network"}
            </Link>
          </div>
          <div className="block w-full md:w-[calc(62%-35px)]">
            {subHeadline && <h4 className="text-[18px] leading-[28px] font-semibold text-primary mb-4">{subHeadline}</h4>}
            <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary mb-8">
              {headline || "A Network Bringing High-quality and Affordable Care to All"}
            </h3>
            <div 
              className="text-lg font-normal !leading-[32px] text-grey3d"
              dangerouslySetInnerHTML={{ __html: content || '<p class="mb-8">Altais is more than a single organization — we are a growing network of physician-led medical groups, independent practice associations, and care delivery partners working together to raise the standard of care.</p><p class="mb-8">Across our network, we support doctors with the tools, services, and technology they need to deliver compassionate, connected care — from primary care and preventive services to specialty and complex care</p><p class="mb-8">Together, we\'re creating a more sustainable and people-centered healthcare experience — one that\'s built on trusted relationships, clinical excellence, and a deep commitment to the communities we serve.</p>' }}
            />
            <Link
              href={buttonUrl || "/#"}
              target={buttonTarget || "_self"}
              className="md:hidden btn-gradient text-white btn-md flex-center !w-full rounded-normal mt-12"
            >
              {buttonText || "Explore the Altais Network"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
