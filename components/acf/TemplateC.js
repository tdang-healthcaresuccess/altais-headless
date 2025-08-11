import React from "react";

const TemplateC = ({ bodyContent }) => {
  return (
    <div className="template-wrapper list2">
      <div className="block pt-0 md:pt-9 pb-[130px] px-6 md:px-0">
        <div className="container mx-auto">
          <div className="block max-w-[740px] mx-auto">
            <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateC;
