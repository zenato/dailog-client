import { FC, useMemo } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import dayjs from 'dayjs'
import { Item } from '@lib/calendar'
import { Todo } from '@lib/graphql'
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
        <Link href={`/todo/${dayjs(day.date).format('YYYYMMDD')}`}>
          <a className={cn(s.link)}>{day.date.getDate()}</a>
        </Link>
      </div>
      {todos?.every((i) => i.isDone) && (
        <img width="60%" height="60%" src="/calendar-completed.svg" className={cn(s.completed)} />
      )}
      {todos?.some((i) => !i.isDone) && (
        <img
          width="50%"
          height="50%"
          src="/calendar-incompleted.svg"
          className={cn(s.incompleted)}
        />
      )}
    </div>
  )
}

export default CalendarItem
