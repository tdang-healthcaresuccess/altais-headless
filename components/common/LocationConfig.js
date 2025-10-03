// LocationConfig.js
// Store Google Maps API key for location input
import { gql, useQuery } from '@apollo/client';

// GraphQL query to fetch Google API key from ACF
const GET_GOOGLE_API_KEY = gql`
  query NewQuery {
    globalthemeoptions {
      googleApi {
        googleApi
      }
    }
  }
`;

// Hook to get Google API key from ACF
export const useGoogleApiKey = () => {
  const { data, loading, error } = useQuery(GET_GOOGLE_API_KEY, {
    errorPolicy: 'all'
  });
  
  return {
    apiKey: data?.globalthemeoptions?.googleApi?.googleApi || null,
    loading,
    error
  };
};

// Export hook as default for easier importing
export default useGoogleApiKey;
