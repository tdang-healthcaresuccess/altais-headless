import { gql } from '@apollo/client';

// Query to get a single physician by slug
export const GET_PHYSICIAN_BY_SLUG = gql`
  query GetPhysicianBySlug($slug: String!) {
    doctorBySlug(slug: $slug) {
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
      firstName
      gender
      hospitalNames
      idme
      insurances
      internship
      lastName
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
      state
      zip
      specialties
      languages
      hospitals
      accept_medi_cal
      accepts_new_patients
    }
  }
`;

// Query to get all physicians with pagination and search
export const GET_PHYSICIANS_LIST = gql`
  query GetPhysiciansList($first: Int, $search: String, $specialty: String, $location: String) {
    doctorsList(first: $first, search: $search, specialty: $specialty, location: $location) {
      items {
        doctorID
        slug
        firstName
        lastName
        degree
        email
        phoneNumber
        faxNumber
        primaryCare
        gender
        specialties
        languages
        address
        city
        state
        zip
        latitude
        longitude
        profileImageUrl
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
        profileImageUrl
        specialties
        languages
        insurances
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
    doctorsList(first: 1000) {
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