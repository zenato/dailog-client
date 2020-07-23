import Head from 'next/head'

type Props = {
  to: string
}

export default ({ to }: Props) => (
  <Head>
    <meta httpEquiv="refresh" content={`0;URL="${to}"`} />
  </Head>
)
