import { HYDRATE } from 'next-redux-wrapper'
import { createAction, createReducer, ActionType } from 'typesafe-actions'
import { User } from '@lib/graphql'

export type UserState = User | null

const initialState: UserState = null

// Action Types
const SET_USER = 'user/SET_USER'
const LOGOUT = 'user/LOGOUT'

// Actions
const hydrate = createAction(HYDRATE)<any>()
const setUser = createAction(SET_USER)<User>()
const logout = createAction(LOGOUT)()

export const actions = { hydrate, setUser, logout }

export default createReducer<UserState, ActionType<typeof actions>>(initialState, {
  [HYDRATE]: (state, action) => action.payload.user,
  [SET_USER]: (state, action) => action.payload,
  [LOGOUT]: () => null,
})
