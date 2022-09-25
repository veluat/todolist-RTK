import React, {useState} from "react";
import {FilterButtonType} from "./App";


type TodolistProps = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: number) => void
    changeFilter: (filterValue: FilterButtonType) => void
}
export type TasksType = {
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
                {props.tasks.map(t => {
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {props.removeTask(t.id)}}>x</button>
                            </li>)
                    }
                )}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('All')}}>All</button>
                <button onClick={() => {props.changeFilter('Active')}}>Active</button>
                <button onClick={() => {props.changeFilter('Completed')}}>Completed</button>
            </div>
        </div>
    )
}