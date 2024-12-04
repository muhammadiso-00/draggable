/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',  // Asosiy sahifadan /home ga yo'naltirish
          permanent: true,  // Doimiy yo'naltirish
        },
      ];
    },
  };
  
  export default nextConfig;
  