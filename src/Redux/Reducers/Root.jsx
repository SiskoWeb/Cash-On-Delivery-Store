
import { AdminReducer } from '../Reducers/AdminReducer'
import { combineReducers } from 'redux'
import { ReducerUser } from '../Reducers/ReducerUser'
export const  rootReducer = combineReducers({AdminReducer: AdminReducer, ReducerUser: ReducerUser})