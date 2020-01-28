import { combineReducers } from 'redux'
import common from './common'

const rootReducer = combineReducers({
  common,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
