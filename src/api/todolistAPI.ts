import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'aaa80c55-0a44-44bc-9139-4b0b82a58976'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
