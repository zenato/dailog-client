module.exports = {
  target: 'serverless',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3030'}/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/todo',
        permanent: false,
      },
    ]
  },
}
