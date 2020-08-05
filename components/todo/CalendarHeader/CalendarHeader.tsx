import { FC } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import cn from 'classnames'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        <FontAwesomeIcon size="lg" icon={faChevronLeft} />
      </button>
      <div className={cn(s.state)}>{dayjs(date).format('YYYY / MM')}</div>
      <button className={cn(s.next)} onClick={handleNext}>
        <FontAwesomeIcon size="lg" icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Date
