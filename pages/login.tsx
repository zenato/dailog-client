import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Login as LoginForm } from '@components/login'

export default function Login() {
  const router = useRouter()

  const handleGoogleAuth = useCallback(() => {
    router.push({ pathname: '/api/auth/google' })
  }, [])

  return <LoginForm googleAuthCallback={handleGoogleAuth} />
}
