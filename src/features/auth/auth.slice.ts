import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { appActions } from "app/app.slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { clearTasksAndTodos } from "common/actions/common.actions";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { authAPI, LoginType } from "features/auth/auth.api";

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

export const authSlice = slice.reducer;
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
        dispatch(clearTasksAndTodos());
        dispatch(appActions.setRequestStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
