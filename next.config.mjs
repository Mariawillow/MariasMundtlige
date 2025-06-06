/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.smk.dk", "collection.smk.dk", "iip-thumb.smk.dk"],
  },
  experimental: {
    legacyBrowsers: false, // Deaktiverer polyfills og gamle transforms
  },
};

export default nextConfig;
