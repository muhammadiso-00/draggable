module.exports = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
      return [
        {
          source: '/',      
          destination: '/home',
          permanent: true,    
        },
      ];
    },
  };
  