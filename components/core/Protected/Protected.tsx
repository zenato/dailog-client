import { FC } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import useAuth from '@lib/auth'
import fetcher from '@lib/fetcher'

const LOGIN_URL = '/login'

const Protected: FC = ({ children }) => {
  const { user, login, logout } = useAuth()
  const { data, error } = useSWR('/api/auth/me', fetcher, {
    onSuccess: ({ user }) => user && login(user),
    onError: () => logout(),
  })

  if (error || (data && !data.user)) {
    Router.push(LOGIN_URL)
  }

  return user ? <>{children}</> : null
}

export default Protected
