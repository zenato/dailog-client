import { FunctionComponent } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import useAuth from '@lib/auth'
import fetcher from '@lib/fetcher'

const LOGIN_URL = '/login'

const Provider: FunctionComponent = ({ children }) => {
  const { user, setUser } = useAuth()
  const { data } = useSWR('/api/auth/me', fetcher, {
    onSuccess: ({ user }) => {
      if (user) {
        setUser(user)
      }
    },
  })

  if (data && !data.user) {
    Router.push(LOGIN_URL)
  }

  return user ? <>{children}</> : null
}

export default Provider
