import React from "react";

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
    // <section style={{ backgroundColor: sectionBackgroundColor }} className="py-16 md:py-24 text-center">
    //   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="max-w-3xl mx-auto">
    //       {headline2a && (
    //         <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
    //           {headline2a}
    //         </h2>
    //       )}
    //       {content2a && (
    //         <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
    //           {content2a}
    //         </p>
    //       )}
    //     </div>
    //   </div>
    // </section>
    <section className="template-wrapper pt-[50px] md:pt-[60px] pb-[73px] md:pb-[54px] px-4 md:px-0">
      <div className="container mx-auto !p-0">
        <div className="block md:flex justify-start items-start w-full">
          {/* Left Column */}
          {headline2a && (
            <div className="flex justify-center md:justify-start max-w-full md:max-w-[340px] min-w-full md:min-w-[340px]">
              <h2 className="flex flex-col text-center md:text-left w-full">
                {headline2a}
              </h2>
            </div>
          )}

          {content2a && (
            <>
              {/* Vertical Separator */}
              <div className="w-full md:w-[1px] h-[1px] md:h-[192px] bg-secondary my-6 md:my-0 max-0 md:mx-10"></div>

              {/* Right Column */}
              <div className="block">
                <p className="font-normal text-center md:text-left">
                  {content2a}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Section2a;
