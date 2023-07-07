import { ResponseType } from "common/api/common.api";
import { Dispatch } from "redux";
import { appActions } from "app/app.slice";

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
