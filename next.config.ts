import type { NextConfig } from "next";

function wpRemotePattern():
  | { protocol: "http" | "https"; hostname: string; pathname: string }
  | undefined {
  const raw = process.env.NEXT_PUBLIC_WP_URL?.trim();
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    const protocol = u.protocol === "http:" ? "http" : "https";
    return {
      protocol,
      hostname: u.hostname,
      pathname: "/**",
    };
  } catch {
    return undefined;
  }
}

const wpImagePattern = wpRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      ...(wpImagePattern ? [wpImagePattern] : []),
    ],
  },
  async redirects() {
    return [
      {
        source: "/nova-oferta",
        destination: "/dashboard/nova-oferta",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
