import { NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
}

const Error = ({ statusCode }: ErrorProps) => (
  <div className="flex-row flex-center full-height ">
    <div>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </div>
  </div>
)

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
