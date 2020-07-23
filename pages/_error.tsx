import { NextPageContext } from 'next'
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
    <div>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </div>
  </Container>
)

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
