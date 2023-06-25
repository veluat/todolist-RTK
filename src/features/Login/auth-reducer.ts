import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { Dispatch } from "redux";
import { setRequestStatusAC } from "app/app-reducer";
import { authAPI } from "api/todolistsAPI";
import { clearTodosDataAC } from "../TodolistsList/todolists-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks
export const logInTC = (data: any) => (dispatch: Dispatch) => {
  dispatch(setRequestStatusAC({ status: "loading" }));
  authAPI
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(setRequestStatusAC({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setRequestStatusAC({ status: "loading" }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }));
        dispatch(clearTodosDataAC());
        dispatch(setRequestStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
