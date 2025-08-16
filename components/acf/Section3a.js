import he from "he";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
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

  const { cardContent, cardHeadline, lineBreak, cardContentCollapse } =
    cardData;
  const imageUrl = cardData.cardImage?.node?.sourceUrl;
  const imageIcon = cardData.cardIcon?.node?.sourceUrl;
  const displayImage = imageUrl || imageIcon;
  const isIcon = !!imageIcon && displayImage === imageIcon;

  const [isExpanded, setIsExpanded] = useState(false);

  // Decode HTML once
  const decodedContent = useMemo(
    () => he.decode(cardContent || ""),
    [cardContent]
  );

  const truncatedContent = useMemo(() => {
    if (!decodedContent) return "";
    const words = decodedContent.split(/\s+/);
    return words.length > 350
      ? words.slice(0, 350).join(" ") + "..."
      : decodedContent;
  }, [decodedContent]);

  console.log(truncatedContent);

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
        {/* Only show content if expanded, otherwise just headline and button */}
        {cardContentCollapse ? (
          <>
            {/* Content */}
            <div
              className="block"
              dangerouslySetInnerHTML={{
                __html: isExpanded ? decodedContent : truncatedContent,
              }}
            />

            {/* Expand / Collapse Button */}
            <div className="block line-break pt-3 border-t border-lightPrimary">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="btn-link-secondary"
              >
                {isExpanded ? (
                  <span className="flex gap-1">
                    Collapse <Minus size={18} />
                  </span>
                ) : (
                  <span className="flex gap-1">
                    Expand <Plus size={18} />
                  </span>
                )}
              </button>
            </div>
          </>
        ) : (
          cardContent && (
            <div
              className="block"
              dangerouslySetInnerHTML={{ __html: decodedContent }}
            />
          )
        )}
      </div>
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
          {data?.section3aCards.map((card, index) => (
            <Card key={index} cardData={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3a;
