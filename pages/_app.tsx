import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { wrapper } from '@store/index'

import '@assets/main.css'

dayjs.extend(weekday)

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dailog</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App)
