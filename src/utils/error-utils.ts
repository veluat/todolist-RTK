import {
  setAppErrorAC,
  SetAppErrorActionType,
  setRequestStatusAC,
  SetRequestStatusType,
} from "app/app-reducer";
import { ResponseType } from "api/todolistsAPI";
import { Dispatch } from "redux";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<ErrorUtilsDispatchType>
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }));
  }
  dispatch(setRequestStatusAC({ status: "failed" }));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<ErrorUtilsDispatchType>
) => {
  dispatch(
    setAppErrorAC({
      error: error.message ? error.message : "Some error occurred",
    })
  );
  dispatch(setRequestStatusAC({ status: "failed" }));
};

export type ErrorUtilsDispatchType =
  | SetAppErrorActionType
  | SetRequestStatusType;
