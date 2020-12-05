import { FC } from 'react'
import NextHead from 'next/head'

const Head: FC = () => {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Dailog</title>
    </NextHead>
  )
}

export default Head
