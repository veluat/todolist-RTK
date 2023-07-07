import { Dispatch } from "redux";
import { appActions } from "app/app.slice";
import axios, { AxiosError } from "axios";

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = (e as Error) || AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setAppError({ error }));
  } else {
    dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
  }
  dispatch(appActions.setRequestStatus({ status: "failed" }));
};
