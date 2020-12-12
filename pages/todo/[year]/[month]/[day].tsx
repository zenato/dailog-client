import { useCallback, useMemo, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import { useDate } from '@lib/hooks'
import { gql, quries } from '@lib/api'
import { Layout } from '@components/common'
import { TodoForm, TodoHeader, TodoList } from '@components/todo'

export default function TodoDetail() {
  const router = useRouter()
  const { parse } = useDate()

  const { year, month, day } = router.query
  const isReady = year && month && day

  const date = useMemo(() => parse(year as string, month as string, day as string), [isReady])

  useEffect(() => {
    if (isReady) {
      if (date.format('YYYYMD') !== (year as string) + (month as string) + (day as string)) {
        router.push(`/todo/${date.format('YYYY/M/D')}`)
      }
    }
  }, [isReady])

  const fetchKey = [quries.Todos, date.format('YYYY'), date.format('M'), date.format('D')]

  const handleSubmit = useCallback(async (title: string) => {
    await gql(quries.AddTodo, { input: { year, month, day, title } })
    await mutate(fetchKey)
  }, [])

  const handleDone = useCallback(async (todo: Todo) => {
    await gql(quries.UpdateTodo, { id: todo.id, isDone: !todo.isDone })
    await mutate(fetchKey)
  }, [])

  const handleDelete = useCallback(async (item: Todo) => {
    await gql(quries.DeleteTodo, { id: item.id, isDone: !item.isDone })
    await mutate(fetchKey)
  }, [])

  const { data, error } = useSWR(isReady ? fetchKey : null, async (query, year, month, day) =>
    gql(query, { year, month, day }),
  )

  const items: [Todo] = data?.todos || []

  return (
    <>
      <TodoHeader date={date} />
      <TodoForm onSubmit={handleSubmit} />
      <TodoList items={items} error={error} onClickDone={handleDone} onClickDelete={handleDelete} />
    </>
  )
}

TodoDetail.Layout = Layout
