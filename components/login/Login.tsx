import { FC } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import s from './Login.module.css'

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
          <img src="/google.svg" width="20" height="20" className={cn(s.googleIcon)} />
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login
