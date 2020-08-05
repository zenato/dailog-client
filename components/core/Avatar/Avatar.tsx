import { FC } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import s from './Avatar.module.css'

interface Props {
  profileImage?: string
}

const Avatar: FC<Props> = ({ profileImage }) => {
  return <Image unsized className={cn(s.root)} src={profileImage || '/profile.png'}></Image>
}

export default Avatar
