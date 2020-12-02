import { FC } from 'react'
import cn from 'classnames'
import s from './IconButton.module.css'

interface Props {
  icon: any
  className?: string
  onClick?: () => any
}

const IconButton: FC<Props> = ({ icon: IconImage, className, onClick }) => {
  return (
    <button className={cn(s.root, className)} onClick={onClick}>
      <IconImage />
    </button>
  )
}

export default IconButton
