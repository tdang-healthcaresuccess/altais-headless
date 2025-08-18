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

  const {
    headline2a,
    content2a,
    sectionBackgroundColor,
    section2aLineBreak,
    wrapUpList,
  } = data;
  console.log(wrapUpList);
  return (
    <section
      style={{ backgroundColor: sectionBackgroundColor }}
      className={`template-wrapper pb-[73px] md:pb-[54px] ${section2aLineBreak ? "pt-0" : "pt-12 md:pt-[60px]"}`}
    >
      {section2aLineBreak && (
        <div className="hidden md:block container mx-auto">
          <div className="block border-b border-lightPrimary"></div>
        </div>
      )}
      <div className="container mx-auto">
        <div
          className={`block md:flex justify-start items-start w-full gap-10 ${section2aLineBreak && "pt-12"}`}
        >
          {/* Left Column */}
          {headline2a && (
            <div
              className={`flex justify-center md:justify-start max-w-full min-w-full md:min-w-[340px] ${!content2a ? "md:max-w-full" : "md:max-w-[340px]"}`}
            >
              <h2 className="flex flex-col text-left w-full">{headline2a}</h2>
            </div>
          )}

          {content2a ? (
            <div className="block pt-4 md:pt-0 md:pl-10 border-t md:border-t-0 md:border-l border-secondary section-content">
              <div
                className={!wrapList && "wrap-list"}
                dangerouslySetInnerHTML={{ __html: content2a }}
              />
            </div>
          ) : (
            ""
          )}
        </div> 
      </div>
    </section>
  );
};
export default Section2a;
