import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import useAuth from '../hooks/useAuth'

const Login: NextPage = () => {
  const { onSetUser } = useAuth()

  const setUser = () => {
    onSetUser({ id: 1, email: 'test@test.com' })
    Router.push('/profile')
  }

  return (
    <div>
      <div>Login Page</div>
      <div><button onClick={setUser}>Login Action</button></div>
      <Link href="/profile">
        <a>Go to Profile</a>
      </Link>
    </div>
  )
}

export default Login