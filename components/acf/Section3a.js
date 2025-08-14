import Image from "next/image";
import DummyImage from "@/public/media/placeholder-frame160.png"
import he from "he";
// This is a placeholder for a responsive image component.
// In a real application, you'd want to use a component that handles
// image optimization (like Next.js's Image component) or adds
// proper fallbacks.
const ResponsiveImage = ({ src, alt }) => {
  if (!src) {
    return (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-normal"></div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover rounded-normal border border-primary"
    />
  );
};

// Sub-component for the cards inside Section3a

const Card = ({ cardData }) => {
  if (!cardData) return null;

  const { cardContent, cardHeadline, lineBreak } = cardData;
  const imageUrl = cardData.cardImage?.node?.sourceUrl;
  const imageIcon = cardData.cardIcon?.node?.sourceUrl;
  const displayImage = imageUrl || imageIcon;
  const isIcon = !!imageIcon && displayImage === imageIcon;
  return (
    <>
      <div className="rounded-normal h-full flex flex-col">
        {displayImage && (
          <div className={`flex-shrink-0 mb-4${isIcon ? ' icon-class' : ''}`}>
            <ResponsiveImage src={displayImage} />
          </div>
        )}
        <div className="flex-grow">
          {cardHeadline && <h3>{cardHeadline}</h3>}
          {cardContent && (
            <div
              className="block"
              dangerouslySetInnerHTML={{ __html: he.decode(cardContent) }}
            />
          )}
        </div>
        {lineBreak && (
        <div className="container mx-auto">
          <div className="block line-break"></div>
        </div>
      )}
      </div>
      
    </>
  );
}; /**
 * Section3a component.
 * Renders a grid of cards based on the `section3aCards` array.
 * The card layout adapts to different screen sizes.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object from the ACF Flexible Content layout.
 * @param {Array<object>} props.data.section3aCards - An array of card data objects.
 */
const Section3a = ({ data }) => {
  if (!data || !data.section3aCards) return null;
  const { section3aLineBreak } = data;
  // Use columnSelection to set grid columns
  const columnSelection = data.section3aCards[0]?.columnSelection || 2;
  const gridColumns = columnSelection === 3 || "3 Column" ? "grid-cols-3" : "grid-cols-2";

  return (
    <section className="template-wrapper list2 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-8 sm:grid-cols-2 md:${gridColumns} lg:${gridColumns}`}>
          {data.section3aCards.map((card, index) => (
            <Card key={index} cardData={card} />
          ))}
        </div>
        {section3aLineBreak && (
          <div className="container mx-auto">
            <div className="block line-break"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Section3a;
