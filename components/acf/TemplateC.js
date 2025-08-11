import React from 'react';

const TemplateC = ({ bodyContent }) => {
  return (
    <div className="template-c-wrapper">
 
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </div>
  );
};

export default TemplateC;