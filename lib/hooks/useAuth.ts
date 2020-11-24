import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookie from 'js-cookie'
import { RootState } from '@store/index'
import { actions } from '@store/user'
import { User } from '@lib/graphql'

const useAuth = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const login = useCallback((user: User) => dispatch(actions.setUser(user)), [dispatch])
  const logout = useCallback(() => {
    Cookie.remove('authorization')
    window.location.href = '/'

    // dispatch(actions.logout())
  }, [dispatch])

  return {
    user,
    login,
    logout,
  }
}

export default useAuth
