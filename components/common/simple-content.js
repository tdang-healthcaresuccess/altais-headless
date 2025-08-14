import Image from "next/image";

export default function SimpleContent({ content, media = false, banner }) {
  return (
    <section className=" block">
      <div className="container mx-auto">
        <div className="py-6 pt-0 md:py-12 border-b border-lightPrimary">
          {media && (
            <div className="block max-w-full md:max-w-[838px] mx-auto">
              <Image src={banner} alt="media" className="rounded-normal border border-lightPrimary" />
            </div>
          )}
          <div className={media && "pt-6"}>
            <div className="max-w-full md:max-w-[743px] mx-auto">
              <p className="text-left md:text-left paragraph-content">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
