import React, { useEffect, useRef } from "react";

const TemplateC = ({ bodyContent }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Find all <script> tags in bodyContent
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = bodyContent;
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        // Copy attributes
        for (let attr of oldScript.attributes) {
          newScript.setAttribute(attr.name, attr.value);
        }
        // Copy inline script content
        newScript.text = oldScript.text;
        // Append to rendered content
        contentRef.current.appendChild(newScript);
      });
    }
  }, [bodyContent]);

  return (
    <div className="template-wrapper list2">
      <div className="block pt-0 md:pt-9 pb-[130px] px-6 md:px-0">
        <div className="container mx-auto">
          <div className="block max-w-[740px] mx-auto" ref={contentRef}>
            <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateC;
