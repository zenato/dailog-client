import { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import s from './IconButton.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: any
}

const IconButton: FC<Props> = ({ icon: IconImage, className, ...attrs }) => {
  return (
    <button className={cn(s.root, className)} {...attrs}>
      <IconImage />
    </button>
  )
}

export default IconButton
