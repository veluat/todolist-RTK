import {setAppErrorAC, SetAppErrorActionType, setRequestStatusAC, SetRequestStatusType} from "../app/app-reducer";
import {ResponseType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setRequestStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    dispatch(setAppErrorAC(error ? error : 'Some error occurred'))
    dispatch(setRequestStatusAC('failed'))
}

type ErrorUtilsDispatchType = SetAppErrorActionType | SetRequestStatusType