import { useState } from "react";
import Image from "next/image";
import CollapseIcon from "@/public/icons/collapse.png";
import ExpandIcon from "@/public/icons/expand.png";
import WordPressContent from "../WordPressContent";

/**
 * Section7a component - Accordion layout for ACF Flexible Content
 * Similar to archive-leadership.js accordion structure
 * 
 * @param {object} props - The component props
 * @param {object} props.data - The data object containing fields from the ACF Flexible Content layout
 * @param {string} props.data.accordionTitle - The title of the accordion item
 * @param {string} props.data.accordionSubHeader - The subtitle/subheader (optional)
 * @param {string} props.data.accordionLeftContent - Left side content (optional quote/sidebar)
 * @param {string} props.data.accordionContent - Main content area
 * @param {object} props.data.accordionImage - Optional image for the accordion header
 */
const Section7a = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) {
    return null;
  }

  const {
    accordionTitle,
    accordionSubHeader,
    accordionLeftContent,
    accordionContent,
    accordionImage
  } = data;

  const imageUrl = accordionImage?.node?.sourceUrl;
  const hasLeftContent = accordionLeftContent && accordionLeftContent.trim() !== '';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="accordion-item">
          {/* Accordion Header */}
          <div 
            className="accordion-header flex items-center py-6 cursor-pointer"
            onClick={toggleExpand}
          >
            {/* Optional Image - Circular */}
            {imageUrl && (
              <div className="flex-shrink-0" style={{ marginRight: '20px' }}>
                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={imageUrl}
                    alt={accordionTitle || "Accordion Image"}
                    width={100}
                    height={100}
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Title and Subtitle */}
            <div className="flex-grow">
              {accordionTitle && (
                <h3 
                  className="text-[22px] font-medium leading-8"
                  style={{ color: '#083D78' }}
                >
                  {accordionTitle}
                </h3>
              )}
              {accordionSubHeader && (
                <p 
                  className="text-base font-medium leading-normal mt-1"
                  style={{ color: '#008889' }}
                >
                  {accordionSubHeader}
                </p>
              )}
            </div>

            {/* Expand/Collapse Icon */}
            <div className="flex-shrink-0 ml-6">
              <Image
                src={isExpanded ? CollapseIcon : ExpandIcon}
                alt={isExpanded ? "Collapse" : "Expand"}
                width={24}
                height={24}
              />
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="accordion-content flex flex-col md:flex-row md:items-start pb-6 gap-6">
              {/* Left Content - Optional Quote/Sidebar with Border */}
              {hasLeftContent && (
                <div 
                  className="w-full md:w-72 md:flex-shrink-0 pb-6 md:pb-0 sm:border-b-2 md:border-b-0"
                  style={{ borderColor: '#C75327' }}
                >
                  <div 
                    className="text-lg italic font-medium"
                    style={{ color: '#083D78', lineHeight: '30px' }}
                  >
                    <WordPressContent content={accordionLeftContent} />
                  </div>
                </div>
              )}

              {/* Main Content - Right Side */}
              <div 
                className={`flex-grow ${hasLeftContent ? '' : 'w-full'}`}
                style={hasLeftContent ? { 
                  borderTop: '2px solid #C75327',
                  paddingTop: '24px'
                } : {}}
              >
                <style jsx>{`
                  @media (min-width: 768px) {
                    .flex-grow {
                      border-top: none !important;
                      padding-top: 0 !important;
                      ${hasLeftContent ? 'border-left: 2px solid #C75327; padding-left: 20px;' : ''}
                    }
                  }
                `}</style>
                <WordPressContent 
                  content={accordionContent}
                  className="prose max-w-none [&>p]:text-base [&>p]:font-normal [&>p]:leading-8"
                  style={{ color: '#3D3D3D', fontSize: '16px', fontWeight: 400, lineHeight: '32px' }}
                />
              </div>
            </div>
          )}

          {/* Separator Line */}
          <div className="border-b border-[#008889]" />
        </div>
      </div>
    </section>
  );
};

export default Section7a;
