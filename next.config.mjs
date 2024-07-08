/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "2.bp.blogspot.com",
            },
            {
                hostname: "rachnas-kitchen.com",
            },
            {
                hostname: "www.foodwerk-blog.de",
            },
        ],
    },
};

export default nextConfig;
