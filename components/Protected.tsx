import * as React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import useAuth from '../hooks/useAuth'

const LOGIN_URL = '/login'

const Protected: React.SFC = ({ children }) => {
  const { user } = useAuth()

  if (user) {
    return <>{children}</>
  } else {
    if (process.browser) {
      Router.push(LOGIN_URL)
      return null
    }
    return (
      <Head>
          <meta httpEquiv="refresh" content={`0;URL="${LOGIN_URL}"`} />
      </Head>
    )
  }
}

export default Protected