import { FC, useEffect } from 'react'
import Router from 'next/router'
import { useAuth } from '@lib/hooks'

const LOGIN_URL = '/login'

const Protected: FC = ({ children }) => {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      Router.push(LOGIN_URL)
    }
  }, [user, loading])

  return <>{user ? children : null}</>
}

export default Protected
