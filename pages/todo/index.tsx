import { useMemo } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { gql, quries } from '@lib/api'
import dayjs from '@lib/dayjs'
import { Layout } from '@components/common'
import { Calendar, CalendarHeader } from '@components/todo'

const DATE_FORMAT = 'YYYYMM'

function getStartOfMonth(date: string) {
  return (date ? dayjs(date as string, DATE_FORMAT) : dayjs()).startOf('month').toDate()
}

export default function TodoCalendar() {
  const { query } = useRouter()

  if (!query.date) {
    return null
  }

  const date = useMemo(() => getStartOfMonth(query.date as string), [query.date])

  const { data, error } = useSWR([quries.TodosByMonthly, query.date], async (query) => {
    return gql(query, { date: date })
  })

  const items: [Todo] = data?.todosByMonthly ?? []

  return (
    <Layout>
      {error && <div>{error.message}</div>}
      <CalendarHeader date={date} />
      <Calendar date={date} todos={items} error={error} />
    </Layout>
  )
}
