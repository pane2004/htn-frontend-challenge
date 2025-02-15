/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'fr', 'zh-CN', 'es'],
    defaultLocale: 'en-US',
  },
};

export default nextConfig;
