import { FC } from 'react'
import { AppProps } from 'next/app'
import { Head } from '@components/common'
import { wrapper } from '@store/index'

import '@assets/main.css'

const Noop: FC = ({ children }) => <>{children}</>

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  const Layout = (Component as any).Layout || Noop
  return (
    <>
      <Head />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default wrapper.withRedux(App)
