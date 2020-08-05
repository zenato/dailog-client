import { NextPage } from 'next'
import { Login as LoginForm } from '@components/login'

interface FormValues {
  email: string
  password: string
}

const Login: NextPage = () => {
  return <LoginForm />
}

export default Login
