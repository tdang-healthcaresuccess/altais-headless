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
        source: '/altais-care-alliance/',
        destination: '/insurances-accepted/medicare/',
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
        source: '/fcs-ipa/',
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
    ];
  },
};

module.exports = withFaust(withAtlasConfig(nextConfig));
