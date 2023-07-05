import { ResponseType } from "api/todolistsAPI";
import { Dispatch } from "redux";
import { appActions } from "app/app.slice";
import axios, { AxiosError } from "axios";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setRequestStatus({ status: "failed" }));
};

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
