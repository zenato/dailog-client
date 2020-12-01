import { FC, useState } from 'react'
import cn from 'classnames'
import { Input } from '@components/ui'
import s from './Setting.module.css'

interface Props {
  user: User
  uploadThumbnail: () => void
  deleteThumbnail: () => void
  saveName: (name: string) => void
}

const Setting: FC<Props> = (props) => {
  const [showNameForm, setShowNameForm] = useState(false)
  const [name, setName] = useState(props.user.name)

  const toggleNameForm = () => {
    setShowNameForm(!showNameForm)
  }

  const saveName = () => {
    toggleNameForm()
    props.saveName(name)
  }

  return (
    <div className={cn(s.root)}>
      <section className={cn(s.head)}>
        <div className={cn(s.thumbnailContainer)}>
          <img
            src={props.user.thumbnail || '/profile.png'}
            alt="profile image"
            className={cn(s.thumbnail)}
          />
          <button className={cn(s.addButton)} onClick={props.uploadThumbnail}>
            이미지 업로드
          </button>
          <button className={cn(s.deleteButton)} onClick={props.deleteThumbnail}>
            이미지 삭제
          </button>
        </div>
        <div className={cn(s.nameContainer)}>
          {!showNameForm && (
            <>
              <h2 className={cn(s.name)}>{name}</h2>
              <button className={cn(s.updateButton)} onClick={toggleNameForm}>
                수정
              </button>
            </>
          )}
          {showNameForm && (
            <form className={cn(s.nameUpdateForm)}>
              <Input type="text" value={name} onChange={setName} className={cn(s.nameInput)} />
              <div className={cn(s.nameSubmitContainer)}>
                <button type="submit" className={cn(s.nameSubmit)} onClick={saveName}>
                  저장
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Setting
