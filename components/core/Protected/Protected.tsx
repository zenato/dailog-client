import { FC, useEffect } from 'react'
import Router from 'next/router'
import { useAuth } from '@lib/hooks'

const LOGIN_URL = '/login'

const Protected: FC = ({ children }) => {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      Router.push(LOGIN_URL)
    }
  })

  if (!user) {
    return null
  }

  return <>{children}</>
}

export default Protected
