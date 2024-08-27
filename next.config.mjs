/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['supports-color'],
    experimental: {
        esmExternals: 'loose',
    },
}

export default nextConfig
