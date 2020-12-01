import { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import cn from 'classnames'
import { CalendarItem } from '@components/todo'
import { getDays, groupByDay } from '@lib/calendar'
import s from './Calendar.module.css'

interface Props {
  todos: [Todo]
  error: any
  date: Date
}

const Calendar: FC<Props> = ({ todos, date }) => {
  const { days, todosByDay } = useMemo(
    () => ({
      days: getDays(date),
      todosByDay: groupByDay(todos),
    }),
    [date, todos],
  )

  return (
    <table className={cn(s.root)}>
      <thead>
        <tr>
          <th className={cn(s.weekday, s.sun)}>S</th>
          <th className={cn(s.weekday)}>M</th>
          <th className={cn(s.weekday)}>T</th>
          <th className={cn(s.weekday)}>W</th>
          <th className={cn(s.weekday)}>T</th>
          <th className={cn(s.weekday)}>F</th>
          <th className={cn(s.weekday, s.sat)}>S</th>
        </tr>
      </thead>
      <tbody>
        {days.map((row, idx) => (
          <tr key={`row-${idx}`}>
            {row.map((i) => (
              <td key={i.date.getTime()} className={cn(s.day)}>
                <CalendarItem day={i} todos={todosByDay[dayjs(i.date).format('YYYYMMDD')]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Calendar
