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

  const { year, month, date } = router.query
  const isReady = year && month && date

  const { currentDate, params } = useMemo(() => {
    const currentDate = parse(year as string, month as string, date as string)
    const params = {
      year: currentDate.format('YYYY'),
      month: currentDate.format('M'),
      date: currentDate.format('D'),
    }
    return { currentDate, params }
  }, [isReady])

  useEffect(() => {
    if (isReady) {
      if (
        currentDate.format('YYYYMD') !==
        (year as string) + (month as string) + (date as string)
      ) {
        router.push(`/todo/${currentDate.format('YYYY/M/D')}`)
      }
    }
  }, [isReady])

  const fetchKey = [quries.Todos, params]

  const handleSubmit = useCallback(async (title: string) => {
    await gql(quries.AddTodo, { input: { ...params, title } })
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

  const { data, error } = useSWR(isReady ? fetchKey : null, gql)

  const items: [Todo] = data?.todos || []

  return (
    <>
      <TodoHeader date={currentDate.format('YYYY / M / D')} />
      <TodoForm onSubmit={handleSubmit} />
      <TodoList items={items} error={error} onClickDone={handleDone} onClickDelete={handleDelete} />
    </>
  )
}

TodoDetail.Layout = Layout
