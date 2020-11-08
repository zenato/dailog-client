import { FC } from 'react'
import cn from 'classnames'
import s from './Avatar.module.css'

interface Props {
  profileImage?: string
}

const Avatar: FC<Props> = ({ profileImage }) => {
  return (
    <div className={cn(s.root)}>
      <img width="100%" height="100%" src={profileImage || '/profile.png'}></img>
    </div>
  )
}

export default Avatar
