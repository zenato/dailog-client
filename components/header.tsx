import styled from 'styled-components'
import Link from 'next/link'
import Cookie from 'js-cookie'
import useAuth from '@lib/auth'

const Container = styled.div`
  background-color: #eee;
`

const Header = () => {
  const { user } = useAuth()

  const onLogout = () => {
    Cookie.remove('authorization')
    window.location.href = '/'
  }

  return (
    <Container>
      <Link href="/"><a>Dailog</a></Link>
      <Link href="/profile"><a>Profile</a></Link>
      {!user && (
        <Link href="/login"><a>Login</a></Link>
      )}
      {user && (
        <>
          {user.name}
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </Container>
  )
}

export default Header