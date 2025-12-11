import { gql, useQuery } from "@apollo/client";
import ClinicCard from "./clinic-card";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations(first: 100) {
      nodes {
        id
        title
        excerpt
        uri
        slug
      }
    }
  }
`;

export default function ClinicsList() {
  const { data, loading, error } = useQuery(GET_LOCATIONS);

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto">
          <p className="text-center text-xl text-bluePrimary">Loading clinics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto">
          <p className="text-center text-xl text-red-600">Error loading clinics.</p>
        </div>
      </div>
    );
  }

  const clinics = data?.locations?.nodes || [];

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col md:flex-row gap-[33px]">
          {clinics.map((item, index) => {
            return (
              <ClinicCard
                key={item.id}
                title={item.title}
                index={index}
                description={item.excerpt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
