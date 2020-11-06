import dayjs from 'dayjs'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import { Layout } from '@components/core'
import { TodoHeader, TodoForm, TodoList } from '@components/todo'
import { TodosByDate, AddTodo, UpdateTodo, DeleteTodo, Todo } from '@lib/graphql'
import { gql } from '@lib/fetcher'

const TodoDetail = () => {
  const { query } = useRouter()
  const date = dayjs(query.date as string, 'YYYYMMDD')

  const fetchKey = [TodosByDate, query.date]

  const handleSubmit = async (title: string) => {
    await gql('/api/graphql', AddTodo, { input: { date, title } })
    await mutate(fetchKey)
  }

  const handleDone = async (todo: Todo) => {
    await gql('/api/graphql', UpdateTodo, { id: todo.id, isDone: !todo.isDone })
    await mutate(fetchKey)
  }

  const handleDelete = async (item: Todo) => {
    await gql('/api/graphql', DeleteTodo, { id: item.id, isDone: !item.isDone })
    await mutate(fetchKey)
  }

  const { data, error } = useSWR(fetchKey, async (query) => {
    const { todosByDate } = await gql('/api/graphql', query, { date })
    return todosByDate
  })

  const items: [Todo] = data || []

  return (
    <Layout>
      <TodoHeader date={date.toDate()} />
      <TodoForm onSubmit={handleSubmit} />
      <TodoList items={items} error={error} onClickDone={handleDone} onClickDelete={handleDelete} />
    </Layout>
  )
}

export default TodoDetail
