import cn from 'classnames'
import { FC, SyntheticEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Todo } from '@lib/graphql'
import s from './TodoList.module.css'

interface Props {
  items: [Todo]
  error?: any
  onClickDone: (item: Todo) => Promise<any>
  onClickDelete: (item: Todo) => Promise<any>
}

const TodoList: FC<Props> = ({ items, error, onClickDone, onClickDelete }) => {
  const handleUpdate = (item: Todo) => () => onClickDone(item)
  const handleDelete = (item: Todo) => () => onClickDelete(item)

  return (
    <div className={cn(s.root)}>
      {error && <div>{error}</div>}
      {items.length < 1 && <div className={cn(s.empty)}>Please add new todo</div>}
      {items.map((item) => (
        <div key={item.id} className={cn(s.item)}>
          <button
            className={cn(s.doneButton, { [s.done]: item.isDone })}
            onClick={handleUpdate(item)}
          >
            <FontAwesomeIcon size="lg" icon={faCheck} className={cn(s.doneIcon)} />
          </button>
          <span className={cn(s.title, { [s.done]: item.isDone })}>{item.title}</span>
          <button className={cn(s.deleteButton)} onClick={handleDelete(item)}>
            <FontAwesomeIcon size="lg" icon={faTrashAlt} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default TodoList
