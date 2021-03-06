import cn from 'classnames'
import { FC, useCallback } from 'react'
import s from './TodoList.module.css'
import { TodoCompletedIcon, TodoDeleteIcon, TodoIncompletedIcon } from '@components/icons'
import { IconButton } from '@components/ui'

interface Props {
  items: [Todo]
  error?: any
  onClickDone: (item: Todo) => Promise<any>
  onClickDelete: (item: Todo) => Promise<any>
}

const TodoList: FC<Props> = ({ items, error, onClickDone, onClickDelete }) => {
  const handleUpdate = useCallback((item: Todo) => () => onClickDone(item), [])
  const handleDelete = useCallback((item: Todo) => () => onClickDelete(item), [])

  return (
    <div className={cn(s.root)}>
      {error && <div>{error}</div>}
      {items.length < 1 && <div className={cn(s.empty)}>Please add new todo</div>}
      {items.map((item) => (
        <div key={item.id} className={cn(s.item)}>
          <IconButton
            icon={item.isDone ? TodoCompletedIcon : TodoIncompletedIcon}
            className={cn(s.doneButton)}
            onClick={handleUpdate(item)}
            aria-label={item.isDone ? 'Incomplete' : 'Complete'}
          />
          <span className={cn(s.title, { [s.done]: item.isDone })}>{item.title}</span>
          <IconButton
            icon={TodoDeleteIcon}
            className={cn(s.deleteButton)}
            onClick={handleDelete(item)}
            aria-label="Delete"
          />
        </div>
      ))}
    </div>
  )
}

export default TodoList
