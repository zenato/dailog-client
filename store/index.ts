import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper'
import user from './user'

const rootReducer = combineReducers({ user })

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

const makeStore: MakeStore<RootState> = (context: Context) => {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(rootReducer, composeWithDevTools())
  } else {
    return createStore(rootReducer)
  }
}

export const wrapper = createWrapper<RootState>(makeStore, { debug: false })
