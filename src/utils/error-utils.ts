import {setAppErrorAC, SetAppErrorActionType, setRequestStatusAC, SetRequestStatusType} from "../app/app-reducer";
import {ResponseType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType
    | SetRequestStatusType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setRequestStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetAppErrorActionType
    | SetRequestStatusType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setRequestStatusAC('failed'))
}