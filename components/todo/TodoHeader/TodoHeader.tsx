import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Dayjs } from 'dayjs'
import cn from 'classnames'
import { LeftArrow } from '@components/icons'
import { IconButton } from '@components/ui'
import s from './TodoHeader.module.css'

interface Props {
  date: Dayjs
}

const TodoHeader: FC<Props> = ({ date }) => {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [])

  return (
    <div className={cn(s.root)}>
      <IconButton
        icon={LeftArrow}
        className={cn(s.backButton)}
        onClick={goBack}
        aria-label="Back to calendar"
      />
      <span>{date.format('YYYY / MM / DD')}</span>
    </div>
  )
}

export default TodoHeader
