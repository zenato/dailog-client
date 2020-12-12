import { useMemo, useCallback } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekday from 'dayjs/plugin/weekday'
import useAuth from './useAuth'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(weekday)

const DEFAULT_TIMEZONE = 'Asia/Seoul'

export interface Item {
  date: Dayjs
  isCurrentMonth: boolean
}

export default function useDate() {
  const { user } = useAuth()

  // dayjs.tz.setDefault(timezone)
  const timezone = useMemo(() => user?.timezone || dayjs.tz.guess() || DEFAULT_TIMEZONE, [user])

  const now = useCallback(() => dayjs().tz(timezone), [])

  const parse = useCallback((year: string, month: string, date?: string) => {
    try {
      return dayjs.tz(`${year}-${month}-${date || 1} 00:00`, timezone)
    } catch (e) {
      return now().startOf('day')
    }
  }, [])

  const getCalendar = useCallback((year: string, month: string) => {
    const date = parse(year, month)
    const startOfMonth = date.startOf('month')
    const lastValue = startOfMonth.endOf('month').valueOf()
    let current = startOfMonth.add(-startOfMonth.weekday(), 'day')
    const items: Array<Item[]> = []

    while (true) {
      const row: Item[] = []
      for (let i = 0; i < 7; i++) {
        row.push({
          date: current.clone(),
          isCurrentMonth: current.get('month') === date.get('month'),
        })
        current = current.add(1, 'day')
      }
      items.push(row)
      if (lastValue <= current.valueOf()) break
    }
    return items
  }, [])

  const groupByDate = useCallback(<T extends { date: Date }>(items: [T]) => {
    return items.reduce((acc, curr) => {
      const key = dayjs(curr.date).tz(timezone).format('YYYYMMDD')
      return {
        ...acc,
        [key]: (acc[key] || []).concat([curr]) as [T],
      }
    }, {} as { [key: string]: [T] })
  }, [])

  return { timezone, now, parse, getCalendar, groupByDate }
}
