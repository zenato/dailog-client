interface ErrorProps {
  statusCode?: number
}

const Error = ({ statusCode }: ErrorProps) => (
  <div className="flex-row flex-center full-height">
    <div>Page not found.</div>
  </div>
)

export default Error
