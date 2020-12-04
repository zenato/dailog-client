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
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App)
