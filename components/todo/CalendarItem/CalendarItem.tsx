import { FC, useMemo } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { Item } from '@lib/calendar'
import dayjs from '@lib/dayjs'
import { CalendarCompleted, CalendarIncompleted } from '@components/icons'
import s from './CalendarItem.module.css'

interface Props {
  day: Item
  todos?: [Todo]
}

const CalendarItem: FC<Props> = ({ day, todos }) => {
  const className = useMemo(() => {
    return {
      [s.sun]: day.date.getDay() === 0,
      [s.sat]: day.date.getDay() === 6,
      [s.disabled]: !day.isCurrentMonth,
    }
  }, [day, todos])

  return (
    <div className={cn(s.root, className)}>
      <div className={cn(s.content)}>
        {day.isCurrentMonth ? (
          <>
            <Link href={`/todo/${dayjs(day.date).format('YYYYMMDD')}`}>
              <a className={cn(s.day)}>{day.date.getDate()}</a>
            </Link>
            {todos?.every((i) => i.isDone) && <CalendarCompleted className={cn(s.completed)} />}
            {todos?.some((i) => !i.isDone) && <CalendarIncompleted className={cn(s.incompleted)} />}
          </>
        ) : (
          <div className={cn(s.day)}>{day.date.getDate()}</div>
        )}
      </div>
    </div>
  )
}

export default CalendarItem
