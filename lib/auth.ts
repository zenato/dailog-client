import { NextPageContext } from 'next'
import Router from 'next/router'

export const auth = (ctx: NextPageContext) => {
  const token = ''

  if (ctx.res && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push('/login')
    return
  }

  return token
}