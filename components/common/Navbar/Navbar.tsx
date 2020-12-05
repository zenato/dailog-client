import { FC, SyntheticEvent, useCallback, useState } from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { Avatar } from '@components/common'
import { Logo } from '@components/ui'
import Modal from './Modal'
import s from './Navbar.module.css'

const Header: FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const [displayModal, setDisplayModal] = useState(false)

  const toggleDisplayModal = useCallback(
    (e: SyntheticEvent<EventTarget>) => {
      e.preventDefault()
      setDisplayModal(!displayModal)
    },
    [displayModal],
  )

  const handleClickItem = useCallback(() => {
    setDisplayModal(false)
  }, [])

  return (
    <div className={cn(s.root)}>
      <div className={cn(s.content)}>
        <Logo />
        <div>
          <a href="" onClick={toggleDisplayModal} aria-label="Menu">
            <Avatar profileImage={user?.thumbnail} />
          </a>
          {displayModal && <Modal onClickItem={handleClickItem} />}
        </div>
      </div>
    </div>
  )
}

export default Header
