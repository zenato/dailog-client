import { useRouter } from 'next/router'
import { Protected } from '@components/common'

const RedirectTodo = () => {
  const router = useRouter()
  router.replace('/todo')
  return null
}

export default function Home() {
  return (
    <Protected>
      <RedirectTodo />
    </Protected>
  )
}
