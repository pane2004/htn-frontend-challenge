/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'zh-CN', 'es'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
