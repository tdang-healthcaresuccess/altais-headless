import Image from "next/image";
import SingleDocMedia from "@/public/media/doctor-single.png";
import Link from "next/link";

export default function ProvidersDetailsContent() {
  return (
    <div className="block md:pt-[50px] pb-[100px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-[50px] md:gap-[80px] lg:gap-[120px] px-6 md:px-0">
          <div className="block w-full md:w-[315px]">
            <div className="block pb-6 md:pb-12 border-b border-lightPrimary">
              <Image
                src={SingleDocMedia}
                alt="Doctor"
                className="w-full border border-lightPrimary rounded-normal"
              />
              <h2 className="block md:hidden text-bluePrimary pt-5 text-[26px] leading-[36px]">
                Brittany Camille, FNP-C
              </h2>
            </div>
            <div className="block border-b border-lightPrimary py-6">
              <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                Specialties
              </h4>
              <ul className="flex flex-wrap gap-2.5">
                <li>
                  <Link
                    href="/find-doctor"
                    className="btn-outline-ternery btn-core"
                  >
                    Internal Medicine
                  </Link>
                </li>
                <li>
                  <Link
                    href="/find-doctor"
                    className="btn-outline-ternery btn-core"
                  >
                    Behavioral Medicine
                  </Link>
                </li>
                <li>
                  <Link
                    href="/find-doctor"
                    className="btn-outline-ternery btn-core"
                  >
                    Psychiatry
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href="/#"
              type="button"
              className="btn-md btn-outline-secondary flex-center rounded-normal mt-8 !w-full"
            >
              Call at 000.000.0000
            </Link>
          </div>
          <div className="block w-full md:w-[calc(100%-315px)]">
            <h2 className="hidden md:block text-bluePrimary text-[26px] leading-[36px] pb-6">
              Brittany Camille, FNP-C
            </h2>
            <div className="block"></div>
            <div className="block">
              <p className="text-lg leading-[32px] font-normal text-grey3d pb-4">
                Brittany Camille brings over a decade of diverse nursing
                experience to Altais Medical Group Riverside. Her background in
                primary care and medical-surgical units has given her a
                comprehensive understanding of patient care needs. Brittany
                chose to become a Family Nurse Practitioner for the opportunity
                to provide full-spectrum care and build lasting relationships
                with patients of all ages.
              </p>
              <p className="text-lg leading-[32px] font-normal text-grey3d pb-4">
                Throughout her career, Brittany has developed expertise in adult
                and geriatric care. Her approach focuses on patient education,
                preventive care, and collaborative treatment planning. This
                patient-centered philosophy allows her to connect effectively
                with individuals from all walks of life.
              </p>
              <p className="text-lg leading-[32px] font-normal text-grey3d pb-4">
                In her practice, Brittany offers a range of services, including
                physical exams, wellness checks, diagnosis and treatment of
                common health conditions, and patient education. She is
                committed to staying current with medical advancements, ensuring
                her patients receive up-to-date and effective treatments.
              </p>
              <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                Education
              </h3>
              <p className="text-lg leading-[32px] font-normal text-grey3d pb-4">
                Doctor of Nursing Practice: University of Massachusetts Global
              </p>
              <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                Languages Spoken
              </h3>
              <p className="text-lg leading-[32px] font-normal text-grey3d pb-4">
                English
              </p>
              <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                Clinical Interests
              </h3>
              <ul>
                <li className="text-lg leading-[32px] font-normal text-grey3d pb-4">
                  Doctor of Nursing Practice: University of Massachusetts Global
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
