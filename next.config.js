module.exports = {
  target: 'serverless',
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
