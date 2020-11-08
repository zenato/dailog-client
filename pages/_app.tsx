import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import axios from 'axios'
import { AppProps, AppContext } from 'next/app'
import Head from 'next/head'
import { wrapper, getInitialState } from '@store/index'

import '@assets/main.css'

dayjs.extend(weekday)

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
        />
        <link rel="preload" href="/api/auth/me" as="fetch" crossOrigin="anonymous"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // Axios
  ctx.axios = axios.create({
    baseURL: process.env.API_URL || '',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
  })

  // initialize on server
  if (ctx.req) {
    await getInitialState(ctx)
  }

  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default wrapper.withRedux(App)
