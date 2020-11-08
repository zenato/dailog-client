import { FC } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import cn from 'classnames'
import s from './CalendarHeader.module.css'

interface Props {
  date: Date
}

const Date: FC<Props> = ({ date }) => {
  const router = useRouter()

  const moveMonth = (addMonth: number) => {
    router.push({
      pathname: '/todo',
      query: { date: dayjs(date).add(addMonth, 'month').format('YYYYMM') },
    })
  }

  const handlePrev = () => moveMonth(-1)
  const handleNext = () => moveMonth(1)

  return (
    <div className={cn(s.root)}>
      <button className={cn(s.prev)} onClick={handlePrev}>
        <img width="18" height="18" src="/left-arrow.svg" />
      </button>
      <div className={cn(s.state)}>{dayjs(date).format('YYYY / MM')}</div>
      <button className={cn(s.next)} onClick={handleNext}>
        <img width="18" height="18" src="/right-arrow.svg" />
      </button>
    </div>
  )
}

export default Date
