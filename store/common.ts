// States

export type User = {
  id: number
  email: string
}

type UserState = {
  user?: User | null
}

type CommonState = UserState

const initialState: CommonState = {
  user: null
}


// Actions

const SET_USER = 'user/SET_USER' as const

export const setUser = (user?: User) => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: SET_USER, payload: null })

type UserAction = ReturnType<typeof setUser> | ReturnType<typeof logout>
type CommonAction = UserAction


// Reducer

function reducer(state: CommonState = initialState, action: CommonAction) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    default:
      return state
  }
}

export default reducer
