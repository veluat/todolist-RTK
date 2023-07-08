import { Dispatch } from "redux";
import { authActions } from "features/auth/auth.slice";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import { authAPI } from "features/auth/auth.api";

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
