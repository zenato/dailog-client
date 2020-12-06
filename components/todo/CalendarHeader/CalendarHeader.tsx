import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { LeftArrow, RightArrow } from '@components/icons'
import { IconButton } from '@components/ui'
import dayjs from '@lib/dayjs'
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

  const handlePrev = useCallback(() => moveMonth(-1), [date])
  const handleNext = useCallback(() => moveMonth(1), [date])

  const formattedDate = useMemo(() => dayjs(date).format('YYYY / MM'), [date])

  return (
    <div className={cn(s.root)}>
      <IconButton
        icon={LeftArrow}
        className={cn(s.prev)}
        onClick={handlePrev}
        aria-label="Previous"
      />
      <div className={cn(s.state)}>{formattedDate}</div>
      <IconButton icon={RightArrow} className={cn(s.next)} onClick={handleNext} aria-label="Next" />
    </div>
  )
}

export default Date
