import React from 'react';

/**
 * Section2a component.
 * Renders a section with a headline and content, with a customizable background color.
 * The layout is centered and responsive.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object from the ACF Flexible Content layout.
 * @param {string} props.data.headline2a - The main headline for the section.
 * @param {string} props.data.content2a - The content text for the section.
 * @param {string} props.data.sectionBackgroundColor - The background color (e.g., '#FFFFFF', '#F3F4F6').
 */
const Section2a = ({ data }) => {
  if (!data) return null;

  const { headline2a, content2a, sectionBackgroundColor } = data;

  return (
    <section style={{ backgroundColor: sectionBackgroundColor }} className="py-16 md:py-24 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {headline2a && (
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {headline2a}
            </h2>
          )}
          {content2a && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {content2a}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
export default Section2a;