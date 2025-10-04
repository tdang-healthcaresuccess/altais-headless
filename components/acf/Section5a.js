import WordPressContent from "../WordPressContent";

/**
 * Section5a component.
 * Renders a simple, single-column content section.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object from the ACF Flexible Content layout.
 * @param {string} props.data.section5aContent - The HTML content for the section.
 */
const Section5a = ({ data }) => {
  if (!data) return null;

  const { section5aContent, section5aLineBreak } = data;

  return (
    <section className={`template-wrapper ${section5aLineBreak ? "py-0 md:pt-0" : "py-6 md:py-12"}`}>
      <div className="container mx-auto">
        <div className={`max-w-full md:max-w-[743px] mx-auto ${section5aLineBreak && "py-6 md:py-12"}`}>
          {section5aContent && (
            <WordPressContent
              content={section5aContent}
              className="prose dark:prose-invert text-base lg:text-lg content-dynamic"
            />
          )}
        </div>
      </div>
      {section5aLineBreak && (
        <div className="hidden md:block container mx-auto">
          <div className="block line-break border-b border-lightPrimary"></div>
        </div>
      )}
    </section>
  );
};

export default Section5a;
