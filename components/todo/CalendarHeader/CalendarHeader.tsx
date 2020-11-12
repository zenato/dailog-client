import { FC } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import cn from 'classnames'
import s from './CalendarHeader.module.css'
import { LeftArrow, RightArrow } from '@components/icons'
import { IconButton } from '@components/ui'

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
      <IconButton icon={LeftArrow} className={cn(s.prev)} onClick={handlePrev} />
      <div className={cn(s.state)}>{dayjs(date).format('YYYY / MM')}</div>
      <IconButton icon={RightArrow} className={cn(s.next)} onClick={handleNext} />
    </div>
  )
}

export default Date
