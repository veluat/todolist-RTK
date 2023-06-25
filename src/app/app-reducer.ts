import { Dispatch } from "redux";
import { authAPI } from "api/todolistsAPI";
import { setIsLoggedInAC } from "features/Login/auth-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setRequestStatusAC(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(
      state,
      action: PayloadAction<{ isInitialized: boolean }>
    ) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppErrorAC, setRequestStatusAC, setAppInitializedAC } =
  slice.actions;

export const initializedAppTC = () => (dispatch: Dispatch) => {
  dispatch(setRequestStatusAC({ status: "loading" }));
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }));
        dispatch(setRequestStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppInitializedAC({ isInitialized: true }));
    });
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetRequestStatusType = ReturnType<typeof setRequestStatusAC>;
