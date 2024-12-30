/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "s2.googleusercontent.com",
      "s3.us-west-2.amazonaws.com",
      "amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "cdn.sanity.io",
    ],
  },
  async redirects() {
    return [
      {
        source: "/store",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/talent",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/billshare",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/oriant",
        destination: '/404',
        permanent: true,
      },
      {
        source: '/investments',
        destination: '/404',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
