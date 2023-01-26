import {FilterButtonType, TodoListType} from "../App";
import {v1} from "uuid";
import {REMOVE_TODOLIST} from "./constants";



//AT - Action Type
export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
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

export const todoListsReducer = (todoLists: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return (todoLists.filter(tl => tl.id !== action.id))
        case 'ADD-TODOLIST':
            const newTodoListId = v1()
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: 'All'
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return todoLists;
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: REMOVE_TODOLIST, id})