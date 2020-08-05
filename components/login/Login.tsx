import { FC } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import cn from 'classnames'
import s from './Login.module.css'

const Login: FC = () => {
  const router = useRouter()
  const googleIcon = faGoogle as IconProp

  const handleAuthGloogle = () => {
    router.push({ pathname: '/api/auth/google' })
  }

  return (
    <div className={cn(s.root)}>
      <div className={cn(s.text)}>Login in to Dailog</div>
      <div className={cn(s.buttons)}>
        <button className={cn(s.googleButton)} onClick={handleAuthGloogle}>
          <FontAwesomeIcon size="lg" icon={googleIcon} /> Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login
