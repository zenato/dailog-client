import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { AppProps } from 'next/app'
import { Head } from '@components/common'
import { wrapper } from '@store/index'

import '@assets/main.css'

dayjs.extend(weekday)

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App)
