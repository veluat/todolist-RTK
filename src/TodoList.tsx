import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterButtonType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TasksType>
    filter: FilterButtonType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterButtonType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task: TasksType) => {
                        const removeTask = () => props.removeTask(task.id, props.todoListId)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                        const changeTaskTitle = (nextTitle: string) => props.changeTaskTitle(task.id, nextTitle, props.todoListId)
                        const isDoneClass = task.isDone ? 'isDone' : ''
                        return (
                            <li key={task.id} className={isDoneClass}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    }
                )}</ul>
        : <span>Your list is empty</span>

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    const changeFilterHandlerCreator = (filter: FilterButtonType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const addTask = (title: string) => props.addTask(title, props.todoListId)

    const allBtnClass = props.filter === 'All' ? 'btn-active' : ''
    const activeBtnClass = props.filter === 'Active' ? 'btn-active' : ''
    const completedBtnClass = props.filter === 'Completed' ? 'btn-active' : ''

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
        </h3>
    <AddItemForm addItem={addTask}/>
    {
        tasksJSXItemsList
    }
    <div>
        <button
            className={allBtnClass}
            onClick={changeFilterHandlerCreator('All')}
        >All
        </button>
        <button
            className={activeBtnClass}
            onClick={changeFilterHandlerCreator('Active')}
        >Active
        </button>
        <button
            className={completedBtnClass}
            onClick={changeFilterHandlerCreator('Completed')}
        >Completed
        </button>
    </div>
</div>

)
    ;
};
