import {ErrorUtilsDispatchType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";
import {setIsLoggedInType, setRequestStatusAC} from "../../app/app-reducer";
import {authAPI} from "../../api/todolistsAPI";
import {clearTodosDataAC, ClearTodosDataAT} from "../TodolistsList/todolists-reducer";

const initialState: initialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const logInTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setRequestStatusAC('succeeded'))

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(clearTodosDataAC())
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
// types
type initialStateType = {
    isLoggedIn: boolean
}

type ActionsType = ErrorUtilsDispatchType
    | setIsLoggedInType
    | ClearTodosDataAT









