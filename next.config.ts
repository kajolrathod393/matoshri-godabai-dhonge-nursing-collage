import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Make the selected college available to server and client code.
  env: {
    COLLEGE: process.env.COLLEGE ?? "mgdcon",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
