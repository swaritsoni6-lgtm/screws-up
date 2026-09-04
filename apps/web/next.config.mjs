/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@screws-up/shared-types", "@screws-up/api-client"],
};

export default nextConfig;
