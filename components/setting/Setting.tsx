import { FC, FormEvent, useCallback, useState } from 'react'
import cn from 'classnames'
import { Input, Select, TimezoneOptions } from '@components/ui'
import s from './Setting.module.css'

interface Props {
  user: User
  uploadThumbnail: () => void
  deleteThumbnail: () => void
  saveName: (name: string) => void
  saveTimezone: (timezone: string) => void
}

const Setting: FC<Props> = (props) => {
  const [showNameForm, setShowNameForm] = useState(false)
  const [name, setName] = useState(props.user.name)

  const [showTimezoneForm, setShowTimezoneForm] = useState(false)
  const [timezone, setTimezone] = useState(props.user.timezone)

  const toggleNameForm = useCallback(() => {
    setShowNameForm(!showNameForm)
  }, [showNameForm])

  const saveName = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      toggleNameForm()
      props.saveName(name)
    },
    [name],
  )

  const toggleTimezoneForm = useCallback(() => {
    setShowTimezoneForm(!showTimezoneForm)
  }, [showTimezoneForm])

  const saveTimezone = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      toggleTimezoneForm()
      props.saveTimezone(timezone)
    },
    [timezone],
  )

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
            <form onSubmit={saveName} className={cn(s.nameUpdateForm)}>
              <Input type="text" value={name} onChange={setName} className={cn(s.nameInput)} />
              <div className={cn(s.nameSubmitContainer)}>
                <button type="submit" className={cn(s.nameSubmit)}>
                  저장
                </button>
              </div>
            </form>
          )}
        </div>
        <div className={cn(s.nameContainer)}></div>
      </section>
      <section className={cn(s.body)}>
        <div className={cn(s.settingItem)}>
          <div className={cn(s.label)}>시간대</div>
          <div className={cn(s.item)}>
            {!showTimezoneForm && (
              <>
                {timezone}
                <button className={cn(s.updateButton, s.leftMargin)} onClick={toggleTimezoneForm}>
                  수정
                </button>
              </>
            )}
            {showTimezoneForm && (
              <form onSubmit={saveTimezone} className={cn(s.tzUpdateForm)}>
                <Select value={timezone} onChange={setTimezone} className={cn(s.tzInput)}>
                  <TimezoneOptions />
                </Select>
                <div className={cn(s.tzSubmitContainer)}>
                  <button type="submit" className={cn(s.tzSubmit)}>
                    저장
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Setting
