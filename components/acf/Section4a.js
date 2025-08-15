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
 * @param {object} props.data.section4aDescription - Description
 * @param {object} props.data.section4aAdditionalDescription - Description
 */
const Section4a = ({ data }) => {
  if (!data) return null;

  const {
    section4aHeadline,
    section4aAdditionalHeadline,
    section4aAdditionalDescription,
    ctaButtonText,
    ctaButtonUrl,
    enableCta,
    section4aImage,
    section4aDescription,
    section4aLineBreak,
  } = data;
  const imageUrl = section4aImage?.node?.sourceUrl;

  return (
    <section className="template-wrapper py-6 md:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {imageUrl && (
            <div className="w-full lg:w-1/3 flex-shrink-0 mb-8 lg:mb-0">
              <img
                src={imageUrl}
                alt="CTA Image"
                className="w-full rounded-normal border border-lightPrimary object-cover"
              />
            </div>
          )}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            {/* Primary Headline Start */}
            <div className="block">
              {section4aHeadline && (
                <p className="text-xl font-semibold mb-2 opacity-80">
                  {section4aHeadline}
                </p>
              )}
              <p>{section4aDescription}</p>
            </div>
            {/* Primary Headline End */}

            {/* Additonal Headline End */}
            <div className="block">
              {section4aAdditionalHeadline && (
                <p className="text-xl font-semibold mb-2 opacity-80">
                  {section4aAdditionalHeadline}
                </p>
              )}
              <p>{section4aAdditionalDescription}</p>
            </div>
            {/* Additonal Headline End */}

            {/* Action Button Start */}
            {enableCta && ctaButtonText && ctaButtonUrl && (
              <a
                href={ctaButtonUrl}
                className="btn-md btn-gradient flex-center w-full min-w-[530px] max-w-[530px]"
              >
                {ctaButtonText}
              </a>
            )}
            {/* Action Button End */}
          </div>
        </div>
        {section4aLineBreak && (
          <div className="container mx-auto">
            <div className="block"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Section4a;
