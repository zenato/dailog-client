import { FC } from 'react'
import cn from 'classnames'
import { GoogleIcon } from '@components/icons'
import s from './Login.module.css'

interface Props {
  googleAuthCallback: () => void
}

const Login: FC<Props> = ({ googleAuthCallback }) => {
  return (
    <div className={cn(s.root)}>
      <div className={cn(s.text)}>Login in to Dailog</div>
      <div className={cn(s.buttons)}>
        <button className={cn(s.googleButton)} onClick={googleAuthCallback}>
          <GoogleIcon aria-label="Login" /> <span>Login with Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
