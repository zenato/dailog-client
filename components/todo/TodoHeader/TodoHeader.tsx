import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { LeftArrow } from '@components/icons'
import { IconButton } from '@components/ui'
import s from './TodoHeader.module.css'

interface Props {
  date: string
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
      <span>{date}</span>
    </div>
  )
}

export default TodoHeader
