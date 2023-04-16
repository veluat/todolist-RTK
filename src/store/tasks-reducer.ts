import {TasksStateType} from "../App";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolistAPI";
import {Dispatch} from "redux";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolists-reducer";
import {AppRootStateType} from "./store";

export const tasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK' :
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
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
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todoListId} as const)
export const setTasksAC = (tasks: TaskType[], todoListId: string) =>
    ({type: 'SET-TASKS', tasks, todoListId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }

// types
const initialState: TasksStateType = {}
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT








