import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import { useDate } from '@lib/hooks'
import { Login as LoginForm } from '@components/login'

export default function Login() {
  const router = useRouter()
  const { timezone } = useDate()

  // Guess timezone based on client
  useEffect(() => {
    Cookie.set('tz', timezone)
  }, [timezone])

  const handleGoogleAuth = useCallback(() => {
    router.push({ pathname: '/api/auth/google' })
  }, [])

  return <LoginForm googleAuthCallback={handleGoogleAuth} />
}
