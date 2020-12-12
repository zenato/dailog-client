import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDate } from '@lib/hooks'
import { Layout } from '@components/common'

export default function Todo() {
  const router = useRouter()
  const { now } = useDate()

  useEffect(() => {
    router.push(`/todo/${now().format('YYYY/M')}`)
  }, [])

  return null
}

Todo.Layout = Layout
