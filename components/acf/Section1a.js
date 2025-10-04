
import WordPressImage from "../WordPressImage";
import WordPressContent from "../WordPressContent";

// Enhanced ResponsiveImage component using WordPressImage
const ResponsiveImage = ({ src, alt }) => {
  if (!src) {
    return (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-normal"></div>
    );
  }
  return (
    <WordPressImage
      src={src}
      alt={alt}
      width={838}
      height={400}
      className="w-full h-auto object-cover rounded-normal border border-primary"
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
  if (!data) {
    return null;
  }

  const imageUrl = data.section1aImg?.node?.sourceUrl;
  const sectionContent = data.section1aContent;
  const section1aLineBreak = data.section1aLineBreak;

  return (
    <section className={`template-wrapper ${section1aLineBreak ? "py-12": "py-12"}`}>
      <div className="container mx-auto">
        <div className="block max-w-[838px] mx-auto">
          <div className="flex flex-col gap-6">
            {/* Left Column: Image */}
            <div className="w-full flex justify-center">
              <ResponsiveImage src={imageUrl} alt="Section 1A Image" />
            </div>

            {/* Right Column: Content */}
            <div className="max-w-full md:max-w-[743px] mx-auto pt-6">
              <WordPressContent 
                content={sectionContent}
              />
            </div>
          </div>
        </div>
      </div>
      {section1aLineBreak && (
        <div className="hidden md:block container mx-auto">
          <div className="block line-break border-b border-lightPrimary"></div>
        </div>
      )}
    </section>
  );
};

export default Section1a;
