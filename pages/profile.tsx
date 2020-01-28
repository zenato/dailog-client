import { NextPage, NextPageContext } from 'next'
import { withAuth } from '../lib/auth'

const Profile: NextPage = () => {
  return (
    <div>Profile page</div>
  )
}

export default withAuth(Profile)
