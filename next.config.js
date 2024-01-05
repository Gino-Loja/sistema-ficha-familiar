/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    scope: "/app",
    skipWaiting: true,
    //disable: process.env.NODE_ENV === 'development'
  }),
  output: "standalone",
};

module.exports = nextConfig;
