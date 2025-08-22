
import { useEffect, useRef } from "react";

export default function HubSpotForm({ data }) {
	// Use a unique ID for the form container
	const uniqueId = `hubspot-form-${data?.hubspotFormId || Math.random().toString(36).substring(2, 10)}`;

	useEffect(() => {
		if (typeof window !== "undefined" && data?.hubspotPortalId && data?.hubspotFormId) {
			// Load the HubSpot forms script if not already loaded
			if (!document.getElementById("hs-forms-script")) {
				const script = document.createElement("script");
				script.id = "hs-forms-script";
				script.type = "text/javascript";
				script.charset = "utf-8";
				script.src = "//js.hsforms.net/forms/embed/v2.js";
				script.onload = () => {
					if (window.hbspt) {
						window.hbspt.forms.create({
							portalId: data.hubspotPortalId,
							formId: data.hubspotFormId,
							region: data.hubspotRegion || "na1",
							target: `#${uniqueId}`,
						});
					}
				};
				document.body.appendChild(script);
			} else {
				// If already loaded, just create the form
				if (window.hbspt) {
					window.hbspt.forms.create({
						portalId: data.hubspotPortalId,
						formId: data.hubspotFormId,
						region: data.hubspotRegion || "na1",
						target: `#${uniqueId}`,
					});
				}
			}
		}
	}, [data, uniqueId]);

	return (
		<section className="template-wrapper py-6 md:py-12">
			<div className="container mx-auto">
				<div className="max-w-full md:max-w-[743px] mx-auto">
					<div className="hubspot-form-wrapper">
						<div id={uniqueId}></div>
					</div>
				</div>
			</div>
		</section>
	);
}
