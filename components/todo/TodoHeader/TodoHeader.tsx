import { FC } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import dayjs from 'dayjs'
import s from './TodoHeader.module.css'
import { LeftArrow } from '@components/icons'
import { IconButton } from '@components/ui'

interface Props {
  date: Date
}

const TodoHeader: FC<Props> = ({ date }) => {
  const router = useRouter()
  return (
    <div className={cn(s.root)}>
      <IconButton icon={LeftArrow} className={cn(s.backButton)} onClick={() => router.back()} />
      <span>{dayjs(date).format('YYYY / MM / DD')}</span>
    </div>
  )
}

export default TodoHeader
