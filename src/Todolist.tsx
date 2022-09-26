import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterButtonType} from "./App";
import {Button} from "./components/Button";


export type TodolistProps = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterButtonType) => void
    addTask: (title: string) => void
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistProps) => {

    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if (event.key === 'Enter') addTaskHandler()
    }

    const changeFilterHandler = (filterValue: FilterButtonType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(taskID)
    }

    const mapTasks = props.tasks.map(t => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={()=>removeTaskHandler(t.id)}>x</button>
                </li>)
        })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {mapTasks}
            </ul>
            <div>
               {/* <button onClick={() => changeFilterHandler('All')}>All</button>
                <button onClick={() => changeFilterHandler('Active')}>Active</button>
                <button onClick={() => changeFilterHandler('Completed')}>Completed</button>*/}

                <Button name={'All'} callback={() => changeFilterHandler('All')}/>
                <Button name={'Active'} callback={() => changeFilterHandler('Active')}/>
                <Button name={'Completed'} callback={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    )
}