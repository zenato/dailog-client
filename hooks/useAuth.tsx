import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { User, setUser, logout } from '../store/common'

export default function useAuth() {
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