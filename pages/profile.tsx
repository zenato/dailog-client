import { NextPage } from 'next'
import { auth } from '../lib/auth'

const Profile: NextPage = () => (
  <div>Profile page</div>
)

Profile.getInitialProps = ctx => {
  const token = auth(ctx)
  return { token }
}

export default Profile