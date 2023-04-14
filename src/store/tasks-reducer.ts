import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI} from "../api/todolistAPI";
import {Dispatch} from "redux";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolists-reducer";

export const tasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]: [action.title, ...state[action.todolistId]]}
        case 'CHANGE-STATUS-TASK' :
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)}
        case 'CHANGE-TITLE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
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
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {copyState[tl.id] = []})
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todoListId]: action.tasks}
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) =>
    ({type: 'CHANGE-STATUS-TASK', taskId, status, todoListId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) =>
    ({type: 'CHANGE-TITLE-TASK', title, todoListId, taskId} as const)
export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({type: 'SET-TASKS', tasks, todoListId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

// types
const initialState: TasksStateType = {}
export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT








