import {ErrorUtilsDispatchType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";
import {setRequestStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolistsAPI";

const initialState: initialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: initialStateType = initialState, action: ActionsType) => {
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
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
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


// types
type initialStateType = {
    isLoggedIn: boolean
}

type ActionsType = ErrorUtilsDispatchType | ReturnType<typeof setIsLoggedInAC>








