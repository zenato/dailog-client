import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Header from '@components/header'
import Protected from '@components/protected'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  width: 100%;
`

const Main: FunctionComponent = ({ children }) => (
  <Protected>
    <Container>
      <Header />
      <Content>
        {children}
      </Content>
    </Container>
  </Protected>
)

export default Main