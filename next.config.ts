import type { NextConfig } from "next";

// Static export: the whole site is prerendered HTML, served by Nginx/any CDN.
// No Node runtime in production = nothing to patch, nothing to scale.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
