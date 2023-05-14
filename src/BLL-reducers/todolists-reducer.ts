import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

const initialState: TodolistDomainType[] = []
export const todoListsReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return (state.filter(tl => tl.id !== action.id))
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'All', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All', entityStatus: 'idle'}))
        default:
            return state;
    }
}

//actions
export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterButtonType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodoListEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodoListTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

// types
export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & { filter: FilterButtonType, entityStatus: RequestStatusType }
export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type SetTodoListsAT = ReturnType<typeof setTodolistsAC>
export type ActionType =
    | RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | SetTodoListsAT
    | ReturnType<typeof changeTodoListEntityStatusAC>

type ThunkDispatch = Dispatch<ActionType
    | SetAppStatusActionType>

