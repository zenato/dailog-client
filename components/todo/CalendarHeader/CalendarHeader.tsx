import { FC, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useDate } from '@lib/hooks'
import { LeftArrow, RightArrow } from '@components/icons'
import { IconButton } from '@components/ui'
import s from './CalendarHeader.module.css'

interface Props {
  year: string
  month: string
}

const Date: FC<Props> = ({ year, month }) => {
  const router = useRouter()
  const { parse } = useDate()

  const date = useMemo(() => parse(year, month), [year, month])

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
