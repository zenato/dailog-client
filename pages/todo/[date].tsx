import dayjs from 'dayjs'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import { gql, quries } from '@lib/api'
import getServerSidePropsWrapper from '@lib/ssr'
import { Layout } from '@components/core'
import { TodoForm, TodoHeader, TodoList } from '@components/todo'
import { useCallback, useMemo } from 'react';

interface Props {
  todosByDate: [Todo]
}

function getDate(date: string) {
  return dayjs(date, 'YYYYMMDD')
}

export default function TodoDetail({ todosByDate }: Props) {
  const { query } = useRouter()

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

  const { data, error } = useSWR(fetchKey, async (query) => gql(query, { date }), {
    initialData: { todosByDate },
    revalidateOnMount: true,
  })

  const items: [Todo] = data?.todosByDate || []

  return (
    <Layout>
      <TodoHeader date={date.toDate()} />
      <TodoForm onSubmit={handleSubmit} />
      <TodoList items={items} error={error} onClickDone={handleDone} onClickDelete={handleDelete} />
    </Layout>
  )
}

export const getServerSideProps = getServerSidePropsWrapper(async ({ query, axiosConfig }) => {
  const date = getDate(query.date as string)
  const { todosByDate } = await gql(quries.TodosByDate, { date }, axiosConfig)
  return {
    props: {
      todosByDate,
    },
  }
})
