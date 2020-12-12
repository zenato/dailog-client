module.exports = {
  target: 'serverless',

  // i18n: {
  //   locales: ['ko-KR', 'en-US'],
  //   defaultLocale: 'en-US',
  // },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3030'}/:path*`,
      },
    ]
  },

  // Disable redirection from index page when enable i18n
  /*
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todo',
        permanent: false,
      },
    ]
  },
  */
}
