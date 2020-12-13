import { FC, InputHTMLAttributes, useCallback } from 'react'
import cn from 'classnames'
import s from './Select.module.css'

export interface Props extends InputHTMLAttributes<HTMLSelectElement> {
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

  return <select className={rootClassName} onChange={handleOnChange} {...rest} />
}

export default Input
