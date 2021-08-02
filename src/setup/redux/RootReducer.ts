import {combineReducers} from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import * as auth from '../../app/modules/auth'

const rootReducer = combineReducers({
  auth: auth.userReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

export type RootState = ReturnType<typeof rootReducer>

export const persistedReducer = persistReducer(persistConfig, rootReducer)
