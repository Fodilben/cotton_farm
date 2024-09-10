/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_TICKTICK_CLIENT_ID: process.env.NEXT_PUBLIC_TICKTICK_CLIENT_ID,
    TICKTICK_CLIENT_SECRET: process.env.TICKTICK_CLIENT_SECRET,
  },
};

export default nextConfig;
