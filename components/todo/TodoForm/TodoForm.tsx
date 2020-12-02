import { FunctionComponent, memo, SyntheticEvent, useCallback, useState } from 'react'
import cn from 'classnames'
import { IconButton, Input } from '@components/ui'
import { AlertIcon, TodoAddIcon, TodoCloseIcon } from '@components/icons'
import s from './TodoForm.module.css'

interface Props {
  onSubmit: (title: string) => Promise<any>
}

const Form: FunctionComponent<Props> = ({ onSubmit }) => {
  const [display, setDisplay] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const initForm = useCallback(() => {
    setTitle('')
    setError('')
  }, [])

  const toggleDisplay = useCallback(() => {
    setDisplay(!display)
    !display && initForm()
  }, [display])

  const handleSubmit = useCallback(async (e: SyntheticEvent<EventTarget>) => {
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
  }, [title])

  return (
    <div className={cn(s.root)}>
      <IconButton
        icon={display ? TodoCloseIcon : TodoAddIcon}
        className={cn(s.addButton, { [s.close]: display })}
        onClick={toggleDisplay}
      />
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
          {error && (
            <div className={cn(s.error)}>
              <AlertIcon /> {error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Form
