/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.smk.dk", "collection.smk.dk"], //Vi tillader billeder fra SMK's API – SMK bruger to forskellige domæner til thumbnails.
  },
};

export default nextConfig;
