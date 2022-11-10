import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterButtonType} from "./App";

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
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const tasksJSXItemsList = props.tasks.length
        ? <ul>
            {
                props.tasks.map((task: TasksType) => {
                        const removeTask = () => props.removeTask(task.id, props.todoListId)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                        const isDoneClass = task.isDone ? 'isDone' : ''
                        return (
                            <li key={task.id} className={isDoneClass}>
                                <input
                                    type='checkbox'
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <span>{task.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    }
                )}</ul>
        : <span>Your list is empty</span>

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const changeFilterHandlerCreator = (filter: FilterButtonType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const removeTodoList = () => props.removeTodoList(props.todoListId)


    const allBtnClass = props.filter === 'All' ? 'btn-active' : ''
    const activeBtnClass = props.filter === 'Active' ? 'btn-active' : ''
    const completedBtnClass = props.filter === 'Completed' ? 'btn-active' : ''

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onKeyDownEnterAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error &&
                    <div style={{fontWeight: 'bold', color: 'hotpink'}}>
                        Title is required
                    </div>}
            </div>
            {tasksJSXItemsList}
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

    );
};
