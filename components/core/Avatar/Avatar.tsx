import { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import s from './Avatar.module.css'

interface Props {
  profileImage?: string
}

const Avatar: FC<Props> = ({ profileImage }) => {
  return (
    <div className={cn(s.root)}>
      <Image width="100%" height="100%" src={profileImage || '/profile.png'}></Image>
    </div>
  )
}

export default Avatar
