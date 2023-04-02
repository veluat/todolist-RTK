import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React'
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '2d010e6e-91cd-472c-925a-b3be886ff325'
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '725bc29a-fb57-464c-9505-1ac72935e913'
        const title = 'Title new_new'
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

