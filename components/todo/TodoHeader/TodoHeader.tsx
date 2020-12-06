import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import dayjs from '@lib/dayjs'
import { LeftArrow } from '@components/icons'
import { IconButton } from '@components/ui'
import s from './TodoHeader.module.css'

interface Props {
  date: Date
}

const TodoHeader: FC<Props> = ({ date }) => {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [])

  const formattedDate = useMemo(() => dayjs(date).format('YYYY / MM / DD'), [date])

  return (
    <div className={cn(s.root)}>
      <IconButton
        icon={LeftArrow}
        className={cn(s.backButton)}
        onClick={goBack}
        aria-label="Back to calendar"
      />
      <span>{formattedDate}</span>
    </div>
  )
}

export default TodoHeader
