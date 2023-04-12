import {v1} from "uuid";
import {REMOVE_TODOLIST} from "./constants";
import {TodolistType} from "../api/todolistAPI";

//AT - Action Type
export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string,
    todolistId: string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterButtonType
    id: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: TodolistDomainType[] = []

export type FilterButtonType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodolistType & {filter: FilterButtonType}


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
       /* case 'SET-TODO-LISTS':
            return action.todos.map(tl => ({...tl, filter: 'all'}))*/
        default:
            return state;
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: REMOVE_TODOLIST, id})
export const AddTodolistAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title, todolistId: v1()})
export const ChangeTodoListFilterAT = (filter: FilterButtonType, id: string): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter, id})
export const ChangeTodoListTitleAT = (title: string, id: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, id})
/*
export const setTodoListAC = (todos: TodoListType[]) => ({type: 'SET-TODO-LISTS', todos} as const)
*/

