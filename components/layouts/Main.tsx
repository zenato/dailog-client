import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Header from '../Header'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  width: 100%;
`

const Main: FunctionComponent = ({ children }) => (
  <Container>
    <Header />
    <Content>
      {children}
    </Content>
  </Container>
)

export default Main