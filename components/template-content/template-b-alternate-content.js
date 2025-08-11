export default function TemplateBAlternateContent() {
  const UnderListing = [
    "Aneurysm",
    "Angina Pectoris",
    "Aortic Stenosis",
    "Aortic Valve Malformation",
    "Arterial Disease",
    "Arterial Occlusion",
    "Arterial Stenosis",
    "Atrial Fibrillation",
    "Bicuspid Aortic Valve",
    "Blood Clot",
    "Cardiac Arrest",
    "Cardiomyopathy",
    "Carotid Artery Disease",
    "Chronic Venous Insufficiency (CVI)",
    "Congenital Heart Disease",
    "Congenital Heart Disease Associated Interstitial Lung Disease (ILD)",
    "Congestive Heart Failure",
    "Coronary Artery Disease",
    "Congestive Heart Failure",
    "Coronary Artery Disease",
    "Deep Vein Thrombosis (DVT)",
    "Endovenous Fistula",
    "Heart Arrhythmia",
    "Heart Attack",
    "Heart Disease",
    "Heart Failure",
    "Heart Valve Disease",
    "Hemorrhoids",
    "High Blood Pressure (Hypertension)",
    "High Cholesterol",
    "Ischemic Heart Disease",
    "Left Ventricular Hypertrophy (LVH)",
    "Long QT Syndrome",
    "Mitral Valve Prolapse",
    "Myocardial Infarction (Heart Attack)",
    "Peripheral Arterial Disease (PAD)",
    "Peripheral Vascular Disease (PVD)",
    "Pulmonary Embolism (PE)",
    "Pulmonary Hypertension",
    "Superficial Thrombophlebitis",
    "Varicose Veins",
    "Vascular Malformation",
    "Venous Insufficiency",
    "Wolff-Parkinson-White Syndrome",
  ];

  return (
    <div className="block pt-0 md:pt-9 pb-[130px] px-6 md:px-0">
      
      <div className="container mx-auto">
        <div className="block max-w-[740px] mx-auto">
          <h2 className="text-primary pb-4">H2 Headline</h2>
          <p className="pb-6">
            Lorem ipsum dolor sit amet consectetur. Imperdiet eu quam nibh
            egestas eget id in. Integer sit eu elementum fusce donec sit duis.
            Vel ac ac ligula suspendisse fermentum leo. Aliquam vitae in
            volutpat a dolor egestas mattis id et.
          </p>
          <h3 className="text-bluePrimary pb-4">H3 Headline</h3>
          <p className="pb-6">
            Lorem ipsum dolor sit amet consectetur. Duis nisi non egestas
            bibendum et. Varius euismod cursus nunc ultricies lorem at commodo
            amet commodo. Consectetur diam tellus euismod dolor egestas
            vulputate. Nullam tempus sagittis lacus urna nibh id quam laoreet
            duis. Neque enim pellentesque pretium dolor accumsan sit. Curabitur
            sagittis orci morbi elit sed elementum. Sed quis varius sed
            fermentum ipsum nam pellentesque elementum. Quis felis velit ut
            nisi. Ut malesuada netus euismod et hendrerit orci a ante aliquet.
            Et faucibus facilisi ut facilisi fames eget turpis. Enim egestas
            gravida mauris vitae erat. Pulvinar fringilla ac.
          </p>
          <h3 className="text-bluePrimary pb-4">H3 Headline</h3>
          <p className="pb-6">
            Lorem ipsum dolor sit amet consectetur. Facilisi facilisi mauris sit
            hendrerit bibendum. Ullamcorper est volutpat porta tincidunt
            facilisi amet. Commodo urna proin at arcu amet justo ultrices
            vulputate neque. Leo sit commodo accumsan metus non. Ultrices
            porttitor a orci.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pb-4">
            <h2 className="text-primary">H2</h2>
            <h3 className="text-bluePrimary">or H3</h3>
            <h2 className="text-primary">Section with Long List</h2>
          </div>
          <p className="pb-6">
            Intro sentence first and then split the bullet list into 2 columns
            for legibility.
          </p>
          <ul className="flex flex-wrap list-disc list-inside">
            {UnderListing.map((item, index) => (
              <li key={index} className="w-full md:w-1/2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
