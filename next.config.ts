import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	cacheComponents: true,
	images: {
		remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
	},
};

export default nextConfig;
