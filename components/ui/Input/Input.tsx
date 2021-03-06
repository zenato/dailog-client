import { FC, InputHTMLAttributes, useCallback } from 'react'
import cn from 'classnames'
import s from './Input.module.css'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (...args: any[]) => any
}

const Input: FC<Props> = (props) => {
  const { className, onChange, ...rest } = props
  const rootClassName = cn(s.root, {}, className)

  const handleOnChange = useCallback((e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }, [])

  return (
    <input
      className={rootClassName}
      onChange={handleOnChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...rest}
    />
  )
}

export default Input
