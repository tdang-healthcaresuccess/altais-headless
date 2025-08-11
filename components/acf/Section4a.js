/**
 * Section4a component.
 * Renders a call-to-action (CTA) section with an image, headlines, and a button.
 * Note: A real button would likely have a `href` or `onClick` handler.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object from the ACF Flexible Content layout.
 * @param {string} props.data.section4aHeadline - The main CTA headline.
 * @param {string} props.data.section4aAdditionalHeadline - A secondary headline.
 * @param {string} props.data.ctaButtonText - The text for the CTA button.
 * @param {object} props.data.section4aImage - The image object for the CTA section.
 */
const Section4a = ({ data }) => {
  if (!data || !data.enableCta) return null; // Assuming `enableCta` is a boolean

  const {
    section4aHeadline,
    section4aAdditionalHeadline,
    ctaButtonText,
    section4aImage,
  } = data;
  const imageUrl = section4aImage?.node?.uri;

  return (
    <section className="py-16 md:py-24 bg-blue-600 dark:bg-blue-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {imageUrl && (
            <div className="w-full lg:w-1/3 flex-shrink-0 mb-8 lg:mb-0">
              <img
                src={imageUrl}
                alt="CTA Image"
                className="w-full rounded-xl shadow-lg object-cover"
              />
            </div>
          )}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            {section4aAdditionalHeadline && (
              <p className="text-xl font-semibold mb-2 opacity-80">
                {section4aAdditionalHeadline}
              </p>
            )}
            {section4aHeadline && (
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                {section4aHeadline}
              </h2>
            )}
            {ctaButtonText && (
              <button className="bg-white text-blue-600 dark:bg-gray-900 dark:text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                {ctaButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4a;