import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Dayjs } from 'dayjs'
import cn from 'classnames'
import { LeftArrow, RightArrow } from '@components/icons'
import { IconButton } from '@components/ui'
import s from './CalendarHeader.module.css'

interface Props {
  date: Dayjs
}

const Date: FC<Props> = ({ date }) => {
  const router = useRouter()

  const move = (add: number) => router.push(`/todo/${date.add(add, 'month').format('YYYY/M')}`)
  const handlePrev = useCallback(() => move(-1), [date])
  const handleNext = useCallback(() => move(1), [date])

  return (
    <div className={cn(s.root)}>
      <IconButton
        icon={LeftArrow}
        className={cn(s.prev)}
        onClick={handlePrev}
        aria-label="Previous"
      />
      <div className={cn(s.state)}>{date.format('YYYY / M')}</div>
      <IconButton icon={RightArrow} className={cn(s.next)} onClick={handleNext} aria-label="Next" />
    </div>
  )
}

export default Date
