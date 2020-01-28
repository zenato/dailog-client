import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { User } from '../store/common'
import { setUser, logout } from '../store/common'
import { useCallback } from 'react'

export default function useUser() {
  const user = useSelector((state: RootState) => state.common.user)
  const dispatch = useDispatch()

  const onSetUser = useCallback((user: User) => dispatch(setUser(user)), [dispatch])
  const onLogout = useCallback(() => dispatch(logout()), [dispatch])

  return {
    user,
    onSetUser,
    onLogout,
  }
}