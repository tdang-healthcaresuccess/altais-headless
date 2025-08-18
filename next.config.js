const { withFaust } = require("@faustwp/core");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    domains: ["faustexample.wpengine.com"],
  },
  trailingSlash: true,
    async redirects() {
    return [
      {
        source: '/:path([^/]+)',
        destination: '/:path/',
        permanent: true,
        has: [
          {
            type: 'query',
            key: 'not-a-parameter',
            value: 'true',
            negate: true,
          },
        ],
      },
    ];
  },
});
