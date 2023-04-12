import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistAPI";


//AT - Action Type
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                startDate: '',
                addedDate: '',
                order: 0,
                deadline: '',
                priority: TaskPriorities.Low,
                description: ''
            }
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case 'CHANGE-STATUS-TASK' :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }

        case 'CHANGE-TITLE-TASK' :
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST' :
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
            /*
            Второй вариант через деструктуризацию:
            let {[action.id]:[], ...rest} = {...state}
            return rest
            */
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
    return {type: 'CHANGE-STATUS-TASK', taskId, status, todoListId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {type: 'CHANGE-TITLE-TASK', title, todoListId, taskId} as const
}







