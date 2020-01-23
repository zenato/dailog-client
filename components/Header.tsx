import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  background-color: #eee;
`

const Header = () => (
  <Container>
    <Link href="/">Dailog</Link>
    <Link href="/profile">Profile</Link>
    <Link href="/login">Login</Link>
  </Container>
)

export default Header