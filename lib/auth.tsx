import { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/index'
import { User, actions } from '@store/user'

export default function useAuth() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const setUser = useCallback((user: User) => dispatch(actions.setUser(user)), [dispatch])

  return {
    user,
    setUser,
  }
}