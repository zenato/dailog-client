import * as React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import useUser from '../hooks/useUser'

const LOGIN_URL = '/login'

const Protected: React.SFC = ({ children }) => {
  const { user } = useUser()

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