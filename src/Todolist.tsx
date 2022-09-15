import React from "react";

type TodolistProps = {
    title: string
    xz?: number
    tasks: Array<TasksType>
}
type TasksType = {
    id: number
    title: string
    isDone: boolean
    newValue: boolean
}
export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task =>  {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span></li>)}
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}