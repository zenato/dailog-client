import { FC, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookie from 'js-cookie'
import cn from 'classnames'
import s from './Modal.module.css'

interface Props {
  onClickItem: () => any
}

const Modal: FC<Props> = ({ onClickItem }) => {
  const router = useRouter()

  const handleLogout = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    onClickItem()

    Cookie.remove('authorization')
    router.push('/')
  }

  return (
    <div className={cn(s.root)}>
      <Link href="/setting">
        <a className={cn(s.item)}>Setting</a>
      </Link>
      <a href="" className={cn(s.item)} onClick={handleLogout}>
        Logout
      </a>
    </div>
  )
}

export default Modal
