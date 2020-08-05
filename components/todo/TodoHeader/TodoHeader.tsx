import { FC } from 'react'
import { useRouter } from 'next/router'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
        <FontAwesomeIcon size="lg" icon={faChevronLeft} />
      </button>
      <span>{dayjs(date).format('YYYY / MM / DD')}</span>
    </div>
  )
}

export default TodoHeader
