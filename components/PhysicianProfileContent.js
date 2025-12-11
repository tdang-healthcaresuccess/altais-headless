import { useQuery } from "@apollo/client";
import { useFaustQuery } from "@faustwp/core";
import { GET_PHYSICIAN_BY_SLUG } from "../queries/PhysicianQueries";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import Layout from "./Layout";
import Breadcrumb from "./common/breadcrumb";
import SinglePageBanner from "./common/single-page-banner";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PhysicianProfileContent() {
  const router = useRouter();
  const { slug } = router.query;

  // Helper to format phone number as XXX-XXX-XXXX
  const formatPhone = (phone) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
    }
    return phone;
  };

  // Debug logging
  console.log('PhysicianProfileContent - slug:', slug);
  console.log('PhysicianProfileContent - router ready:', router.isReady);

  // Get physician data by slug using Apollo Client directly
  const { data: physicianData, loading: physicianLoading, error: physicianError } = useQuery(GET_PHYSICIAN_BY_SLUG, {
    variables: { slug: String(slug) },
    skip: !slug || !router.isReady,
    errorPolicy: 'all'
  });

  // Debug logging
  console.log('GraphQL Response:', {
    data: physicianData,
    loading: physicianLoading,
    error: physicianError,
    physician: physicianData?.doctorBySlug,
    variables: { slug: String(slug) },
    skipQuery: !slug || !router.isReady
  });

  const physician = physicianData?.doctorBySlug;

  if (physicianLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading physician profile...</p>
            <p className="text-sm text-gray-500 mt-2">Searching for slug: {slug}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (physicianError || !physician) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Physician Not Found</h1>
            <p className="text-gray-600 mb-4">The physician you're looking for could not be found.</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
              <h3 className="font-bold mb-2">Debug Information:</h3>
              <p><strong>Slug searched:</strong> {slug}</p>
              <p><strong>GraphQL Error:</strong> {physicianError ? JSON.stringify(physicianError, null, 2) : 'None'}</p>
              <p><strong>Data returned:</strong> {physicianData ? JSON.stringify(physicianData, null, 2) : 'None'}</p>
            </div>
            <a href="/find-care" className="btn-primary">
              Find a Doctor
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  const physicianFullName = `${physician.firstName} ${physician.lastName}`;
  const physicianNameWithDegree = `${physicianFullName}${physician.degree ? ', ' + physician.degree : ''}${physician.specialties && physician.specialties.length > 0 ? ', ' + physician.specialties[0] : ''}`.trim();
  const physicianFullNameWithDegree = `${physicianFullName}${physician.degree ? ', ' + physician.degree : ''}`;
  return (
    <Layout
      metaD={{
        titleTag: `${physicianNameWithDegree} | Altais`,
        metaDescription: `Learn more about Dr. ${physicianFullName} and their compassionate, affordable, and connected care at Altais. Specializing in ${physician.specialties?.join(', ') || 'healthcare'}.`,
        canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/physicians/${physician.slug}/`
      }}
    >
      {/* Inner Page Banner */}
      <SinglePageBanner
        DesktopBanner="bg-single-landing-banner"
        MobileBanner="bg-single-landing-banner-mobile"
        heading={physicianFullNameWithDegree}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Find Care", link: "/find-care/" },
          { label: physicianFullName, link: `/physicians/${physician.slug}/` },
        ]}
      />

      {/* Physician Profile Content - Original Layout */}
      <div className="block md:pt-[50px] pb-[100px]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-[50px] md:gap-[80px] lg:gap-[120px]">
            
            {/* Left Sidebar */}
            <div className="block w-full md:w-[315px]">
              <div className="block pb-6 md:pb-12 border-b border-lightPrimary">
                {physician.profileImageUrl ? (
                  <img
                    src={physician.profileImageUrl}
                    alt={physicianFullName}
                    width={315}
                    height={315}
                    className="w-full border border-lightPrimary rounded-normal object-cover"
                  />
                ) : (
                  <img
                    src="/media/doctor1.png"
                    alt={physicianFullName}
                    width={315}
                    height={315}
                    className="w-full border border-lightPrimary rounded-normal object-cover"
                  />
                )}
                <h2 className="block md:hidden text-bluePrimary pt-5 text-[26px] leading-[36px]">
                  {physicianNameWithDegree}
                </h2>
              </div>

              {/* Location */}
              <div className="block border-b border-lightPrimary py-6">
                <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                  Location
                </h4>
                <div className="text-base text-grey3d leading-relaxed">
                  {physician.practiceName && (
                    <div className="font-medium mb-1">{physician.practiceName}</div>
                  )}
                  {physician.address && (
                    <div>{physician.address}</div>
                  )}
                  <div>
                    {physician.city && <span>{physician.city}</span>}
                    {physician.state && <span>, {physician.state}</span>}
                    {physician.zip && <span> {physician.zip}</span>}
                  </div>
                </div>
              </div>

              {/* Specialties */}
              {physician.specialties && physician.specialties.length > 0 && (
                <div className="block border-b border-lightPrimary py-6">
                  <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                    Specialties
                  </h4>
                  <ul className="flex flex-wrap gap-2.5">
                    {physician.specialties.map((specialty, index) => {
                      // Generate specialty slug
                      const specialtySlug = specialty
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
                        .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
                      
                      return (
                        <li key={index}>
                          <Link href={`/specialty/${specialtySlug}`} className="btn-outline-ternery btn-core">
                            {specialty}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Clinical Interests */}
              {physician.clinicalInterests && physician.clinicalInterests.length > 0 && (
                <div className="block border-b border-lightPrimary py-6">
                  <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                    Clinical Interests
                  </h4>
                  <ul className="flex flex-wrap gap-2.5">
                    {physician.clinicalInterests.map((interest, index) => (
                      <li key={index}>
                        <span className="btn-outline-ternery btn-core cursor-default">
                          {interest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {physician.languages && physician.languages.length > 0 && (
                <div className="block border-b border-lightPrimary py-6">
                  <h4 className="text-base text-bluePrimary pb-2.5 font-semibold">
                    Languages
                  </h4>
                  <ul className="flex flex-wrap gap-2.5">
                    {physician.languages.map((language, index) => (
                      <li key={index}>
                        <span className="btn-outline-ternery btn-core">
                          {language}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Call Button */}
              {physician.phoneNumber && (
                <a
                  href={`tel:${physician.phoneNumber}`}
                  className="btn-md btn-outline-secondary flex-center rounded-normal mt-8 !w-full"
                >
                  Call at {formatPhone(physician.phoneNumber)}
                </a>
              )}
            </div>

            {/* Right Main Content */}
            <div className="block w-full md:w-[calc(100%-315px)]">
              <h2 className="hidden md:block text-bluePrimary text-[26px] leading-[36px] pb-6">
                {physicianNameWithDegree}
              </h2>

              {/* Biography */}
              {physician.biography && (
                <div className="block mb-6">
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    {physician.biography}
                  </p>
                </div>
              )}

              {/* Education & Training */}
              <div className="block">
                <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                  Education & Training
                </h3>
                {physician.medicalSchool && (
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    Medical School : {physician.medicalSchool}
                  </p>
                )}
                {physician.internship && (
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    Internship : {physician.internship}
                  </p>
                )}
                {physician.residency && (
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    Residency : {physician.residency}
                  </p>
                )}
                {physician.fellowship && (
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    Fellowship : {physician.fellowship}
                  </p>
                )}
                {physician.certification && (
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    Board Certification : {physician.certification}
                  </p>
                )}
              </div>

              {/* Accepts Medical */}
              {physician.accept_medi_cal && (
                <div className="block mt-6">
                  <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                    Accepts Medical
                  </h3>
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    {physician.accept_medi_cal === 'yes' || physician.accept_medi_cal === true || physician.accept_medi_cal === '1' ? 'Yes' : 'No'}
                  </p>
                </div>
              )}

              {/* Accepting New Patients */}
              {physician.accepts_new_patients && (
                <div className="block mt-6">
                  <h3 className="text-[22px] leading-[32px] font-medium text-bluePrimary">
                    Accepting New Patients
                  </h3>
                  <p className="text-lg leading-[32px] font-normal text-grey3d">
                    {physician.accepts_new_patients === 'yes' || physician.accepts_new_patients === true || physician.accepts_new_patients === '1' ? 'Yes' : 'No'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}