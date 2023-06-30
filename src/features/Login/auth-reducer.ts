import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { appActions } from "app/app-reducer";
import { authAPI, LoginType } from "api/todolistsAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { todoListsActions } from "features/TodolistsList/todolists-reducer";

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
//export const { setIsLoggedIn } = slice.actions;
export const authActions = slice.actions;

// thunks
export const logInTC =
  (data: LoginType): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setRequestStatus({ status: "loading" }));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
          dispatch(appActions.setRequestStatus({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setRequestStatus({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(todoListsActions.clearTodosData());
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
