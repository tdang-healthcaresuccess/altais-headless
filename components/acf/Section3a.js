import Image from "next/image";
import DummyImage from "@/public/media/placeholder-frame160.png"
import he from "he";

// Sub-component for the cards inside Section3a
const Card = ({ cardData }) => {
  if (!cardData) return null;

  const { cardHeadline, cardContent, cardImage } = cardData;
  const imageUrl = cardImage?.node?.uri;

  return (
    <div className="rounded-normal h-full flex flex-col">
        <div className="flex-shrink-0 mb-4">
          <Image
            src={imageUrl ? imageUrl : DummyImage}
            alt={cardHeadline}
            className="w-full h-[170px] object-cover rounded-normal border border-primary"
          />
        </div>
      <div className="flex-grow">
        {cardHeadline && <h3>{cardHeadline}</h3>}
        {cardContent && (
          <div
            className="block"
            dangerouslySetInnerHTML={{ __html: he.decode(cardContent) }}
          />
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
const Section3a = ({ data, columnSelection }) => {
  if (!data || !data?.section3aCards) return null;
  // Use columnSelection to set grid columns
  const columns =
  columnSelection === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <section className="template-wrapper list2 py-6 md:py-12 ">
      <div className="container mx-auto">
        <div className="grid gap-8 ${columns}">
          {data?.section3aCards.map((card, index) => (
            <Card key={index} cardData={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3a;
