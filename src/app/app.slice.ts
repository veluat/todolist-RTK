import { Dispatch } from "redux";
import { authAPI } from "api/todolistsAPI";
import { authActions } from "features/auth/auth.slice";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false as boolean,
};

export type AppInitialStateType = typeof initialState;

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setRequestStatus(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },
    setAppInitialized(
      state,
      action: PayloadAction<{ isInitialized: boolean }>
    ) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appSlice = slice.reducer;
export const appActions = slice.actions;

export const initializedAppTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setRequestStatus({ status: "loading" }));
  authAPI
    .me()
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
    })
    .finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    });
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
