const { withFaust, getWpHostname } = require("@faustwp/core");
const { createSecureHeaders } = require("next-secure-headers");
const { withAtlasConfig } = require("@wpengine/atlas-next");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: [getWpHostname(), 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: getWpHostname(),
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
    // Disable optimization for proxy URLs to prevent double encoding
    unoptimized: false,
    // Allow our proxy API URLs
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...createSecureHeaders({ xssProtection: false }),
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          }
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Comprehensive preview URL handling to prevent redirect loops
        {
          source: '/preview/:path*',
          destination: '/preview/:path*',
          has: [
            {
              type: 'query',
              key: 'preview',
              value: 'true'
            }
          ]
        },
        {
          source: '/preview',
          destination: '/preview',
          has: [
            {
              type: 'query',
              key: 'preview',
              value: 'true'
            }
          ]
        },
        // Handle WordPress authentication callback with code parameter
        {
          source: '/preview',
          destination: '/preview',
          has: [
            {
              type: 'query',
              key: 'code'
            }
          ]
        },
        // Handle preview URLs with page_id parameter
        {
          source: '/preview',
          destination: '/preview',
          has: [
            {
              type: 'query',
              key: 'page_id'
            }
          ]
        },
        // Handle preview URLs with p parameter
        {
          source: '/preview',
          destination: '/preview',
          has: [
            {
              type: 'query',
              key: 'p'
            }
          ]
        }
      ]
    };
  },
  async redirects() {
    return [
      // Sitemap redirects - redirect all old sitemap URLs to main sitemap
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/category-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/author-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/page-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/post-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/riverside_docs_es-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/riverside_physicians-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/specialty-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/specialty_es-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/tec_recurring_events-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/tribe_events_cat-sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // TEMPORARILY DISABLED - Existing redirect rule causing infinite loops with previews
      // {
      //   source: '/:path((?!preview)[^/]+)',
      //   destination: '/:path/',
      //   permanent: true,
      //   missing: [
      //     {
      //       type: 'query',
      //       key: 'preview',
      //     },
      //     {
      //       type: 'query', 
      //       key: 'code',
      //     },
      //     {
      //       type: 'query',
      //       key: 'page_id',
      //     },
      //     {
      //       type: 'query',
      //       key: 'p',
      //     }
      //   ]
      // },
      // Redirects from redirection.csv
      {
        source: '/patient-resources/access-athena-patient-portal/',
        destination: '/access-athena-patient-portal/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/',
        destination: '/for-providers/amg-locations/',
        permanent: true,
      },
      {
        source: '/athena/',
        destination: 'https://24668.portal.athenahealth.com/',
        permanent: true,
      },
      {
        source: '/insurances-accepted/hmo-plans/',
        destination: '/insurance-accepted/',
        permanent: true,
      },
            {
        source: '/insurances-accepted/medi-cal/',
        destination: '/insurance-accepted/',
        permanent: true,
      },
      {
        source: '/insurances-accepted/medicare/',
        destination: '/insurance-accepted/',
        permanent: true,
      },
      {
        source: '/about/who-we-are/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/employment-opportunities/',
        destination: 'https://altaishealthsolutions.wd108.myworkdayjobs.com/en-US/External',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/employment-opportunities/careers/',
        destination: 'https://altaishealthsolutions.wd108.myworkdayjobs.com/en-US/External',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/contactenos/',
        destination: '/contact-us/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/mantengase-en-contacto/',
        destination: '/contact-us/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/clara-chae-md/',
        destination: '/physicians/es/clara-chae-md/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/colin-christensen-d-o/',
        destination: '/physicians/es/colin-christensen-do/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/david-choi-m-d/',
        destination: '/physicians/es/david-choi-md/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/eric-choi/',
        destination: '/physicians/es/eric-choi/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/howard-aubert/',
        destination: '/physicians/es/howard-aubert/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/kathleen-keating/',
        destination: '/physicians/es/kathleen-keating/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/leah-hopkins/',
        destination: '/physicians/es/leah-hopkins/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/rodolfo-saenz-m-d-m-m-m-f-a-c-o-g/',
        destination: '/physicians/es/rodolfo-saenz-m-d-m-m-m-f-a-c-o-g/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/sarah-chae-m-d/',
        destination: '/physicians/es/sarah-chae-md/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/medicos/william-suh-m-d-f-s-c-a-i/',
        destination: '/physicians/es/william-suh-m-d-f-s-c-a-i/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/es/seguros/',
        destination: '/contact-us/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/clara-chae/',
        destination: '/physicians/clara-chae/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/colin-christensen/',
        destination: '/physicians/colin-christensen/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/eric-choi/',
        destination: '/physicians/eric-choi/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/howard-aubert-md/',
        destination: '/physicians/howard-aubert-md/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/kathleen-keating/',
        destination: '/physicians/kathleen-keating/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/leah-hopkins/',
        destination: '/physicians/leah-hopkins/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/rodolfo-saenz/',
        destination: '/physicians/rodolfo-saenz/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/sarah-chae/',
        destination: '/physicians/sarah-chae/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/sergio-villegas-m-d/',
        destination: '/physicians/sergio-villegas-md/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/stay-in-touch/',
        destination: '/contact-us/',
        permanent: true,
      },
      {
        source: '/amg/embrace-freshness-exploring-the-vibrant-farmers-markets-of-riverside-county/',
        destination: '/blog/embrace-freshness-exploring-the-vibrant-farmers-markets-of-riverside-county/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/autumn-apple-adventures-health-benefits-and-pick-your-own-fun-in-riverside/',
        destination: '/blog/autumn-apple-adventures-health-benefits-and-pick-your-own-fun-in-riverside/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/beating-the-heat-10-ways-to-stay-cool-and-healthy-in-riversides-sizzling-summers/',
        destination: '/blog/beating-the-heat-10-ways-to-stay-cool-and-healthy-in-riversides-sizzling-summers/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/do-a-gut-check-is-it-ibs-or-something-else/',
        destination: '/blog/do-a-gut-check-is-it-ibs-or-something-else/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/get-in-shape-with-hiking-trails-in-riverside-california/',
        destination: '/blog/get-in-shape-with-hiking-trails-in-riverside-california/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/mindful-movement-exploring-riversides-meditation-gardens-and-labyrinths/',
        destination: '/blog/mindful-movement-exploring-riversides-meditation-gardens-and-labyrinths/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/riversides-top-outdoor-yoga-spots-for-boosting-your-health-and-well-being/',
        destination: '/blog/riversides-top-outdoor-yoga-spots-for-boosting-your-health-and-well-being/',
        permanent: true,
      },
      {
        source: '/brand-assets/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/brown-toland/',
        destination: '/about/brown-and-toland/',
        permanent: true,
      },
      {
        source: '/category/amg/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/category/amg/riverside-blog/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/category/blog/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/cookie-policy/',
        destination: '/cookies/',
        permanent: true,
      },
      {
        source: '/family-care-specialists-medical-group/',
        destination: '/about/fcsmg-family-care-specialists-medical-group/',
        permanent: true,
      },
      {
        source: '/for-physicians/altais-networks/',
        destination: '/for-providers/altais-networks/',
        permanent: true,
      },
      {
        source: '/for-physicians/code-of-conduct-and-compliance-training/',
        destination: '/code-of-conduct-and-compliance-training/',
        permanent: true,
      },
      {
        source: '/jeff-bailet/',
        destination: '/physicians/',
        permanent: true,
      },
      {
        source: '/medicos/',
        destination: '/for-providers/amg-locations/',
        permanent: true,
      },
      {
        source: '/patients/',
        destination: '/about/',
        permanent: true,
      },
      {
        source: '/privacy/',
        destination: '/website-privacy/',
        permanent: true,
      },
      {
        source: '/robert-van-tuyl/',
        destination: '/physicians/',
        permanent: true,
      },
      {
        source: '/services/care-delivery-networks/',
        destination: '/for-partners/',
        permanent: true,
      },
      {
        source: '/services/health-systems/',
        destination: '/for-partners/',
        permanent: true,
      },
      {
        source: '/services/payers/',
        destination: '/for-partners/',
        permanent: true,
      },
      {
        source: '/services/physician-practices/',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/what-we-do/',
        destination: '/about/',
        permanent: true,
      },
      // Redirects from redirection.csv (imported December 2025)
      {
        source: '/2019/08/29/altais-teams-up-with-aledade-inc-and-the-california-medical-association-to-offer-unique-patient-care-model-supported-by-innovative-technologies/',
        destination: '/blog/altais-teams-up-with-aledade-inc-and-the-california-medical-association-to-offer-unique-patient-care-model-supported-by-innovative-technologies/',
        permanent: true,
      },
      {
        source: '/2020/04/27/altais-and-brown-toland-physicians-join-forces-to-offer-bay-area-patients-a-new-generation-of-services-and-technology-to-enhance-quality-of-care/',
        destination: '/blog/altais-and-brown-toland-physicians-join-forces-to-offer-bay-area-patients-a-new-generation-of-services-and-technology-to-enhance-quality-of-care/',
        permanent: true,
      },
      {
        source: '/2020/07/16/cma-partners-with-state-of-california-and-altais-to-provide-free-personal-protective-equipment-to-physician-practices/',
        destination: '/blog/cma-partners-with-state-of-california-and-altais-to-provide-free-personal-protective-equipment-to-physician-practices/',
        permanent: true,
      },
      {
        source: '/2020/11/25/altais-clinical-services-and-brown-toland-physicians-combine-forces-to-accelerate-improvement-of-physician-and-patient-experiences/',
        destination: '/blog/altais-clinical-services-and-brown-toland-physicians-combine-forces-to-accelerate-improvement-of-physician-and-patient-experiences/',
        permanent: true,
      },
      {
        source: '/altais-completes-leadership-team-with-three-board-members-reflecting-gender-ethnic-geographical-and-medical-specialty-diversity-2/',
        destination: '/blog/altais-completes-leadership-team-with-three-board-members-reflecting-gender-ethnic-geographical-and-medical-specialty-diversity/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/4-powerful-skin-care-ingredients-already-in-your-pantry/',
        destination: '/blog/4-powerful-skin-care-ingredients-already-in-your-pantry/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/5-ways-to-keep-your-health-shipshape-on-talk-like-a-pirate-day-and-beyond-2/',
        destination: '/blog/5-ways-to-keep-your-health-shipshape-on-talk-like-a-pirate-day-and-beyond/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/a-flavorful-fiesta-discover-the-wonders-of-hispanic-superfoods/',
        destination: '/blog/a-flavorful-fiesta-discover-the-wonders-of-hispanic-superfoods/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/breaking-barriers-overcoming-reasons-to-avoid-seeing-your-doctor/',
        destination: '/blog/breaking-barriers-overcoming-reasons-to-avoid-seeing-your-doctor/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/cbd-what-is-it-good-for/',
        destination: '/blog/cbd-what-is-it-good-for/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/celebrate-national-hot-chocolate-day-with-organic-whole-ingredients/',
        destination: '/blog/celebrate-national-hot-chocolate-day-with-organic-whole-ingredients/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/celebrate-national-taco-day-with-delicious-and-heart-healthy-swaps/',
        destination: '/blog/celebrate-national-taco-day-with-delicious-and-heart-healthy-swaps/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/childrens-eye-health-why-regular-exams-are-essential-for-kids/',
        destination: '/blog/childrens-eye-health-why-regular-exams-are-essential-for-kids/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/crazy-for-cookies/',
        destination: '/blog/crazy-for-cookies/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/cultivating-health-and-community-the-benefits-of-urban-farming-in-riverside/',
        destination: '/blog/cultivating-health-and-community-the-benefits-of-urban-farming-in-riverside/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/discover-the-healing-power-of-music-therapy/',
        destination: '/blog/discover-the-healing-power-of-music-therapy/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/dont-skip-the-flu-shot-is-december-too-late-to-get-vaccinated/',
        destination: '/blog/dont-skip-the-flu-shot-is-december-too-late-to-get-vaccinated/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/embrace-freshness-exploring-the-vibrant-farmers-markets-of-riverside-county/',
        destination: '/blog/embrace-freshness-exploring-the-vibrant-farmers-markets-of-riverside-county/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/embracing-harmony-5-creative-ways-to-maintain-work-life-balance/',
        destination: '/blog/embracing-harmony-5-creative-ways-to-maintain-work-life-balance/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/embracing-mental-health-awareness-month-breaking-the-stigma-and-prioritizing-self-care/',
        destination: '/blog/embracing-mental-health-awareness-month-breaking-the-stigma-and-prioritizing-self-care/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/emergency-room-or-urgent-care-center/',
        destination: '/blog/emergency-room-or-urgent-care-center/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/empowering-yourself-with-diabetes-education-what-you-need-to-know/',
        destination: '/blog/empowering-yourself-with-diabetes-education-what-you-need-to-know/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/four-common-myths-about-vaccines-separating-fact-from-fiction/',
        destination: '/blog/four-common-myths-about-vaccines-separating-fact-from-fiction/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/harnessing-the-power-of-diabetes-drugs-for-weight-loss-what-you-need-to-know/',
        destination: '/blog/harnessing-the-power-of-diabetes-drugs-for-weight-loss-what-you-need-to-know/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/leap-year-babies-what-happens-when-a-baby-is-born-on-february-29th/',
        destination: '/blog/leap-year-babies-what-happens-when-a-baby-is-born-on-february-29th/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/national-caregivers-month-how-to-take-care-of-yourself-while-you-are-caring-for-someone-else/',
        destination: '/blog/national-caregivers-month-how-to-take-care-of-yourself-while-you-are-caring-for-someone-else/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/navigating-work-and-school-with-migraines-advocating-for-yourself-and-finding-support/',
        destination: '/blog/navigating-work-and-school-with-migraines-advocating-for-yourself-and-finding-support/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/questions-about-depression/',
        destination: '/blog/questions-about-depression/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/seniors-boost-your-stability-and-confidence-with-these-7-balance-exercises/',
        destination: '/blog/seniors-boost-your-stability-and-confidence-with-these-7-balance-exercises/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/summer-safety-10-tips-to-keep-you-safe-and-healthy/',
        destination: '/blog/summer-safety-10-tips-to-keep-you-safe-and-healthy/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/taking-care-of-your-eyes-for-a-lifetime-of-clear-sight/',
        destination: '/blog/taking-care-of-your-eyes-for-a-lifetime-of-clear-sight/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/the-art-of-napping-embrace-the-power-of-rest-and-rejuvenation/',
        destination: '/blog/the-art-of-napping-embrace-the-power-of-rest-and-rejuvenation/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/the-great-american-smokeout-quitting-smoking-and-its-benefits/',
        destination: '/blog/the-great-american-smokeout-quitting-smoking-and-its-benefits/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/the-importance-of-proper-handwashing-techniques-to-keep-germs-at-bay/',
        destination: '/blog/the-importance-of-proper-handwashing-techniques-to-keep-germs-at-bay/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/the-vital-importance-of-understanding-your-blood-panel-results/',
        destination: '/blog/the-vital-importance-of-understanding-your-blood-panel-results/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/understanding-4-common-childhood-illnesses-a-guide-for-parents/',
        destination: '/blog/understanding-4-common-childhood-illnesses-a-guide-for-parents/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/understanding-endometriosis/',
        destination: '/blog/understanding-endometriosis/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/understanding-endometriosis/:path*',
        destination: '/blog/understanding-endometriosis/:path*',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/understanding-stuttering-treatment-and-awareness/',
        destination: '/blog/understanding-stuttering-treatment-and-awareness/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/understanding-your-health-insurance-a-guide-to-making-the-most-of-your-coverage/',
        destination: '/blog/understanding-your-health-insurance-a-guide-to-making-the-most-of-your-coverage/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/unraveling-the-world-of-medical-professionals-making-informed-choices-for-your-health-care-journey/',
        destination: '/blog/unraveling-the-world-of-medical-professionals-making-informed-choices-for-your-health-care-journey/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/what-is-an-annual-health-assessment-aha/',
        destination: '/blog/what-is-an-annual-health-assessment-aha/',
        permanent: true,
      },
      {
        source: '/amg/riverside-blog/why-is-it-important-to-stay-hydrated/',
        destination: '/blog/why-is-it-important-to-stay-hydrated/',
        permanent: true,
      },
      {
        source: '/blog/cma-partners-with-state-of-california-and-altais-to-provide-free-personal-protective-equipment-to-physician-practices/cmadocs.org/ppe/',
        destination: '/blog/cma-partners-with-state-of-california-and-altais-to-provide-free-personal-protective-equipment-to-physician-practices/',
        permanent: true,
      },
      {
        source: '/news/abridge-ai-reduce-physician-burnout-enhance-documentation/',
        destination: '/blog/abridge-ai-reduce-physician-burnout-enhance-documentation/',
        permanent: true,
      },
      {
        source: '/news/altais-and-autonomize-ai-partnership/',
        destination: '/blog/altais-and-autonomize-ai-partnership/',
        permanent: true,
      },
      {
        source: '/news/altais-and-autonomize-ai-partnership/475735206/',
        destination: '/blog/altais-and-autonomize-ai-partnership/475735206/',
        permanent: true,
      },
      {
        source: '/news/altais-and-brown-toland-physicians-join-forces-to-offer-bay-area-patients-a-new-generation-of-services-and-technology-to-enhance-quality-of-care/',
        destination: '/blog/altais-and-brown-toland-physicians-join-forces-to-offer-bay-area-patients-a-new-generation-of-services-and-technology-to-enhance-quality-of-care/',
        permanent: true,
      },
      {
        source: '/news/altais-and-brown-toland-physicians-join-forces-to-offer-bay-area-patients-a-new-generation-of-services-and-technology-to-enhance-quality-of-care/475735206/',
        destination: '/blog/altais-and-brown-toland-physicians-join-forces-to-offer-bay-area-patients-a-new-generation-of-services-and-technology-to-enhance-quality-of-care/475735206/',
        permanent: true,
      },
      {
        source: '/news/altais-and-paladina-health-debut-new-primary-care-clinics-in-monterey-and-salinas-to-serve-mcsig-and-cvt-members/',
        destination: '/blog/altais-and-paladina-health-debut-new-primary-care-clinics-in-monterey-and-salinas-to-serve-mcsig-and-cvt-members/',
        permanent: true,
      },
      {
        source: '/news/altais-announces-dr-mauricio-bueno-as-new-medical-director-of-altais-care-network/',
        destination: '/blog/altais-announces-dr-mauricio-bueno-as-new-medical-director-of-altais-care-network/',
        permanent: true,
      },
      {
        source: '/news/altais-appoints-kumar-murukurthy-m-d-as-chief-information-and-digital-officer/',
        destination: '/blog/altais-appoints-kumar-murukurthy-m-d-as-chief-information-and-digital-officer/',
        permanent: true,
      },
      {
        source: '/news/altais-appoints-pat-aubort-as-chief-financial-officer/',
        destination: '/blog/altais-appoints-pat-aubort-as-chief-financial-officer/',
        permanent: true,
      },
      {
        source: '/news/altais-blue-shield-of-california-and-notable-health-partner-to-bring-intelligent-virtual-assistance-to-california-practices/',
        destination: '/blog/altais-blue-shield-of-california-and-notable-health-partner-to-bring-intelligent-virtual-assistance-to-california-practices/',
        permanent: true,
      },
      {
        source: '/news/altais-ceo-dr-jeff-bailet-discusses-payer-provider-collaboration-as-a-key-to-value-based-care/',
        destination: '/blog/altais-ceo-dr-jeff-bailet-discusses-payer-provider-collaboration-as-a-key-to-value-based-care/',
        permanent: true,
      },
      {
        source: '/news/altais-clinical-services-and-brown-toland-physicians-combine-forces-to-accelerate-improvement-of-physician-and-patient-experiences/',
        destination: '/blog/altais-clinical-services-and-brown-toland-physicians-combine-forces-to-accelerate-improvement-of-physician-and-patient-experiences/',
        permanent: true,
      },
      {
        source: '/news/altais-completes-leadership-team-with-three-board-members-reflecting-gender-ethnic-geographical-and-medical-specialty-diversity/',
        destination: '/blog/altais-completes-leadership-team-with-three-board-members-reflecting-gender-ethnic-geographical-and-medical-specialty-diversity/',
        permanent: true,
      },
      {
        source: '/news/altais-finalizes-family-care-specialists-acquisition/',
        destination: '/blog/altais-finalizes-family-care-specialists-acquisition/',
        permanent: true,
      },
      {
        source: '/news/altais-launches-new-multi-specialty-independent-medical-practice-in-riverside-ca/',
        destination: '/blog/altais-launches-new-multi-specialty-independent-medical-practice-in-riverside-ca/',
        permanent: true,
      },
      {
        source: '/news/altais-launches-with-a-big-bang-and-the-promise-to-help-doctors-be-doctors/',
        destination: '/blog/altais-launches-with-a-big-bang-and-the-promise-to-help-doctors-be-doctors/',
        permanent: true,
      },
      {
        source: '/news/altais-medical-group-receives-pbgh-care-excellence-award/',
        destination: '/blog/altais-medical-group-receives-pbgh-care-excellence-award/',
        permanent: true,
      },
      {
        source: '/news/altais-medical-group-riverside-new-multi-specialty-facility-in-riverside-ca/',
        destination: '/blog/altais-medical-group-riverside-new-multi-specialty-facility-in-riverside-ca/',
        permanent: true,
      },
      {
        source: '/news/altais-names-interim-chief-operating-officer/',
        destination: '/blog/altais-names-interim-chief-operating-officer/',
        permanent: true,
      },
      {
        source: '/news/altais-names-nishant-anand-md-as-president-and-ceo/',
        destination: '/blog/altais-names-nishant-anand-md-as-president-and-ceo/',
        permanent: true,
      },
      {
        source: '/news/altais-teams-up-with-aledade-inc-and-the-california-medical-association-to-offer-unique-patient-care-model-supported-by-innovative-technologies/',
        destination: '/blog/altais-teams-up-with-aledade-inc-and-the-california-medical-association-to-offer-unique-patient-care-model-supported-by-innovative-technologies/',
        permanent: true,
      },
      {
        source: '/news/altais-to-acquire-los-angeles-based-family-care-specialists/',
        destination: '/blog/altais-to-acquire-los-angeles-based-family-care-specialists/',
        permanent: true,
      },
      {
        source: '/news/brown-toland-physicians-welcomes-thomas-boggs-as-chief-executive-officer/',
        destination: '/blog/brown-toland-physicians-welcomes-thomas-boggs-as-chief-executive-officer/',
        permanent: true,
      },
      {
        source: '/news/cma-partners-with-state-of-california-and-altais-to-provide-free-personal-protective-equipment-to-physician-practices/',
        destination: '/blog/cma-partners-with-state-of-california-and-altais-to-provide-free-personal-protective-equipment-to-physician-practices/',
        permanent: true,
      },
      {
        source: '/news/family-care-specialists-fcs-receives-prestigious-advisory-board-innovation-award-for-its-patient-to-practice-health-workforce-development-programs/',
        destination: '/blog/family-care-specialists-fcs-receives-prestigious-advisory-board-innovation-award-for-its-patient-to-practice-health-workforce-development-programs/',
        permanent: true,
      },
      {
        source: '/news/family-care-specialists-named-a-top-performer-for-value-based-healthcare/',
        destination: '/blog/family-care-specialists-named-a-top-performer-for-value-based-healthcare/',
        permanent: true,
      },
      {
        source: '/news/moving-the-us-healthcare-system-forward-on-value-with-altais-ceo-dr-jeff-bailet-and-amga-chief-policy-officer/',
        destination: '/blog/moving-the-us-healthcare-system-forward-on-value-with-altais-ceo-dr-jeff-bailet-and-amga-chief-policy-officer/',
        permanent: true,
      },
      {
        source: '/blog/how-ambient-ai-is-helping-physicians-reclaim-time-for-what-matters-most/',
        destination: '/blog/abridge-ai-reduce-physician-burnout-enhance-documentation/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/about-us/',
        destination: '/about/altais-medical-group/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/book-your-appointment/',
        destination: '/contact-us/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/insurance/',
        destination: '/insurance-accepted/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/location/',
        destination: '/for-providers/amg-locations/',
        permanent: true,
      },
      {
        source: '/altais-medical-group-riverside/physicians/',
        destination: '/find-care/',
        permanent: true,
      },
      {
        source: '/amg-salinas/contact-us/',
        destination: '/contact-us/',
        permanent: true,
      },
      {
        source: '/cookies/__________/',
        destination: '/cookies/',
        permanent: true,
      },
      {
        source: '/find-a-doctor/',
        destination: '/find-care/',
        permanent: true,
      },
      {
        source: '/for-providers/services-solutions/',
        destination: '/for-providers/service-solutions/',
        permanent: true,
      },
      {
        source: '/for-providers/services-solutions/accountable-care-organizations/',
        destination: '/for-providers/service-solutions/',
        permanent: true,
      },
      {
        source: '/for-providers/services-solutions/care-coordination/',
        destination: '/for-providers/service-solutions/',
        permanent: true,
      },
      {
        source: '/for-providers/services-solutions/physician-wellbeing/',
        destination: '/for-providers/service-solutions/',
        permanent: true,
      },
      {
        source: '/for-providers/services-solutions/value-based-care/',
        destination: '/for-providers/service-solutions/value-based-care/',
        permanent: true,
      },
      {
        source: '/how-our-structured-snf-care-management-program-delivered-lower-costs-shorter-stays-and-higher-quality/',
        destination: '/how-our-snf-care-management-program-delivered-lower-costs-shorter-stays-and-higher-quality/',
        permanent: true,
      },
      {
        source: '/insurances-accepted/',
        destination: '/insurance-accepted/',
        permanent: true,
      },
      {
        source: '/join-us/',
        destination: '/careers/',
        permanent: true,
      },
      {
        source: '/patient-education/',
        destination: '/patient-resources/',
        permanent: true,
      },
      {
        source: '/specialty/physician-assistant/',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/altais-care-alliance/',
        destination: '/about/altais-care-alliance/',
        permanent: true,
      },
    ];
  },
};

module.exports = withFaust(withAtlasConfig(nextConfig));
