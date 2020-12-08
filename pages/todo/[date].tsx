import { useCallback, useMemo } from 'react'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import { gql, quries } from '@lib/api'
import dayjs from '@lib/dayjs'
import { Layout } from '@components/common'
import { TodoForm, TodoHeader, TodoList } from '@components/todo'

function getDate(date: string) {
  return dayjs(date, 'YYYYMMDD')
}

export default function TodoDetail() {
  const { query } = useRouter()

  if (query.date === '[date]') {
    return null
  }

  const date = useMemo(() => getDate(query.date as string), [])

  const fetchKey = [quries.TodosByDate, query.date]

  const handleSubmit = useCallback(async (title: string) => {
    await gql(quries.AddTodo, { input: { date, title } })
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

  const { data, error } = useSWR(fetchKey, async (query) => gql(query, { date }))

  const items: [Todo] = data?.todosByDate || []

  return (
    <Layout>
      <TodoHeader date={date.toDate()} />
      <TodoForm onSubmit={handleSubmit} />
      <TodoList items={items} error={error} onClickDone={handleDone} onClickDelete={handleDelete} />
    </Layout>
  )
}
