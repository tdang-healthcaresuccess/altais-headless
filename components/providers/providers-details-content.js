import { useEffect, useState } from "react";
import Image from "next/image";
import SingleDocMedia from "@/public/media/doctor-single.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { dummyDoctors } from "../DummyData"; // Assuming dummyDoctors is exported from DummyData.js

export default function ProvidersDetailsContent() {
  // Helper to format phone number as XXX-XXX-XXXX
  const formatPhone = (phone) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    }
    return phone;
  };
  const router = useRouter();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { asPath } = router;
      const segments = asPath.split('/').filter(Boolean);
      const profileUrlSegment = segments[segments.length - 1];

      const foundProvider = dummyDoctors.find(
        (doc) => doc.node.doctorData.profileurl === `/${profileUrlSegment}`
      );
      setProvider(foundProvider ? foundProvider.node.doctorData : null);
    }
  }, [router.isReady, router.asPath]);

  if (!provider) {
    return (
      <div className="block md:pt-[50px] pb-[100px]">
        <div className="container mx-auto">
          <p className="text-center text-xl text-bluePrimary">Provider not found.</p>
        </div>
      </div>
    );
  }

  // Helper function to render a list of items
  const renderList = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item, index) => (
          <li key={index}>
            <div className="btn-outline-ternery btn-core">
              {item}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Helper function to render the affiliations list
  const renderAffiliations = (affiliations) => {
    if (!affiliations || affiliations.length === 0) return null;
    return (
      <ul className="list-disc list-inside space-y-1">
        {affiliations.map((item, index) => (
          <li key={index} className="text-lg leading-[32px] font-normal text-grey3d">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const getSpecialties = () => {
    const specialties = [];
    if (provider.spec1 && provider.spec1 !== "nan") specialties.push(provider.spec1);
    if (provider.spec2 && provider.spec2 !== "nan") specialties.push(provider.spec2);
    if (provider.spec3 && provider.spec3 !== "nan") specialties.push(provider.spec3);
    return specialties;
  };
  
  return (
    <div className="block md:pt-[50px] pb-[100px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-[50px] md:gap-[80px] lg:gap-[120px] px-6 md:px-0">
          <div className="block w-full md:w-[315px]">
            <div className="block pb-6 md:pb-12 border-b border-lightPrimary">
              <Image
                src={provider.featuredImage?.node?.sourceUrl || "/media/doctor1.png"}
                alt={provider.doctorsName || "Doctor"}
                width={315}
                height={315}
                className="w-full border border-lightPrimary rounded-normal"
              />
              <h2 className="block md:hidden text-bluePrimary pt-5 text-[26px] leading-[36px]">
                {provider.doctorsName}, {provider.speciality}
              </h2>
            </div>
            <div className="block border-b border-lightPrimary py-6">
              <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                Specialties
              </h4>
              {renderList(getSpecialties())}
            </div>
            {/* <div className="block border-b border-lightPrimary py-6">
              <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                Accepted Insurance
              </h4>
              {renderList(provider.acceptedInsurance.filter(ins => ins !== 'nan'))}
            </div> */}
            <Link
              href={`tel:${provider.phone}`}
              className="btn-md btn-outline-secondary flex-center rounded-normal mt-8 !w-full"
            >
              Call at {formatPhone(provider.phone)}
            </Link>
          </div>
          <div className="block w-full md:w-[calc(100%-315px)]">
            <h2 className="hidden md:block text-bluePrimary text-[26px] leading-[36px] pb-6">
              {provider.doctorsName}, {provider.speciality}
            </h2>
            <div className="block">
              {/* Profile Description can be added here if available in data */}
            </div>
            <div className="block">
              <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                Education & Training
              </h3>
              <p className="text-lg leading-[32px] font-normal text-grey3d">
                Medical School: {provider.medicalSchool}
              </p>
              {provider.internship && (
                <p className="text-lg leading-[32px] font-normal text-grey3d">
                  Internship: {provider.internship}
                </p>
              )}
              {provider.residency && (
                <p className="text-lg leading-[32px] font-normal text-grey3d">
                  Residency: {provider.residency}
                </p>
              )}
              {provider.fellowship && (
                <p className="text-lg leading-[32px] font-normal text-grey3d">
                  Fellowship :{provider.fellowship}
                </p>
              )}
              <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary mt-6">
                Hospital Affiliations
              </h3>
              {renderAffiliations(provider.hospitalAffiliations)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}