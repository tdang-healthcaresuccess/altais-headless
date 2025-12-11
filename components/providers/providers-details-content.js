import { useEffect, useState } from "react";
import Image from "next/image";
import SingleDocMedia from "@/public/media/doctor-single.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { GET_PHYSICIAN_BY_SLUG } from "@/queries/PhysicianQueries";

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
  const [slug, setSlug] = useState(null);

  // Extract slug from URL
  useEffect(() => {
    if (router.isReady) {
      const { asPath } = router;
      const segments = asPath.split('/').filter(Boolean);
      const profileUrlSegment = segments[segments.length - 1];
      setSlug(profileUrlSegment);
    }
  }, [router.isReady, router.asPath]);

  // Query physician data by slug
  const { data: physicianData, loading: physicianLoading, error: physicianError } = useQuery(GET_PHYSICIAN_BY_SLUG, {
    variables: { slug },
    skip: !slug
  });

  const provider = physicianData?.doctorBySlug || null;

  // Apollo Client GraphQL query for specialties
  const SPECIALTIES_QUERY = gql`
    query GetSpecialties {
      specialities (first: 700){
        nodes {
          title
          uri
        }
      }
    }
  `;
  const { data: specialtiesData, loading: specialtiesLoading, error: specialtiesError } = useQuery(SPECIALTIES_QUERY);
  const specialtyPosts = specialtiesData?.specialities?.nodes || [];

  if (physicianLoading) {
    return (
      <div className="block md:pt-[50px] pb-[100px]">
        <div className="container mx-auto">
          <p className="text-center text-xl text-bluePrimary">Loading...</p>
        </div>
      </div>
    );
  }

  if (physicianError || !provider) {
    return (
      <div className="block md:pt-[50px] pb-[100px]">
        <div className="container mx-auto">
          <p className="text-center text-xl text-bluePrimary">Provider not found.</p>
        </div>
      </div>
    );
  }

  const renderList = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item, index) => {
          // Find matching specialty post by title
          const match = specialtyPosts.find(sp => sp.title.toLowerCase() === item.toLowerCase());
          let linkUri = null;
          if (match) {
            linkUri = match.uri;
          } else {
            // Fallback: generate /specialty/{name-with-dashes-and-no-special-chars}
            const slug = item
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
              .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
            linkUri = `/specialty/${slug}`;
          }
          return (
            <li key={index}>
              <Link href={linkUri} className="btn-outline-ternery btn-core">
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  // Helper function to render plain list without links (for clinical interests)
  const renderPlainList = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="flex flex-wrap gap-2.5">
        {items.map((item, index) => (
          <li key={index} className="btn-outline-ternery btn-core cursor-default">
            {item}
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
    if (!provider.specialties) return [];
    // Handle both array and string formats
    if (Array.isArray(provider.specialties)) {
      return provider.specialties.filter(spec => spec && spec !== "nan");
    }
    // If it's a string, split by comma
    if (typeof provider.specialties === 'string') {
      return provider.specialties.split(',').map(s => s.trim()).filter(s => s && s !== "nan");
    }
    return [];
  };

  const getClinicalInterests = () => {
    if (!provider.clinicalInterests) return [];
    // Handle both array and string formats
    if (Array.isArray(provider.clinicalInterests)) {
      return provider.clinicalInterests.filter(interest => interest && interest !== "nan");
    }
    // If it's a string, split by comma
    if (typeof provider.clinicalInterests === 'string') {
      return provider.clinicalInterests.split(',').map(s => s.trim()).filter(s => s && s !== "nan");
    }
    return [];
  };
  
  return (
    <div className="block md:pt-[50px] pb-[100px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-[50px] md:gap-[80px] lg:gap-[120px]">
          <div className="block w-full md:w-[315px]">
            <div className="block pb-6 md:pb-12 border-b border-lightPrimary">
              <Image
                src={provider.profileImageUrl || "/media/doctor1.png"}
                alt={`${provider.firstName || ''} ${provider.lastName || ''}`}
                width={315}
                height={315}
                className="w-full border border-lightPrimary rounded-normal"
              />
              <h2 className="block md:hidden text-bluePrimary pt-5 text-[26px] leading-[36px]">
                {provider.firstName} {provider.lastName}{provider.degree ? `, ${provider.degree}` : ''}
              </h2>
            </div>
             <div className="block border-b border-lightPrimary py-6">
              <h4 className="text-base text-primary pb-2.5 font-semibold">
                Location
              </h4>
              <div className="text-base text-grey3d leading-relaxed">
                {provider.practiceName && (
                  <div className="font-medium mb-1">{provider.practiceName}</div>
                )}
                {provider.address && (
                  <div>{provider.address}</div>
                )}
                <div>
                  {provider.city && <span>{provider.city}</span>}
                  {provider.state && <span>, {provider.state}</span>}
                  {provider.zip && <span> {provider.zip}</span>}
                </div>
              </div>
            </div>
            <div className="block border-b border-lightPrimary py-6">
              <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                Specialties
              </h4>
              {renderList(getSpecialties())}
            </div>
            {getClinicalInterests().length > 0 && (
              <div className="block border-b border-lightPrimary py-6">
                <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                  Clinical Interests
                </h4>
                {renderPlainList(getClinicalInterests())}
              </div>
            )}
            {/* <div className="block border-b border-lightPrimary py-6">
              <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                Accepted Insurance
              </h4>
              {renderList(provider.acceptedInsurance.filter(ins => ins !== 'nan'))}
            </div> */}
            <Link
              href={`tel:${provider.phoneNumber}`}
              className="btn-md btn-outline-secondary flex-center rounded-normal mt-8 !w-full"
            >
              Call at {formatPhone(provider.phoneNumber)}
            </Link>
          </div>
          <div className="block w-full md:w-[calc(100%-315px)]">
            <h2 className="hidden md:block text-bluePrimary text-[26px] leading-[36px] pb-6">
              {provider.firstName} {provider.lastName}{provider.degree ? `, ${provider.degree}` : ''}
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
              {/* <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary mt-6">
                Hospital Affiliations
              </h3>
              {renderAffiliations(provider.hospitalAffiliations)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}