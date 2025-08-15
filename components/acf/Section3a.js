import Image from "next/image";
import DummyImage from "@/public/media/placeholder-frame160.png";
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
      width="100%"
      height="100%"
      className="w-full object-cover rounded-normal border border-primary h-auto md:h-[170px]"
    />
  );
};

// Sub-component for the cards inside Section3a

const Card = ({ cardData }) => {
  if (!cardData) return null;
  console.log(cardData);
  
  const { cardContent, cardHeadline, lineBreak } = cardData;
  const imageUrl = cardData.cardImage?.node?.sourceUrl;
  const imageIcon = cardData.cardIcon?.node?.sourceUrl;
  const displayImage = imageUrl || imageIcon;
  const isIcon = !!imageIcon && displayImage === imageIcon;
  return (
    <div className="rounded-normal h-full flex flex-col">
      {imageUrl && (
        <div className="flex-shrink-0 mb-4">
          <ResponsiveImage src={imageUrl} alt={cardHeadline} />
        </div>
      )}
      <div className="flex-grow">
        {imageIcon ? (
          <>
            <h3 className="flex items-center gap-4">
              <img src={imageIcon} alt={cardHeadline} width={40} height={40} />
              {cardHeadline}
            </h3>
          </>
        ) : (
          <> {cardHeadline && <h3>{cardHeadline}</h3>}</>
        )}
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
  // const columnSelection = data.section3aCards[0]?.columnSelection || 2;
  // const gridColumns = columnSelection === 3 || "3 Column" ? "grid-cols-3" : "grid-cols-2";

  return (
    <section className="template-wrapper list2 py-6 md:py-12">
      <div className="container mx-auto">
        <div
          style={{
            // Only apply dynamic value on large screens
            ["@media (min-width: 1024px)"]: {
              gridTemplateColumns: `repeat(${data?.columnSelection[0]}, minmax(0, 1fr))`,
            },
          }}
          className="grid gap-8 grid-cols-1 md:grid-cols-2"
        >
          {data.section3aCards.map((card, index) => (
            <Card key={index} cardData={card} />
          ))}
        </div>

        {section3aLineBreak && (
          <div className="container mx-auto">
            <div className="block line-break border-b border-lightPrimary"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Section3a;
