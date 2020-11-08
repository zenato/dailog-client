import { FC } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import dayjs from 'dayjs'
import s from './TodoHeader.module.css'

interface Props {
  date: Date
}

const TodoHeader: FC<Props> = ({ date }) => {
  const router = useRouter()
  return (
    <div className={cn(s.root)}>
      <button className={cn(s.backButton)} onClick={() => router.back()}>
        <img width="18" height="18" src="/left-arrow.svg" />
      </button>
      <span>{dayjs(date).format('YYYY / MM / DD')}</span>
    </div>
  )
}

export default TodoHeader
