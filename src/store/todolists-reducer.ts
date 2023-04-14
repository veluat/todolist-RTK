import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolistAPI";
import {Dispatch} from "redux";

export const todoListsReducer = (state = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return (state.filter(tl => tl.id !== action.id))
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'All', addedDate: '', order: 0}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'All'}))
        default:
            return state;
    }
}

//actions
export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const changeTodoListFilterAT = (filter: FilterButtonType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
export const changeTodoListTitleAT = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

// types
const initialState: TodolistDomainType[] = []
export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & { filter: FilterButtonType }
export type AddTodoListAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type SetTodoListsAT = ReturnType<typeof setTodolistsAC>
export type ActionType =
    | RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof changeTodoListFilterAT>
    | ReturnType<typeof changeTodoListTitleAT>
    | SetTodoListsAT



