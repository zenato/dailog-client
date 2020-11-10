import { FC } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import s from './Login.module.css'
import { GoogleIcon } from '@components/icons'

const Login: FC = () => {
  const router = useRouter()

  const handleAuthGloogle = () => {
    router.push({ pathname: '/api/auth/google' })
  }

  return (
    <div className={cn(s.root)}>
      <div className={cn(s.text)}>Login in to Dailog</div>
      <div className={cn(s.buttons)}>
        <button className={cn(s.googleButton)} onClick={handleAuthGloogle}>
          <GoogleIcon /> <span>Login with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
