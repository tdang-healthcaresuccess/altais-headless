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
    <section className="py-16 md:py-24">
      <div className="template-wrapper container mx-auto">
        <div className="max-w-4xl mx-auto">
          {section5aContent && (
            <div
              className="prose dark:prose-invert text-base lg:text-lg"
              dangerouslySetInnerHTML={{ __html: section5aContent }}
            />
          )}
        </div>
        {section5aLineBreak && (
          <div className="container mx-auto">
            <div className="block"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Section5a;