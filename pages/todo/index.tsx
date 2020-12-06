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
  const router = useRouter()
  const { date } = router.query

  const startOfMonth = useMemo(() => getStartOfMonth(date as string), [date])

  const { data, error } = useSWR([quries.TodosByMonthly, date], async (query) =>
    gql(query, { date: startOfMonth }),
  )

  const items: [Todo] = data?.todosByMonthly ?? []

  return (
    <Layout>
      {error && <div>{error.message}</div>}
      <CalendarHeader date={startOfMonth} />
      <Calendar date={startOfMonth} todos={items} error={error} />
    </Layout>
  )
}
