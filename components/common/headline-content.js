export default function HeadlineContent({ headline, content }) {
  return (
    <section className="template-wrapper pt-12 md:pt-[60px] pb-[73px] md:pb-[54px]">
      <div className="container mx-auto">
        <div className="block md:flex justify-start items-start w-full gap-10">
          {/* Left Column */}
          {headline && (
            <div className="flex justify-center md:justify-start max-w-full md:max-w-[340px] min-w-full md:min-w-[340px]">
              <h2 className="flex flex-col text-left w-full">{headline}</h2>
            </div>
          )}

          <div className="block pt-4 md:pt-0 md:pl-10 border-t md:border-t-0 md:border-l border-secondary section-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
