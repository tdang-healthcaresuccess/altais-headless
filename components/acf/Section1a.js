import React from "react";
import Image from "next/image";

// This is a placeholder for a responsive image component.
// In a real application, you'd want to use a component that handles
// image optimization (like Next.js's Image component) or adds
// proper fallbacks.
const ResponsiveImage = ({ src, alt }) => {
  if (!src) {
    return (
      <div className="w-full h-64 lg:h-full bg-gray-200 animate-pulse rounded-lg"></div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover rounded-lg shadow-lg"
    />
  );
};

/**
 * Section1a component for the Faust.js template.
 * Renders a two-column layout with an image on one side and content on the other.
 * The layout is responsive, stacking on mobile and going side-by-side on desktop.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object containing fields from the ACF Flexible Content layout.
 * @param {string} props.data.section1aContent - The content for the section (HTML string).
 * @param {object} props.data.section1aImg - The image object containing the URI.
 * @param {object} props.data.section1aImg.node - The node object for the image.
 * @param {string} props.data.section1aImg.node.sourceUrl - The URL of the image.
 */
const Section1a = ({ data }) => {
  // Ensure data exists before trying to access its properties
  if (!data) {
    return null;
  }

  // Extract the image URI and content from the data prop
  // The GraphQL query in the parent component must be updated to fetch `section1aContent`.
  const imageUrl = data.section1aImg?.node?.sourceUrl;
  const sectionContent = data.section1aContent;
  return (
    <section className="block py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="block max-w-[838px] mx-auto">
          <div className="flex flex-col gap-6">
            {/* Left Column: Image */}
            <div className="w-full flex justify-center">
              <ResponsiveImage src={imageUrl} alt="Section 1A Image" />
            </div>

            {/* Right Column: Content */}
            <div className="w-full">
              <div
                className="prose dark:prose-invert max-w-none text-base lg:text-lg"
                // The content is assumed to be an HTML string from WordPress
                dangerouslySetInnerHTML={{ __html: sectionContent }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1a;
