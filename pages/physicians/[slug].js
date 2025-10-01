import dynamic from 'next/dynamic';

// Dynamically import the physician profile component to avoid hydration issues
const PhysicianProfileContent = dynamic(
  () => import('../../components/PhysicianProfileContent'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading physician profile...</p>
        </div>
      </div>
    )
  }
);

export default function PhysicianSlug() {
  return <PhysicianProfileContent />;
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug
    },
    revalidate: 60 * 60 // Revalidate every hour
  };
}