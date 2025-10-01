import { useFaustQuery } from '@faustwp/core';
import { gql } from '@apollo/client';

const TEST_GRAPHQL = gql`
  query TestGraphQL {
    generalSettings {
      title
      url
    }
  }
`;

const GET_PHYSICIANS_TEST = gql`
  query GetPhysiciansTest {
    doctorsList(first: 5) {
      items {
        doctorID
        slug
        firstName
        lastName
      }
    }
  }
`;

const GET_PHYSICIAN_BY_SLUG_TEST = gql`
  query GetPhysicianBySlugTest($slug: String!) {
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
    }
  }
`;

export default function DebugGraphQL() {
  // Test basic GraphQL connection
  const siteQuery = useFaustQuery(TEST_GRAPHQL) || {};
  const { data: siteData, loading: siteLoading, error: siteError } = siteQuery;

  // Test physicians list
  const physiciansQuery = useFaustQuery(GET_PHYSICIANS_TEST) || {};
  const { data: physiciansData, loading: physiciansLoading, error: physiciansError } = physiciansQuery;

  // Test specific physician
  const physicianQuery = useFaustQuery(GET_PHYSICIAN_BY_SLUG_TEST, {
    variables: { slug: 'nayana-anne-md' }
  }) || {};
  const { data: physicianData, loading: physicianLoading, error: physicianError } = physicianQuery;

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>GraphQL Debug Page</h1>
      
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>1. Basic WordPress Connection</h2>
        <p><strong>Loading:</strong> {siteLoading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {siteError ? JSON.stringify(siteError, null, 2) : 'None'}</p>
        <p><strong>Site Title:</strong> {siteData?.generalSettings?.title || 'Not loaded'}</p>
        <p><strong>Site URL:</strong> {siteData?.generalSettings?.url || 'Not loaded'}</p>
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>2. Physicians List Query</h2>
        <p><strong>Loading:</strong> {physiciansLoading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {physiciansError ? JSON.stringify(physiciansError, null, 2) : 'None'}</p>
        <p><strong>Physicians Count:</strong> {physiciansData?.doctorsList?.items?.length || 0}</p>
        {physiciansData?.doctorsList?.items && (
          <div>
            <h4>First few physicians:</h4>
            <pre style={{ background: '#f5f5f5', padding: '10px' }}>
              {JSON.stringify(physiciansData.doctorsList.items, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>3. Specific Physician Query (nayana-anne-md)</h2>
        <p><strong>Loading:</strong> {physicianLoading ? 'Yes' : 'No'}</p>
        <p><strong>Error:</strong> {physicianError ? JSON.stringify(physicianError, null, 2) : 'None'}</p>
        <p><strong>Physician Found:</strong> {physicianData?.doctorBySlug ? 'Yes' : 'No'}</p>
        {physicianData?.doctorBySlug && (
          <div>
            <h4>Physician Data:</h4>
            <pre style={{ background: '#f5f5f5', padding: '10px' }}>
              {JSON.stringify(physicianData.doctorBySlug, null, 2)}
            </pre>
          </div>
        )}
        {!physicianData?.doctorBySlug && !physicianLoading && (
          <div style={{ background: '#ffebee', padding: '10px', color: '#c62828' }}>
            <strong>No physician found with slug: nayana-anne-md</strong>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>4. Environment Check</h2>
        <p><strong>NEXT_PUBLIC_WORDPRESS_URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL || 'Not set'}</p>
        <p><strong>WORDPRESS_URL:</strong> {process.env.WORDPRESS_URL || 'Not set'}</p>
        <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
      </div>
    </div>
  );
}