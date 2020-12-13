export default function Index() {
  return null
}

export function getStaticProps() {
  return {
    redirect: {
      destination: '/todo',
      permanent: false,
    },
  }
}
