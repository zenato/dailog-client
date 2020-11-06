import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import dayjs from 'dayjs'
import Layout from '@components/core/Layout/Layout'
import Header from '@components/todo/CalendarHeader/CalendarHeader'
import Calendar from '@components/todo/Calendar/Calendar'
import { TodosByMonthly, Todo } from '@lib/graphql'
import { gql } from '@lib/fetcher'

const DATE_FORMAT = 'YYYYMM'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { date } = router.query

  const currentDate = (date ? dayjs(date as string, DATE_FORMAT) : dayjs())
    .startOf('month')
    .toDate()

  const { data, error } = useSWR([TodosByMonthly, currentDate.getTime()], async (query) =>
    gql('/api/graphql', query, { date: currentDate }),
  )

  const items: [Todo] = data?.todosByMonthly ?? []

  return (
    <Layout>
      <Header date={currentDate} />
      <Calendar date={currentDate} todos={items} error={error} />
    </Layout>
  )
}

export default HomePage
