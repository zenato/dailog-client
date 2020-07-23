import styled from 'styled-components'

interface ErrorProps {
  statusCode?: number
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Error = ({ statusCode }: ErrorProps) => (
  <Container>
    <div>Page not found.</div>
  </Container>
)

export default Error
