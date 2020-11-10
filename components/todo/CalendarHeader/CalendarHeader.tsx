import { FC } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import cn from 'classnames'
import s from './CalendarHeader.module.css'
import { LeftArrow, RightArrow } from '@components/icons'

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
        <LeftArrow />
      </button>
      <div className={cn(s.state)}>{dayjs(date).format('YYYY / MM')}</div>
      <button className={cn(s.next)} onClick={handleNext}>
        <RightArrow />
      </button>
    </div>
  )
}

export default Date
