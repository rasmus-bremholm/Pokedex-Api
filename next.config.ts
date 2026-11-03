import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	partialPrefetching: true,
	reactCompiler: true,
	images: {
		remotePatterns: [new URL("https://raw.githubusercontent.com/PokeAPI/sprites/**")],
	},
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
};

export default nextConfig;
