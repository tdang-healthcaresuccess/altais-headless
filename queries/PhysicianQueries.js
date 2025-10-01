import { gql } from '@apollo/client';

// Query to get a single physician by slug
export const GET_PHYSICIAN_BY_SLUG = gql`
  query GetPhysicianBySlug($slug: String!) {
    doctorBySlug(slug: $slug) {
      accept_medi_cal
      accepts_new_patients
      address
      biography
      btDirectory
      certification
      city
      county
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
      latitude
      longitude
      medicalSchool
      mentalHealth
      practiceName
      phoneNumber
      primaryCare
      profileImageUrl
      provStatus
      residency
      slug
      specialties
      state
      zip
    }
  }
`;

// Query to get all physicians with pagination and search
export const GET_PHYSICIANS_LIST = gql`
  query GetPhysiciansList($search: String, $specialty: String, $language: String, $gender: String, $primaryCare: Boolean, $page: Int, $perPage: Int, $orderBy: String, $order: String) {
    doctorsList(search: $search, specialty: $specialty, language: $language, gender: $gender, primaryCare: $primaryCare, page: $page, perPage: $perPage, orderBy: $orderBy, order: $order) {
      items {
        lastName
        firstName
        hospitals
        accept_medi_cal
        accepts_new_patients
        address
        biography
        btDirectory
        certification
        city
        county
        degree
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
        latitude
        longitude
        medicalSchool
        mentalHealth
        phoneNumber
        practiceName
        primaryCare
        profileImageUrl
        provStatus
        residency
        slug
        specialties
        state
        zip
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
        phoneNumber
        primaryCare
        gender
        practiceName
        address
        city
        state
        zip
        latitude
        longitude
        profileImageUrl
        specialties
        languages
        insurances
        certification
        medicalSchool
        residency
        fellowship
        internship
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
    specialties {
      name
      slug
    }
  }
`;

// Query to get languages for filtering
export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      name
    }
  }
`;

// Query to get insurances for filtering
export const GET_INSURANCES = gql`
  query GetInsurances {
    insurances {
      name
    }
  }
`;