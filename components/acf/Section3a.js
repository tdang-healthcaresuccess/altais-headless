
// Sub-component for the cards inside Section3a
const Card = ({ cardData }) => {
  if (!cardData) return null;

  const { cardHeadline, cardContent, cardImage } = cardData;
  const imageUrl = cardImage?.node?.uri;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      {imageUrl && (
        <div className="flex-shrink-0 mb-4">
          <img
            src={imageUrl}
            alt={cardHeadline}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-grow">
        {cardHeadline && (
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {cardHeadline}
          </h3>
        )}
        {cardContent && (
          <div
            className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: cardContent }}
          />
        )}
      </div>
    </div>
  );
};/**
 * Section3a component.
 * Renders a grid of cards based on the `section3aCards` array.
 * The card layout adapts to different screen sizes.
 *
 * @param {object} props - The component props.
 * @param {object} props.data - The data object from the ACF Flexible Content layout.
 * @param {Array<object>} props.data.section3aCards - An array of card data objects.
 */
const Section3a = ({ data, columnSelection }) => {
    
  if (!data || !data.section3aCards) return null;
  // Use columnSelection to set grid columns
  const columns =
  columnSelection === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className={`grid gap-8 ${columns}`}>
          {data.section3aCards.map((card, index) => (
            <Card key={index} cardData={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3a;