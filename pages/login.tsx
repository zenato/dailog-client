import { NextPage } from 'next'
import Link from 'next/link'

const Login: NextPage = () => (
  <div>
    <div>Login</div>
    <Link href="/profile">
      <a>Go to Profile</a>
    </Link>
  </div>
)

export default Login