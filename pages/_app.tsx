import { AppProps, AppContext } from 'next/app'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import axios from 'axios'
import { wrapper } from '@store/index'
import { getInitialState } from '@store/index'

import '../styles.css'

const client = new ApolloClient({ uri: '/graphql' })

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // Axios
  ctx.axios = axios.create({
    baseURL: process.env.API_URL || '',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
  })

  // Apollo Client
  ctx.apolloClient = client

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
