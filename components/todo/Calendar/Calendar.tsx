import { FC, useMemo } from 'react'
import cn from 'classnames'
import { useDate } from '@lib/hooks'
import { CalendarItem } from '@components/todo'
import s from './Calendar.module.css'

interface Props {
  todos: [Todo]
  error: any
  year: string
  month: string
}

const Calendar: FC<Props> = ({ todos, year, month }) => {
  const { getCalendar, groupByDate } = useDate()

  const { calendar, grouppedTodos } = useMemo(
    () => ({ calendar: getCalendar(year, month), grouppedTodos: groupByDate(todos) }),
    [year, month, todos],
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
        {calendar.map((row, idx) => (
          <tr key={`row-${idx}`}>
            {row.map((i) => (
              <td key={i.date.valueOf()} className={cn(s.day)}>
                <CalendarItem day={i} todos={grouppedTodos[i.date.format('YYYYMMDD')]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Calendar
