import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { gql, quries } from '@lib/api'
import { useAuth, useDate } from '@lib/hooks'
import { Layout } from '@components/common'
import { Calendar, CalendarHeader } from '@components/todo'

export default function TodoCalendar() {
  const router = useRouter()
  const { parse } = useDate()

  const { year, month } = router.query
  const isReady = year && month

  const { date, params } = useMemo(() => {
    const date = parse(year as string, month as string)
    const params = { year: date.format('YYYY'), month: date.format('M') }
    return { date, params }
  }, [year, month])

  useEffect(() => {
    if (isReady && date.format('YYYYM') !== (year as string) + (month as string)) {
      router.push(`/todo/${date.format('YYYY/M')}`)
    }
  }, [isReady])

  const { data, error } = useSWR(isReady ? [quries.Todos, params] : null, gql)

  const items: [Todo] = data?.todos ?? []

  return (
    <>
      {error && <div>{error.message}</div>}
      <CalendarHeader {...params} />
      <Calendar {...params} todos={items} error={error} />
    </>
  )
}

TodoCalendar.Layout = Layout
