import React, {useEffect, useState} from 'react'
import {todolistsAPI, UpdateTaskModelType} from "../api/todolistsAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React'
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '2d010e6e-91cd-472c-925a-b3be886ff325'
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '725bc29a-fb57-464c-9505-1ac72935e913'
        const title = 'Title new_new'
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data)
            )
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'task title'} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data)
            )
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('title1')
    const [description, setDescription] = useState<string>('description1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadLine, setDeadLine] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            description: description,
            deadline: '',
            priority: priority,
            startDate: '',
            status: status,
            title: title
        })
            .then(res => setState(res.data)
            )
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'Task Title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input placeholder={'Description'} value={description} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input placeholder={'Status'} value={status} onChange={(e) => {
                setStatus(+e.currentTarget.value)
            }}/>
            <input placeholder={'Priority'} value={priority} onChange={(e) => {
                setPriority(+e.currentTarget.value)
            }}/>
            {/*<input placeholder={'Start Date'} value={startDate} onChange={(e) => {*/}
            {/*    setStartDate(e.currentTarget.value)*/}
            {/*}}/>*/}
            {/*<input placeholder={'deadLine'} value={deadLine} onChange={(e) => {*/}
            {/*    setDeadLine(e.currentTarget.value)*/}
            {/*}}/>*/}
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}
