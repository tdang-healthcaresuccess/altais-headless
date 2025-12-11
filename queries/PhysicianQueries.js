import { gql } from '@apollo/client';

// Query to get a single physician by slug
export const GET_PHYSICIAN_BY_SLUG = gql`
  query GetPhysicianBySlug($slug: String!) {
    doctorBySlug(slug: $slug) {
      accept_medi_cal
      accepts_new_patients
      biography
      btDirectory
      certification
      degree
      doctorID
      fellowship
      faxNumber
      email
      firstName
      gender
      hospitalNames
      hospitals
      idme
      insurances
      internship
      lastName
      languages
      medicalSchool
      mentalHealth
      primaryCare
      profileImageUrl
      provStatus
      residency
      slug
      specialties
      clinicalInterests
      locations {
        organization
        addressLine1
        locality
        administrativeArea
        postalCode
        phoneNumber
        isPrimary
        latitude
        longitude
      }
    }
  }
`;

// Query to get all physicians with pagination and search
export const GET_PHYSICIANS_LIST = gql`
  query GetPhysiciansList($search: String, $specialty: [String], $language: [String], $gender: [String], $degree: [String], $insurance: [String], $page: Int, $perPage: Int, $orderBy: String, $order: String) {
    doctorsList(search: $search, specialty: $specialty, language: $language, gender: $gender, degree: $degree, insurance: $insurance, page: $page, perPage: $perPage, orderBy: $orderBy, order: $order) {
      items {
        lastName
        firstName
        hospitals
        accept_medi_cal
        accepts_new_patients
        biography
        btDirectory
        certification
        degree
        degrees
        doctorID
        email
        faxNumber
        fellowship
        gender
        hospitalNames
        idme
        insurances
        internship
        languages
        medicalSchool
        mentalHealth
        primaryCare
        profileImageUrl
        provStatus
        residency
        slug
        specialties
        clinicalInterests
        locations {
          organization
          addressLine1
          locality
          administrativeArea
          postalCode
          phoneNumber
          isPrimary
          latitude
          longitude
        }
      }
      total
      page
      perPage
    }
  }
`;

// Query to get physicians with advanced filtering for search page
export const GET_PHYSICIANS_FILTERED = gql`
  query GetPhysiciansFiltered(
    $search: String
    $specialty: String
    $language: String
    $gender: String
    $primaryCare: Boolean
    $page: Int
    $perPage: Int
    $orderBy: String
    $order: String
  ) {
    doctorsList(
      search: $search
      specialty: $specialty
      language: $language
      gender: $gender
      primaryCare: $primaryCare
      page: $page
      perPage: $perPage
      orderBy: $orderBy
      order: $order
    ) {
      items {
        doctorID
        slug
        firstName
        lastName
        degree
        primaryCare
        gender
        profileImageUrl
        specialties
        clinicalInterests
        languages
        insurances
        certification
        medicalSchool
        residency
        fellowship
        internship
        locations {
          organization
          addressLine1
          locality
          administrativeArea
          postalCode
          phoneNumber
          isPrimary
          latitude
          longitude
        }
      }
      total
      page
      perPage
    }
  }
`;

// Query to get all physician slugs for static generation
export const GET_PHYSICIAN_SLUGS = gql`
  query GetPhysicianSlugs {
    doctorsList(perPage: 1000) {
      items {
        slug
      }
    }
  }
`;

// Query to get specialties for filtering
export const GET_SPECIALTIES = gql`
  query GetSpecialties {
    specialties
  }
`;

// Query to get languages for filtering
export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages
  }
`;

// Query to get insurances for filtering
export const GET_INSURANCES = gql`
  query GetInsurances {
    insurances
  }
`;

// Query to get degrees for filtering
export const GET_DEGREES = gql`
  query GetDegrees {
    degrees
  }
`;