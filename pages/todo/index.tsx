import { useRouter } from 'next/router'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { Layout } from '@components/core'
import { Calendar, CalendarHeader } from '@components/todo'
import getServerSidePropsWrapper from '@lib/ssr'
import { gql, quries } from '@lib/api'

const DATE_FORMAT = 'YYYYMM'

function getStartOfMonth(date: string) {
  return (date ? dayjs(date as string, DATE_FORMAT) : dayjs()).startOf('month').toDate()
}

interface Props {
  todosByMonthly: [Todo]
}

export default function TodoCalendar({ todosByMonthly }: Props) {
  const router = useRouter()
  const { date } = router.query

  const startOfMonth = getStartOfMonth(date as string)
  const { data, error } = useSWR(
    [quries.TodosByMonthly, startOfMonth.getTime()],
    async (query) => gql(query, { date: startOfMonth }),
    { initialData: { todosByMonthly } },
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

export const getServerSideProps = getServerSidePropsWrapper(async ({ axiosConfig, query }) => {
  const currentDate = getStartOfMonth(query.date as string)
  const { todosByMonthly } = await gql(quries.TodosByMonthly, { date: currentDate }, axiosConfig)
  return {
    props: {
      todosByMonthly,
    },
  }
})
