import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import next from 'next'

const devProxy: { [key: string]: any } = {
  '/api': {
    target: process.env.API_URL,
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
  },
}

const port = parseInt(process.env.PORT || '3000', 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // Set up the proxy.
    Object.keys(devProxy).forEach((context) => {
      server.use(context, createProxyMiddleware(devProxy[context]))
    })

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })