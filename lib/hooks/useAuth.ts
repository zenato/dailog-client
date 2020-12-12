import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSWR, { mutate } from 'swr'
import Cookie from 'js-cookie'
import { fetcher } from '@lib/api'
import { RootState } from '@store/index'
import { actions } from '@store/user'

export default function useAuth() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const setUser = useCallback((user: User) => dispatch(actions.setUser(user)), [dispatch])
  const logout = useCallback(() => {
    Cookie.remove('authorization')
    window.location.href = '/'
    // dispatch(actions.logout())
  }, [dispatch])

  const { data } = useSWR('/auth/me', fetcher, {
    onSuccess: ({ user }) => setUser(user),
  })

  const revalidate = useCallback(() => {
    mutate('/auth/me')
  }, [])

  return {
    loading: !data,
    user,
    revalidate,
    setUser,
    logout,
  }
}
