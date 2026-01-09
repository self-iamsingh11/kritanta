/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
        // Enable image optimization on Vercel
        unoptimized: process.env.NODE_ENV === 'development',
    },
    // Enable React strict mode for better debugging
    reactStrictMode: true,
    // Optimize for production
    poweredByHeader: false,
    // Compress responses
    compress: true,
};

export default nextConfig;

