// import {Action} from '@reduxjs/toolkit'
// import {persistReducer} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import {put, takeLatest} from 'redux-saga/effects'
// import {UserModel} from '../models/UserModel'
// import {getUserByToken} from './AuthCRUD'

// export interface ActionWithPayload<T> extends Action {
//   payload?: T
// }

// export const actionTypes = {
//   Login: '[Login] Action',
//   Logout: '[Logout] Action',
//   Register: '[Register] Action',
//   UserRequested: '[Request User] Action',
//   UserLoaded: '[Load User] Auth API',
//   SetUser: '[Set User] Action',
// }

// const initialAuthState: IAuthState = {
//   user: undefined,
//   accessToken: undefined,
// }

// export interface IAuthState {
//   user?: UserModel
//   accessToken?: string
// }

// export const reducer = persistReducer(
//   {storage, key: 'v100-demo1-auth', whitelist: ['user', 'accessToken']},
//   (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
//     switch (action.type) {
//       case actionTypes.Login: {
//         const accessToken = action.payload?.accessToken
//         return {accessToken, user: undefined}
//       }

//       case actionTypes.Register: {
//         const accessToken = action.payload?.accessToken
//         return {accessToken, user: undefined}
//       }

//       case actionTypes.Logout: {
//         return initialAuthState
//       }

//       case actionTypes.UserRequested: {
//         return {...state, user: undefined}
//       }

//       case actionTypes.UserLoaded: {
//         const user = action.payload?.user
//         return {...state, user}
//       }

//       case actionTypes.SetUser: {
//         const user = action.payload?.user
//         return {...state, user}
//       }

//       default:
//         return state
//     }
//   }
// )

// export const actions = {
//   login: (accessToken: string) => ({type: actionTypes.Login, payload: {accessToken}}),
//   register: (accessToken: string) => ({
//     type: actionTypes.Register,
//     payload: {accessToken},
//   }),
//   logout: () => ({type: actionTypes.Logout}),
//   requestUser: () => ({
//     type: actionTypes.UserRequested,
//   }),
//   fulfillUser: (user: UserModel) => ({type: actionTypes.UserLoaded, payload: {user}}),
//   setUser: (user: UserModel) => ({type: actionTypes.SetUser, payload: {user}}),
// }

// export function* saga() {
//   yield takeLatest(actionTypes.Login, function* loginSaga() {
//     yield put(actions.requestUser())
//   })

//   yield takeLatest(actionTypes.Register, function* registerSaga() {
//     yield put(actions.requestUser())
//   })

//   yield takeLatest(actionTypes.UserRequested, function* userRequested() {
//     const {data: user} = yield getUserByToken()
//     yield put(actions.fulfillUser(user))
//   })
// }

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../../setup/redux/Store";

import User from "../models/User";
import DbService from "../../../../setup/pouchdb/DbService";

export interface LoginError {
  message?: string;
  username?: string;
  password?: string;
}

interface UserConfiguration {
  modules: {
    enabled: string[];
  };
}

interface UserState {
  user: User | null;
  modules: string[];
  loginError?: LoginError;
}

const initialState: UserState = {
  user: null,
  modules: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(
      state,
      {
        payload,
      }: PayloadAction<{
        user: User;
        modules: string[];
      }>
    ) {
      state.user = payload.user;
      state.modules = payload.modules;
    },
    loginError(state, { payload }: PayloadAction<LoginError>) {
      state.loginError = payload;
    },
    logoutSuccess(state) {
      state.user = null;
      state.modules = [];
    },
  },
});

export const { loginError, loginSuccess, logoutSuccess } = userSlice.actions;

export const login =
  (username: string, password: string): AppThunk =>
  async (dispatch) => {
    DbService.configureForUser(username, password);

    const remoteDb = DbService.getServerDb();
    try {
      const loginResponse = await remoteDb.logIn(username, password);
      const config = await remoteDb.get<UserConfiguration>(
        "user_ui_configuration"
      );
      await DbService.recreateLocalDb();
      DbService.startSyncing();
      dispatch(
        loginSuccess({
          user: {
            id: `org.couchdb.user:${loginResponse.name}`,
            username: loginResponse.name,
          },
          modules: config.modules.enabled,
        })
      );
    } catch (error) {
      DbService.teardownServerDb();
      if (!username) {
        dispatch(
          loginError({
            message: "user.login.error.message.required",
            username: "user.login.error.username.required",
          })
        );
      } else if (!password) {
        dispatch(
          loginError({
            message: "user.login.error.message.required",
            password: "user.login.error.password.required",
          })
        );
      } else if (error.status === 401) {
        dispatch(
          loginError({
            message: "user.login.error.message.incorrect",
          })
        );
      } else if (error.status === 404) {
        dispatch(
          loginError({
            message: "user.login.error.message.serverNotResponding",
          })
        );
      }
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  const remoteDb = DbService.getServerDb();
  if (remoteDb) {
    await remoteDb.logOut();
    dispatch(logoutSuccess());
  }
};

export default userSlice.reducer;
