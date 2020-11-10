import { useState, FunctionComponent, SyntheticEvent } from 'react'
import cn from 'classnames'
import { Input } from '@components/ui'
import s from './TodoForm.module.css'
import { TodoAddIcon, TodoCloseIcon } from '@components/icons'

interface Props {
  onSubmit: (title: string) => Promise<any>
}

const Form: FunctionComponent<Props> = ({ onSubmit }) => {
  const [display, setDisplay] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const initForm = () => {
    setTitle('')
    setError('')
  }

  const toggleDisplay = () => {
    setDisplay(!display)
    !display && initForm()
  }

  const handleSubmit = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!title) {
      setError('Input title field')
      return
    }
    try {
      await onSubmit(title)
    } catch (e) {
      setError(e)
    }
    toggleDisplay()
  }

  return (
    <div className={cn(s.root)}>
      <button className={cn(s.addButton, { [s.close]: display })} onClick={toggleDisplay}>
        {display ? <TodoCloseIcon /> : <TodoAddIcon />}
      </button>
      {display && (
        <div className={cn(s.formContainer)}>
          <form className={cn(s.form)} onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              placeholder="Please input title"
              className={cn(s.titleInput)}
              onChange={setTitle}
              autoFocus
            />
            <button type="submit" className={cn(s.submitButton)}>
              Add
            </button>
          </form>
          {error && <div className={cn(s.error)}>! {error}</div>}
        </div>
      )}
    </div>
  )
}

export default Form
