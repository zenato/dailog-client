import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'

const LOGIN_URL = '/login'

export const auth = (ctx: NextPageContext) => {
  // TODO: Fetch user info
  const token = null 

  if (!token) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: LOGIN_URL })
      ctx.res.end()
    } else {
      Router.push(LOGIN_URL)
    }
  }
  return token
}

export const withAuth = (WrappedComponent: NextPage) => {
  const Wrapper: NextPage<{ token: string | null }> = (props) => {
    return props.token ? <WrappedComponent {...props} /> : <></>
  }

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = auth(ctx)
    const componentProps = token ? WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx)) : {}
    return { ...componentProps, token }
  }

  return Wrapper
}
